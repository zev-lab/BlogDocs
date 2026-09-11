# Three.js 精通：着色器 Shader 与后期特效

当 Three.js 内置的材质无法满足复杂的视觉需求时，我们就需要深入底层，编写自定义的着色器（Shader），或者通过后期处理（Post-Processing）来增加全屏特效。

## 1. 认识 WebGL Shader

着色器是运行在 GPU 上的小程序，使用 GLSL（OpenGL Shading Language）编写。在 Three.js 中，最常用的自定义着色器材质是 `ShaderMaterial` 和 `RawShaderMaterial`。

着色器主要分为两部分：
- **顶点着色器 (Vertex Shader)**：处理每个顶点的位置、法线等。主要负责控制物体的形态和变形。
- **片元着色器 (Fragment Shader)**：处理光栅化后的每个像素。主要负责控制颜色、光照和纹理计算。

### 基本示例：ShaderMaterial

```javascript
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv; // 将 UV 坐标传递给片元着色器
    // 基础的顶点位置计算
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor; // 从外部传入的变量
  uniform float uTime;

  void main() {
    // 简单的颜色渐变和时间动画
    vec3 color = vec3(vUv.x, vUv.y, sin(uTime) * 0.5 + 0.5) * uColor;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// 创建材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uColor: { value: new THREE.Color(0xff0000) },
    uTime: { value: 0.0 }
  }
});

const mesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), shaderMaterial);
scene.add(mesh);
```

在渲染循环中更新 uniform 变量：
```javascript
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  
  // 更新传入 Shader 的时间变量
  shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  
  renderer.render(scene, camera);
}
```

## 2. 后期特效处理 (EffectComposer)

后期处理是在整个场景渲染出图像后，对这幅 2D 图像进行“滤镜”操作，如泛光(Bloom)、景深(DOF)、抗锯齿(SMAA)、颜色校正等。

Three.js 提供了 `EffectComposer` 来管理和串联各种渲染通道（Pass）。

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// 1. 初始化 Composer
const composer = new EffectComposer(renderer);

// 2. 添加基础渲染通道 (将场景正常渲染出来)
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 3. 添加特效通道：辉光 (Bloom)
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,  // 强度 strength
  0.4,  // 半径 radius
  0.85  // 阈值 threshold
);
composer.addPass(bloomPass);

// 4. 修改渲染循环
function animate() {
  requestAnimationFrame(animate);
  // 不再使用 renderer.render(scene, camera)
  // 改为使用 composer.render()
  composer.render();
}
```

## 总结
着色器编程赋予了开发者直接与 GPU 沟通的能力，是实现水面波动、粒子特效、复杂材质的关键。而 `EffectComposer` 则像是在 3D 渲染流程最后加了一层 Photoshop，极大地增强了最终画面的视觉冲击力。掌握这两者，标志着你已经踏入了 Three.js 的高级领域。
