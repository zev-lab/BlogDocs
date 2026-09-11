# JavaScript 基础语法

JavaScript（简称 JS）是运行在浏览器端的高级脚本语言。现代前端开发中，JS 负责处理所有的页面逻辑、数据交互、动画效果以及与用户的交互。

## 1. 引入 JavaScript

在 HTML 中引入 JS 有三种常见的方式：

### 1.1 行间事件绑定
直接写在 HTML 标签的事件属性内（不推荐，导致结构与行为耦合）：
```html
<button onclick="alert('Hello World')">点击我</button>
```

### 1.2 内部脚本 `<script>`
写在 `<script>` 标签内，通常放置在 `<body>` 标签的最末尾，以确保 DOM 树已经加载完毕。
```html
<body>
    <!-- 页面内容 -->
    <script>
        console.log("这是内部 JS 代码");
    </script>
</body>
```

### 1.3 外部脚本引入 (推荐)
将 JS 代码写在独立的 `.js` 文件中，利用 `src` 属性引入。这有利于代码的模块化和浏览器的缓存机制。
```html
<script src="./main.js"></script>
```

## 2. 基础输出与调试语句

在开发时，我们经常需要输出信息来查看代码运行结果。

```javascript
// 1. 控制台输出（最常用，用于代码调试）
console.log("Hello, World!");

// 2. 弹窗提示（会阻塞后续代码执行，用户体验较差）
alert("这是一个警告框！");

// 3. 文档写入（直接写入到 HTML 页面中）
document.write("<h1>直接渲染到页面的大标题</h1>");
```

## 3. 变量 (Variables)

变量是计算机内存中存储数据的容器。在 ES5 阶段，通常使用 `var` 来声明变量。

```javascript
var number = 20;
var message = 'Hello World';
console.log(number, message);
```
**变量命名规范**：
- 只能包含字母、数字、下划线 `_` 和 `$` 符号。
- **严禁**以数字开头。
- 不能使用系统保留字（如 `var`, `if`, `class` 等）。
- 推荐使用**小驼峰命名法**（如 `myFirstName`）。
- JS 对大小写严格敏感。

## 4. 基本数据类型

JavaScript 是一种弱类型语言，声明变量时无需指定类型，引擎会根据赋值自动推断。

### 4.1 基础数据类型 (Primitive Types)
1. **String (字符串)**: 使用单引号或双引号包裹。
   `var name = 'Alice';`
2. **Number (数字)**: 包含整数和浮点数（小数）。
   `var age = 18; var pi = 3.14;`
3. **Boolean (布尔值)**: 用于逻辑判断，只有两个值。
   `var isVip = true;`
4. **Undefined (未定义)**: 变量被声明但未赋值时的默认值。
   `var a; console.log(a); // undefined`
5. **Null (空)**: 表示主动清空一个对象变量的值。

### 4.2 引用数据类型 (Reference Types)
- **Object (对象)**: 键值对的集合。
  `var person = { name: "Bob", age: 20 };`
- 包括 Array (数组)、Function (函数) 等，本质上也都属于 Object。

可以使用 `typeof` 运算符来检测基础数据类型：
```javascript
console.log(typeof 123); // "number"
console.log(typeof "abc"); // "string"
```

## 5. 运算符

### 5.1 算数运算符
加 `+`, 减 `-`, 乘 `*`, 除 `/`, 取余 `%`。

> 特别注意 `+` 号：
> 如果 `+` 号两边都是数字，执行加法；如果只要有一边是**字符串**，`+` 号的作用就会变成**字符串拼接**。
```javascript
var x = 10;
var y = '20';
console.log(x + y); // "1020" (字符串)
console.log(x - y); // -10 (引擎会自动将字符串 '20' 转为数字进行减法运算)
```

### 5.2 赋值运算符
 `=`, `+=`, `-=`, `*=`, `/=`, `%=`
```javascript
var a = 10;
a += 5; // 等同于 a = a + 5
console.log(a); // 15
```

### 5.3 自增与自减
`++` 和 `--`
```javascript
var i = 0;
i++; // 1
```

## 6. 内置 Math 数学对象

JS 提供了 `Math` 对象用于处理常用的数学运算。

```javascript
Math.max(10, 20, 5);  // 20 获取最大值
Math.min(10, 20, 5);  // 5 获取最小值
Math.abs(-15);        // 15 取绝对值
Math.ceil(4.1);       // 5 向上取整
Math.floor(4.9);      // 4 向下取整
Math.round(4.5);      // 5 四舍五入

// 生成 [0, 1) 之间的随机小数
Math.random(); 

// 实用公式：生成 [min, max] 之间的随机整数
// Math.floor(Math.random() * (max - min + 1) + min)
```
掌握好基础语法和数据类型，是后续学习 DOM 编程、事件交互及前端框架的必要前提。