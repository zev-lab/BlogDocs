# SCSS 基础：变量、嵌套与父选择器

SCSS (Sassy CSS) 是一种 CSS 预处理器，它为 CSS 增加了编程特性，使得样式表的编写更加高效、易于维护和扩展。本文将带您深入了解 SCSS 的三大基础特性：变量、嵌套以及父选择器。

## 1. 变量 (Variables)

变量是 SCSS 中最常用的特性之一。它允许您在整个样式表中重复使用某些值（如颜色、字体、尺寸等），从而保持设计的一致性，并在需要修改时只需更改一处即可。

### 声明与使用

在 SCSS 中，变量以 `$` 符号开头。

```scss
// 声明变量
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;
$base-padding: 15px;

// 使用变量
body {
  font: 100% $font-stack;
  color: #333;
}

.button {
  background-color: $primary-color;
  padding: $base-padding;
  border: none;
  color: white;
}
```

编译后的 CSS：
```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}

.button {
  background-color: #3498db;
  padding: 15px;
  border: none;
  color: white;
}
```

### 变量的作用域

变量可以是局部的，也可以是全局的。在选择器内部声明的变量通常只在该选择器内有效。如果需要在全局范围内覆盖或声明变量，可以使用 `!global` 标志。

```scss
$text-color: #333; // 全局变量

.container {
  $text-color: #555 !global; // 修改全局变量
  $local-color: #999;        // 局部变量
  color: $text-color;
}

.sidebar {
  color: $text-color; // 使用的是修改后的 #555
  // background-color: $local-color; // 错误：无法访问局部变量
}
```

## 2. 嵌套 (Nesting)

传统的 CSS 编写通常需要重复书写父选择器，这在处理复杂的组件时会导致代码冗长且难以阅读。SCSS 允许像 HTML 一样嵌套 CSS 选择器，使得代码结构更加清晰。

### 基本嵌套

```scss
nav {
  background-color: #f8f9fa;
  padding: 1rem;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    text-decoration: none;
    color: #007bff;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
```

### 属性嵌套

除了选择器嵌套，SCSS 还支持属性嵌套，常用于带有相同前缀的属性，如 `font-*`、`margin-*` 等。

```scss
.text-block {
  font: {
    family: sans-serif;
    size: 1.2rem;
    weight: bold;
  }
  margin: {
    top: 10px;
    bottom: 20px;
  }
}
```

编译后的 CSS：
```css
.text-block {
  font-family: sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
}
```

## 3. 父选择器 `&`

在使用嵌套时，有时我们需要引用父选择器本身，特别是在编写伪类（如 `:hover`, `:active`）或 BEM 命名规范中的修饰符时。这时就可以使用 `&` 符号。

### 处理伪类和伪元素

```scss
.btn {
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &::before {
    content: "★";
    margin-right: 5px;
  }
}
```

### 结合 BEM 命名法

`&` 可以在字符串拼接中大显身手，非常适合 BEM（Block Element Modifier）架构。

```scss
.card {
  padding: 20px;
  border: 1px solid #ccc;
  
  // 元素
  &__title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  &__content {
    font-size: 1rem;
    color: #666;
  }
  
  // 修饰符
  &--featured {
    border-color: #f1c40f;
    background-color: #fffdf0;
  }
}
```

编译后的 CSS：
```css
.card { padding: 20px; border: 1px solid #ccc; }
.card__title { font-size: 1.5rem; margin-bottom: 10px; }
.card__content { font-size: 1rem; color: #666; }
.card--featured { border-color: #f1c40f; background-color: #fffdf0; }
```

## 总结

掌握 SCSS 的变量、嵌套和父选择器 `&`，能够极大地提升您的 CSS 开发效率。变量让样式统一并易于管理，嵌套让代码结构层次分明，而 `&` 则为您提供了编写复杂选择器和应用 BEM 等架构的强大工具。在下一篇教程中，我们将探讨更高级的特性：Mixin、函数以及流程控制。
