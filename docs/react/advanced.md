# React 精通：性能优化、并发渲染与 SSR

在开发大型 React 应用时，除了实现业务逻辑，我们还需要关注页面的渲染性能和加载速度。

## 1. 性能优化技巧

### React.memo
默认情况下，只要父组件重新渲染，所有子组件都会重新渲染。`React.memo` 是一个高阶组件，如果组件的 props 没有改变，它会跳过子组件的重新渲染。

```jsx
const ChildComponent = React.memo(({ name }) => {
  console.log('Child rendered');
  return <div>{name}</div>;
});
```
*注意：务必配合 `useCallback` 和 `useMemo` 传递稳定的 props，否则 `React.memo` 会失效。*

### 代码分割 (Code Splitting)
使用 `React.lazy` 和 `Suspense` 实现组件的懒加载，减小初始打包体积。

```jsx
import React, { Suspense } from 'react';
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
```

## 2. 并发渲染 (Concurrent Features)

React 18 引入了并发特性，允许 React 在后台准备新的 UI，而不会阻塞主线程。

### startTransition
用于标记非紧急的状态更新。紧急更新（如输入框输入）优先，非紧急更新（如耗时的列表过滤）可以被中断。

```jsx
import { useState, startTransition } from 'react';

function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    // 紧急更新：保持输入框流畅
    setInputValue(e.target.value);
    
    // 非紧急更新：渲染长列表可以在后台进行
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  return <input value={inputValue} onChange={handleChange} />;
}
```

## 3. 服务器端渲染 (SSR)

SSR（Server-Side Rendering）在服务器端生成完整的 HTML 并发送给浏览器，有利于 SEO 和首屏加载速度（首字节时间 TTFB 更优）。

### React 的 SSR 支持
React 提供了 `react-dom/server` 用于在服务端将组件树渲染为 HTML 字符串或流。在 React 18 中，流式 SSR (Streaming SSR) 结合 `Suspense` 能够让页面的不同部分独立加载并逐步呈现给用户。

对于现代 SSR 应用，我们通常不再手动搭建 Node.js 服务器，而是推荐使用成熟的元框架：
- **Next.js**: 业界标准，支持 SSR, SSG (静态生成), 以及最新的 App Router 和 React Server Components (RSC)。
- **Remix**: 强调 Web 标准，对数据加载和变更提供了优秀的路由级支持。

## 结语
从 `React.memo` 到 `startTransition`，再到服务端渲染，React 提供了丰富的工具链来应对复杂的性能挑战。精通这些技术，将使你的应用如丝般顺滑。
