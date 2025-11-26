<script setup>
import { ref, computed } from 'vue'
import rawBeastData from '../data/beasts.json'
import BeastCard from '../components/BeastCard.vue'
import { useRoute } from 'vue-router'

/* 1️⃣ 统一图片路径，保证都是绝对路径 */
const normalizeImage = (p) => {
  if (!p) return ''
  return p.startsWith('/') ? p : '/' + p
}

/* 2️⃣ 规范化数据，统一用 imageUrl 字段 */
const beasts = ref(
  rawBeastData.map((item) => ({
    ...item,
    imageUrl: normalizeImage(item.imageUrl || item.image || '')
  }))
)

/* 3️⃣ 搜索 & 分类 */
const searchText = ref('')
const activeCategory = ref('全部')

const categories = ['全部', '南山经', '西山经', '北山经', '东山经']

const filteredBeasts = computed(() => {
  return beasts.value.filter((item) => {
    const matchCategory =
      activeCategory.value === '全部' || item.category === activeCategory.value

    const matchName =
      !searchText.value || item.name?.includes(searchText.value)

    return matchCategory && matchName
  })
})
</script>

<template>
  <div class="relative min-h-screen bg-[#050507] text-gray-200 pb-20 overflow-hidden">

    <!-- 背景图层 -->
    <div class="fixed inset-0 -z-10">
      <div
        class="absolute inset-0 bg-cover bg-center scale-110"
        style="background-image: url('/images/backgrounds/geography.jpg'); filter: saturate(0.82);"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90"></div>
      <div
        class="absolute inset-0 opacity-80 mix-blend-screen bg-[radial-gradient(circle_at_20%_25%,rgba(248,113,113,0.18),transparent_42%),radial-gradient(circle_at_80%_72%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_50%_6%,rgba(255,255,255,0.08),transparent_55%)]"
      ></div>
    </div>

    <!-- 噪点背景 -->
    <div
      class="fixed inset-0 opacity-20 pointer-events-none"
      style="background-image: url('/images/backgrounds/geography.jpg');"
    ></div>

    <!-- 顶部标题 -->
    <header class="relative pt-20 pb-8 text-center z-10">
      <h2 class="text-4xl md:text-5xl font-shanhai font-bold tracking-[0.2em] text-stone-200 mb-4">
        五藏山经
      </h2>
      <div class="w-24 h-1 bg-red-900 mx-auto"></div>
      <p class="mt-4 text-stone-500 font-serif text-sm">
        当前收录 · {{ filteredBeasts.length }} 只
      </p>
    </header>

    <!-- 搜索 + 分类 -->
    <div
      class="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
    >
      <!-- 分类 -->
      <div class="flex gap-2 flex-wrap justify-center">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="`px-4 py-1 rounded-full border transition text-sm font-serif ${
            activeCategory === cat
              ? 'bg-red-900 border-red-800 text-white'
              : 'border-stone-800 text-stone-500 hover:border-stone-600 bg-[#1a1a1a]'
          }`"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 搜索框 -->
      <div class="relative group">
        <input
          v-model="searchText"
          type="text"
          placeholder="寻觅异兽..."
          class="bg-[#1a1a1a] border border-stone-800 rounded-full py-2 px-6 pl-10 text-stone-300 focus:outline-none focus:border-red-800 focus:ring-1 focus:ring-red-900 w-64 transition-all"
        />
        <span
          class="absolute left-4 top-2.5 text-stone-600 group-focus-within:text-red-800 transition-colors"
          >🔍</span
        >
      </div>
    </div>

    <!-- 卡片区域 -->
    <main class="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      <!-- 有结果 -->
      <div
        v-if="filteredBeasts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <BeastCard
          v-for="item in filteredBeasts"
          :key="item.id"
          :data="item"
          class="beast-card"
        />
      </div>

      <!-- 无结果 -->
      <div v-else class="text-center py-20 text-stone-600">
        <p class="font-shanhai text-2xl">未寻得此兽踪迹</p>
        <p class="text-sm mt-2">请尝试切换分类或清除搜索词</p>
      </div>
    </main>

    <!-- 返回首页 -->
    <div class="fixed bottom-8 right-8 z-50">
      <router-link
        to="/home"
        class="flex items-center justify-center w-12 h-12 rounded-full bg-red-900/80 text-white hover:bg-red-700 transition shadow-lg border border-red-800 hover:scale-110"
      >
        <span class="font-shanhai text-sm">回</span>
      </router-link>
    </div>
  </div>
</template>
