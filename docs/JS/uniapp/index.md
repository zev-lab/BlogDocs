# UniApp 安卓 App 版本检查与热更新指南

在基于 UniApp 开发的 Android 应用中，实现自动检查版本并引导用户下载更新是一个极为常见的需求。这不仅能保证用户体验到最新的功能，还能及时修复线上严重的 Bug。

本文将详细介绍如何在 UniApp 中通过调用 5+ App 的底层 API 实现**获取当前系统版本**、**请求后端接口检查更新**以及**后台下载 APK 并调起安装**的完整闭环。

## 1. 整体流程思路

1. **获取当前版本信息**：获取本地 App 的 `versionCode` (版本号) 或 `version` (版本名称)。
2. **请求服务器对比**：将本地版本号发送给服务器，服务器判断是否需要更新。
3. **提示更新**：如果需要更新，弹窗提示用户，获取下载链接。
4. **下载文件**：用户确认后，创建下载任务下载 APK。
5. **安装 APK**：下载完毕后，调用系统安装程序进行安装。

## 2. 获取当前版本并检查更新

在 UniApp 中，可以通过 `plus.runtime.getProperty` 获取应用的详细信息。

```javascript
function checkAppUpdate() {
  // 注意：非 App 平台下 plus 是未定义的，需做条件编译或环境判断
  // #ifdef APP-PLUS
  plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
    const currentVersion = widgetInfo.version; // 例：1.0.0
    const currentVersionCode = widgetInfo.versionCode; // 例：100

    // 向服务端发起请求检查更新
    uni.request({
      url: 'https://api.yourdomain.com/app/checkUpdate', 
      method: 'GET',
      data: {
        version: currentVersion,
        versionCode: currentVersionCode
      },
      success: (res) => {
        if (res.data.code === 200 && res.data.data.hasUpdate) {
          const updateData = res.data.data;
          
          // 弹出更新提示框
          uni.showModal({
            title: '发现新版本',
            content: updateData.updateLog || '系统有新的版本发布，为了更好的体验，请更新。',
            confirmText: '立即更新',
            cancelText: '稍后再说',
            success: (modalRes) => {
              if (modalRes.confirm) {
                // 用户点击立即更新
                downloadAndInstallApp(updateData.downloadUrl);
              }
            }
          });
        }
      },
      fail: (err) => {
        console.error("更新检查失败", err);
      }
    });
  });
  // #endif
}
```

## 3. 下载并安装更新 (APK)

当用户同意更新后，我们需要使用 `plus.downloader.createDownload` 创建下载任务。为了体验更好，可以结合 `uni.showLoading` 或者自定义的进度条组件提示用户下载进度。

```javascript
function downloadAndInstallApp(apkUrl) {
  // 提示用户正在下载
  uni.showLoading({
    title: '正在下载更新包...',
    mask: true
  });

  // 创建下载任务
  const dtask = plus.downloader.createDownload(apkUrl, {}, (download, status) => {
    uni.hideLoading();
    
    // 状态码 200 表示下载成功
    if (status === 200) {
      // 转换本地文件路径
      const filePath = plus.io.convertLocalFileSystemURL(download.filename);
      
      // 发起安装
      plus.runtime.install(
        filePath,
        { force: false }, // 是否强制安装
        () => {
          console.log('安装成功');
          // 安装完成后往往系统会自动关闭应用，或者我们可以强制重启
          plus.runtime.restart();
        },
        (error) => {
          console.error('安装失败', error);
          uni.showToast({
            title: '安装失败，请手动打开文件安装',
            icon: 'none',
            duration: 3000
          });
        }
      );
    } else {
      uni.showToast({
        title: '下载失败，请检查网络',
        icon: 'none'
      });
    }
  });

  // 可选：监听下载进度
  dtask.addEventListener("statechanged", (download, status) => {
    if (download.state === 3) { // 正在下载
      const percent = Math.floor((download.downloadedSize / download.totalSize) * 100);
      // 可以通过某种方式将进度传递给页面显示 (例如 vuex 或 eventBus)
      console.log(`当前下载进度：${percent}%`);
    }
  }, false);

  // 启动下载任务
  dtask.start();
}
```

## 4. 常见问题排查

1. **版本号比对**：建议后端通过 `versionCode` (整数) 来判断是否需要更新，因为字符串版本的比对（如 `1.0.2` vs `1.1.0`）处理起来较复杂且容易出错。
2. **IOS 平台处理**：如果是 iOS 平台，不能直接下载 `ipa` 包安装。通常的做法是判断如果为 iOS，则直接引导跳转到 App Store。
   ```javascript
   if (plus.os.name === 'iOS') {
       plus.runtime.openURL('itms-apps://itunes.apple.com/cn/app/你的AppID');
   }
   ```
3. **权限问题**：Android 高版本（8.0+）需要有“安装未知应用”的权限。如果在安装阶段毫无反应，请检查应用的 `manifest.json` 中是否配置了相关的安装权限。