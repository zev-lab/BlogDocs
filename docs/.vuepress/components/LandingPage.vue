<template>
  <div class="landing">
    <!-- 背景层：动态光斑 + 网格 + 鼠标光晕 -->
    <BackgroundOrbs />
    <MouseGlow />

    <!-- ============== HERO ============== -->
    <section class="hero">
      <div class="hero__container">
        <!-- 左侧文本区 -->
        <div class="hero__text">
          <RevealSection direction="fade" :delay="0">
            <div class="eyebrow">
              <span class="eyebrow__dot" />
              <span>v2.0 · 全栈开发者成长手册</span>
            </div>
          </RevealSection>

          <RevealSection direction="up" :delay="80">
            <h1 class="hero__title">
              <span class="line">把每一行代码</span>
              <span class="line">
                沉淀成
                <span class="gradient-text">可复用的知识</span>
              </span>
            </h1>
          </RevealSection>

          <RevealSection direction="up" :delay="180">
            <p class="hero__sub">
              覆盖 JavaScript、Vue、React、Flutter、Three.js、Rust、Golang
              等全栈技术栈的个人知识库。
              <br />
              笔记 · 文档 · 教程 · 工具链，一站式积累与检索。
            </p>
          </RevealSection>

          <RevealSection direction="up" :delay="280">
            <div class="hero__cta">
              <a href="/guide/start.html" class="btn btn--primary">
                <span>开始探索</span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="/guide/index.html" class="btn btn--ghost">
                <span>了解这个博客</span>
              </a>
            </div>
          </RevealSection>

          <RevealSection direction="up" :delay="400">
            <div class="hero__meta">
              <div class="meta-item">
                <span class="meta-num">70+</span>
                <span class="meta-label">技术笔记</span>
              </div>
              <div class="meta-sep" />
              <div class="meta-item">
                <span class="meta-num">12</span>
                <span class="meta-label">技术栈</span>
              </div>
              <div class="meta-sep" />
              <div class="meta-item">
                <span class="meta-num">2022 →</span>
                <span class="meta-label">持续更新</span>
              </div>
            </div>
          </RevealSection>
        </div>

        <!-- 右侧 3D 动画区 -->
        <div class="hero__visual">
          <ClientOnly>
            <HeroAnimation />
          </ClientOnly>
        </div>
      </div>

      <!-- 滚动指示器 -->
      <div class="scroll-hint" aria-hidden="true">
        <div class="mouse">
          <div class="wheel" />
        </div>
        <span>SCROLL</span>
      </div>
    </section>

    <!-- ============== MARQUEE ============== -->
    <section class="marquee-section">
      <MarqueeText
        :items="[
          'JavaScript',
          'TypeScript',
          'Vue 3',
          'React',
          'SCSS',
          'Three.js',
          'Flutter',
          'Golang',
          'Rust',
          'Emacs',
          'UniApp',
          'WeChat Mini Program',
        ]"
      />
    </section>

    <!-- ============== BENTO GRID ============== -->
    <section class="section">
      <div class="container">
        <RevealSection direction="up">
          <div class="section-head">
            <span class="section-tag">// 01 — 核心能力</span>
            <h2 class="section-title">
              为开发者而设计的
              <span class="gradient-text">知识中枢</span>
            </h2>
            <p class="section-sub">
              不是简单的笔记堆砌，而是按主题、场景、对比维度组织的实战手册。
            </p>
          </div>
        </RevealSection>

        <div class="bento">
          <RevealSection
            direction="scale"
            :delay="0"
            class="bento__item bento__item--lg"
          >
            <div class="bento-card bento-card--primary">
              <div class="bento-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                  />
                </svg>
              </div>
              <h3>系统化笔记</h3>
              <p>
                从语言基础、进阶特性到工程实践，按学习曲线组织，
                而非按时间线堆叠。
              </p>
              <div class="bento-tags">
                <span>JS 基础</span>
                <span>ES6+</span>
                <span>设计模式</span>
              </div>
            </div>
          </RevealSection>

          <RevealSection
            direction="up"
            :delay="80"
            class="bento__item"
          >
            <div class="bento-card">
              <div class="bento-icon bento-icon--cyan">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>实战代码</h3>
              <p>每个知识点都附带可运行的最小示例。</p>
            </div>
          </RevealSection>

          <RevealSection
            direction="up"
            :delay="160"
            class="bento__item"
          >
            <div class="bento-card">
              <div class="bento-icon bento-icon--pink">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3>踩坑记录</h3>
              <p>把每一次 debug 沉淀为下次能翻的避坑指南。</p>
            </div>
          </RevealSection>

          <RevealSection
            direction="up"
            :delay="240"
            class="bento__item bento__item--md"
          >
            <div class="bento-card bento-card--dark">
              <div class="bento-icon bento-icon--purple">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>跨端方案对比</h3>
              <p>
                小程序、UniApp、Flutter、Three.js——
                不同场景的技术选型与权衡。
              </p>
              <div class="bento-tags">
                <span>小程序</span>
                <span>UniApp</span>
                <span>Flutter</span>
                <span>WebGL</span>
              </div>
            </div>
          </RevealSection>

          <RevealSection
            direction="up"
            :delay="320"
            class="bento__item bento__item--md"
          >
            <div class="bento-card">
              <div class="bento-icon bento-icon--green">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3>面试宝典</h3>
              <p>
                前端面试复习计划、Vue/React 常见问题汇总，按难度与频次分级。
              </p>
            </div>
          </RevealSection>

          <RevealSection
            direction="up"
            :delay="400"
            class="bento__item"
          >
            <div class="bento-card">
              <div class="bento-icon bento-icon--amber">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                  />
                </svg>
              </div>
              <h3>工具链</h3>
              <p>Emacs、Git、NPM 常见问题的速查表。</p>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ============== STATS ============== -->
    <section class="section section--alt">
      <div class="container">
        <div class="stats">
          <RevealSection
            v-for="(stat, i) in stats"
            :key="i"
            direction="up"
            :delay="i * 100"
            class="stats__item"
          >
            <div class="stats__num gradient-text">{{ stat.value }}</div>
            <div class="stats__label">{{ stat.label }}</div>
            <div class="stats__desc">{{ stat.desc }}</div>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ============== WORKFLOW ============== -->
    <section class="section">
      <div class="container">
        <RevealSection direction="up">
          <div class="section-head">
            <span class="section-tag">// 02 — 内容组织</span>
            <h2 class="section-title">
              从零到精通的
              <span class="gradient-text">学习路径</span>
            </h2>
            <p class="section-sub">
              每一个技术栈都遵循相同的内容架构——上手、进阶、踩坑、应用。
            </p>
          </div>
        </RevealSection>

        <div class="workflow">
          <RevealSection
            v-for="(step, i) in workflow"
            :key="i"
            direction="up"
            :delay="i * 120"
            class="workflow__step"
          >
            <div class="workflow__num">{{ String(i + 1).padStart(2, "0") }}</div>
            <div class="workflow__body">
              <h4>{{ step.title }}</h4>
              <p>{{ step.desc }}</p>
            </div>
            <div v-if="i < workflow.length - 1" class="workflow__line" />
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ============== CTA ============== -->
    <section class="section">
      <div class="container">
        <RevealSection direction="scale">
          <div class="cta">
            <div class="cta__glow" aria-hidden="true" />
            <h2 class="cta__title">
              准备好
              <span class="gradient-text">开始你的技术探索</span>
              了吗？
            </h2>
            <p class="cta__sub">
              从前端基础到全栈进阶，<br class="only-mobile" />
              这里有你需要的全部起点。
            </p>
            <div class="cta__actions">
              <a href="/guide/start.html" class="btn btn--primary btn--lg">
                <span>立即开始</span>
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="https://github.com/5312/BlogDocs"
                target="_blank"
                rel="noopener"
                class="btn btn--ghost btn--lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
                <span>查看源码</span>
              </a>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue"

const stats = [
  { value: "70+", label: "文档数量", desc: "覆盖 12 个技术栈" },
  { value: "12", label: "技术方向", desc: "前端 / 跨端 / 后端 / 工具" },
  { value: "2022", label: "开始时间", desc: "持续更新中" },
  { value: "MIT", label: "开源协议", desc: "内容可自由引用" },
]

const workflow = [
  {
    title: "基础打底",
    desc: "从语言核心语法、数据结构、运行时原理开始，建立可迁移的心智模型。",
  },
  {
    title: "进阶特性",
    desc: "深入设计模式、工程化方案、框架源码，理解为什么这么设计。",
  },
  {
    title: "实战踩坑",
    desc: "真实项目中的常见问题与解决方案，附完整复现路径。",
  },
  {
    title: "应用拓展",
    desc: "跨端方案、性能优化、工具链整合，把技术变成生产力。",
  },
]

// 切换 body class，让默认主题在首页也走暗色
onMounted(() => {
  document.body.classList.add("is-landing")
})

onBeforeUnmount(() => {
  document.body.classList.remove("is-landing")
})
</script>

<style lang="scss">
/* ============================================
 * 首页专用全局样式 —— 仅在 LandingPage 挂载时生效
 * 文档页因为 is-landing 不存在，保持默认亮色
 * ============================================ */

/* 1. 隐藏默认 home 布局的 hero/features（被 LandingPage 接管） */
body.is-landing .home-hero,
body.is-landing .home-features,
body.is-landing .home-content-container > .hero,
body.is-landing .vp-hero,
body.is-landing .vp-features {
  display: none !important;
}

/* 2. 首页整体暗色化 + stacking context
 *    Z-index 堆叠（自下而上）：
 *      body bg (#0a0a0f)
 *      → background-orbs (z:0, isolation:isolate + mix-blend:screen)
 *      → theme-container (z:1) — 主题内容（navbar / 文档 / footer）
 *      → mouse-glow (z:2) — 已弱化到 0.10 透明度，作为最上层微光
 */
body.is-landing {
  background: #0a0a0f !important;
  color: #e5e7eb;
  transition: background-color 0.4s ease;
}

body.is-landing .theme-container,
body.is-landing .theme-default-content,
body.is-landing .VPHero,
body.is-landing .VPFeature {
  background: transparent !important;
  position: relative;
  z-index: 1;
}

/* 3. navbar 在首页变透明 + 毛玻璃 */
body.is-landing .navbar,
body.is-landing .VPNavBar {
  background: rgba(10, 10, 15, 0.55) !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  box-shadow: none !important;
}

body.is-landing .navbar .VPHomeNavbar,
body.is-landing .VPNavBar .title,
body.is-landing .VPNavBar .VPNavBarMenuLink,
body.is-landing .VPNavBar .VPNavBarMenuGroup .button,
body.is-landing .VPNavBar .VPNavBarHamburger .icon {
  color: rgba(255, 255, 255, 0.85) !important;
}

body.is-landing .VPNavBar .VPNavBarMenuLink:hover,
body.is-landing .VPNavBar .VPNavBarMenuLink.active {
  color: #fff !important;
}

body.is-landing .VPNavBar .VPNavBarMenuGroup .button {
  border-color: rgba(255, 255, 255, 0.15) !important;
  background: rgba(255, 255, 255, 0.04) !important;
}

/* 4. footer 在首页也走暗色 */
body.is-landing .footer,
body.is-landing .VPFooter {
  background: #050507 !important;
  color: rgba(255, 255, 255, 0.5) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

body.is-landing .VPFooter a {
  color: rgba(255, 255, 255, 0.7) !important;
}

body.is-landing .VPFooter a:hover {
  color: #fff !important;
}

/* 5. 页面主内容区透明 + 去除默认主题的最大宽度限制
 *    让 hero/landing 真正铺满到 viewport 左右边缘
 *    其他 section 的内容继续通过 .container 内部 max-width 控制宽度 */
body.is-landing .page,
body.is-landing .home-content-container {
  background: transparent !important;
  padding: 0 !important;
}

body.is-landing .home-content-container {
  margin: 0 !important;
  max-width: none !important;
  width: 100% !important;
}

body.is-landing .theme-container,
body.is-landing .theme-default-content {
  max-width: none !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* 6. 解除默认主题 home 页的宽度限制
 *    theme-default 里 .vp-home { max-width: var(--homepage-width) } 默认 960px
 *    导致首页内容被卡在屏幕中间、两侧留大片黑边
 *    这里覆盖 CSS 变量 + 直接覆盖 .vp-home 的 max-width 双重保险 */
body.is-landing {
  --homepage-width: 1920px;
}

body.is-landing .vp-home {
  max-width: 1920px !important;
  width: 100% !important;
  margin: 0 auto !important;
  /* 默认主题给 .vp-home 加了 padding: navbar 2rem 0，去掉左右 2rem 让 hero 能贴到边缘 */
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* 7. 滚动条美化（仅在首页） */
body.is-landing::-webkit-scrollbar {
  width: 10px;
}

body.is-landing::-webkit-scrollbar-track {
  background: #0a0a0f;
}

body.is-landing::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8b5cf6, #06b6d4);
  border-radius: 5px;
  border: 2px solid #0a0a0f;
}

body.is-landing::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #a78bfa, #22d3ee);
}
</style>

<style scoped lang="scss">
.landing {
  position: relative;
  min-height: 100vh;
  color: #e5e7eb;
  overflow: hidden;
}

.container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  z-index: 2;
}

.section {
  position: relative;
  padding: 120px 0;
  z-index: 2;
}

.section--alt {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(139, 92, 246, 0.04) 50%,
    transparent 100%
  );
}

.section-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 80px;
}

.section-tag {
  display: inline-block;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 13px;
  color: #8b5cf6;
  margin-bottom: 20px;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: #fff;
}

.section-sub {
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

/* ============== HERO ============== */
.hero {
  position: relative;
  min-height: calc(100vh - 72px); /* 减去 navbar 高度 */
  display: flex;
  align-items: center;
  padding: 60px 0;
  width: 100%;
}

/* 不带 .container class 的独立样式 — 直接铺满 viewport 宽度 */
.hero__container {
  display: grid;
  grid-template-columns: 1.2fr 1fr; /* 左文稍宽，让标题能完整展示 */
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 100%;
  padding: 0 clamp(24px, 5vw, 80px);
  margin: 0;
}

.hero__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  max-width: 760px;
}

.hero__visual {
  position: relative;
  width: 100%;
  height: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 强制让 ClientOnly 的 placeholder / wrapper 撑满父容器，避免 SSR fallback 时高度为 0 */
.hero__visual > * {
  width: 100%;
  height: 100%;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
}

.eyebrow__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.hero__title {
  font-size: clamp(40px, 7vw, 88px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 28px;
  color: #fff;
}

.line {
  display: block;
}

.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero__sub {
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  max-width: 640px;
  margin: 0 0 48px;
}

.hero__cta {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  white-space: nowrap;
}

.btn--primary {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: #fff;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 10px 30px -10px rgba(139, 92, 246, 0.6);

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.15) inset,
      0 20px 40px -10px rgba(139, 92, 246, 0.7);
  }
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.btn--lg {
  padding: 18px 36px;
  font-size: 16px;
}

.hero__meta {
  display: inline-flex;
  align-items: center;
  gap: 32px;
  padding: 20px 32px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.meta-num {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.meta-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.05em;
}

.meta-sep {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  letter-spacing: 0.2em;
  font-family: "JetBrains Mono", monospace;
}

.mouse {
  width: 22px;
  height: 36px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  position: relative;
}

.wheel {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: scroll-wheel 1.6s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 14px);
  }
}

/* ============== MARQUEE ============== */
.marquee-section {
  position: relative;
  padding: 40px 0;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.2);
}

/* ============== BENTO ==============
 * 用 grid-template-areas 明确每张卡片位置（不再依赖 span + auto-flow，
 * 否则混合尺寸卡片容易在自动流中重叠或跳格）
 *
 * 布局：
 *   ┌────┬────┬────┬────┐
 *   │ a  │ a  │ b  │ b  │ row 1
 *   │ a  │ a  │ c  │ d  │ row 2
 *   │ e  │ e  │ f  │ f  │ row 3
 *   └────┴────┴────┴────┘
 */
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "a a b b"
    "a a c d"
    "e e f f";
  gap: 24px;
  grid-auto-rows: minmax(220px, auto);
}

/* 用 nth-child 把 6 个 grid item 钉到 grid-template-areas 的 6 个区域 */
.bento__item:nth-child(1) { grid-area: a; }
.bento__item:nth-child(2) { grid-area: b; }
.bento__item:nth-child(3) { grid-area: c; }
.bento__item:nth-child(4) { grid-area: d; }
.bento__item:nth-child(5) { grid-area: e; }
.bento__item:nth-child(6) { grid-area: f; }

.bento-card {
  position: relative;
  height: 100%;
  padding: 32px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(139, 92, 246, 0.4);
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.08) 0%,
      rgba(6, 182, 212, 0.04) 100%
    );
    box-shadow:
      0 20px 60px -20px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(139, 92, 246, 0.2),
      0 0 40px -10px rgba(139, 92, 246, 0.3);
  }
}

.bento-card--primary {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.12) 0%,
    rgba(6, 182, 212, 0.04) 100%
  );
  border-color: rgba(139, 92, 246, 0.2);

  h3 {
    font-size: 28px;
  }
}

.bento-card--dark {
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.08) 0%,
    rgba(236, 72, 153, 0.04) 100%
  );
}

.bento-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  margin-bottom: 24px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  .bento-card:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
}

.bento-icon--cyan {
  background: rgba(6, 182, 212, 0.15);
  color: #22d3ee;
}
.bento-icon--pink {
  background: rgba(236, 72, 153, 0.15);
  color: #f472b6;
}
.bento-icon--purple {
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
}
.bento-icon--green {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}
.bento-icon--amber {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.bento-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #fff;
  letter-spacing: -0.01em;
}

.bento-card p {
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.55);
  margin: 0 0 20px;
}

.bento-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bento-tags span {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-family: "JetBrains Mono", monospace;
}

/* ============== STATS ============== */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stats__item {
  text-align: center;
  padding: 32px 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
}

.stats__num {
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.stats__label {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.stats__desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
}

/* ============== WORKFLOW ============== */
.workflow {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;
}

.workflow__step {
  position: relative;
  padding: 32px 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-4px);
  }
}

.workflow__num {
  font-size: 14px;
  font-weight: 700;
  color: #8b5cf6;
  font-family: "JetBrains Mono", monospace;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
}

.workflow__body h4 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: -0.01em;
}

.workflow__body p {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
}

/* ============== CTA ============== */
.cta {
  position: relative;
  text-align: center;
  padding: 100px 60px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(6, 182, 212, 0.04) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.cta__glow {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.3) 0%,
    transparent 60%
  );
  filter: blur(60px);
  pointer-events: none;
}

.cta__title {
  position: relative;
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 24px;
  color: #fff;
  letter-spacing: -0.02em;
}

.cta__sub {
  position: relative;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 48px;
}

.cta__actions {
  position: relative;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.only-mobile {
  display: none;
}

/* ============== RESPONSIVE ============== */
@media (max-width: 960px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "a a"
      "b b"
      "c c"
      "d d"
      "e e"
      "f f";
    gap: 20px;
    grid-auto-rows: minmax(200px, auto);
  }
  .stats,
  .workflow {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero__container {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 6vw !important;
  }
  .hero__text {
    text-align: center;
    align-items: center;
  }
  .hero__cta {
    justify-content: center;
  }
  .hero__meta {
    margin-left: auto;
    margin-right: auto;
  }
  .hero__visual {
    height: 420px;
    min-height: 420px;
    order: -1;
  }
  .hero__meta {
    gap: 20px;
    padding: 16px 24px;
  }
  .meta-num {
    font-size: 18px;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 20px;
  }
  .section {
    padding: 80px 0;
  }
  .hero {
    padding: 120px 0 80px;
  }
  .bento {
    grid-template-columns: 1fr;
  }
  .bento__item,
  .bento__item--md,
  .bento__item--lg {
    grid-column: span 1;
  }
  .stats,
  .workflow {
    grid-template-columns: 1fr;
  }
  .hero__meta {
    flex-wrap: wrap;
    gap: 16px;
  }
  .meta-sep {
    display: none;
  }
  .cta {
    padding: 60px 24px;
  }
  .only-mobile {
    display: inline;
  }
  .scroll-hint {
    display: none;
  }
}
</style>
