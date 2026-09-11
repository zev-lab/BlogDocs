# Rust 基础入门与核心指南

Rust 是一门赋予每个人构建可靠且高效软件能力的系统级编程语言。它在保证内存安全的同时，提供了媲美 C/C++ 的性能。

## 1. 为什么选择 Rust？

- **高性能**：Rust 没有传统的垃圾回收机制 (GC) 和庞大的运行时，速度极快且内存利用率高，可以胜任性能要求极高的服务。
- **可靠性**：Rust 丰富的类型系统和独创的**所有权模型**在编译期就保证了内存安全和线程安全，消除了诸多常见的 bug（如空指针解引用、数据竞争等）。
- **生产力**：拥有一流的工具链（如包管理器 Cargo）、优秀的官方文档、以及业界闻名的“极其友好的编译器错误提示”。

## 2. 核心机制：所有权 (Ownership)

所有权是 Rust 最独特的特性，它让 Rust 无需垃圾回收即可保障内存安全。所有权的系统遵循以下三条核心规则：

1. Rust 中的每一个值都有一个被称为其**所有者**（owner）的变量。
2. 一个值在任一时刻**有且只有一个**所有者。
3. 当所有者（变量）离开其作用域，这个值将被自动丢弃（Drop，释放内存）。

## 3. 借用与引用 (References & Borrowing)

为了避免每次传递参数都转移所有权，Rust 提供了**引用（Reference）**机制，允许在不获取所有权的情况下使用值。这个概念在 Rust 中被称为**借用（Borrowing）**。

```rust
fn main() {
    let s1 = String::from("hello");
    
    // 传递 s1 的不可变引用，而不是所有权
    let len = calculate_length(&s1);
    
    println!("The length of '{}' is {}.", s1, len);
}

// 接收一个 String 的引用作为参数
fn calculate_length(s: &String) -> usize {
    s.len()
} // 这里 s 离开作用域，但因为它并不拥有数据，所以不会发生内存释放
```

## 4. 变量的可变性 (Mutability)

在 Rust 中，变量默认是**不可变的 (immutable)**。如果需要修改变量，必须使用 `mut` 关键字。

```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6; // 因为声明了 mut，所以允许修改
    println!("The value of x is: {}", x);
}
```

## 5. 项目管理神器：Cargo

Cargo 是 Rust 的构建系统和包管理器。绝大多数 Rustacean 使用 Cargo 来管理他们的 Rust 项目。

### 常用命令

- `cargo new <project_name>`：创建一个新的 Rust 项目。
- `cargo build`：编译项目（在 `target/debug/` 下生成可执行文件）。
- `cargo build --release`：以发布模式编译项目，进行深度优化。
- `cargo run`：一步完成编译并运行。
- `cargo check`：快速检查代码是否能通过编译（不生成可执行文件，速度快）。
- `cargo test`：运行项目中的单元测试。

## 6. Hello World 实例

```rust
// 文件路径：src/main.rs

fn main() {
    // 宏调用以惊叹号 ! 结尾
    println!("Hello, Rustacean!");
}
```

## 结语

学习 Rust 是一次重塑编程思维的旅程。它的学习曲线前期相对陡峭，因为编译器会强迫你写出更加安全、严谨的代码。但一旦迈过“和编译器作斗争”的阶段，你将获得编写零成本抽象和绝对安全代码的极致体验！
