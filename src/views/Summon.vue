<script setup>
import { ref, onMounted, nextTick } from "vue"
import gsap from "gsap"
import BeastCard from "../components/BeastCard.vue"
import beastData from "../data/beasts.json"

const isSummoning = ref(false)
const showParticles = ref(false)
const summonedBeast = ref(null)
const fortune = ref(null)
const wishText = ref("")
const direction = ref("center")
const moment = ref("dusk")
const logs = ref([])

const STORAGE_KEY = "shanhai_summon_logs"
const PARTICLE_COUNT = 48

const directionOptions = [
  { value: "east", label: "东方 · 启程" },
  { value: "south", label: "南方 · 炽热" },
  { value: "west", label: "西方 · 谨慎" },
  { value: "north", label: "北方 · 庇护" },
  { value: "center", label: "中宫 · 守一" }
]

const momentOptions = [
  { value: "dawn", label: "拂晓" },
  { value: "noon", label: "正午" },
  { value: "dusk", label: "薄暮" },
  { value: "night", label: "子夜" }
]

const generateFortune = () => {
  const omen = [
    "墨迹开成山河，兆示守护与稳固。",
    "朱砂微光如羽，宜向东求变。",
    "水纹晕染成环，止戈安宁。",
    "星砂落纸，细纹指向远行。",
    "风纹破雾，锋芒藏于静水，宜韬光。"
  ]

  const action = [
    "收敛锋芒，以观其变。",
    "择一事精进，勿多线分心。",
    "与可信之人同行，可化险为夷。",
    "向海求答案，向山存心念。",
    "以静制动，待机而作。"
  ]

  const reply = wishText.value?.trim()
    ? `回应「${wishText.value.slice(0, 30)}」：莫急，先定心。`
    : "未言之愿，纸上亦有回响。"

  const dirHintMap = {
    east: "东方气旺，宜启程。",
    south: "朱雀在侧，以热忱破局。",
    west: "白虎肃立，谨慎前行。",
    north: "玄武守户，稳固根基。",
    center: "中宫守一，静观其变。"
  }

  const momentHintMap = {
    dawn: "拂晓适合开新线索。",
    dusk: "薄暮宜收束与反思。",
    night: "子夜直面未知。",
    noon: "正午宜快动作。"
  }

  return {
    omen: omen[Math.floor(Math.random() * omen.length)],
    action: action[Math.floor(Math.random() * action.length)],
    reply,
    hint: `${dirHintMap[direction.value]} ${momentHintMap[moment.value]}`
  }
}

const saveLog = (entry) => {
  logs.value = [entry, ...logs.value].slice(0, 12)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs.value))
}

const summon = async () => {
  if (isSummoning.value) return
  isSummoning.value = true
  summonedBeast.value = null
  fortune.value = null

  const tl = gsap.timeline()

  tl.to('.rune-core', { rotation: 360, duration: 2, ease: 'power4.in', repeat: 0 })
    .to('.rune-core', { scale: 0.5, duration: 2, ease: 'power2.in' }, '<')
    .to('.rune-svg', { color: '#ef4444', duration: 1 }, '<')
    .to('.rune-container', { x: 5, y: 5, yoyo: true, repeat: 20, duration: 0.05 }, '-=1')

  await new Promise(resolve => setTimeout(resolve, 2000))

  showParticles.value = true
  await nextTick()

  const randomIndex = Math.floor(Math.random() * beastData.length)
  summonedBeast.value = beastData[randomIndex]
  fortune.value = generateFortune()

  const logEntry = {
    id: Date.now(),
    beast: summonedBeast.value?.name || 'unknown',
    wish: wishText.value || 'silent',
    direction: direction.value,
    moment: moment.value,
    time: new Date().toLocaleString()
  }
  saveLog(logEntry)

  isSummoning.value = false

  gsap.fromTo('.particle', 
    { x: 0, y: 0, scale: 1, opacity: 1 },
    { 
      x: () => (Math.random() - 0.5) * 800,
      y: () => (Math.random() - 0.5) * 800,
      rotation: () => Math.random() * 720,
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: { amount: 0.1 }
    }
  )

  gsap.fromTo('.flash-overlay', 
    { opacity: 1 }, 
    { opacity: 0, duration: 1 }
  )

  gsap.fromTo('.result-container', 
    { scale: 0, rotationY: 90 },
    { scale: 1, rotationY: 0, duration: 1.2, ease: 'elastic.out(1, 0.7)' }
  )

  gsap.set('.rune-core', { scale: 1, rotation: 0 })
  gsap.set('.rune-svg', { color: '#78716c' })
}

const reset = () => {
  summonedBeast.value = null
  showParticles.value = false
  fortune.value = null
}

const clearLogs = () => {
  logs.value = []
  localStorage.removeItem(STORAGE_KEY)
}

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      logs.value = JSON.parse(stored)
    } catch (e) {
      logs.value = []
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-stone-200 relative overflow-hidden">
    <!-- 背景与噪点 -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#220a0a] via-[#050505] to-black opacity-70"></div>
    <div class="absolute inset-0 opacity-20" style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>

    <!-- 闪光 -->
    <div class="flash-overlay absolute inset-0 bg-white pointer-events-none opacity-0 z-50 mix-blend-overlay"></div>

    <!-- 粒子 -->
    <div v-if="showParticles" class="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
      <div
        v-for="n in PARTICLE_COUNT"
        :key="n"
        class="particle absolute w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"
      ></div>
      <div
        v-for="n in PARTICLE_COUNT"
        :key="`red-${n}`"
        class="particle absolute w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)] mix-blend-screen"
      ></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 py-12 flex flex-col gap-10">
      <!-- 标题 -->
      <header class="text-center space-y-3">
        <p class="text-xs tracking-[0.35em] text-stone-500 font-serif">召唤仪式</p>
        <h1 class="text-3xl md:text-4xl font-shanhaigu tracking-[0.35em] text-stone-100">召喚之所</h1>
        <p class="text-sm text-stone-500 font-serif">留下心愿、方位与时刻，朱砂卦阵将给出回应。</p>
      </header>

      <!-- 表单 + 日志 -->
      <section class="grid md:grid-cols-[1.3fr_1fr] gap-6 items-start">
        <div class="rounded-3xl border border-stone-800/70 bg-gradient-to-br from-[#0c0c0f]/90 via-[#09090c]/85 to-[#050505]/90 shadow-[0_20px_80px_rgba(0,0,0,0.55)] p-6 space-y-4">
          <p class="text-xs text-stone-400 tracking-[0.18em] font-serif">祈愿设定</p>
          <div class="grid md:grid-cols-2 gap-3">
            <label class="flex flex-col gap-2">
              <span class="text-[12px] text-stone-400 tracking-[0.12em]">方位</span>
              <select v-model="direction" class="summon-input">
                <option v-for="opt in directionOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-[12px] text-stone-400 tracking-[0.12em]">时刻</span>
              <select v-model="moment" class="summon-input">
                <option v-for="opt in momentOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
          </div>
          <label class="flex flex-col gap-2">
            <span class="text-[12px] text-stone-400 tracking-[0.12em]">心愿 / 提问</span>
            <textarea
              v-model="wishText"
              rows="3"
              class="summon-input resize-none"
              placeholder="写下你的心愿、问题或要寻找的异兽线索"
            ></textarea>
          </label>
          <p class="text-[12px] text-stone-500">点击下方朱砂法阵以召唤，回应将写入右侧“祈愿日志”。</p>
        </div>

        <div class="rounded-3xl border border-stone-800/70 bg-gradient-to-br from-[#0c0c0f]/90 via-[#0a0a0d]/85 to-[#050505]/90 shadow-[0_20px_80px_rgba(0,0,0,0.55)] p-6 space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-xs text-stone-400 tracking-[0.18em] font-serif">祈愿日志</p>
            <button @click="clearLogs" class="text-[11px] text-stone-500 hover:text-stone-200 transition">清空</button>
          </div>
          <div class="max-h-64 overflow-auto space-y-3 pr-1 custom-scroll">
            <div v-if="logs.length === 0" class="text-[12px] text-stone-500">暂无记录</div>
            <div v-for="item in logs" :key="item.id" class="p-3 rounded-xl border border-stone-800 bg-black/30">
              <div class="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                <span>{{ item.time }}</span>
                <span class="text-stone-400">{{ item.beast }}</span>
              </div>
              <div class="text-[12px] text-stone-300">心愿：{{ item.wish }}</div>
              <div class="text-[11px] text-stone-500 mt-1">方位: {{ item.direction }} · 时刻: {{ item.moment }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 法阵/结果 -->
      <section class="relative flex flex-col items-center gap-8">
        <div v-if="!summonedBeast" class="rune-container relative cursor-pointer group z-30" @click="summon">
          <div class="absolute inset-[-24px] rounded-full border border-red-900/30 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
          <div class="rune-core w-56 h-56 flex items-center justify-center relative transition-transform">
            <div class="absolute inset-0 border-2 border-stone-800 rounded-full border-dashed animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] group-hover:border-red-900/50"></div>
            <div class="absolute inset-6 border border-stone-800 rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
            <svg
              class="rune-svg w-24 h-24 text-stone-500 transition-colors duration-500 group-hover:text-red-500 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            >
              <path d="M12 2L2 22h20L12 2z" />
              <path d="M12 22L22 2H2l10 20z" class="opacity-50" />
              <circle cx="12" cy="12" r="3" fill="currentColor" class="opacity-20 group-hover:opacity-80 transition-opacity" />
            </svg>
            <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.2em] text-stone-500 font-serif">
              点击召唤
            </div>
          </div>
        </div>

        <div v-else class="result-container z-40 flex flex-col items-center perspective-1000 gap-6 w-full">
          <BeastCard
            :data="summonedBeast"
            class="w-80 shadow-[0_0_100px_rgba(220,38,38,0.4)] hover:shadow-[0_0_150px_rgba(220,38,38,0.6)] transition-shadow duration-500"
          />

          <div class="w-full max-w-3xl grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl border border-red-900/40 bg-black/40 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <p class="text-xs text-red-300 tracking-[0.2em] mb-2 font-serif">签文</p>
              <div class="space-y-2 text-sm text-stone-200">
                <div>{{ fortune?.omen }}</div>
                <div>{{ fortune?.action }}</div>
                <div>{{ fortune?.reply }}</div>
                <div class="text-stone-400 text-[12px]">{{ fortune?.hint }}</div>
              </div>
            </div>
            <div class="p-4 rounded-2xl border border-stone-800 bg-black/30 backdrop-blur-sm flex flex-col gap-3">
              <p class="text-xs text-stone-400 tracking-[0.2em] font-serif">操作</p>
              <div class="flex gap-3">
                <button
                  @click="reset"
                  class="flex-1 h-12 rounded-full border border-stone-700 text-stone-300 hover:text-white hover:border-stone-400 transition"
                >
                  再召一次
                </button>
                <router-link
                  to="/explore"
                  class="flex-1 h-12 rounded-full border border-red-800 bg-red-900/70 text-stone-50 text-center leading-[3rem] hover:bg-red-700 transition"
                >
                  去图鉴
                </router-link>
              </div>
              <div class="text-[12px] text-stone-500">签文已写入日志，可在右侧列表查看。</div>
            </div>
          </div>
        </div>
      </section>

      <router-link to="/home" class="absolute bottom-6 right-6 text-stone-700 hover:text-stone-300 font-shanhai text-2xl transition-colors z-50">
        ×
      </router-link>
    </div>
  </div>
</template>

<style>
.perspective-1000 {
  perspective: 1000px;
}

.summon-input {
  @apply w-full rounded-xl border border-stone-800 bg-[#0a0a0d] text-stone-200 text-sm px-3 py-2 focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-900/50 transition;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 9999px;
}
</style>
