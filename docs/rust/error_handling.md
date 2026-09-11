# Rust 错误处理机制

Rust 非常注重代码的可靠性和安全性，其错误处理机制也反映了这一设计理念。Rust 将错误分为两大类：**不可恢复的错误（Unrecoverable Errors）**和**可恢复的错误（Recoverable Errors）**。Rust 没有异常（Exceptions）机制，而是使用 `panic!` 宏来处理不可恢复错误，使用 `Result<T, E>` 枚举来处理可恢复错误。

## 不可恢复的错误与 `panic!`

当程序遇到无法解决且继续运行会导致更严重问题的错误时（例如数组越界），就需要触发 panic。触发 panic 后，程序会打印错误信息、展开（unwind）清理栈数据，并最终退出。

```rust
fn main() {
    // 手动触发 panic
    panic!("crash and burn");
}
```

在日常开发中，当我们确信某个操作绝对不应该失败，或者失败后程序逻辑已经无法继续时，我们会让程序 panic。例如，使用 `.unwrap()` 或 `.expect()`：

```rust
use std::net::IpAddr;

// 如果解析失败，程序将直接 panic
let home: IpAddr = "127.0.0.1".parse().expect("Hardcoded IP address should be valid");
```

## 可恢复的错误与 `Result<T, E>`

大部分错误并没有严重到需要停止整个程序运行的程度。例如，尝试打开一个不存在的文件。对于这种可预期的、可恢复的错误，Rust 提供了 `Result` 枚举：

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

- `Ok(T)`：操作成功，包含成功时产生的值（类型为 `T`）。
- `Err(E)`：操作失败，包含错误信息（类型为 `E`）。

### 处理 `Result`

我们可以使用 `match` 模式匹配来处理 `Result`：

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => {
                panic!("Problem opening the file: {:?}", other_error)
            }
        },
    };
}
```

虽然 `match` 功能强大，但有时会显得冗长。Rust 为此提供了更简洁的方法，如 `unwrap_or_else`。

## 传播错误与 `?` 运算符

当编写的函数调用了可能失败的操作时，我们不仅可以在函数内部处理该错误，还可以将错误**传播（Propagate）**给调用者，让调用者决定如何处理。

Rust 提供了 `?` 运算符来简化错误传播的代码。

```rust
use std::fs::File;
use std::io::{self, Read};

// 该函数返回一个 Result
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

如果 `File::open` 成功，文件句柄将被赋给 `f`；如果失败，整个函数会提前返回，并将 `Err` 传递给调用者，其效果与隐式的 `match` 块相同。

> **注意：** `?` 运算符只能用于返回类型为 `Result`、`Option` 或其他实现了 `std::ops::Try` trait 的类型的函数中。

## 错误处理的最佳实践

1. **优先使用 `Result`**：对于预期内可能失败的操作，始终返回 `Result`。
2. **使用 `?` 简化代码**：在可能的情况下，使用 `?` 运算符在函数之间传递错误，保持核心逻辑的清晰。
3. **慎用 `unwrap` 和 `expect`**：仅在快速原型开发、测试，或你非常确定操作绝对不可能失败时（即 "不可能状态"）才使用。在生产代码中，应尽量处理错误或使用更具描述性的 `expect` 提示。
4. **自定义错误类型**：在大型项目中，定义自己的错误枚举，并为其实现 `std::error::Error` trait，可以让你统一且灵活地管理系统中的所有错误类型。
