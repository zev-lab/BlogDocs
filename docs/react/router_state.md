# React 进阶：路由与全局状态管理

随着应用规模的扩大，简单的本地状态 (`useState`) 和多页面跳转已经无法满足需求。我们需要引入路由库和全局状态管理方案。

## 1. 路由管理：React Router v6

React Router 是 React 生态中最主流的路由解决方案。v6 版本带来了更简洁的 API 和更好的性能。

### 核心概念：
- `BrowserRouter`: 基于 HTML5 History API 的路由。
- `Routes` & `Route`: 用于配置路由规则。
- `Link` & `NavLink`: 用于页面间的无刷新跳转。
- `useNavigate`: 编程式导航。

### 基础配置示例：

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link> | <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 2. 全局状态管理

当多个组件需要共享数据（如用户信息、主题设置、购物车数据）时，我们需要全局状态管理。

### 方案 A：Redux Toolkit (RTK)
Redux 曾经因为繁琐的模板代码被诟病，但现代的 Redux Toolkit 极大地简化了配置过程。

**创建 Slice：**
```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

### 方案 B：Zustand
Zustand 是近年来非常流行的轻量级状态管理库，API 极简，且无需配置 Provider 包裹。

**定义 Store：**
```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increasePopulation: () => set((state) => ({ count: state.count + 1 })),
  removeAllBears: () => set({ count: 0 }),
}));

// 在组件中使用：
function Counter() {
  const count = useStore((state) => state.count);
  const increase = useStore((state) => state.increasePopulation);
  
  return <button onClick={increase}>{count}</button>;
}
```

## 总结
- 选择 **React Router v6** 管理 SPA 的页面跳转。
- 对于轻量、快速迭代的项目，首选 **Zustand**。
- 对于大型、复杂的企业级项目，依然推荐 **Redux Toolkit**。
