<template>
  <Teleport to="body">
    <div class="background-orbs" aria-hidden="true">
      <!-- 主光斑：6 个，分布在不同象限 -->
      <div
        v-for="(orb, i) in orbs"
        :key="`orb-${i}`"
        class="orb"
        :style="orb.style"
      />

      <!-- 光柱：hero 区域两条竖向光束 -->
      <div class="light-beam light-beam--left" />
      <div class="light-beam light-beam--right" />

      <!-- 顶部到底部的渐变光带 -->
      <div class="aurora" />

      <!-- 网格底纹 -->
      <div class="grid-overlay" />

      <!-- 扫描线 -->
      <div class="scanline" />

      <!-- 噪点（SVG fractal noise） -->
      <svg class="noise" aria-hidden="true">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      <!-- 暗角 -->
      <div class="vignette" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
type Orb = { style: Record<string, string> }

const orbs: Orb[] = [
  {
    style: {
      top: "-12%",
      left: "8%",
      width: "640px",
      height: "640px",
      background:
        "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.85), rgba(139,92,246,0) 65%)",
      animationDelay: "0s",
      animationDuration: "22s",
    },
  },
  {
    style: {
      top: "8%",
      right: "-6%",
      width: "560px",
      height: "560px",
      background:
        "radial-gradient(circle at 60% 40%, rgba(6,182,212,0.75), rgba(6,182,212,0) 65%)",
      animationDelay: "-6s",
      animationDuration: "26s",
    },
  },
  {
    style: {
      top: "45%",
      left: "-10%",
      width: "520px",
      height: "520px",
      background:
        "radial-gradient(circle at 40% 60%, rgba(99,102,241,0.7), rgba(99,102,241,0) 65%)",
      animationDelay: "-3s",
      animationDuration: "24s",
    },
  },
  {
    style: {
      top: "38%",
      right: "-4%",
      width: "480px",
      height: "480px",
      background:
        "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.55), rgba(236,72,153,0) 65%)",
      animationDelay: "-10s",
      animationDuration: "28s",
    },
  },
  {
    style: {
      bottom: "-18%",
      left: "30%",
      width: "720px",
      height: "720px",
      background:
        "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.6), rgba(139,92,246,0) 60%)",
      animationDelay: "-14s",
      animationDuration: "30s",
    },
  },
  {
    style: {
      bottom: "10%",
      right: "15%",
      width: "420px",
      height: "420px",
      background:
        "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.45), rgba(16,185,129,0) 60%)",
      animationDelay: "-8s",
      animationDuration: "20s",
    },
  },
]
</script>

<style scoped lang="scss">
.background-orbs {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  isolation: isolate;
}

/* ============== 主光斑 ============== */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: float-orb ease-in-out infinite;
  will-change: transform;
  mix-blend-mode: screen;
  opacity: 0.9;
}

@keyframes float-orb {
  0% {
    transform: translate(0, 0) scale(1);
  }
  20% {
    transform: translate(60px, -40px) scale(1.08);
  }
  40% {
    transform: translate(-50px, 50px) scale(0.92);
  }
  60% {
    transform: translate(40px, 60px) scale(1.05);
  }
  80% {
    transform: translate(-60px, -30px) scale(0.98);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* ============== 光柱 ============== */
.light-beam {
  position: absolute;
  top: -10%;
  width: 280px;
  height: 130%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(139, 92, 246, 0.18) 30%,
    rgba(6, 182, 212, 0.12) 60%,
    transparent 100%
  );
  filter: blur(40px);
  mix-blend-mode: screen;
  transform: rotate(15deg);
  animation: beam-sway 12s ease-in-out infinite;
}

.light-beam--left {
  left: 12%;
}

.light-beam--right {
  right: 8%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(236, 72, 153, 0.15) 30%,
    rgba(99, 102, 241, 0.1) 60%,
    transparent 100%
  );
  transform: rotate(-12deg);
  animation-delay: -4s;
}

@keyframes beam-sway {
  0%,
  100% {
    transform: rotate(15deg) translateX(0);
  }
  50% {
    transform: rotate(15deg) translateX(40px);
  }
}

.light-beam--right {
  @keyframes beam-sway-right {
    0%,
    100% {
      transform: rotate(-12deg) translateX(0);
    }
    50% {
      transform: rotate(-12deg) translateX(-40px);
    }
  }
  animation-name: beam-sway-right;
}

/* ============== 极光 ============== */
.aurora {
  position: absolute;
  top: 30%;
  left: -10%;
  right: -10%;
  height: 60%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(139, 92, 246, 0.08) 30%,
    rgba(6, 182, 212, 0.06) 50%,
    rgba(236, 72, 153, 0.05) 70%,
    transparent 100%
  );
  filter: blur(80px);
  mix-blend-mode: screen;
  animation: aurora-drift 18s ease-in-out infinite;
}

@keyframes aurora-drift {
  0%,
  100% {
    transform: translateX(0) scaleY(1);
  }
  50% {
    transform: translateX(40px) scaleY(1.1);
  }
}

/* ============== 网格 ============== */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(
    ellipse 80% 60% at center,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 80%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 80% 60% at center,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 80%
  );
}

/* ============== 扫描线 ============== */
.scanline {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(139, 92, 246, 0.5) 30%,
    rgba(6, 182, 212, 0.5) 50%,
    rgba(236, 72, 153, 0.5) 70%,
    transparent 100%
  );
  filter: blur(1px);
  mix-blend-mode: screen;
  animation: scan 8s linear infinite;
  opacity: 0.6;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* ============== 噪点 ============== */
.noise {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* ============== 暗角 ============== */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 100% 80% at center,
    transparent 30%,
    rgba(0, 0, 0, 0.4) 80%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .orb,
  .light-beam,
  .aurora,
  .scanline {
    animation: none;
  }
}
</style>
