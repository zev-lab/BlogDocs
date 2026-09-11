# Go 语言基础数据类型

Go 语言是一种强类型的静态编译语言，它提供了丰富且简洁的基础数据类型。所有的变量在声明时都必须确定其类型（或由编译器推导）。

## 1. 布尔型 (Boolean)

布尔型的值只能是 `true` 或 `false`。
```go
var isActive bool = true
isLogin := false // 类型推导
```
> **注意**：Go 语言中布尔类型无法参与数值运算，也无法与其他类型（如 `int`）进行强制类型转换。

## 2. 数字类型 (Numeric)

Go 语言支持整型和浮点型，并且提供了不同位数的类型以满足精确的内存控制。

### 2.1 整型 (Integer)
- **有符号整型**：`int8`, `int16`, `int32`, `int64`
- **无符号整型**：`uint8`, `uint16`, `uint32`, `uint64`
- **架构相关整型**：`int`, `uint` (在 32 位系统上是 32 位，在 64 位系统上是 64 位，这是最常用的整型)
- **特殊整型**：
  - `byte`：`uint8` 的别名，通常用于表示二进制数据。
  - `rune`：`int32` 的别名，用于表示一个 Unicode 码点（处理中文等宽字符时非常有用）。
  - `uintptr`：无符号整型，用于存放指针，大小与系统架构有关。

```go
var a int = 10
var b byte = 'A' // 实际上是 65
var c rune = '中'
```

### 2.2 浮点型 (Floating-point)
Go 提供两种精度的浮点数：`float32` 和 `float64`。
- `float32`：单精度，通常提供约 6 个十进制位的精度。
- `float64`：双精度，通常提供约 15 个十进制位的精度（默认浮点类型）。

```go
pi := 3.1415926 // 默认为 float64
var e float32 = 2.71828
```

### 2.3 复数 (Complex)
Go 语言原生支持复数，分为 `complex64` 和 `complex128`。
```go
var c1 complex64 = 1 + 2i
c2 := complex(3, 4) // 默认为 complex128
```

## 3. 字符串 (String)

Go 的字符串是 UTF-8 编码的不可变字节序列。
```go
var str1 string = "Hello"
str2 := "世界"

// 多行字符串使用反引号
multiline := `
第一行
第二行
`
```
- 可以使用 `len(str)` 获取字符串的**字节数**（注意：不是字符数）。
- 要获取中文字符的数量，需要转换为 `[]rune`：`len([]rune(str2))`。

## 4. 类型转换

Go 语言中没有隐式类型转换，所有的类型转换都必须显式声明。
```go
var a int = 10
var b float64 = float64(a) // 显式转换

// 字符串和字节数组转换
str := "hello"
bytes := []byte(str)
newStr := string(bytes)
```

## 5. 零值 (Zero Value)

在 Go 中，如果声明了一个变量但未初始化，它会被赋予该类型的**零值**：
- 数值类型（整型、浮点型）：`0`
- 布尔型：`false`
- 字符串：`""`（空字符串）
- 指针、切片、映射、通道、函数、接口：`nil`