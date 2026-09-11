# React 核心：Hooks 深度剖析

自 React 16.8 引入 Hooks 以来，函数组件拥有了类组件的全部能力，代码变得更加简洁和可复用。本文将深度剖析最常用的五个核心 Hooks。

## 1. `useState`：状态管理

`useState` 让你在函数组件中添加本地状态。

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>加 1</button>
    </div>
  );
};
```
**注意**：传递给 `setCount` 的可以是新值，也可以是基于旧值计算的函数（推荐做法）。

## 2. `useEffect`：处理副作用

副作用包括数据获取、订阅、手动修改 DOM 等。

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  
  // 清理函数（在组件卸载或下一次副作用执行前调用）
  return () => clearInterval(timer);
}, []); // 空依赖数组表示只在组件挂载和卸载时执行
```

## 3. `useRef`：引用与持久化数据

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数。它有两个主要用途：
- 访问真实的 DOM 节点。
- 在多次渲染之间持久化存储数据，且**修改它不会触发重新渲染**。

```jsx
import React, { useRef, useEffect } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // 组件挂载时自动聚焦
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
};
```

## 4. `useMemo`：缓存计算结果

用于性能优化，它会记住函数的返回值，只有当依赖项发生变化时才会重新计算。适用于昂贵的计算逻辑。

```jsx
const expensiveResult = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

## 5. `useCallback`：缓存函数

与 `useMemo` 类似，但它返回的是缓存的**函数**本身。这在将回调函数传递给经过优化的子组件（如使用 `React.memo`）时非常有用，可以避免子组件不必要的重新渲染。

```jsx
const handleItemClick = useCallback((id) => {
  console.log('Clicked item:', id);
}, []); // 如果没有依赖项改变，handleItemClick 在每次渲染时都是同一个引用
```

## 总结

熟练掌握这五个核心 Hooks（`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`）能够帮助你应对 90% 以上的日常开发场景，并写出更加优雅、高性能的代码。
