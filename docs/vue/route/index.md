# Vue Router 基础与进阶指南

Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

## 安装与基础使用

### 1. 安装

在项目中安装 Vue Router：

```bash
npm install vue-router@4
```

### 2. 初始化与配置

创建一个路由配置文件 `router/index.js`：

```js
import { createRouter, createWebHistory } from 'vue-router'

// 1. 定义路由组件
import Home from '../views/Home.vue'
import About from '../views/About.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现
  history: createWebHistory(),
  routes,
})

export default router
```

在 `main.js` 中使用路由：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

## 动态路由匹配

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。

```js
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
]
```

在 User 组件中，可以这样获取参数：

```js
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    console.log(route.params.id)
  }
}
```

## 嵌套路由

实际生活中的应用界面，通常由多层嵌套的组件组合而成。

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

## 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

```js
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    const goToAbout = () => {
      // 字符串路径
      router.push('/about')
      
      // 带有路径的对象
      router.push({ path: '/about' })
      
      // 命名的路由，并加上参数，让路由建立 url
      router.push({ name: 'user', params: { username: 'eduardo' } })
      
      // 带查询参数，结果是 /register?plan=private
      router.push({ path: '/register', query: { plan: 'private' } })
    }

    return { goToAbout }
  }
}
```

## 导航守卫

Vue Router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

### 全局前置守卫

```js
const router = createRouter({ ... })

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

### 路由独享的守卫

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```
