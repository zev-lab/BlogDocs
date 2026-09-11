# Three.js 核心：光影计算与相机漫游

在掌握了物体创建之后，赋予场景生机与真实感的关键就是光照与阴影。同时，为了更好地观察 3D 世界，我们通常需要加入相机漫游控制器。

## 1. 光照 (Lighting)

如果没有光，使用了 `MeshPhongMaterial` 或 `MeshStandardMaterial` 的物体将是一片漆黑。Three.js 提供了多种光源。

### 环境光 (AmbientLight)
环境光会均匀地照亮场景中的所有物体，它没有方向，不会产生阴影。通常用来提供一个基础的照明亮度。
```javascript
// 参数：颜色 (color), 强度 (intensity)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

### 平行光 (DirectionalLight)
平行光类似于太阳光，所有的光线都是平行的。它有明确的方向，通常用来模拟日光。
```javascript
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
// 设置光源位置，光线将从该点指向原点 (0,0,0)
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);
```

### 点光源 (PointLight)
点光源从一个点向所有方向发射光线，类似于一个灯泡。
```javascript
// 参数：颜色, 强度, 距离 (衰减距离), 衰减量
const pointLight = new THREE.PointLight(0xff9000, 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);
```

## 2. 阴影 (Shadows)

在 Three.js 中，为了保证性能，阴影计算默认是关闭的。要开启阴影，需要满足以下几个条件：

1. **开启渲染器的阴影映射**
```javascript
renderer.shadowMap.enabled = true;
// 可选：设置阴影类型以获得更柔和的阴影
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
```

2. **光源开启投射阴影**
```javascript
// 只有 DirectionalLight, PointLight, SpotLight 可以产生阴影
directionalLight.castShadow = true;
```

3. **物体开启投射或接收阴影**
```javascript
// 会产生阴影的物体 (例如：空中的方块)
cube.castShadow = true;

// 接收阴影的物体 (例如：地面)
const planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2; // 平放
plane.receiveShadow = true;
scene.add(plane);
```

## 3. 相机漫游控制器 (OrbitControls)

为了能够使用鼠标旋转、平移和缩放来查看场景，Three.js 官方扩展库中提供了一个非常实用的控制器 `OrbitControls`。

首先需要引入它（如果使用的是现代打包工具）：
```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
```

然后进行初始化：
```javascript
// 传入相机和渲染器的 DOM 元素
const controls = new OrbitControls(camera, renderer.domElement);

// 开启阻尼 (惯性)，使交互更平滑
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);

  // 如果开启了阻尼或自动旋转，必须在动画循环中调用 update()
  controls.update();

  renderer.render(scene, camera);
}
```

## 总结
通过合理地布置环境光、平行光等光源，并正确配置阴影映射，场景的立体感和真实度会大幅提升。配合 `OrbitControls`，用户就可以自由自在地在你的 3D 世界中探索了。
