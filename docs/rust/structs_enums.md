# Rust 结构体、枚举与模式匹配

在 Rust 中，结构体（Structs）和枚举（Enums）是构建自定义类型和组织代码的重要工具，而模式匹配（Pattern Matching）则是处理这些类型最强大的方式。

## 1. 结构体 (Structs)

结构体允许我们将多个相关的值打包在一起，形成一个有意义的组合。

### 定义与实例化结构体

```rust
// 定义结构体
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    // 实例化结构体
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    // 修改字段（实例必须是可变的）
    user1.email = String::from("anotheremail@example.com");
}
```

### 结构体的方法 (Methods)

方法与函数类似，但它们定义在结构体（或枚举、特征对象）的上下文中，并且它们的第一个参数总是 `self`，代表调用该方法的实例。

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 方法
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // 关联函数 (不包含 self 参数，常用于构造器)
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("The area of the rectangle is {} square pixels.", rect1.area());
    
    let sq = Rectangle::square(10);
}
```

## 2. 枚举 (Enums)

枚举允许你通过列举其所有可能的值来定义一个类型。

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
```

### Option 枚举

Rust 没有空值（Null）的概念。为了处理值可能不存在的情况，Rust 提供了标准库中的 `Option<T>` 枚举：

```rust
enum Option<T> {
    None,
    Some(T),
}
```

使用 `Option`：

```rust
let some_number = Some(5);
let some_string = Some("a string");
let absent_number: Option<i32> = None;
```

## 3. 模式匹配：`match` 控制流

`match` 是 Rust 中极其强大的控制流运算符，它允许我们将一个值与一系列模式进行比较，并根据匹配的模式执行代码。

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

### 匹配 `Option<T>`

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

**注意：** `match` 匹配必须是穷尽的（Exhaustive），你必须处理所有可能的情况，或者使用 `_` 通配符。

## 4. `if let` 简洁控制流

如果你只想处理 `match` 中的某一种模式，而忽略其他所有模式，使用 `if let` 会更加简洁：

```rust
let config_max = Some(3u8);

// 使用 match
match config_max {
    Some(max) => println!("The maximum is configured to be {}", max),
    _ => (),
}

// 使用 if let (等价且更简洁)
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}
```
