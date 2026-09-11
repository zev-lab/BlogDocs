# HTML5 Canvas 基础入门与实战

`<canvas>` 是 HTML5 新增的，用于通过 JavaScript 绘制 2D 甚至 3D 图形的元素。从简单的数据图表、页面背景，到复杂的网页游戏、在线画板，Canvas 都有着极其广泛的应用。

## 1. 初始化 Canvas 画布

在 HTML 中添加 `<canvas>` 标签，必须设置宽和高。
> 注意：不要使用 CSS 来设置 `<canvas>` 的宽高，否则会导致画布内部的像素点被拉伸变形。应当直接使用标签的 `width` 和 `height` 属性。

```html
<canvas id="myCanvas" width="500" height="400">
    您的浏览器不支持 Canvas，请升级浏览器。
</canvas>
```

接着，在 JS 中获取画布，并获取 **2D 渲染上下文 (Context)**：
```javascript
const cvs = document.getElementById('myCanvas');
const ctx = cvs.getContext('2d'); // 获取 2D 绘图环境，几乎所有的绘图 API 都挂载在 ctx 上
```

## 2. 基础图形绘制

### 2.1 绘制矩形
Canvas 提供了直接绘制矩形的简便方法：
```javascript
// 设置填充颜色
ctx.fillStyle = 'red';
// 绘制填充矩形: fillRect(x, y, width, height)
ctx.fillRect(50, 50, 100, 100); 

// 设置描边颜色和线宽
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;
// 绘制描边矩形: strokeRect(x, y, width, height)
ctx.strokeRect(200, 50, 100, 100);
```

### 2.2 绘制路径 (直线与多边形)
除矩形外，其他所有图形基本都是通过**路径 (Path)** 绘制出来的。
```javascript
ctx.beginPath();      // 开启一条新路径，清除之前的路径记录
ctx.moveTo(100, 200); // 移动画笔到起点 (x, y)
ctx.lineTo(200, 300); // 画一条线到点 (x, y)
ctx.lineTo(100, 400); // 再画一条线到点 (x, y)
ctx.closePath();      // 闭合路径 (自动将终点与起点连接起来)

ctx.fillStyle = 'green';
ctx.fill();           // 执行填充
```

### 2.3 绘制圆形/圆弧
使用 `arc` 方法：`arc(x, y, radius, startAngle, endAngle, anticlockwise)`
```javascript
ctx.beginPath();
// 绘制一个完整的圆：起点坐标(300, 300), 半径50, 从0弧度画到2π弧度
ctx.arc(300, 300, 50, 0, 2 * Math.PI);
ctx.fillStyle = 'orange';
ctx.fill();
```

## 3. Canvas 中的动画基础

Canvas 本身并不具备“动画”和“元素层级”的概念，画上去的东西就是一堆像素，画完了就固定了。
要想实现动画，核心原理是：**清除画布 -> 重绘 -> 清除画布 -> 重绘**，利用人眼的视觉暂留形成动画。

结合 `requestAnimationFrame` 可以实现流畅的动画：
```javascript
let x = 0;

function draw() {
    // 1. 清除整张画布
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    // 2. 绘制新一帧的内容
    ctx.beginPath();
    ctx.arc(x, 100, 30, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    
    // 3. 改变状态
    x += 2;
    if(x > cvs.width) x = 0; // 越界回到起点
    
    // 4. 请求下一帧
    requestAnimationFrame(draw);
}

draw(); // 启动动画
```

## 4. Canvas 事件交互 (拖拽实战)

由于 Canvas 里面画出来的图形不是 DOM 节点，无法像普通 DOM 那样直接通过 `onclick` 绑定事件。
要在 Canvas 中实现对图形的拖拽，原理是：
1. 监听 Canvas 元素的鼠标事件 (`mousedown`, `mousemove`, `mouseup`)。
2. 每次鼠标事件触发时，获取鼠标在 Canvas 内的坐标。
3. 利用数学几何公式，判断鼠标坐标是否落入了某个图形的边界内部。
4. 如果落在内部，则在 `mousemove` 时更新该图形的坐标参数，并不断清屏重绘。

```javascript
// 简单示例思路
cvs.addEventListener('mousedown', function(e) {
    const mouseX = e.clientX - cvs.offsetLeft;
    const mouseY = e.clientY - cvs.offsetTop;
    
    // 假设我们有一个正方形，坐标是 rect.x, rect.y，宽高是 rect.w, rect.h
    // 判断鼠标是否点击在了正方形内
    if (mouseX >= rect.x && mouseX <= rect.x + rect.w && 
        mouseY >= rect.y && mouseY <= rect.y + rect.h) {
        // ...执行拖拽逻辑，绑定 mousemove 重绘
    }
});
```

理解 Canvas 就是理解“逐帧渲染”的图形学思想，这是前端进阶游戏开发和数据可视化的重要基石。
