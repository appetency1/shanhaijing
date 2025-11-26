<script setup>
import { ref, onMounted } from 'vue'
import beastData from '../data/beasts.json'
import gsap from 'gsap'

const collection = ref([])

onMounted(() => {
  // 模拟数据：为了演示，我们要随机让一些神兽处于“未解锁”状态
  // 在真实项目中，这里应该从 localStorage 读取
  collection.value = beastData.map(beast => ({
    ...beast,
    // 随机 60% 的概率已解锁，40% 是锁住的
    isUnlocked: Math.random() > 0.4 
  }))

  // 入场动画
  gsap.from('.collection-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#1a1a1a] p-8 pb-20">
    <!-- 顶部导航 -->
    <div class="flex justify-between items-center mb-12 max-w-6xl mx-auto">
      <h2 class="text-3xl font-shanhai text-stone-200">百妖谱</h2>
      <router-link to="/home" class="text-stone-500 hover:text-white font-shanhai">返回</router-link>
    </div>

    <!-- 图鉴网格 -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
      <div 
        v-for="item in collection" 
        :key="item.id"
        class="collection-item relative aspect-[3/4] rounded-lg overflow-hidden border border-stone-800 group transition-all duration-300 hover:border-stone-600"
        :class="item.isUnlocked ? 'bg-stone-900' : 'bg-black'"
      >
        <!-- 已解锁状态 -->
        <div v-if="item.isUnlocked" class="w-full h-full flex flex-col items-center justify-center p-4">
          <!-- 这里的图片建议换成真实的图片URL，如果没有，先用色块代替 -->
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-red-900 to-stone-800 mb-4 shadow-lg group-hover:scale-110 transition-transform"></div>
          <h3 class="font-shanhai text-stone-300 text-lg">{{ item.name }}</h3>
          <p class="text-xs text-stone-600 mt-1">{{ item.category }}</p>
        </div>

        <!-- 未解锁状态 (Lock) -->
        <div v-else class="w-full h-full flex flex-col items-center justify-center opacity-30">
          <div class="w-20 h-20 rounded-full bg-stone-800 mb-4 flex items-center justify-center">
            <span class="text-2xl">🔒</span>
          </div>
          <h3 class="font-shanhai text-stone-500">???</h3>
        </div>

        <!-- 装饰角标 -->
        <div v-if="item.isUnlocked" class="absolute top-2 right-2 w-2 h-2 bg-green-900 rounded-full shadow-[0_0_5px_#10b981]"></div>
      </div>
    </div>
  </div>
</template>
