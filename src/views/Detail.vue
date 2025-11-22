<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import beastData from '../data/beasts.json'

const route = useRoute()
const router = useRouter()
const beast = ref(beastData.find(b => b.id === route.params.id))

const goBack = () => router.back()

onMounted(() => {
  // 简单的入场动画序列
  const tl = gsap.timeline()
  
  tl.from('.visual-area', { x: -50, opacity: 0, duration: 1 })
    .from('.text-area', { x: 50, opacity: 0, duration: 1 }, '-=0.8')
    .from('.stagger-text', { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.5')
})
</script>

<template>
  <div v-if="beast" class="min-h-screen bg-[#0c0c0c] text-[#d4d4d4] flex flex-col lg:flex-row overflow-hidden">
    
    <!-- 1. 左侧：视觉区域 (Visual Area) -->
    <div class="visual-area relative w-full lg:w-1/2 h-[50vh] lg:h-screen bg-[#161616] flex items-center justify-center overflow-hidden border-r border-stone-800">
      <!-- 背景大字 -->
      <span class="absolute text-[20rem] font-shanhai font-bold text-[#1a1a1a] select-none">
        {{ beast.name[0] }}
      </span>
      
      <!-- 模拟的神兽图像 (如果有图显示图，没图显示文字意象) -->
      <div class="relative z-10 flex flex-col items-center">
        <img v-if="beast.imageUrl" :src="beast.imageUrl" class="w-full h-full object-cover max-w-md shadow-2xl" />
        <div v-else class="w-64 h-64 border-4 border-stone-700 rounded-full flex items-center justify-center bg-[#0f0f0f] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <span class="font-shanhai text-6xl text-stone-500">{{ beast.name }}</span>
        </div>
        <span class="mt-8 text-stone-600 font-serif text-sm tracking-[0.5em] uppercase">Mythical Creature</span>
      </div>

      <!-- 噪点遮罩 -->
      <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>
    </div>

    <!-- 2. 右侧：文字区域 (Text Area) -->
    <div class="text-area w-full lg:w-1/2 h-auto lg:h-screen overflow-y-auto p-10 lg:p-20 flex flex-col relative">
      <!-- 返回按钮 -->
      <button @click="goBack" class="absolute top-8 right-8 text-stone-500 hover:text-red-500 transition flex items-center gap-2 group">
        <span class="group-hover:-translate-x-1 transition-transform">←</span> 
        <span class="font-shanhai">归去</span>
      </button>

      <div class="mt-10 lg:mt-20">
        <!-- 分类印章 -->
        <div class="stagger-text inline-block border border-red-900 text-red-600 px-3 py-1 text-sm font-serif mb-6 tracking-widest">
          {{ beast.category }}
        </div>

        <!-- 名字 -->
        <h1 class="stagger-text text-6xl font-shanhai font-bold text-stone-100 mb-8 tracking-wide">
          {{ beast.name }}
        </h1>

        <!-- 属性标签 -->
        <div class="stagger-text flex gap-3 mb-12">
          <span v-for="tag in beast.tags" :key="tag" class="px-3 py-1 bg-stone-800 text-stone-400 text-xs rounded border border-stone-700">
            {{ tag }}
          </span>
        </div>

        <!-- 核心：竖排古文引用 -->
        <div class="stagger-text relative bg-[#1a1a1a] p-8 border-l-4 border-stone-700 mb-12">
          <p class="font-shanhai text-2xl leading-loose text-stone-300 writing-vertical h-48 w-full overflow-x-auto">
            {{ beast.desc }}
          </p>
          <span class="absolute bottom-4 right-4 text-stone-600 text-xs font-serif">—— 山海经原文</span>
        </div>

        <!-- 现代文白话解说 -->
        <div class="stagger-text">
          <h3 class="text-xl font-shanhai text-stone-400 mb-4 flex items-center gap-2">
            <span class="w-2 h-2 bg-red-900 rounded-full"></span>
            异兽考据
          </h3>
          <p class="text-stone-500 leading-loose font-serif text-justify">
            {{ beast.detailText || '暂无详细考据...' }}
          </p>
        </div>
      </div>
    </div>

  </div>
  
  <!-- 404 状态 -->
  <div v-else class="h-screen flex items-center justify-center bg-black text-white font-shanhai">
    <p>此处荒芜，未见神兽踪迹。</p>
    <button @click="goBack" class="ml-4 underline text-red-500">返回</button>
  </div>
</template>

<style scoped>
/* 竖排文字的核心样式 */
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 0.2em;
}
</style>
