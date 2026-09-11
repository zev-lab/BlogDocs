# Flutter 核心：状态管理演进

在 Flutter 应用开发中，状态管理（State Management）是不可避免且至关重要的话题。随着应用的复杂度增加，从简单的内置状态管理过渡到复杂的全局状态管理框架是必经之路。

## 1. 简单的状态管理：`setState`

在单个页面或者层级较浅的组件树中，Flutter 原生的 `StatefulWidget` 和 `setState` 是最简单、最直接的解决方案。

```dart
class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('setState 示例')),
      body: Center(
        child: Text('点击次数: $_counter', style: const TextStyle(fontSize: 24)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        child: const Icon(Icons.add),
      ),
    );
  }
}
```
**优点**：简单直观，无学习成本。
**缺点**：当状态需要在多个不相关的页面间共享，或者组件树嵌套过深时，会导致代码难以维护，且频繁触发整棵子树的 rebuild，影响性能。

## 2. 社区标准：Provider

`Provider` 曾经是 Flutter 官方推荐的状态管理库。它基于 `InheritedWidget` 进行封装，使得跨组件的数据传递和共享变得非常容易。

### 基础用法

首先，定义一个状态类，并混入 `ChangeNotifier`：

```dart
import 'package:flutter/foundation.dart';

class CounterModel with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners(); // 通知监听者更新
  }
}
```

在应用的顶层提供该状态：

```dart
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: const MyApp(),
    ),
  );
}
```

在子组件中消费状态：

```dart
class CounterDisplay extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 监听状态变化
    final counter = Provider.of<CounterModel>(context);
    
    return Text('数量: ${counter.count}');
  }
}
```
或者使用 `Consumer`：
```dart
Consumer<CounterModel>(
  builder: (context, counter, child) => Text('数量: ${counter.count}'),
)
```

## 3. 下一代状态管理：Riverpod

`Riverpod` 是 `Provider` 作者重写的新一代状态管理库，旨在解决 Provider 的一些痛点（如依赖 Flutter context、不能存在多个同类型 provider 等）。它更安全、更易测试。

### 基础用法

首先定义一个 Provider：

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// 创建一个管理整数状态的 StateProvider
final counterProvider = StateProvider<int>((ref) => 0);
```

用 `ProviderScope` 包裹应用顶层：

```dart
void main() {
  runApp(const ProviderScope(child: MyApp()));
}
```

在组件中读取和修改状态（推荐使用 `ConsumerWidget`）：

```dart
class RiverpodCounter extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // 监听状态
    final count = ref.watch(counterProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Riverpod 示例')),
      body: Center(child: Text('数值: $count')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // 修改状态
          ref.read(counterProvider.notifier).state++;
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 总结

- **`setState`**：适用于简单的局部状态。
- **`Provider`**：经典的全局状态管理方案，生态成熟。
- **`Riverpod`**：现代化的状态管理库，编译期安全，解耦 Context，是当前开发新 Flutter 项目的首选。
