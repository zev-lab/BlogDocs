# Rust 进阶：多线程与并发

Rust 的核心优势之一在于其所有权和类型系统能够在编译期捕获大多数并发错误，这被称为“无畏并发”（Fearless Concurrency）。本文将介绍 Rust 中实现并发的几种主要方式：多线程、消息传递、共享状态以及底层的 `Send` 和 `Sync` Trait。

## 1. 使用线程同时运行代码

在大多数现代操作系统中，执行程序的代码运行在**进程**中，而操作系统则使用**线程**来同时运行进程中的多个部分。
在 Rust 中，你可以使用 `std::thread::spawn` 创建新线程：

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("来自生成线程的数字: {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("来自主线程的数字: {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    // 等待生成的线程结束
    handle.join().unwrap();
}
```

使用 `move` 闭包，通常可以将外部环境的数据所有权转移到线程中：

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("这是我们转移的向量: {:?}", v);
    });

    handle.join().unwrap();
}
```

## 2. 消息传递 (Message Passing)

Rust 标准库提供了一种消息传递并发机制：通道（Channel）。这符合 Go 语言中的经典名言：“不要通过共享内存来通信，而要通过通信来共享内存。”
Rust 使用 `std::sync::mpsc` (Multiple Producer, Single Consumer) 来实现通道。

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
        // val 的所有权已被转移，这里无法再使用 val
    });

    let received = rx.recv().unwrap();
    println!("收到: {}", received);
}
```

你可以克隆发送者（tx）以创建多个生产者：

```rust
let tx1 = tx.clone();
```

## 3. 共享状态并发 (Shared-State Concurrency)

除了消息传递，Rust 也支持通过共享内存来进行并发。为了保证安全，Rust 使用 `Mutex`（互斥锁）和 `Arc`（原子引用计数）。

### Mutex
`Mutex<T>` 提供内部互斥，确保同一时间只有一个线程能访问数据。

### Arc
在多线程中，我们需要多个所有者，因此不能使用 `Rc<T>`，而必须使用线程安全的 `Arc<T>`（Atomic Reference Counted）。

结合使用 `Arc` 和 `Mutex`：

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("结果: {}", *counter.lock().unwrap());
}
```

## 4. Send 与 Sync Traits

Rust 的并发安全性最终依赖于两个标记 Trait（Marker Traits），它们位于 `std::marker` 模块中：

- **`Send`**：表明类型的所有权可以在线程间安全地转移。绝大多数 Rust 类型都是 `Send` 的，但例如 `Rc<T>` 就不是。
- **`Sync`**：表明类型的引用（`&T`）可以安全地在多个线程之间共享。也就是说，如果 `&T` 是 `Send` 的，那么 `T` 就是 `Sync` 的。`Mutex<T>` 是 `Sync` 的（只要 `T` 是 `Send`），而 `RefCell<T>` 不是。

一般情况下，你不需要手动实现 `Send` 和 `Sync`，编译器会自动为完全由 `Send`/`Sync` 类型组成的复合类型实现它们。手动实现它们需要使用 `unsafe` 代码。
