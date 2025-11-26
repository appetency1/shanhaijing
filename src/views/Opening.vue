<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { useRouter } from 'vue-router'

const router = useRouter()
const isPlaying = ref(false)

const playIntro = () => {
  if (isPlaying.value) return
  isPlaying.value = true

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('shanhai:intro-played', 'true')
      }
      router.push('/home')
    }
  })

  tl.to('.opening-rings', {
    scale: 1,
    opacity: 0.8,
    duration: 1.1
  })
    .to(
      '.opening-glow',
      {
        opacity: 0.85,
        scale: 1.15,
        duration: 1.3,
        filter: 'blur(0px)'
      },
      '-=0.7'
    )
    .to(
      '.opening-title',
      {
        y: 0,
        opacity: 1,
        duration: 1.2
      },
      '-=0.8'
    )
    .to(
      '.opening-sub',
      {
        opacity: 1,
        y: 0,
        duration: 0.9
      },
      '-=0.7'
    )
    .to(
      '.opening-veil',
      {
        opacity: 0,
        duration: 0.8
      },
      '-=0.5'
    )
}

onMounted(() => {
  gsap.set('.opening-rings', { scale: 0.7, opacity: 0 })
  gsap.set('.opening-glow', { opacity: 0, scale: 0.9, filter: 'blur(12px)' })
  gsap.set('.opening-title', { y: 20, opacity: 0 })
  gsap.set('.opening-sub', { y: 10, opacity: 0 })
})
</script>

<template>
  <section class="relative min-h-screen bg-[#05060f] overflow-hidden text-stone-100">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.15),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(94,234,212,0.12),transparent_45%)]"></div>
    <div class="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>

    <div class="absolute inset-0 flex items-center justify-center">
      <div class="relative w-[420px] h-[420px] max-w-[78vw]">
        <div class="opening-rings absolute inset-10 border border-cyan-500/40 rounded-full blur-[1px]"></div>
        <div class="opening-rings absolute inset-3 border border-blue-400/30 rounded-full"></div>
        <div class="opening-glow absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.28),rgba(15,23,42,0.6))]"></div>
      </div>
    </div>

    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 text-center px-6">
      <p class="text-xs tracking-[0.45em] text-stone-500 font-serif">OPENING CHANT</p>
      <div class="opening-title text-4xl md:text-6xl font-shanhaigu tracking-[0.35em] drop-shadow-[0_0_26px_rgba(59,130,246,0.55)]">
        山海序曲
      </div>
      <p class="opening-sub text-sm md:text-base text-stone-400 max-w-xl leading-relaxed">
        静候山川气息聚拢，唤醒异兽之梦。点击下方印记，开启山海之门。
      </p>

      <button
        class="relative mt-8 px-10 py-4 text-sm md:text-base tracking-[0.3em] font-serif uppercase text-slate-100"
        @click="playIntro"
        :disabled="isPlaying"
      >
        <span
          class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/50 via-cyan-400/60 to-emerald-300/50 blur-xl opacity-60"
          aria-hidden="true"
        ></span>
        <span
          class="opening-veil absolute inset-0 rounded-full border border-cyan-400/40 bg-slate-900/60 backdrop-blur-md transition-all duration-700"
          :class="{ 'opacity-40': isPlaying }"
          aria-hidden="true"
        ></span>
        <span class="relative z-10">进入山海</span>
      </button>

      <div class="text-xs text-stone-500 font-serif mt-6">Click to begin · 山海将启</div>
    </div>
  </section>
</template>

<style scoped>
button:disabled {
  cursor: wait;
}
</style>