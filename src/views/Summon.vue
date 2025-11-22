<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import beastData from '../data/beasts.json'
import BeastCard from '../components/BeastCard.vue'

const isSummoning = ref(false)
const summonedBeast = ref(null)
const showParticles = ref(false)

// 粒子数量
const PARTICLE_COUNT = 40

const summon = async () => {
  if (isSummoning.value) return
  isSummoning.value = true
  summonedBeast.value = null
  
  // 1. 聚能阶段 (Charging)
  const tl = gsap.timeline()

  // 符文加速旋转 + 变红 + 颤抖
  tl.to('.rune-core', { rotation: 360, duration: 2, ease: 'power4.in', repeat: 0 })
    .to('.rune-core', { scale: 0.5, duration: 2, ease: 'power2.in' }, '<') // 同时缩小
    .to('.rune-svg', { color: '#ef4444', duration: 1 }, '<') // 变红
    .to('.rune-container', { x: 5, y: 5, yoyo: true, repeat: 20, duration: 0.05 }, '-=1') // 剧烈震动

  // 2. 爆发阶段 (Explosion)
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 准备粒子
  showParticles.value = true
  await nextTick()
  
  // 随机抽取神兽
  const randomIndex = Math.floor(Math.random() * beastData.length)
  summonedBeast.value = beastData[randomIndex]
  isSummoning.value = false

  // 粒子向四面八方炸开
  gsap.fromTo('.particle', 
    { x: 0, y: 0, scale: 1, opacity: 1 },
    { 
      x: () => (Math.random() - 0.5) * 800, // 随机炸开范围
      y: () => (Math.random() - 0.5) * 800,
      rotation: () => Math.random() * 720,
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'power4.out',
      stagger: { amount: 0.1 }
    }
  )

  // 背景闪光
  gsap.fromTo('.flash-overlay', 
    { opacity: 1 }, 
    { opacity: 0, duration: 1 }
  )

  // 卡片浮现
  gsap.fromTo('.result-container', 
    { scale: 0, rotationY: 90 },
    { scale: 1, rotationY: 0, duration: 1.2, ease: 'elastic.out(1, 0.7)' }
  )

  // 重置符文状态
  gsap.set('.rune-core', { scale: 1, rotation: 0 })
  gsap.set('.rune-svg', { color: '#78716c' }) // 变回灰色
}

const reset = () => {
  summonedBeast.value = null
  showParticles.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
    
    <!-- 背景氛围 -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#220a0a] via-[#050505] to-black opacity-60"></div>
    <div class="absolute inset-0 opacity-20" style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>

    <!-- 爆炸闪光层 -->
    <div class="flash-overlay absolute inset-0 bg-white pointer-events-none opacity-0 z-50 mix-blend-overlay"></div>

    <!-- 粒子层 (仅在爆发时存在) -->
    <div v-if="showParticles" class="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
      <div v-for="n in PARTICLE_COUNT" :key="n" 
           class="particle absolute w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]">
      </div>
      <div v-for="n in PARTICLE_COUNT" :key="`red-${n}`" 
           class="particle absolute w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)] mix-blend-screen">
      </div>
    </div>

    <!-- 1. 召唤法阵 (Idle / Charging) -->
    <div v-if="!summonedBeast" class="rune-container relative cursor-pointer group z-30" @click="summon">
      
      <!-- 外圈呼吸光环 -->
      <div class="absolute inset-[-20px] rounded-full border border-red-900/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"></div>
      
      <!-- 核心符文 -->
      <div class="rune-core w-48 h-48 flex items-center justify-center relative transition-transform">
        <!-- 旋转的几何背景 -->
        <div class="absolute inset-0 border-2 border-stone-800 rounded-full border-dashed animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] group-hover:border-red-900/50"></div>
        <div class="absolute inset-4 border border-stone-800 rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
        
        <!-- 中心符号 (SVG) -->
        <svg class="rune-svg w-20 h-20 text-stone-500 transition-colors duration-500 group-hover:text-red-500 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]" 
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <!-- 一个抽象的六芒星/封印符号 -->
          <path d="M12 2L2 22h20L12 2z" />
          <path d="M12 22L22 2H2l10 20z" class="opacity-50" />
          <circle cx="12" cy="12" r="3" fill="currentColor" class="opacity-20 group-hover:opacity-80 transition-opacity" />
        </svg>
      </div>
    </div>

    <!-- 2. 结果展示 (Result) -->
    <div v-else class="result-container z-40 flex flex-col items-center perspective-1000">
      <!-- 卡片本体 -->
      <BeastCard :data="summonedBeast" class="w-80 shadow-[0_0_100px_rgba(220,38,38,0.4)] hover:shadow-[0_0_150px_rgba(220,38,38,0.6)] transition-shadow duration-500" />
      
      <!-- 底部操作栏 -->
      <div class="mt-12 flex gap-8 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
        <button @click="reset" class="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center text-stone-500 hover:text-white hover:bg-stone-800 hover:border-stone-500 transition-all group">
          <!-- 刷新图标 -->
          <svg class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 4v6h-6" />
            <path d="M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 返回首页 -->
    <router-link to="/" class="absolute bottom-10 text-stone-700 hover:text-stone-400 font-shanhai text-2xl transition-colors z-50">
      ×
    </router-link>
  </div>
</template>

<style>
/* 透视效果，让卡片翻转更真实 */
.perspective-1000 {
  perspective: 1000px;
}
</style>
