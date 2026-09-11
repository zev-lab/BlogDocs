# 数据库与数据源操作 (DataSource)

在 Go 语言中，与数据库交互是后端开发的核心任务之一。Go 官方提供了 `database/sql` 标准库用于处理关系型数据库，同时社区也提供了如 `GORM` 这样强大的 ORM 框架来简化开发。

## 1. 原生 `database/sql` 库操作

`database/sql` 提供了一个通用的接口，通过不同的驱动（Driver）来连接不同的数据库（如 MySQL, PostgreSQL, SQLite）。

### 安装 MySQL 驱动
```bash
go get -u github.com/go-sql-driver/mysql
```

### 基础连接与查询示例

```go
package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql" // 匿名导入，仅执行 init() 注册驱动
)

func main() {
	// DSN (Data Source Name)
	dsn := "user:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
	
	// sql.Open 不会立即建立连接，只是验证 DSN 格式并创建一个 DB 对象
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("打开数据库失败: %v", err)
	}
	defer db.Close()

	// 实际建立连接并测试
	if err = db.Ping(); err != nil {
		log.Fatalf("连接数据库失败: %v", err)
	}
	
	fmt.Println("数据库连接成功！")

	// 设置连接池参数
	db.SetMaxOpenConns(100) // 设置最大打开的连接数
	db.SetMaxIdleConns(10)  // 设置最大空闲连接数
}
```

## 2. 使用 GORM 框架操作数据库

GORM 是 Go 语言中最受欢迎的 ORM (Object Relational Mapping) 库，它全功能、对开发者友好。

### 安装 GORM 和 MySQL 驱动
```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

### GORM 连接与 CRUD 示例

```go
package main

import (
	"fmt"
	"log"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// 定义模型
type User struct {
	ID        uint           `gorm:"primaryKey"`
	Name      string         `gorm:"size:255"`
	Age       uint8
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

func main() {
	dsn := "user:password@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
	
	// 连接数据库
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("连接数据库失败: %v", err)
	}

	fmt.Println("GORM 数据库连接成功")

	// 自动迁移模式，根据结构体创建表
	db.AutoMigrate(&User{})

	// 1. 创建 (Create)
	user := User{Name: "Gopher", Age: 18}
	db.Create(&user)

	// 2. 读取 (Read)
	var readUser User
	db.First(&readUser, 1) // 根据主键查找
	db.First(&readUser, "name = ?", "Gopher") // 查找 name = Gopher 的记录

	// 3. 更新 (Update)
	db.Model(&readUser).Update("Age", 20)

	// 4. 删除 (Delete)
	// GORM 默认使用软删除（如果模型中包含 DeletedAt 字段）
	db.Delete(&readUser, 1)

	// 获取底层 *sql.DB 用于配置连接池
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("获取底层 db 失败: %v", err)
	}
	
	// 连接池配置
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)
}
```

## 3. 最佳实践

1. **复用 DB 实例**：`*sql.DB` 和 `*gorm.DB` 都是并发安全的，内部自带连接池。在应用中应该只初始化一次，全局复用，不要每次请求都重新 `Open`。
2. **配置连接池**：务必根据服务器配置设置 `SetMaxOpenConns` 和 `SetMaxIdleConns`，防止出现 `too many connections` 的错误。
3. **软删除**：在业务逻辑中，尽量使用软删除（标记删除状态）而不是物理删除，以保留数据追溯能力。GORM 提供了内置的 `gorm.DeletedAt` 支持。
4. **日志输出**：在开发环境下开启 GORM 的 SQL 打印日志功能，以便于分析和调优 SQL 语句。