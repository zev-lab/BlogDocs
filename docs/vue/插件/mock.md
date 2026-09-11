# 在项目中使用 mockjs

### 一 快速开始

* 安装mockjs

```npm install mockjs --save-dev```

* 新建 /mock/index.js

```js
import Mock from "mockjs";

let configArray = [];

// 使用webpack的require.context() 遍历所有mock文件
const files = require.context(".", true, /\.js$/);
files.keys().forEach(key => {
    if (key === "./index.js") return;

    for (const keys in files(key)) {
        if (Object.hasOwnProperty.call(files(key), keys)) {
            const element = files(key)[keys];
            configArray = configArray.concat(element);
        }
    }
});

// 注册所有的mock服务
configArray.forEach(item => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split("|");
        //    "http://ceshi.ydeshui.com/mock" + protocol[1],
        
        Mock.mock(
            new RegExp("(\\D*|\\S*)/mock" + protocol[1]),
            protocol[0],
            target
        );
    }
});
```
::: warning 注意

 Mock.mock()  第一个参数 要 匹配到 请求的 全部url 

:::

* 在同目录下新建js文件
  
m_evrvilayout.js
```js 
export const tablist = {
    "get|/mock/tablist": {
        code: 0,
        "data|8": [{
            "title|+1": [
                "环保一张图",
                "大气监测",
                "水污染监测",
                "固体废物监测",
                "噪声监测",
                "环保基础管理",
                "水资源管理",
                "绿色矿山"
            ]
        }],
        message: "请求成功",
        success: true
    }
};
```


* 在main.js 中引入
  
```require("@/api/mock/mockAxios");```

引入后 就会自动拦截 /tablist 接口