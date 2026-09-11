# Rust 核心：所有权与借用

所有权（Ownership）是 Rust 最独特的特性，它让 Rust 无需垃圾回收（Garbage Collector）即可保障内存安全。理解所有权、借用（Borrowing）和生命周期是掌握 Rust 的关键所在。

## 1. 所有权规则

在 Rust 中，所有权有三大核心规则：

1. **Rust 中的每一个值都有一个被称为其“所有者”（owner）的变量。**
2. **值在任一时刻有且只有一个所有者。**
3. **当所有者（变量）离开作用域，这个值将被丢弃（释放内存）。**

### 变量作用域与内存释放

```rust
{                      // s 在这里无效，它尚未声明
    let s = "hello";   // 从此处起，s 是有效的
    // 使用 s
}                      // 此作用域已结束，s 不再有效，内存被释放
```

当变量离开作用域时，Rust 会自动调用一个特殊的函数 `drop`，从而清理该变量的内存。

### 变量与数据交互的方式：移动（Move）

在 Rust 中，多个变量可以以不同的方式与同一数据交互：

```rust
let s1 = String::from("hello");
let s2 = s1;

// println!("{}, world!", s1); // 这行代码会报错！
```

为了保证内存安全，当 `s1` 赋值给 `s2` 后，Rust 认为 `s1` 不再有效。这种操作被称为**移动（Move）**，而不是浅拷贝。只有 `s2` 是有效的，当 `s2` 离开作用域时，它会释放内存。

### 变量与数据交互的方式：克隆（Clone）

如果我们确实需要深度复制 `String` 中堆上的数据，可以使用一个叫做 `clone` 的通用方法：

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2); // 正常运行
```

## 2. 引用与借用 (References and Borrowing)

如果我们想在使用值时不转移所有权，可以使用**引用**。获取变量的引用，称之为**借用（Borrowing）**。

### 不可变引用

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // 传递引用，不转移所有权
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

默认情况下，引用是不可变的，我们不能修改借用的值。

### 可变引用

如果我们需要修改借用的值，必须使用可变引用（`&mut`）：

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

**可变引用的重要限制：** 在特定作用域中的特定数据只能有一个可变引用。这避免了数据竞争（Data Races）。同时，也不能在拥有不可变引用的同时拥有可变引用。

## 3. 切片 (Slices)

切片允许你引用集合中一段连续的元素序列，而不用引用整个集合。切片是一种没有所有权的数据类型。

### 字符串切片

字符串切片是对 `String` 中一部分值的引用：

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

切片的类型签名是 `&str`。

### 数组切片

同样地，也可以对数组进行切片：

```rust
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3]; // 包含 [2, 3]
assert_eq!(slice, &[2, 3]);
```

总结：所有权和借用机制让 Rust 能够在编译时捕捉到大多数内存错误，这是 Rust 成为高性能且安全语言的基石。
