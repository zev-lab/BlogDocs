# SCSS 核心语法与进阶指南

Sass/SCSS 是最受欢迎的 CSS 预处理器之一。它在 CSS 的基础上增加了很多编程特性，如变量、嵌套、继承、混合宏（Mixin）等，极大地提高了编写和维护复杂样式表的效率。

> SCSS 是 Sass 的 3.0 版本引入的新语法，它完全兼容原生 CSS 的语法，后缀名为 `.scss`。

## 1. 变量 (Variables)

在 SCSS 中，我们可以把反复使用的颜色、字体大小等值定义为变量。变量以 `$` 符号开头。

```scss
/* 定义变量 */
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;
$base-padding: 10px;

body {
  font-family: $font-stack;
  color: $primary-color;
  padding: $base-padding;
}
```

## 2. 嵌套规则 (Nesting)

以往写 CSS 经常需要重复写父选择器，SCSS 允许我们将选择器嵌套在彼此内部，视觉层级更清晰。

```scss
nav {
  background-color: #333;
  padding: 1rem;

  ul {
    margin: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    color: white;
    text-decoration: none;
  }
}
```

### 父选择器 `&`
在嵌套中，`&` 符号代表当前的父选择器。这在编写伪类（如 `:hover`）或遵循 BEM 命名规范（连接父级修饰符）时极其有用。

```scss
.btn {
  background: blue;
  color: white;

  &:hover {
    background: darkblue; /* 编译为 .btn:hover */
  }

  /* 配合 BEM 规范 */
  &-primary {
    background: red;      /* 编译为 .btn-primary */
  }
}
```

## 3. 样式继承 `@extend`

如果在开发中，两个或多个类存在大量相同的样式，且只有少量差异。传统的做法是在 HTML 里写两个 class，而在 SCSS 中，我们可以使用 `@extend` 让一个选择器去继承另一个选择器的所有样式。

这样编译出来的 CSS 会利用**群组选择器（逗号分隔）**来合并代码，减小了最终 CSS 文件的体积。

### 继承实战示例

假设我们需要一个带左右倾斜和颜色渐变的顶部装饰条：

```scss
/* 基础通用样式 */
.top_color_bar {
  width: 30%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top_color_bar-left {
  /* 继承通用样式 */
  @extend .top_color_bar;
  
  /* 添加左倾特有样式 */
  transform: skewX(309deg);
  background: linear-gradient(to right, #051d3f, #425269);
}

.top_color_bar-right {
  /* 继承通用样式 */
  @extend .top_color_bar;
  
  /* 添加右倾特有样式 */
  transform: skewX(-309deg);
  background: linear-gradient(to left, #051d3f, #425269);
}
```

**编译后的 CSS 输出**：
注意观察 SCSS 引擎是如何将它们合并优化的。

```css
/* 被 @extend 的类被提取出来与子类形成了群组选择器 */
.top_color_bar, .top_color_bar-left, .top_color_bar-right {
  width: 30%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 子类独特的样式被单独保留 */
.top_color_bar-left {
  transform: skewX(309deg);
  background: linear-gradient(to right, #051d3f, #425269);
}

.top_color_bar-right {
  transform: skewX(-309deg);
  background: linear-gradient(to left, #051d3f, #425269);
}
```

## 4. 混合宏 `@mixin` 与 `@include`

`@extend` 适合复用**固定的整块样式**。但如果复用的样式块需要**传入不同的参数**进行计算，我们就需要使用 `@mixin`。

```scss
/* 定义一个处理圆角的混入，接收参数 $radius */
@mixin border-radius($radius: 5px) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box {
  /* 使用 @include 调用并传参 */
  @include border-radius(10px);
  background-color: #eee;
}
```

掌握好 `&` 选择器、`@extend` 继承以及 `@mixin`，能够让你彻底告别 CSS 中痛苦的复制粘贴。