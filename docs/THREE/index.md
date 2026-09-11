# Three.js 入门：三大件与场景初始化

Three.js 是一个基于 WebGL 的 JavaScript 3D 库，它封装了底层的 WebGL 接口，让开发者能够以更简单、直观的方式在网页上创建和显示 3D 图形。

在 Three.js 中，要渲染出一个基本的 3D 画面，离不开三个核心组件，我们称之为“三大件”：**场景 (Scene)**、**相机 (Camera)** 和 **渲染器 (Renderer)**。

## 1. 场景 (Scene)

场景是所有物体的容器。你可以把它想象成一个舞台，所有的 3D 物体（网格、光源、摄像机等）都需要被添加到这个舞台上才能被看到。

```javascript
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 还可以设置场景的背景颜色
scene.background = new THREE.Color(0xeeeeee);
```

## 2. 相机 (Camera)

相机决定了我们能够看到场景中的哪一部分。Three.js 提供了几种不同的相机，最常用的是**透视相机 (PerspectiveCamera)**，它模拟人眼的视觉效果，具有近大远小的特征。

```javascript
// 透视相机参数：视野角度 (FOV), 长宽比 (Aspect Ratio), 近截面 (Near), 远截面 (Far)
const camera = new THREE.PerspectiveCamera(
  75,                                     // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1,                                    // near
  1000                                    // far
);

// 将相机向后移动，以便能看清场景中心的物体
camera.position.z = 5;
```

## 3. 渲染器 (Renderer)

渲染器负责将相机看到的三维场景绘制到 HTML 的 `<canvas>` 元素上。最常用的是 `WebGLRenderer`。

```javascript
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 开启抗锯齿，使边缘更平滑
});

// 设置渲染区域的尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 将渲染器的 canvas 元素添加到 HTML 的 body 中
document.body.appendChild(renderer.domElement);
```

## 4. 组合起来：场景初始化与渲染循环

有了三大件，我们还需要一个机制来持续不断地绘制画面。通常我们使用 `requestAnimationFrame` 来创建一个渲染循环。

```javascript
// 添加一个简单的测试物体：立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 动画渲染循环
function animate() {
  requestAnimationFrame(animate);

  // 让立方体旋转起来
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 执行渲染操作
  renderer.render(scene, camera);
}

// 开始循环
animate();
```

## 总结
要构建一个基本的 Three.js 应用，第一步永远是初始化场景、相机和渲染器。将物体添加到场景中，设置好相机的位置，然后启动渲染循环，就能在浏览器中看到属于你的 3D 世界了。
