# React 进阶：配置 Proxy 代理与 Cookie 跨域透传问题

在 React 的日常开发中，我们通常会在本地启动一个 Dev Server（通常运行在 `localhost:3000`）。而我们的后端 API 接口可能部署在测试服务器或者开发服务器上。

当我们在本地浏览器直接请求这些跨域接口时，就会遇到**跨域拦截 (CORS)** 的问题。为了解决这个问题，在开发环境下我们通常会配置**反向代理 (Proxy)**。

## 1. 基础配置：React 中的 Proxy

对于由 `create-react-app` 创建的项目，最简单的 Proxy 配置方式是在 `package.json` 中添加一个 `proxy` 字段：

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "proxy": "http://api.backend.com",
  "dependencies": {
    // ...
  }
}
```

但如果是更复杂的代理需求（例如多代理路径，重写路径，修改响应头），我们需要使用 `http-proxy-middleware` 插件。

在 `src` 目录下新建 `setupProxy.js` 文件：
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.backend.com',
      changeOrigin: true, // 控制服务器接收到的请求头中 host 字段的值
      pathRewrite: {
        '^/api': '' // 将 /api 路径重写为空
      }
    })
  );
};
```

## 2. 核心痛点：Proxy 代理后 Cookie 丢失问题

在代理配置成功后，接口确实可以调通了。但如果在项目中涉及到**登录授权**，且后端是通过向浏览器写入 Cookie（`Set-Cookie`）来维持 Session 状态时，你会发现一个奇怪的现象：
**接口返回 200 成功登录，但在随后的请求中，Cookie 并没有被携带上，导致状态校验失败。**

### 原因分析
这通常是由于后端在 `Set-Cookie` 时，指定了特定的 `Domain` 或 `Path`。
- 如果后端的 `Path=/learning/`，而你本地项目请求的根路径是 `/`，浏览器会认为路径不匹配，从而拒绝保存该 Cookie。
- 或者是跨域问题导致的 domain 不匹配，导致浏览器丢弃了 Cookie。

### 解决方案：拦截响应并重写 Cookie 路径

我们需要在 `setupProxy.js` (或者 Webpack/Umi 的 proxy 配置) 中，利用 `onProxyRes` 钩子函数，拦截服务器返回的响应，找到 `set-cookie` 字段，并将它里面限制过死的 `Path` 替换为根路径 `/`。

以下是针对 `Cookie Path` 不匹配的完美解决方案：

```javascript
module.exports = {
  proxy: {
    '/xd': {
      target: 'http://snce.xidian.edu.cn/',
      changeOrigin: true,
      pathRewrite: { '^/xd': '' },
      
      // 当代理服务器接收到目标服务器的响应时触发
      onProxyRes: function (proxyRes, req, res) {
        // 1. 获取服务器返回的 cookie 数组
        const cookies = proxyRes.headers['set-cookie'];
        
        // 2. 定义我们要匹配并替换的路径正则
        const cookiePathRegex = /Path=\/learning\//i; // 注意末尾不需要分号
        
        if (cookies) {
          // 3. 遍历并修改每一条 cookie
          const newCookie = cookies.map((cookieStr) => {
            if (cookiePathRegex.test(cookieStr)) {
              // 将原特定的路径替换为根路径 '/'
              return cookieStr.replace(cookiePathRegex, 'Path=/');
            }
            return cookieStr;
          });
          
          // 4. 删除原有的 set-cookie 头
          delete proxyRes.headers['set-cookie'];
          // 5. 挂载我们修改后放宽权限的新 cookie
          proxyRes.headers['set-cookie'] = newCookie;
        }
      },
    },
  },
};
```

通过重写 `set-cookie` 的 `Path`（必要时还可以重写 `Domain`），就可以欺骗浏览器，让它乖乖地在本地 localhost 环境下保存该 Cookie。当我们在本地发起下一次请求时，浏览器便会自动带上这个 Cookie，完美解决本地开发环境下的登录状态透传问题！
