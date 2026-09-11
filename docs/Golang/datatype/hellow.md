# Go 项目初始化与 Hello World

开始一段 Go 语言开发之旅，首先需要掌握如何搭建工程结构、初始化模块，并编写、运行你的第一个程序。

## 1. 新建 Go Module 项目

Go Module 是 Go 语言官方推荐的依赖管理机制。下面是一个标准的新建项目流程：

1. **环境准备与配置**
   检查并开启 Go Modules 支持（Go 1.16+ 默认开启）：
   ```bash
   go env -w GO111MODULE=on 
   # 在国内推荐设置代理加速下载
   go env -w GOPROXY=https://goproxy.cn,direct
   ```

2. **初始化项目**
   在你的工作目录创建一个新文件夹，进入后执行初始化命令。这里的 `myproject` 是你的模块名称（如果在 Github 开源，通常命名为 `github.com/username/project`）。
   ```bash
   mkdir myproject
   cd myproject
   go mod init myproject
   ```
   执行完毕后，目录下会生成一个 `go.mod` 文件。

3. **管理依赖**
   在编写代码的过程中，如果引入了第三方包，可以通过以下命令同步依赖：
   ```bash
   go mod tidy    # 自动下载缺少的模块，删除未使用的模块
   go get -u xxx  # 手动下载/更新指定的模块
   ```

## 2. 编写第一个 Hello World

在项目根目录下创建一个 `main.go` 文件，并输入以下代码：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

> **解析**：
> - `package main`：定义了这是一个可执行程序的入口包，而不是一个库。
> - `import "fmt"`：引入了格式化 I/O 标准库。
> - `func main()`：程序的主函数，执行起点。

运行程序：
```bash
go run main.go
# 输出：Hello, World!
```

## 3. 交叉编译 (Cross Compilation)

Go 语言非常强大的一点是：你可以在当前的操作系统上，极其简单地编译出运行在其他操作系统和架构上的程序。

假设你当前在 Windows 平台上，想要打包出一个 Linux 服务器上运行的二进制文件，只需在终端中临时设置两个环境变量，然后执行 `go build`：

### 在 Windows 的 CMD 中编译 Linux 版本：
```cmd
set GOOS=linux
set GOARCH=amd64
go build -o myapp-linux main.go
```

### 在 Windows 的 PowerShell 中编译 Linux 版本：
```powershell
$env:GOOS="linux"
$env:GOARCH="amd64"
go build -o myapp-linux main.go
```

### 在 Mac/Linux 中编译 Windows 版本：
```bash
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o myapp.exe main.go
```

编译完成后，你会得到一个无任何外部环境依赖的可执行文件，直接扔到服务器上运行即可。