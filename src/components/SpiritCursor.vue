<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorRef = ref(null)
const followerRef = ref(null)

const moveCursor = (e) => {
  // 1. 主光点：紧跟鼠标，无延迟
  gsap.to(cursorRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out'
  })

  // 2. 拖尾光晕：有延迟，产生飘逸感
  gsap.to(followerRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.6,
    ease: 'power3.out'
  })
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor)
  
  // 呼吸动画
  gsap.to(followerRef.value, {
    scale: 1.5,
    opacity: 0.3,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen overflow-hidden">
    <!-- 拖尾光晕 (大而虚) -->
    <div ref="followerRef" class="absolute w-12 h-12 -mt-6 -ml-6 rounded-full bg-red-600 blur-[20px] opacity-40"></div>
    
    <!-- 核心光点 (小而实) -->
    <div ref="cursorRef" class="absolute w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-amber-100 shadow-[0_0_10px_rgba(255,200,0,0.8)]"></div>
  </div>
</template>
