# Rust 常用集合与泛型

在 Rust 中，标准库提供了多种常用的集合类型（Collections），这些集合大多分配在堆（Heap）上。与数组和元组不同，集合的大小可以在运行时动态调整。本文将介绍最常用的三种集合：`Vector`、`String` 和 `HashMap`，并简要探讨 Rust 中泛型（Generics）的基础。

## Vector 动态数组

`Vec<T>`（Vector 的缩写）允许你在单个数据结构中存储多个同类型的值。这些值在内存中是连续排列的。

### 创建与更新

```rust
// 使用宏创建一个新的 Vector 并初始化
let v1 = vec![1, 2, 3];

// 创建一个空的 Vector 并推入元素
let mut v2 = Vec::new();
v2.push(5);
v2.push(6);
v2.push(7);
```

### 读取元素

有两种方法可以引用 Vector 中的元素：通过索引或使用 `get` 方法。

```rust
let v = vec![1, 2, 3, 4, 5];

// 1. 通过索引（如果索引越界会导致 panic）
let third: &i32 = &v[2];
println!("The third element is {}", third);

// 2. 通过 get 方法（返回 Option<&T>，安全处理越界）
match v.get(2) {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}
```

## String 字符串

在 Rust 中，`String` 是一种动态可变的、UTF-8 编码的字符串类型。与字符串切片 `&str` 不同，`String` 拥有其数据的所有权并存储在堆上。

### 创建与更新

```rust
// 创建空字符串
let mut s = String::new();

// 从字面量创建字符串
let s1 = "initial contents".to_string();
let s2 = String::from("initial contents");

// 追加内容
let mut s3 = String::from("foo");
s3.push_str("bar"); // 追加字符串切片
s3.push('!');       // 追加单个字符
```

### 字符串拼接与遍历

```rust
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
// 使用 + 运算符，注意 s1 的所有权会被移动
let s3 = s1 + &s2; 

// 遍历字符串的字符
for c in "Зд".chars() {
    println!("{}", c);
}
```

## HashMap 哈希映射

`HashMap<K, V>` 存储了键值对的映射。它通过哈希函数将键（Key）映射到值（Value）。

### 创建与更新

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

// 插入键值对
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

// 更新：如果键已经存在，insert 会覆盖旧值
scores.insert(String::from("Blue"), 25);

// 只有在键不存在时才插入
scores.entry(String::from("Red")).or_insert(50);
```

### 访问 HashMap 中的值

```rust
let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0);
println!("Score: {}", score);
```

## 泛型 (Generics)

泛型允许我们编写可适用于多种类型的代码，从而避免重复。在 Rust 中，泛型在编译时会经历**单态化（Monomorphization）**，这意味着使用泛型不会带来运行时的性能损耗。

### 泛型函数

在函数签名中使用泛型类型参数 `<T>`：

```rust
fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

### 泛型结构体

我们也可以在结构体中定义泛型类型字段：

```rust
struct Point<T> {
    x: T,
    y: T,
}

struct MixedPoint<T, U> {
    x: T,
    y: U,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
    let mixed = MixedPoint { x: 5, y: 4.0 };
}
```

泛型是 Rust 中实现代码复用和类型安全的重要基石。结合集合类型，泛型使得 `Vec<T>` 能够安全高效地容纳任何指定的数据类型。
