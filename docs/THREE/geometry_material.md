# Three.js 基础：几何体、材质与纹理

在初始化了基本的 Three.js 场景之后，我们需要往里面添加具体的物体。在 Three.js 中，一个可视化的 3D 物体通常是一个**网格 (Mesh)**。网格由两个部分组成：**几何体 (Geometry)** 和 **材质 (Material)**。

## 1. 几何体 (Geometry)

几何体定义了物体的形状。它包含了组成该物体的顶点 (Vertices)、面 (Faces) 等信息。Three.js 内置了许多常用的几何体。

### 立方缓冲几何体 (BoxGeometry)
用于创建立方体或长方体。
```javascript
// 参数：宽度 (width), 高度 (height), 深度 (depth)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
```

### 球缓冲几何体 (SphereGeometry)
用于创建球体。
```javascript
// 参数：半径 (radius), 水平分段数 (widthSegments), 垂直分段数 (heightSegments)
// 分段数越多，球体越圆滑，但性能开销越大
const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
```

## 2. 材质 (Material)

材质决定了物体的外观，比如颜色、反光程度、透明度等。Three.js 提供了多种材质，以适应不同的渲染需求。

### 基础网格材质 (MeshBasicMaterial)
这种材质不受光照影响，呈现为纯色。通常用于简单的线框、不受光物体或测试。
```javascript
const basicMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xff0000, 
  wireframe: true // 设置为线框模式
});
```

### Phong 网格材质 (MeshPhongMaterial)
这种材质考虑了光照，可以模拟具有高光的光滑表面（如塑料、金属）。必须有光源才能看见。
```javascript
const phongMaterial = new THREE.MeshPhongMaterial({ 
  color: 0x00ff00,
  shininess: 100 // 高光泽度
});
```

### 标准网格材质 (MeshStandardMaterial)
一种基于物理的渲染 (PBR) 材质，提供比 Phong 更真实的效果。是当前 3D 渲染的主流标准材质。
```javascript
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.5, // 粗糙度 (0-1)
  metalness: 0.5  // 金属度 (0-1)
});
```

## 3. 纹理 (Texture) 与 纹理加载器 (TextureLoader)

只有纯色往往是不够的，我们需要给材质贴上图片，这就需要用到纹理。`TextureLoader` 是加载图片并转化为纹理的工具。

```javascript
// 实例化纹理加载器
const textureLoader = new THREE.TextureLoader();

// 加载贴图图片
const diffuseTexture = textureLoader.load('/textures/wood_diffuse.jpg');
const normalTexture = textureLoader.load('/textures/wood_normal.jpg');

// 将纹理应用到材质的对应属性上
const texturedMaterial = new THREE.MeshStandardMaterial({
  map: diffuseTexture,          // 颜色贴图
  normalMap: normalTexture,     // 法线贴图，增加表面凹凸感
  roughness: 0.8
});

// 创建网格
const woodBox = new THREE.Mesh(boxGeometry, texturedMaterial);
scene.add(woodBox);
```

> **注意：** 图片加载是异步的。TextureLoader 会立即返回一个空的纹理对象，并在图片加载完成后自动更新。

## 总结
通过组合不同的几何体和带有丰富纹理的材质，我们可以构建出千变万化的 3D 物体。接下来，我们需要引入光照，让这些材质（尤其是基于物理的材质）真正发挥它们的魅力。
