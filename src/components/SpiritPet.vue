<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

/* 跟随坐标 */
const pos = reactive({ x: -100, y: -100 })

/* 是否静止（歪头） */
const idle = ref(false)

let tailContainer = null
let idleChecker = null

onMounted(() => {
  tailContainer = document.getElementById('tail-container')
  let lastMove = Date.now()

  /* 鼠标移动跟随 */
  const move = (e) => {
    lastMove = Date.now()
    idle.value = false

    gsap.to(pos, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.28,
      ease: 'power3.out',
      onUpdate: () => spawnTail(pos.x, pos.y)
    })
  }

  window.addEventListener('mousemove', move)

  /* 静止检测 */
  idleChecker = setInterval(() => {
    if (Date.now() - lastMove > 1200) {
      idle.value = true
    }
  }, 300)

  /* 悬浮自然摇动 */
  gsap.to('.mini-pet-img', {
    y: '-6px',
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', move)
    clearInterval(idleChecker)
  })
})

/* 点击跳一下 */
const jump = () => {
  gsap.to('.mini-pet-img', {
    y: '-20px',
    duration: 0.18,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out'
  })
}

/* 拖尾光点 */
function spawnTail(x, y) {
  if (!tailContainer) return
  const dot = document.createElement('div')
  dot.className = 'tail-dot'
  dot.style.left = x + 'px'
  dot.style.top = y + 'px'
  tailContainer.appendChild(dot)

  gsap.to(dot, {
    opacity: 0,
    scale: 0,
    duration: 0.6,
    ease: 'power1.out',
    onComplete: () => dot.remove()
  })
}
</script>

<template>
  <!-- 拖尾容器（不会挡鼠标） -->
  <div id="tail-container" class="pointer-events-none fixed inset-0 z-[9980]"></div>

  <!-- 小神兽容器：完全不会挡鼠标 -->
  <div
    class="fixed z-[9999] pointer-events-none"
    :style="{
      left: (pos.x+50) + 'px',
      top: (pos.y+60) + 'px',
      transform: 'translate(-50%, -50%)'
    }"
  >
    <!-- 小神兽图片：只有图片本体可以点 -->
    <img
      src="/images/pet/mini-spirit.png"
      class="mini-pet-img pointer-events-auto"
      :class="{ 'is-idle': idle }"
      @click.stop="jump"  
    />
  </div>
</template>

<style scoped>
/* S 尺寸 */
.mini-pet-img {
  width: 70px;
  cursor: pointer;
  filter: drop-shadow(0 0 10px rgba(255, 160, 160, 0.7));
  transition: filter 0.3s, transform 0.3s;
  animation: breathe 2.5s ease-in-out infinite;
}

/* 鼠标停止时的歪头动作 */
.is-idle {
  transform: rotate(-10deg) scale(1.06);
  filter: drop-shadow(0 0 16px rgba(255, 100, 100, 0.9));
}

/* 拖尾光点 */
.tail-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: rgba(255, 120, 120, 0.55);
  border-radius: 50%;
  filter: blur(2px);
  pointer-events: none;
  transform: translate(-50%, -50%);
}

/* 呼吸发光 */
@keyframes breathe {
  0% { filter: drop-shadow(0 0 8px rgba(255, 140, 140, 0.4)); }
  50% { filter: drop-shadow(0 0 20px rgba(255, 60, 60, 0.9)); }
  100% { filter: drop-shadow(0 0 8px rgba(255, 140, 140, 0.4)); }
}
</style>
