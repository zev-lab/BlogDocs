# SCSS 精通：@mixin 混合、函数与流程控制

在掌握了 SCSS 的基础特性之后，我们将深入探讨其更强大的高级功能：`@mixin`（混合）、函数以及流程控制（条件和循环）。这些特性让 CSS 具备了类似高级编程语言的能力，能够大幅减少重复代码，构建出高度模块化和可复用的样式系统。

## 1. @mixin 混合 (Mixins)

`@mixin` 允许您定义可以在整个样式表中重复使用的样式块。与变量只能存储单个值不同，混合可以存储完整的 CSS 规则、属性甚至其他 SCSS 特性。

### 基本用法

使用 `@mixin` 定义混合，使用 `@include` 调用它。

```scss
// 定义一个清除浮动的 mixin
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.container {
  @include clearfix;
  padding: 20px;
}
```

### 传递参数

混合真正强大的地方在于它可以接受参数，这让它们变得非常灵活。

```scss
// 带参数的 mixin
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box {
  @include border-radius(10px);
}

// 带默认值的参数
@mixin flex-center($direction: row) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
}

.banner {
  @include flex-center(column);
  height: 200px;
}
```

## 2. 函数 (Functions)

虽然 mixins 输出的是 CSS 代码块（属性或规则），但 SCSS 的自定义函数主要用于计算并返回一个特定的值。这对于颜色处理、单位换算等场景非常有用。

### 定义与使用函数

使用 `@function` 定义，使用 `@return` 返回计算结果。

```scss
$base-font-size: 16px;

// 定义一个 px 转 rem 的函数
@function px-to-rem($px) {
  @return $px / $base-font-size * 1rem;
}

body {
  font-size: $base-font-size;
}

h1 {
  font-size: px-to-rem(32px); // 编译为 2rem
}

.card {
  padding: px-to-rem(24px);   // 编译为 1.5rem
}
```

### SCSS 内置函数

SCSS 还提供了大量强大的内置函数，特别是颜色操作函数，如 `lighten()`, `darken()`, `rgba()` 等。

```scss
$primary: #3498db;

.btn {
  background-color: $primary;
  
  &:hover {
    // 使用内置函数调整亮度
    background-color: darken($primary, 10%);
  }
  
  &:disabled {
    // 调整透明度
    background-color: rgba($primary, 0.5);
  }
}
```

## 3. 流程控制 (Control Directives)

SCSS 支持条件判断和循环结构，使得样式生成更加智能化和自动化。

### @if 条件判断

根据条件输出不同的样式。

```scss
$theme: dark;

body {
  @if $theme == dark {
    background-color: #333;
    color: #fff;
  } @else if $theme == light {
    background-color: #fff;
    color: #333;
  } @else {
    background-color: #f4f4f4;
  }
}
```

### @for 循环

`@for` 用于在一个已知范围内进行循环。有两种形式：
- `@for $var from <start> through <end>`（包含结束值）
- `@for $var from <start> to <end>`（不包含结束值）

```scss
// 生成一系列的辅助间距类
@for $i from 1 through 3 {
  .mt-#{$i} { // 使用 #{} 进行变量插值
    margin-top: $i * 10px;
  }
}
```
编译后：
```css
.mt-1 { margin-top: 10px; }
.mt-2 { margin-top: 20px; }
.mt-3 { margin-top: 30px; }
```

### @each 循环

`@each` 用于遍历列表（List）或映射（Map），在处理批量数据时特别有用。

#### 遍历列表
```scss
$social-colors: (
  facebook: #3b5998,
  twitter: #1da1f2,
  github: #333
);

// 遍历 map
@each $network, $color in $social-colors {
  .btn-#{$network} {
    background-color: $color;
    color: white;
  }
}
```

编译后：
```css
.btn-facebook { background-color: #3b5998; color: white; }
.btn-twitter { background-color: #1da1f2; color: white; }
.btn-github { background-color: #333; color: white; }
```

### @while 循环

`@while` 只要条件判断为 true，就会重复输出其中的样式。它常用于执行更复杂的循环逻辑。

```scss
$value: 1;

@while $value <= 4 {
  .col-#{$value} {
    width: 25% * $value;
  }
  $value: $value + 1; // 必须手动更新条件变量
}
```

## 总结

通过 `@mixin`、自定义函数以及流程控制指令，SCSS 超越了传统的声明式样式表，变成了一种强大的设计工程工具。熟练运用这些高级特性，您可以编写出结构严谨、高度复用且易于维护的 CSS 架构，极大地提升前端开发的生产力。
