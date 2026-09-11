<template>
  <div ref="containerRef" class="hero3d">
    <TresCanvas
      :alpha="true"
      :clear-color="'#00000000'"
      :antialias="true"
      :dpr="[1, 2]"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
    >
      <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" />

      <!-- 环境光 -->
      <TresAmbientLight :intensity="0.4" />

      <!-- 主光：紫色 -->
      <TresDirectionalLight
        :position="[5, 3, 5]"
        :intensity="2.5"
        color="#8b5cf6"
      />

      <!-- 副光：青色 -->
      <TresDirectionalLight
        :position="[-4, -2, 3]"
        :intensity="1.8"
        color="#06b6d4"
      />

      <!-- 顶部粉光 -->
      <TresPointLight
        :position="[0, 4, 2]"
        :intensity="1.5"
        color="#ec4899"
        :distance="10"
      />

      <!-- ============ 中心几何雕塑 ============ -->
      <TresGroup ref="mainGroupRef">
        <!-- 核心：金属 icosahedron -->
        <TresMesh>
          <TresIcosahedronGeometry :args="[1.4, 1]" />
          <TresMeshStandardMaterial
            color="#8b5cf6"
            :metalness="0.9"
            :roughness="0.15"
            :emissive="'#5b21b6'"
            :emissive-intensity="0.5"
          />
        </TresMesh>

        <!-- 外层线框 -->
        <TresMesh>
          <TresIcosahedronGeometry :args="[1.7, 1]" />
          <TresMeshBasicMaterial
            color="#a78bfa"
            :wireframe="true"
            :transparent="true"
            :opacity="0.35"
          />
        </TresMesh>

        <!-- 横向环 -->
        <TresMesh :rotation="[Math.PI / 2, 0, 0]">
          <TresTorusGeometry :args="[2.3, 0.025, 12, 80]" />
          <TresMeshBasicMaterial color="#06b6d4" :transparent="true" :opacity="0.7" />
        </TresMesh>

        <!-- 纵向环 -->
        <TresMesh :rotation="[0, 0, Math.PI / 2]">
          <TresTorusGeometry :args="[2.3, 0.025, 12, 80]" />
          <TresMeshBasicMaterial color="#ec4899" :transparent="true" :opacity="0.7" />
        </TresMesh>

        <!-- 倾斜环 -->
        <TresMesh :rotation="[Math.PI / 3, Math.PI / 4, 0]">
          <TresTorusGeometry :args="[2.5, 0.02, 12, 80]" />
          <TresMeshBasicMaterial color="#8b5cf6" :transparent="true" :opacity="0.5" />
        </TresMesh>

        <!-- 卫星小球 × 6 -->
        <TresMesh
          v-for="(s, i) in satellites"
          :key="i"
          :position="s.pos"
        >
          <TresSphereGeometry :args="[0.12, 16, 16]" />
          <TresMeshStandardMaterial
            :color="s.color"
            :emissive="s.color"
            :emissive-intensity="1.5"
            :metalness="0.6"
            :roughness="0.2"
          />
        </TresMesh>
      </TresGroup>

      <!-- ============ 粒子星云 ============ -->
      <TresPoints ref="particlesRef" :geometry="particleGeometry">
        <TresPointsMaterial
          size="0.06"
          color="#a78bfa"
          :transparent="true"
          :opacity="0.9"
          :size-attenuation="true"
          :depth-write="false"
        />
      </TresPoints>
    </TresCanvas>

    <!-- 渐变遮罩（让 3D 融入背景） -->
    <div class="hero3d__mask" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue"
import * as THREE from "three"
// @tresjs/core 必须显式 import（在 VuePress 环境下不会自动注册全局组件）
import { TresCanvas } from "@tresjs/core"

const containerRef = ref<HTMLElement | null>(null)
const mainGroupRef = shallowRef<any>(null)
const particlesRef = shallowRef<any>(null)

let rafId = 0
let mouseX = 0
let mouseY = 0
let targetRotX = 0
let targetRotY = 0

// 6 个卫星小球位置（绕核心旋转）
const satellites = [
  { pos: [2.5, 0, 0] as [number, number, number], color: "#8b5cf6" },
  { pos: [-2.5, 0, 0] as [number, number, number], color: "#06b6d4" },
  { pos: [0, 2.5, 0] as [number, number, number], color: "#ec4899" },
  { pos: [0, -2.5, 0] as [number, number, number], color: "#a78bfa" },
  { pos: [0, 0, 2.5] as [number, number, number], color: "#22d3ee" },
  { pos: [0, 0, -2.5] as [number, number, number], color: "#f472b6" },
]

// 粒子位置（500 个点，球壳分布）
const PARTICLE_COUNT = 500
const particlePositions = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 3 + Math.random() * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = radius * Math.cos(phi)
  }
  return arr
})()

// 预创建 BufferGeometry 实例，避免每帧创建
const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions, 3)
)

const onPointerMove = (e: PointerEvent) => {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect) return
  mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1
}

const tick = () => {
  // 鼠标目标旋转
  targetRotY = mouseX * 0.5
  targetRotX = -mouseY * 0.3

  // 应用到主组（阻尼跟随）
  if (mainGroupRef.value) {
    const g = mainGroupRef.value
    g.rotation.y += (targetRotY - g.rotation.y) * 0.05
    g.rotation.x += (targetRotX - g.rotation.x) * 0.05
    // 持续缓慢自转
    g.rotation.y += 0.002
  }

  // 粒子缓慢旋转
  if (particlesRef.value) {
    particlesRef.value.rotation.y += 0.0005
    particlesRef.value.rotation.x += 0.0002
  }

  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener("pointermove", onPointerMove, { passive: true })
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", onPointerMove)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped lang="scss">
.hero3d {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 480px;
  pointer-events: auto;
}

/* @tresjs/core 渲染的 canvas 必须撑满父容器 */
.hero3d :deep(canvas),
.hero3d :deep(.tres-canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  outline: none;
}

/* TresCanvas 自动 wrapper + @tresjs 内部 div 一律占满 */
.hero3d :deep(> *),
.hero3d :deep(> div),
.hero3d :deep(> div > div) {
  width: 100% !important;
  height: 100% !important;
}

.hero3d__mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 70% 60% at center,
    transparent 0%,
    rgba(10, 10, 15, 0.2) 70%,
    rgba(10, 10, 15, 0.6) 100%
  );
  z-index: 1;
}
</style>
