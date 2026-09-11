# Rust 入门与环境搭建

欢迎来到“Rust 从入门到精通”系列教程！Rust 是一门赋予每个人构建可靠且高效软件能力的编程语言。

## Rust 简介与历史

Rust 的设计目标是提供内存安全、高并发以及出色的性能，同时避免传统系统级语言（如 C 和 C++）中常见的内存溢出和空指针等安全问题。Rust 最初由 Mozilla 的员工 Graydon Hoare 于 2006 年作为一个个人项目开始研发。2009 年，Mozilla 开始赞助该项目，并在 2015 年发布了 Rust 1.0 的稳定版本。

Rust 的核心优势：
- **无数据竞争**：通过所有权（Ownership）机制在编译期保证内存和线程安全。
- **高性能**：没有垃圾回收器（GC）和运行时（Runtime），可以直接调用 C 代码。
- **强大的工具链**：Cargo 提供了包管理、构建、测试和文档生成等一站式服务。

## 安装 Rust

在绝大多数主流操作系统上，安装 Rust 最简单的方法是使用 `rustup`。`rustup` 是 Rust 的安装和版本管理工具。

### Linux 或 macOS

打开终端并运行以下命令：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Windows

访问 [Rust 官方网站](https://www.rust-lang.org/tools/install) 并下载 `rustup-init.exe`。运行该程序并按照屏幕上的提示进行操作。如果遇到依赖问题，可能需要安装 [Visual Studio C++ Build tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)。

### 验证安装

安装完成后，可以在终端或命令提示符中输入以下命令来验证是否安装成功：

```bash
rustc --version
cargo --version
```

## Cargo 简介

Cargo 是 Rust 的构建系统和包管理器。它能够：
- 构建你的代码。
- 下载代码依赖的库（crate）。
- 编译这些库。

## Hello World！

让我们使用 Cargo 来创建我们的第一个 Rust 程序。

1. 打开终端，进入你的项目目录。
2. 运行以下命令创建一个新项目：

```bash
cargo new hello_rust
cd hello_rust
```

3. 查看生成的文件。`Cargo.toml` 是项目的配置文件。`src/main.rs` 是源代码文件。

打开 `src/main.rs`，你会看到 Cargo 已经为我们生成了一段代码：

```rust
fn main() {
    println!("Hello, world!");
}
```

4. 运行程序！使用以下命令编译并运行：

```bash
cargo run
```

你将在控制台看到输出：`Hello, world!`。

恭喜你！你已经成功迈出了学习 Rust 的第一步！
