<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <div v-for="r in 2" :key="r" class="marquee__row">
        <span
          v-for="(item, i) in items"
          :key="`${r}-${i}`"
          class="marquee__item"
        >
          <span class="dot" />
          <span class="label">{{ item }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<style scoped lang="scss">
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-slide 40s linear infinite;
}

.marquee__row {
  display: flex;
  gap: 56px;
  padding-right: 56px;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
}

@keyframes marquee-slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
