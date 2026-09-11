# 开始 JavaScript 的奇妙之旅 🎮

学习 JavaScript 最有趣的方式莫过于亲自动手编写一些小游戏！通过游戏开发，你可以深刻地理解事件循环、DOM 操作、面向对象编程，甚至是基础的物理引擎和渲染逻辑。

本页面收集了一系列通过原生 JavaScript 和 Canvas 编写的经典小游戏。让我们一起开启这段奇妙的代码之旅。

## 🕹️ 在线体验项目

点击下方链接，可以直接体验这些由 JavaScript 驱动的游戏项目（请在桌面浏览器环境中打开以获得最佳体验）：

- ♟️ **[五子棋](http://118.178.180.247:90/%E4%BA%94%E5%AD%90%E6%A3%8B.html)** - 经典两人对弈，包含基础的胜负判断算法。
- 🐍 **[贪吃蛇](http://118.178.180.247:90/snake.html)** - 学习数组管理、定时器和网格坐标体系的绝佳案例。
- 🐦 **[像素鸟 (Flappy Bird)](http://118.178.180.247:90/像素鸟/像素鸟_02.html)** - 涉及重力模拟、碰撞检测及无尽滚动的背景。
- 🧟 **[植物大战僵尸](http://118.178.180.247:90/植物大战僵尸/植物大战僵尸.html)** - 复杂的面相对象编程实战，包含多实体状态管理。
- 🛒 **[考拉海购 (商城案例)](http://118.178.180.247:90/考拉海购/index.html)** - 静态页与 DOM 交互的综合电商页面练习。
- ⚔️ **[LOL 完全体](http://118.178.180.247:90/LOL完全体/pages/index/index.html)** - 综合性网页交互展示。
- ♞ **[中国象棋](http://118.178.180.247:90/象棋/index.html)** - 极具挑战的二维棋盘游戏，包含复杂的走子规则判定。
- ✈️ **[打飞机](http://118.178.180.247:89)** - 经典的纵向卷轴射击游戏，深入学习对象池与渲染循环。
- 🎨 **[纯 CSS 打造网易游戏首页](http://118.178.180.247:88)** - 挑战 CSS 布局与动画的极限，无需 JS 也能实现酷炫交互。

---

## 🛠️ 游戏开发核心技术指南

如果你想自己动手写出类似上面的小游戏，你需要掌握以下几个 JavaScript 核心概念。

### 1. 游戏主循环 (Game Loop)

所有动态游戏的心脏就是主循环。在网页中，我们使用 `requestAnimationFrame` 来实现平滑的动画循环，而不是使用 `setInterval`。

```javascript
function gameLoop() {
    // 1. 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. 更新游戏对象状态 (位置、属性、碰撞检测)
    updateGameState();
    
    // 3. 重新绘制所有对象
    drawGameObjects();
    
    // 4. 请求下一帧
    requestAnimationFrame(gameLoop);
}

// 启动游戏
requestAnimationFrame(gameLoop);
```

> [!TIP]
> `requestAnimationFrame` 会根据显示器的刷新率自动调整执行频率（通常是 60fps），并且当标签页不可见时会暂停，从而节省 CPU 资源。

### 2. 坐标系统与绘制 (Canvas API)

对于大部分 2D 网页游戏，HTML5 `<canvas>` 是最好的选择。

```html
<canvas id="gameCanvas" width="800" height="600"></canvas>
```

```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); // 获取 2D 渲染上下文

// 画一个红色的方块 (比如贪吃蛇的食物)
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 20, 20); // x, y, width, height
```

### 3. 简单的碰撞检测 (AABB)

2D 游戏中，最基础的碰撞检测是“轴对齐边界框”（AABB），常用于检测两个矩形是否重叠。

```javascript
function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// 用法示例：检测子弹是否击中敌机
if (isColliding(bullet, enemy)) {
    enemy.destroy();
}
```

### 4. 事件监听 (交互)

游戏需要响应玩家的键盘或鼠标操作。通过监听全局事件来实现：

```javascript
const keys = {};

// 键盘按下时记录状态
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

// 键盘抬起时取消状态
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// 在 update 逻辑中检查按键
function updateGameState() {
    if (keys['ArrowUp']) {
        player.y -= 5;
    }
    if (keys['ArrowDown']) {
        player.y += 5;
    }
}
```

## 结语

从一行简单的 `console.log` 开始，逐步构建出拥有精美图形和复杂逻辑的游戏，这种创造的成就感是无与伦比的。挑选上面列表中的一个游戏作为灵感，开始你的第一行游戏代码吧！
