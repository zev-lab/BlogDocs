# Flutter 基础：核心布局与常用 Widget

Flutter 的一切皆为 Widget（组件）。无论是布局、结构、还是动画，都可以通过组合各种基础 Widget 来实现。在本文中，我们将深入探讨 Flutter 中的核心布局与常用 Widget。

## 1. 常用基础 Widget

### Container
`Container` 是最常用的 Widget 之一，类似于 HTML 中的 `div`，用于包裹子 Widget 并提供装饰、边距和尺寸约束。

```dart
Container(
  width: 200,
  height: 200,
  padding: const EdgeInsets.all(16.0),
  margin: const EdgeInsets.all(8.0),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(10),
    boxShadow: [
      BoxShadow(
        color: Colors.black26,
        blurRadius: 5,
        offset: Offset(2, 2),
      ),
    ],
  ),
  child: const Text(
    'Hello Container!',
    style: TextStyle(color: Colors.white, fontSize: 20),
  ),
)
```

### Text
用于显示文本，并支持丰富的样式设置。

```dart
Text(
  '这是一段带样式的文本',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blueAccent,
    letterSpacing: 2.0,
  ),
  textAlign: TextAlign.center,
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
)
```

### Image
用于显示图像，支持本地资源、网络和文件图片。

```dart
// 加载网络图片
Image.network(
  'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg',
  width: 150,
  height: 150,
  fit: BoxFit.cover,
)
```

## 2. 核心布局 Widget

Flutter 的布局模型主要依靠线性布局和层叠布局。

### Row 和 Column
`Row` 用于水平排列子 Widget，`Column` 用于垂直排列子 Widget。它们是 Flex 布局的核心。

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center, // 主轴对齐方式
  crossAxisAlignment: CrossAxisAlignment.start, // 交叉轴对齐方式
  children: <Widget>[
    const Text('第一行'),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: const [
        Icon(Icons.star, color: Colors.yellow),
        Icon(Icons.star, color: Colors.yellow),
        Icon(Icons.star, color: Colors.yellow),
      ],
    ),
    const Text('第三行'),
  ],
)
```

### Stack
`Stack` 允许子 Widget 相互重叠，类似于绝对定位。结合 `Positioned` 使用，可以精确控制子 Widget 的位置。

```dart
Stack(
  alignment: Alignment.center,
  children: <Widget>[
    Container(
      width: 200,
      height: 200,
      color: Colors.green,
    ),
    Positioned(
      bottom: 10,
      right: 10,
      child: const Text('定位文本', style: TextStyle(color: Colors.white)),
    ),
  ],
)
```

## 3. 滚动组件

### ListView
当内容超出屏幕边界时，需要使用滚动组件。`ListView` 是最基础的列表组件。

```dart
ListView.builder(
  itemCount: 50,
  itemBuilder: (BuildContext context, int index) {
    return ListTile(
      leading: const Icon(Icons.person),
      title: Text('用户 $index'),
      subtitle: const Text('这是用户的详细描述信息'),
      onTap: () {
        print('点击了 $index');
      },
    );
  },
)
```

### GridView
`GridView` 用于实现网格布局。

```dart
GridView.count(
  crossAxisCount: 2, // 每行显示的列数
  crossAxisSpacing: 10, // 列间距
  mainAxisSpacing: 10, // 行间距
  children: List.generate(20, (index) {
    return Container(
      color: Colors.blue[(index % 9 + 1) * 100],
      child: Center(
        child: Text('Item $index'),
      ),
    );
  }),
)
```

## 总结
掌握 Container、Row、Column 和 ListView 等基础 Widget 的使用，足以应付大部分的 Flutter 界面开发。在实际项目中，通过组合这些简单的 Widget，可以构建出极其复杂的页面。
