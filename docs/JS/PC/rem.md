# 前端大屏与移动端适配：REM 方案详解

在前端开发中，尤其是在移动端 H5 页面开发和 PC 大屏数据可视化项目中，屏幕分辨率的碎片化是一个常见的问题。为了让页面在不同尺寸的屏幕上都能保持良好的等比例缩放效果，`rem`（Root EM）适配方案成为了经典的解决方案之一。

## 什么是 REM？

`rem` 是 CSS 中的一种相对长度单位，它是相对于 HTML 根元素（`<html>`）的 `font-size` 属性来计算的。
例如，如果 `html { font-size: 100px; }`，那么 `1rem = 100px`，`0.5rem = 50px`。

利用这个特性，我们只需要根据屏幕的宽度动态修改 `html` 的 `font-size`，页面中使用 `rem` 作为单位的元素就会自动等比例缩放。

## 核心实现原理

无论是大屏还是移动端，核心思想都是：**在页面加载和窗口大小发生变化时，通过 JavaScript 重新计算并设置 html 的 fontSize。**

### 原生 JS 动态计算代码

以下是一个自适应脚本，适用于 PC 大屏（以 1920px 宽度为设计稿基准）或移动端适配。将其放入 `<head>` 标签中或者入口文件的最顶端执行。

```javascript
(function (win) {
  var tid;
  
  function refreshRem() {
    // 设置设计稿的原始宽度
    // 移动端通常是 750 或 375
    // PC 大屏通常是 1920
    let designSize = 1920; 
    let html = document.documentElement;
    let clientWidth = html.clientWidth; // 当前窗口的可见宽度
    
    // 为了防止过大或过小，可以设置边界值 (可选)
    // if (clientWidth < 1200) clientWidth = 1200; 

    // 计算 rem，这里约定设计稿下 1rem = 100px，方便计算
    // 公式: 当前屏幕宽度 / 设计稿宽度 * 100
    let rem = (clientWidth * 100) / designSize; 
    html.style.fontSize = rem + "px";
  }

  // 监听窗口尺寸变化
  win.addEventListener(
    "resize",
    function () {
      clearTimeout(tid);
      // 使用防抖(Debounce)优化性能，300ms 触发一次
      tid = setTimeout(refreshRem, 300);
    },
    false
  );

  // 监听页面展示，兼容某些浏览器的返回缓存机制 (BFCache)
  win.addEventListener(
    "pageshow",
    function (e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    },
    false
  );

  // 初始化执行一次
  refreshRem();
})(window);
```

## 开发配置实践

手动将设计稿上的 `px` 换算成 `rem` 非常繁琐（如 123px 写成 1.23rem）。在现代前端工程中，我们通常结合 PostCSS 插件来自动完成这个转换。

### 1. 安装 `postcss-pxtorem`

如果你使用的是 Vue, React 等基于 Webpack / Vite 的构建工具，可以安装 `postcss-pxtorem`：

```bash
npm install postcss-pxtorem -D
```

### 2. 配置 PostCSS

在项目根目录新建或修改 `postcss.config.js`：

```javascript
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100, // 对应我们 JS 中设置的设计稿基准下 html 的 font-size，此处为 100
      propList: ['*'], // 可以从 px 更改为 rem 的属性，* 表示所有属性
      selectorBlackList: ['.norem'], // 过滤掉不需要转换的类名
      minPixelValue: 2 // 设置要替换的最小像素值 (通常 1px 不做转换)
    }
  }
}
```

## 最佳实践与注意事项

1. **为什么根基准选择 100px？** 
   过去有些方案使用 `1rem = 50px` 或根据设备 DPR 计算，但将 `rootValue` 设为 100，主要是为了方便人类心算，设计稿上的 `24px` 直接对应 `0.24rem`（如果没有使用自动化插件的话）。
2. **字体大小 (font-size) 建议**：
   在某些阅读类网站上，文字大小不建议使用 `rem` 等比缩放，因为在大屏上文字过大会显得突兀，应该使用媒体查询配合 `px` 限制字体最大值。但在数据大屏可视化场景，全盘使用 `rem` 是推荐的。
3. **第三方 UI 组件库兼容**：
   如果引入了 Element UI 或 Vant 等组件库，`postcss-pxtorem` 可能会把组件库的内部样式也转换了导致变形。可以通过 `selectorBlackList` 排除第三方库的前缀，或者为第三方库单独设置 `rootValue`。
