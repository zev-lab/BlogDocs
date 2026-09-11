<template>
  <Teleport to="body">
    <div
      ref="glowRef"
      class="mouse-glow"
      :style="{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }"
      aria-hidden="true"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from "vue"

const position = reactive({ x: -200, y: -200 })
const target = reactive({ x: -200, y: -200 })
const glowRef = ref<HTMLElement | null>(null)

let rafId = 0
let isVisible = false

const onMove = (e: MouseEvent) => {
  target.x = e.clientX
  target.y = e.clientY
  if (!isVisible) {
    isVisible = true
  }
}

const onLeave = () => {
  isVisible = false
}

const tick = () => {
  // 阻尼跟随
  position.x += (target.x - position.x) * 0.15
  position.y += (target.y - position.y) * 0.15
  if (glowRef.value) {
    glowRef.value.style.opacity = isVisible ? "1" : "0"
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener("mousemove", onMove, { passive: true })
  document.addEventListener("mouseleave", onLeave)
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMove)
  document.removeEventListener("mouseleave", onLeave)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped lang="scss">
.mouse-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 320px;
  margin-left: -160px;
  margin-top: -160px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.10) 0%,
    rgba(6, 182, 212, 0.05) 35%,
    transparent 65%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 0.4s ease;
  will-change: transform;
}
</style>
