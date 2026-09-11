# Flutter 精通：动画系统与自绘组件

当标准组件无法满足 UI 设计的要求时，开发者需要深入 Flutter 的动画系统和自绘引擎来实现极其复杂和流畅的交互视觉效果。

## 1. 动画系统 (Animations)

Flutter 中的动画主要分为两类：补间动画（Tween Animation）和基于物理的动画。我们通常打交道最多的是显式动画和隐式动画。

### 隐式动画 (Implicit Animations)

最简单的动画实现方式是使用 Flutter 提供的 `AnimatedFoo` 系列 Widget。只需改变属性，Flutter 会自动处理过渡。

```dart
class AnimatedContainerDemo extends StatefulWidget {
  @override
  _AnimatedContainerDemoState createState() => _AnimatedContainerDemoState();
}

class _AnimatedContainerDemoState extends State<AnimatedContainerDemo> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _expanded = !_expanded;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(seconds: 1),
        curve: Curves.fastOutSlowIn,
        width: _expanded ? 200.0 : 100.0,
        height: _expanded ? 200.0 : 100.0,
        color: _expanded ? Colors.blue : Colors.red,
        alignment: _expanded ? Alignment.center : Alignment.topCenter,
        child: const Text("点击我", style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
```

### 显式动画 (Explicit Animations)

当需要精确控制动画（如暂停、反转、循环）时，需要使用 `AnimationController` 和 `Tween`。

```dart
class ExplicitAnimationDemo extends StatefulWidget {
  @override
  _ExplicitAnimationDemoState createState() => _ExplicitAnimationDemoState();
}

class _ExplicitAnimationDemoState extends State<ExplicitAnimationDemo>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this, // 必须 mixin SingleTickerProviderStateMixin
      duration: const Duration(seconds: 2),
    );

    // 使用 Tween 映射 0.0 到 1.0 的进度
    _animation = Tween<double>(begin: 0, end: 300).animate(
      CurvedAnimation(parent: _controller, curve: Curves.bounceOut),
    )..addListener(() {
        setState(() {}); // 每帧触发重绘
      });

    _controller.forward(); // 开始动画
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: _animation.value),
      child: const Icon(Icons.star, size: 50, color: Colors.orange),
    );
  }
}
```

*优化建议*：使用 `AnimatedBuilder` 可以避免因调用 `setState` 导致整个组件重绘，从而提高性能。

## 2. 自绘组件 (CustomPaint)

当无法通过组合现有 Widget 实现设计时，或者为了极高的渲染性能，可以使用 `CustomPaint` 在画布 (Canvas) 上直接绘制图形。

### 基础绘制

`CustomPaint` 需要配合一个继承自 `CustomPainter` 的画笔类来使用。

```dart
import 'package:flutter/material.dart';

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 定义画笔
    final paint = Paint()
      ..color = Colors.blue
      ..strokeWidth = 4.0
      ..style = PaintingStyle.stroke;

    // 画一条线
    canvas.drawLine(
      const Offset(0, 0),
      Offset(size.width, size.height),
      paint,
    );

    // 画一个圆
    paint.style = PaintingStyle.fill;
    paint.color = Colors.red;
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      50,
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false; // 返回 true 表示需要重绘
  }
}

class CustomPaintDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: CustomPaint(
        size: const Size(200, 200), // 画布大小
        painter: MyPainter(),
      ),
    );
  }
}
```

通过结合 `AnimationController` 和 `CustomPaint`，你可以实现极其流畅的自定义动画和图表。

## 总结

Flutter 强大的渲染引擎为你提供了无限的可能性。隐式动画快速实现交互过渡，显式动画控制复杂的动画序列，而 CustomPaint 则是在像素级别掌控 UI 表现的终极武器。
