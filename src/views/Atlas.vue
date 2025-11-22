<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import beasts from '../data/beasts.json'

const router = useRouter()

// 统计每个“山经”的数量
const categories = [
  { key: '南山经', label: '南山经' },
  { key: '北山经', label: '北山经' },
  { key: '东山经', label: '东山经' },
  { key: '西山经', label: '西山经' },
  { key: '中山经', label: '中山经' }
]

const categoryStats = computed(() => {
  const map = {}
  for (const c of categories) map[c.key] = 0
  beasts.forEach(b => {
    if (map[b.category] !== undefined) {
      map[b.category]++
    }
  })
  return map
})

// 悬停中的节点，用来控制“中心到节点的光线”
const hoverCat = ref('')

// 点击节点：跳转到 Explore，并带上分类
const goToCategory = (cat) => {
  router.push({
    name: 'Explore',
    query: { category: cat }
  })
}

onMounted(() => {
  // 地图淡入
  gsap.from('.atlas-card', {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out'
  })

  // 外圈缓慢旋转一点点
  gsap.to('.atlas-ring', {
    rotate: 5,
    duration: 30,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  // 漂浮神兽剪影轻微浮动
  gsap.to('.beast-silhouette', {
    y: '-12px',
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.8
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#050507] text-stone-200 relative overflow-hidden">
    <!-- 星点/灵气背景 -->
    <div class="pointer-events-none absolute inset-0 opacity-30"
         style="background-image: radial-gradient(circle at 10% 0%, rgba(248,250,252,0.18) 0, transparent 55%),
                                  radial-gradient(circle at 90% 100%, rgba(248,250,252,0.14) 0, transparent 55%);">
    </div>

    <!-- 四周云雾遮罩 -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- 上雾 -->
      <div class="fog-layer fog-top"></div>
      <!-- 下雾 -->
      <div class="fog-layer fog-bottom"></div>
      <!-- 左雾 -->
      <div class="fog-layer fog-left"></div>
      <!-- 右雾 -->
      <div class="fog-layer fog-right"></div>
    </div>

    <!-- 标题区 -->
    <header class="relative z-10 pt-16 pb-6 text-center">
      <p class="text-xs tracking-[0.35em] text-stone-500 mb-2 font-serif">SHAN HAI ATLAS</p>
      <h1 class="text-3xl md:text-4xl font-shanhaigu tracking-[0.3em] mb-3">
        山 海 图
      </h1>
      <p class="text-sm text-stone-500 font-serif">
        五方山川 · 異獸所居
      </p>
    </header>

    <!-- 中心地图卡片 -->
    <main class="relative z-10 flex items-center justify-center px-4 pb-16">
      <div
        class="atlas-card relative max-w-4xl w-full aspect-[16/9] rounded-3xl border border-stone-800/80 bg-gradient-to-br from-[#050509] via-[#090b11] to-[#050509] shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        <!-- 内部暗纹 -->
        <div class="absolute inset-0 opacity-30 mix-blend-screen"
             style="background-image: radial-gradient(circle at 20% 10%, rgba(248,250,252,0.15) 0, transparent 55%),
                                      radial-gradient(circle at 80% 90%, rgba(248,250,252,0.12) 0, transparent 55%);">
        </div>

        <!-- 漂浮神兽剪影光团 -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="beast-silhouette beast-nw"></div>
          <div class="beast-silhouette beast-ne"></div>
          <div class="beast-silhouette beast-sw"></div>
          <div class="beast-silhouette beast-se"></div>
        </div>

        <!-- 右上角罗盘 / 八卦 -->
        <div
          class="absolute right-6 top-6 w-20 h-20 md:w-24 md:h-24 rounded-full border border-stone-500/70 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(15,23,42,0.9)]"
        >
          <div class="relative w-[70%] h-[70%] rounded-full border border-stone-400/80 flex items-center justify-center">
            <!-- 八卦风格线条 -->
            <div class="absolute inset-[10%] border-t border-stone-500/70"></div>
            <div class="absolute inset-[10%] border-l border-stone-500/70"></div>
            <!-- 方位文字 -->
            <span class="absolute -top-2 text-[10px] text-stone-300 font-serif">北</span>
            <span class="absolute -bottom-2 text-[10px] text-stone-300 font-serif">南</span>
            <span class="absolute -left-2 text-[10px] text-stone-300 font-serif">西</span>
            <span class="absolute -right-2 text-[10px] text-stone-300 font-serif">東</span>
            <!-- 中央卦象 -->
            <span class="text-[12px] text-stone-200 font-shanhaigu tracking-[0.25em]">
              乾 坤
            </span>
          </div>
        </div>

        <!-- 中心“大陆” -->
        <div class="relative h-full flex items-center justify-center">
          <div class="relative w-64 h-64 md:w-80 md:h-80 rounded-full atlas-ring border border-stone-700/80 bg-gradient-to-br from-[#111827] via-[#020617] to-[#020617] shadow-[0_0_40px_rgba(148,163,184,0.35)]">
            <!-- 内部山脉轮廓（用线条+模糊模拟） -->
            <div class="absolute inset-10 rounded-[45%] border border-stone-600/60 opacity-60 blur-[1px]"></div>
            <div class="absolute inset-16 rounded-[40%] border border-stone-700/40 opacity-50"></div>

            <!-- 中心文字 -->
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span class="text-xs tracking-[0.3em] text-stone-500 font-serif">ZHONG SHAN</span>
              <span class="font-shanhaigu text-2xl tracking-[0.4em]">中 山</span>
              <span class="text-[10px] text-stone-500 font-serif mt-1">
                異獸 · {{ categoryStats['中山经'] ?? 0 }} 只
              </span>
            </div>
          </div>

          <!-- 中心到各节点的发光连线 -->
          <div
            class="atlas-line atlas-line-north"
            :class="{ 'opacity-80': hoverCat === '北山经' }"
          ></div>
          <div
            class="atlas-line atlas-line-south"
            :class="{ 'opacity-80': hoverCat === '南山经' }"
          ></div>
          <div
            class="atlas-line atlas-line-east"
            :class="{ 'opacity-80': hoverCat === '东山经' }"
          ></div>
          <div
            class="atlas-line atlas-line-west"
            :class="{ 'opacity-80': hoverCat === '西山经' }"
          ></div>

          <!-- 四方节点 -->
          <!-- 北 -->
          <button
            class="atlas-node group absolute -top-2 md:-top-4 flex flex-col items-center gap-1"
            @click="goToCategory('北山经')"
            @mouseenter="hoverCat = '北山经'"
            @mouseleave="hoverCat = ''"
          >
            <div class="atlas-node-dot w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]"></div>
            <span class="text-xs text-stone-300 font-serif tracking-[0.25em]">北 山</span>
            <span class="text-[10px] text-stone-500 font-mono">
              {{ categoryStats['北山经'] ?? 0 }} 只
            </span>
          </button>

          <!-- 南 -->
          <button
            class="atlas-node group absolute -bottom-2 md:-bottom-4 flex flex-col items-center gap-1"
            @click="goToCategory('南山经')"
            @mouseenter="hoverCat = '南山经'"
            @mouseleave="hoverCat = ''"
          >
            <span class="text-[10px] text-stone-500 font-mono">
              {{ categoryStats['南山经'] ?? 0 }} 只
            </span>
            <span class="text-xs text-stone-300 font-serif tracking-[0.25em]">南 山</span>
            <div class="atlas-node-dot w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.9)]"></div>
          </button>

          <!-- 东 -->
          <button
            class="atlas-node group absolute right-4 md:right-10 flex flex-col items-center gap-1"
            @click="goToCategory('东山经')"
            @mouseenter="hoverCat = '东山经'"
            @mouseleave="hoverCat = ''"
          >
            <div class="atlas-node-dot w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.9)]"></div>
            <span class="text-xs text-stone-300 font-serif tracking-[0.25em]">东 山</span>
            <span class="text-[10px] text-stone-500 font-mono">
              {{ categoryStats['东山经'] ?? 0 }} 只
            </span>
          </button>

          <!-- 西 -->
          <button
            class="atlas-node group absolute left-4 md:left-10 flex flex-col items-center gap-1"
            @click="goToCategory('西山经')"
            @mouseenter="hoverCat = '西山经'"
            @mouseleave="hoverCat = ''"
          >
            <span class="text-[10px] text-stone-500 font-mono">
              {{ categoryStats['西山经'] ?? 0 }} 只
            </span>
            <span class="text-xs text-stone-300 font-serif tracking-[0.25em]">西 山</span>
            <div class="atlas-node-dot w-3 h-3 rounded-full bg-sky-300 shadow-[0_0_14px_rgba(125,211,252,0.9)]"></div>
          </button>

          <!-- 提示文字 -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-stone-500 font-serif">
            點擊方位 · 進入對應山經圖鑑
          </div>
        </div>
      </div>
    </main>

    <!-- 左下返回 / 右下去五藏山经 -->
    <div class="fixed bottom-6 left-6 z-20 flex gap-3">
      <router-link
        to="/"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-stone-900/80 border border-stone-700 text-stone-200 hover:bg-stone-800 hover:scale-110 transition"
      >
        <span class="font-shanhai text-sm">回</span>
      </router-link>

      <router-link
        to="/explore"
        class="hidden md:inline-flex items-center px-4 h-10 rounded-full bg-red-900/80 border border-red-800 text-sm text-stone-100 font-serif tracking-[0.2em] hover:bg-red-700 hover:scale-105 transition"
      >
        五 藏 山 經
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.atlas-node {
  @apply focus:outline-none;
}

.atlas-node:hover .atlas-node-dot {
  transform: scale(1.35);
}

.atlas-node:hover span {
  @apply text-stone-100;
}

/* 云雾层基础样式 */
.fog-layer {
  position: absolute;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgba(148,163,184,0.7), transparent 60%);
  filter: blur(18px);
  opacity: 0.35;
}

/* 上下左右不同动画方向 */
.fog-top {
  top: -80px;
  left: -10%;
  right: -10%;
  height: 160px;
  animation: fogMoveHorizontal 40s linear infinite;
}

.fog-bottom {
  bottom: -80px;
  left: -15%;
  right: -15%;
  height: 160px;
  animation: fogMoveHorizontal 45s linear infinite reverse;
}

.fog-left {
  top: 0;
  bottom: 0;
  left: -120px;
  width: 180px;
  animation: fogMoveVertical 50s linear infinite;
}

.fog-right {
  top: 0;
  bottom: 0;
  right: -120px;
  width: 180px;
  animation: fogMoveVertical 55s linear infinite reverse;
}

/* 漂浮神兽剪影光团（可以之后替换为真实剪影图片） */
.beast-silhouette {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 40%;
  background:
    radial-gradient(circle at 30% 20%, rgba(248,250,252,0.6), transparent 55%),
    radial-gradient(circle at 70% 80%, rgba(248,250,252,0.45), transparent 55%);
  opacity: 0.28;
  filter: blur(1px);
  mix-blend-mode: screen;
}

.beast-nw { top: 14%; left: 8%; }
.beast-ne { top: 12%; right: 8%; }
.beast-sw { bottom: 12%; left: 10%; }
.beast-se { bottom: 10%; right: 10%; }

/* 中心到四方的光线 */
.atlas-line {
  position: absolute;
  left: 50%;
  top: 50%;
  background: linear-gradient(to var(--dir, bottom), rgba(248,250,252,0.05), rgba(248,250,252,0.8));
  transform-origin: center;
  opacity: 0;
  transition: opacity 0.25s ease-out;
  pointer-events: none;
}

.atlas-line-north {
  --dir: top;
  width: 2px;
  height: 32%;
  transform: translate(-50%, -100%);
}

.atlas-line-south {
  --dir: bottom;
  width: 2px;
  height: 32%;
  transform: translate(-50%, 0%);
}

.atlas-line-east {
  --dir: right;
  width: 32%;
  height: 2px;
  transform: translate(0%, -50%);
}

.atlas-line-west {
  --dir: left;
  width: 32%;
  height: 2px;
  transform: translate(-100%, -50%);
}

/* 云雾动效 */
@keyframes fogMoveHorizontal {
  0% { transform: translateX(0); }
  50% { transform: translateX(80px); }
  100% { transform: translateX(0); }
}

@keyframes fogMoveVertical {
  0% { transform: translateY(0); }
  50% { transform: translateY(80px); }
  100% { transform: translateY(0); }
}
</style>
