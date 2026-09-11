# React 基础：JSX、生命周期与组件化

React 是目前最流行的前端库之一。本章将带你深入理解 React 的三大基石：JSX、生命周期以及组件化思想。

## 什么是 JSX？

JSX 是 JavaScript 的语法扩展，允许我们在 JavaScript 中编写类似 HTML 的代码。它不是字符串，也不是真正的 HTML，最终会被 Babel 等工具编译为 `React.createElement()` 调用。

### JSX 核心规则：
1. **只能返回一个根元素**：如果有多个同级元素，需要使用 `<React.Fragment>` 或简写 `<></>` 包裹。
2. **所有标签必须闭合**：例如 `<img>` 必须写为 `<img />`。
3. **驼峰命名法**：HTML 属性在 JSX 中使用驼峰命名法，例如 `class` 变为 `className`，`onclick` 变为 `onClick`。

```jsx
import React from 'react';

const App = () => {
  const name = "React Developer";
  return (
    <div className="app-container">
      <h1>Hello, {name}!</h1>
      <img src="/logo.png" alt="Logo" />
    </div>
  );
};

export default App;
```

## 组件化思想

React 的核心是组件。组件让你将 UI 拆分为独立、可复用的代码片段。

### 类组件与函数组件

在早期版本中，我们通常使用**类组件（Class Components）**来管理状态，而使用**函数组件（Function Components）**作为无状态的展示组件。如今，随着 Hooks 的引入，函数组件成为了绝对的主流。

**函数组件示例：**
```jsx
const Greeting = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};
```

**Props 与 State：**
- **Props**：组件的输入，是只读的，由父组件传递给子组件。
- **State**：组件内部的状态，是可变的，通过调用特定的更新函数（如 `setState` 或 `useState` 返回的函数）来更新，并触发重新渲染。

## 组件生命周期

组件从创建到销毁会经历一系列的过程，这就是生命周期。类组件和函数组件在生命周期的表达方式上有所不同。

### 类组件的生命周期方法
1. **挂载阶段 (Mounting)**:
   - `constructor()`: 初始化 state 和绑定方法。
   - `render()`: 返回需要渲染的 React 元素。
   - `componentDidMount()`: 组件挂载到 DOM 后调用，常用于发起网络请求或订阅事件。
2. **更新阶段 (Updating)**:
   - `render()`
   - `componentDidUpdate(prevProps, prevState)`: 组件更新后调用。
3. **卸载阶段 (Unmounting)**:
   - `componentWillUnmount()`: 组件即将被卸载和销毁前调用，常用于清除定时器或取消订阅。

### 函数组件的生命周期替代方案
函数组件使用 `useEffect` Hook 来模拟生命周期：
```jsx
import React, { useEffect, useState } from 'react';

const LifecycleDemo = () => {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    console.log("组件挂载或 count 改变了:", count);

    // 相当于 componentWillUnmount
    return () => {
      console.log("清理工作...");
    };
  }, [count]); // 依赖数组控制副作用的执行时机

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

## 结语
掌握 JSX、组件划分以及生命周期是学好 React 的第一步。在下一章，我们将深入探讨 React Hooks。
