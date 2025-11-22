<script setup>
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const props = defineProps(['data'])
const router = useRouter()

const goToDetail = () => {
  router.push({ name: 'Detail', params: { id: props.data.id } })
}

// 统一读取图片字段：优先用 Explore 规范化后的 imageUrl
const imgSrc = computed(() => props.data?.imageUrl || props.data?.image || '')

// 加载状态（防止第一次 src 为空后一直“记住失败”）
const loaded = ref(false)
const failed = ref(false)

watch(imgSrc, () => {
  loaded.value = false
  failed.value = false
})

const onLoad = () => {
  loaded.value = true
}
const onError = () => {
  failed.value = true
}

// 映射属性对应的颜色 (五行配色)
const typeColors = {
  火: 'text-red-500 border-red-900 bg-red-900/10',
  水: 'text-blue-400 border-blue-900 bg-blue-900/10',
  金: 'text-yellow-500 border-yellow-900 bg-yellow-900/10',
  木: 'text-emerald-400 border-emerald-900 bg-emerald-900/10',
  土: 'text-stone-400 border-stone-800 bg-stone-800/30',
  default: 'text-gray-400 border-gray-700 bg-gray-800/30'
}

const getTypeClass = (tag) => typeColors[tag] || typeColors.default
</script>

<template>
  <div
    @click="goToDetail"
    class="group relative flex flex-col bg-[#1c1c1c] border border-[#333] cursor-pointer overflow-hidden transition-all duration-500 hover:border-stone-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.1)] hover:-translate-y-2"
  >
    <!-- 1. 图片区域 -->
    <div class="relative w-full h-64 bg-[#111] overflow-hidden flex items-center justify-center">
      <!-- 背景装饰字 (由大变小动画) -->
      <span
        class="absolute text-9xl font-shanhai font-bold text-[#222] opacity-50 select-none transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12 group-hover:opacity-30"
      >
        {{ (data.name && data.name[0]) || '山' }}
      </span>

      <!-- 骨架屏（图片加载前的占位） -->
      <div
        v-if="!loaded && !failed && imgSrc"
        class="absolute inset-0 animate-pulse bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900"
      />

      <!-- 图片：关键是 :key + onLoad/onError -->
      <img
        v-if="imgSrc && !failed"
        :key="imgSrc"
        :src="imgSrc"
        :alt="data.name"
        @load="onLoad"
        @error="onError"
        class="relative z-10 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />

      <!-- 如果没图或加载失败，显示一个印章风格的占位 -->
      <div
        v-if="!imgSrc || failed"
        class="relative z-10 w-20 h-20 border-2 border-stone-700 rounded-full flex items-center justify-center"
      >
        <span class="font-shanhai text-2xl text-stone-500">无图</span>
      </div>

      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent opacity-80"></div>
    </div>

    <!-- 2. 信息区域 -->
    <div class="relative z-20 p-6 -mt-8">
      <div class="flex justify-between items-end mb-2">
        <h3
          class="text-2xl font-shanhai font-bold text-[#e5e5e5] tracking-widest group-hover:text-red-500 transition-colors"
        >
          {{ data.name }}
        </h3>
        <span class="text-xs text-stone-500 font-serif italic">{{ data.category }}</span>
      </div>

      <!-- 描述 -->
      <p class="text-sm text-gray-500 line-clamp-2 mb-4 font-serif leading-relaxed">
        {{ data.desc }}
      </p>

      <!-- 标签 (动态颜色) -->
      <div class="flex gap-2 flex-wrap">
        <span
          v-for="tag in data.tags"
          :key="tag"
          :class="`px-2 py-1 text-xs border rounded opacity-80 ${getTypeClass(tag)}`"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 装饰线条 -->
    <div
      class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
    ></div>
  </div>
</template>
