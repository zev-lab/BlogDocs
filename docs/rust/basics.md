# Rust 基础：变量、类型与控制流

在这一章，我们将深入了解 Rust 的核心基础语法，包括变量的声明、基本数据类型、函数定义以及控制流结构。

## 变量与可变性

在 Rust 中，变量默认是**不可变（immutable）**的。这是 Rust 推动你编写安全代码的众多方式之一。当一个变量被绑定到一个值后，你就不能再修改它的值了。

使用 `let` 关键字声明变量：

```rust
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    // x = 6; // 编译错误！不能对不可变变量二次赋值
}
```

如果你希望变量是可变的，可以在变量名前加上 `mut` 关键字：

```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

### 隐藏（Shadowing）

Rust 允许声明一个与之前变量同名的新变量，新变量会“隐藏”之前的变量。这和 `mut` 不同，因为我们可以通过重新使用 `let` 关键字来改变变量的类型。

```rust
fn main() {
    let spaces = "   "; // 字符串类型
    let spaces = spaces.len(); // 数字类型
    println!("Spaces length: {}", spaces);
}
```

## 数据类型

Rust 是一门静态类型（statically typed）语言，这意味着它必须在编译时知道所有变量的类型。

### 标量类型（Scalar Types）

标量类型代表一个单一的值。Rust 有四种基本的标量类型：整型、浮点型、布尔型和字符型。

- **整型（Integer）**：如 `i32`（默认，32位有符号），`u64`，`isize` 等。
- **浮点型（Floating-Point）**：`f32` 和 `f64`（默认，精度更高）。
- **布尔型（Boolean）**：`bool`，值为 `true` 或 `false`。
- **字符型（Character）**：`char`，大小为 4 个字节，代表了一个 Unicode 标量值。使用单引号指定：`let c = 'z';`。

### 复合类型（Compound Types）

复合类型可以将多个值组合成一个类型。Rust 有两个基本的复合类型：元组（tuple）和数组（array）。

- **元组（Tuple）**：长度固定，可以包含不同类型的元素。
  ```rust
  let tup: (i32, f64, u8) = (500, 6.4, 1);
  let (x, y, z) = tup; // 解构
  println!("The value of y is: {}", y);
  ```
- **数组（Array）**：长度固定，所有元素必须是相同类型。分配在栈上。
  ```rust
  let a = [1, 2, 3, 4, 5];
  let first = a[0];
  ```

## 函数

在 Rust 中，函数使用 `fn` 关键字定义。Rust 代码中的函数和变量名约定使用蛇形命名法（snake case，全小写，下划线分隔）。

```rust
fn main() {
    println!("Hello, world!");
    another_function(5);
}

fn another_function(x: i32) {
    println!("The value of x is: {}", x);
}
```

如果函数有返回值，必须在箭头 `->` 后声明它的类型。函数的返回值等同于函数体最后一个表达式的值，注意表达式末尾不要加分号（加了分号就变成了语句，不再返回值）。

```rust
fn five() -> i32 {
    5 // 这是一个表达式，返回 5
}
```

## 控制流

### if 表达式

`if` 表达式允许根据条件执行不同的代码分支。条件必须是 `bool` 类型。

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

因为 `if` 是一个表达式，我们可以在 `let` 语句的右侧使用它：

```rust
let condition = true;
let number = if condition { 5 } else { 6 };
```

### 循环（Loops）

Rust 提供了三种循环：`loop`、`while` 和 `for`。

- **loop**：无限循环，直到显式使用 `break` 退出。
  ```rust
  let mut count = 0;
  loop {
      count += 1;
      if count == 3 {
          break;
      }
  }
  ```
- **while**：当条件为真时执行循环。
  ```rust
  let mut number = 3;
  while number != 0 {
      println!("{}!", number);
      number -= 1;
  }
  ```
- **for**：遍历集合（如数组）非常安全且高效。
  ```rust
  let a = [10, 20, 30, 40, 50];
  for element in a {
      println!("the value is: {}", element);
  }

  // 遍历范围
  for number in (1..4).rev() {
      println!("{}!", number);
  }
  ```

掌握了这些基础知识，你就可以开始用 Rust 编写有意义的程序了！
