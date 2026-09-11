# Flutter 基础入门：从环境搭建到第一个应用

Flutter 是 Google 开源的 UI 工具包，用于通过一套代码库为移动、Web 和桌面构建精美的原生编译应用程序。本指南将带你了解 Flutter 的包管理以及核心状态管理机制。

## 1. Package 包管理 (pubspec.yaml)

在 Flutter 开发中，`pubspec.yaml` 文件是项目的“控制中心”，类似于 Node.js 项目中的 `package.json`。它用于管理项目的依赖包、图片资源、字体等配置。

### 引入第三方包

要在项目中使用第三方包，你需要在 `dependencies` 节点下声明：

```yaml
dependencies:
  flutter:
    sdk: flutter
  # 引入第三方包示例
  cupertino_icons: ^1.0.2
  dio: ^5.3.3 # 网络请求库
  provider: ^6.0.5 # 状态管理库
```

### 安装依赖

声明依赖后，在终端中运行以下命令即可下载并安装这些包：

```bash
flutter pub get
```

> [!TIP]
> 如果你使用的是 Android Studio 或 VS Code 等主流 IDE，通常在保存 `pubspec.yaml` 文件时，编辑器会自动为你运行 `flutter pub get`。

## 2. Flutter 的核心概念：一切皆 Widget

在 Flutter 中，“万物皆 Widget（部件）”。不仅按钮、文本、图片是 Widget，甚至用来控制布局的内边距（Padding）、行（Row）、列（Column）也是 Widget。

Widget 主要分为两大类：**StatelessWidget（无状态）** 和 **StatefulWidget（有状态）**。

### 2.1 StatelessWidget (无状态部件)

Stateless widgets 是不可变的。这意味着它们的属性（状态）不能改变，所有的值在创建时就是最终的（`final`）。

**使用场景**：只用来展示静态数据，不需要与用户交互而发生变化的 UI，比如纯文本展示、图标、纯静态列表。

**代码示例**：

```dart
import 'package:flutter/material.dart';

class MyTextWidget extends StatelessWidget {
  final String text; // 声明为 final
  
  // 构造函数
  const MyTextWidget({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.0),
      child: Text(
        text,
        style: TextStyle(fontSize: 20, color: Colors.blue),
      ),
    );
  }
}
```

### 2.2 StatefulWidget (有状态部件)

Stateful widgets 持有的状态可能在 Widget 生命周期中发生变化，从而触发界面的重新渲染。

实现一个 Stateful Widget 必须包含两个类：
1. **继承自 StatefulWidget 的类**：该类本身仍然是不可变的，它的主要职责是创建一个 State 对象。
2. **继承自 State 的类**：这个类包含了状态逻辑，并且在 widget 的生命周期中持久存在。当调用 `setState()` 方法时，它会触发 UI 更新。

**经典案例：计数器应用**

```dart
import 'package:flutter/material.dart';

// 1. StatefulWidget 类
class CounterApp extends StatefulWidget {
  const CounterApp({Key? key}) : super(key: key);

  @override
  _CounterAppState createState() => _CounterAppState();
}

// 2. State 类，用于维护状态
class _CounterAppState extends State<CounterApp> {
  // 维护内部状态
  int _counter = 0;

  // 更新状态的方法
  void _incrementCounter() {
    setState(() {
      // 必须在 setState 中修改状态，这样才会触发 build 重新渲染
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("有状态组件演示"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center, // 垂直居中
          children: <Widget>[
            Text('你点击了按钮这么多次：'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      // 浮动按钮
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: '增加',
        child: Icon(Icons.add),
      ),
    );
  }
}
```

> [!IMPORTANT]
> **关键点解析**：在 State 类中，如果你直接修改了变量（如 `_counter++`）而没有包裹在 `setState()` 函数中，Flutter 是不会知道状态发生了改变的，界面也不会刷新。`setState` 告诉框架数据变了，需要重新执行 `build()` 方法来绘制新界面。

## 3. 总结

第一天的 Flutter 学习，需要牢记两点：
1. 会使用 `pubspec.yaml` 和 `flutter pub get` 安装外部依赖。
2. 理解无状态 `StatelessWidget`（展示型）和有状态 `StatefulWidget`（交互型）的区别，以及如何通过 `setState` 驱动界面的更新。
