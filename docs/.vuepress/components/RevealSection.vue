<template>
  <div
    ref="elRef"
    class="reveal"
    :class="[`reveal--${direction}`, { 'is-visible': isVisible }]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue"

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale"

const props = withDefaults(
  defineProps<{
    direction?: Direction
    delay?: number
    threshold?: number
    once?: boolean
  }>(),
  {
    direction: "up",
    delay: 0,
    threshold: 0.15,
    once: true,
  }
)

const elRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!elRef.value) return

  // SSR 安全 + 浏览器支持检查
  if (typeof IntersectionObserver === "undefined") {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (props.once && observer && elRef.value) {
            observer.unobserve(elRef.value)
          }
        } else if (!props.once) {
          isVisible.value = false
        }
      })
    },
    { threshold: props.threshold, rootMargin: "0px 0px -80px 0px" }
  )

  observer.observe(elRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped lang="scss">
.reveal {
  opacity: 0;
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal--up {
  transform: translateY(40px);
}
.reveal--down {
  transform: translateY(-40px);
}
.reveal--left {
  transform: translateX(40px);
}
.reveal--right {
  transform: translateX(-40px);
}
.reveal--scale {
  transform: scale(0.92);
}
.reveal--fade {
  transform: none;
}

.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
