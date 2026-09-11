# 微信小程序/UniApp：生成并保存分享海报图

## 业务背景

在小程序营销裂变活动中，最常见的需求之一就是**“分享海报”**：将用户头像、商品封面、活动背景图以及带参的小程序码合成一张精美的图片，用户可以长按保存图片并转发给好友或发朋友圈，以达到拉新引流的目的。

由于小程序默认只支持分享纯卡片或图片，不支持直接将 HTML 结构转化为图片，因此我们必须借助 `Canvas` API 来进行图片绘制合成。

本文基于 UniApp 框架，详细讲解如何在小程序中生成海报并实现长按保存功能。

## 实现思路闭环

1. **获取设备信息**：获取屏幕宽高及像素比（dpr），以适配不同手机屏幕，防止生成图片模糊。
2. **下载网络图片到本地**：Canvas 绘制图片，源路径必须是本地临时路径，不能直接绘制带域名的网络图片。
3. **在 Canvas 上进行排版绘制**：使用 Canvas API 将背景、二维码等素材逐层绘制在画布上。
4. **导出为图片**：利用 `uni.canvasToTempFilePath` 将 Canvas 内容导出为本地临时图片文件路径。
5. **展示与保存**：将画布隐藏，利用 `<image>` 组件展示导出的图片，并开启 `show-menu-by-longpress` 属性，实现微信原生长按保存菜单。

---

## 具体代码实现

### 1. 页面模板 (Template)

我们使用一个绝对定位移出屏幕的 Canvas 来默默绘制，绘制完成后再把生成的图片路径丢给页面上的 `image` 组件展示给用户。

```html
<template>
  <view class="poster-container">
    <!-- 离屏 Canvas，用于后台静默绘制。将其移出可视区域防止穿透遮挡 -->
    <view class="canvas-box" style="position: fixed; left: -9999px; top: 0;">
      <canvas 
        class="canvas" 
        canvas-id="shareImg" 
        :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}">
      </canvas>
    </view>
    
    <!-- 最终展示给用户看的海报图 -->
    <image 
      v-if="posterUrl" 
      class="poster-img" 
      :src="posterUrl" 
      mode="aspectFit" 
      show-menu-by-longpress="true"
      :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}">
    </image>
  </view>
</template>
```

> **提示：** 开启 `show-menu-by-longpress="true"`，在微信环境长按该图片，即可呼出微信自带的“保存图片”、“转发给朋友”、“识别小程序码”的原生菜单，免去了手写保存授权 API 的麻烦！

### 2. 初始化与下载网络图片 (Script)

```javascript
export default {
  data() {
    return {
      canvasWidth: 375,
      canvasHeight: 667,
      pixelRatio: 2, // 设备像素比，解决模糊问题
      
      bgUrl: 'https://cdn.example.com/poster-bg.png', // 背景图网络地址
      qrUrl: 'https://cdn.example.com/qr-code.png',   // 二维码网络地址
      
      localBgPath: '',
      localQrPath: '',
      
      posterUrl: '' // 最终生成的海报本地临时路径
    };
  },
  mounted() {
    this.initSystemInfo();
    this.downloadAssetsAndDraw();
  },
  methods: {
    // 获取系统信息，计算宽高
    initSystemInfo() {
      const sysInfo = uni.getSystemInfoSync();
      this.canvasWidth = sysInfo.windowWidth;
      // 高度可以根据设计稿比例动态计算，比如 16:9
      this.canvasHeight = this.canvasWidth * (16 / 9); 
      this.pixelRatio = sysInfo.pixelRatio || 2;
    },

    // 核心流控制：下载素材 -> 绘制画布 -> 导出图片
    async downloadAssetsAndDraw() {
      uni.showLoading({ title: "海报生成中...", mask: true });
      
      try {
        // 1. 并发下载所需图片到本地缓存
        const [bgRes, qrRes] = await Promise.all([
          this.downloadFile(this.bgUrl),
          this.downloadFile(this.qrUrl)
        ]);
        
        this.localBgPath = bgRes.tempFilePath;
        this.localQrPath = qrRes.tempFilePath;
        
        // 2. 开始在 Canvas 上绘制
        await this.drawPoster();
        
      } catch (err) {
        uni.hideLoading();
        uni.showToast({ title: '图片下载失败', icon: 'none' });
        console.error(err);
      }
    },
    
    // 封装下载 API 为 Promise
    downloadFile(url) {
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: url,
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        });
      });
    }
  }
}
```

### 3. Canvas 绘制与导出图片

```javascript
  methods: {
    // ...前文的方法
    
    drawPoster() {
      return new Promise((resolve, reject) => {
        const ctx = uni.createCanvasContext('shareImg', this);
        
        // 绘制完整背景图
        ctx.drawImage(this.localBgPath, 0, 0, this.canvasWidth, this.canvasHeight);
        
        // 绘制小程序码 (假设在底部正中间)
        const qrSize = 100;
        const qrX = (this.canvasWidth - qrSize) / 2;
        const qrY = this.canvasHeight - qrSize - 40;
        ctx.drawImage(this.localQrPath, qrX, qrY, qrSize, qrSize);
        
        // 绘制额外文字（可选）
        ctx.setFontSize(16);
        ctx.setFillStyle('#ffffff');
        ctx.setTextAlign('center');
        ctx.fillText("长按识别小程序码查看详情", this.canvasWidth / 2, this.canvasHeight - 15);
        
        // 执行绘制
        ctx.draw(false, () => {
          // 绘制完成的回调中，将画布转为图片
          this.exportCanvasToImage().then(resolve).catch(reject);
        });
      });
    },

    exportCanvasToImage() {
      return new Promise((resolve, reject) => {
        // 延迟一下，防止部分机型 draw 回调不准确
        setTimeout(() => {
          uni.canvasToTempFilePath({
            canvasId: 'shareImg',
            // 关键点：将导出尺寸设置为画板尺寸乘以设备的像素比，输出高清图片，解决图片模糊问题
            destWidth: this.canvasWidth * this.pixelRatio,
            destHeight: this.canvasHeight * this.pixelRatio,
            success: (res) => {
              this.posterUrl = res.tempFilePath; // 赋值给 image 展示
              uni.hideLoading();
              resolve();
            },
            fail: (err) => {
              uni.hideLoading();
              reject(err);
            }
          }, this);
        }, 200);
      });
    }
  }
```

## 开发踩坑提醒

1. **图片域名白名单**：在微信小程序中，`uni.downloadFile` 下载的网络图片，其域名必须配置在小程序后台的 `downloadFile合法域名` 列表中，否则真机无法下载，海报一片空白。
2. **绘制模糊问题**：务必使用 `destWidth` 和 `destHeight` 乘以设备的 `pixelRatio`（甚至是 `pixelRatio` 的倍数），否则生成的图片在视网膜屏幕上会非常模糊。
3. **Canvas 隐藏**：不可使用 `display: none` 或 `v-if="false"` 隐藏 canvas，否则上下文对象失效无法绘制。最佳方案是如代码所示使用 `position: fixed` 并用极为偏僻的负值将其移出屏幕即可。