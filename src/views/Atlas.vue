<script setup>
import { onMounted } from "vue"
import gsap from "gsap"

onMounted(() => {
  gsap.from('.atlas-hero-card', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power3.out'
  })

  gsap.to('.bg-parallax', {
    scale: 1.02,
    y: '-3%',
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#050507] text-stone-200 relative overflow-hidden">
    <!-- Background: paper + glow -->
    <div class="absolute inset-0 -z-20 overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center bg-parallax"
        style="background-image: url('/images/backgrounds/intro.jpg'); filter: saturate(0.9) brightness(0.9);"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90"></div>
      <div
        class="absolute inset-0 mix-blend-screen opacity-70"
        style="background-image:
          radial-gradient(circle at 20% 15%, rgba(248,113,113,0.16), transparent 45%),
          radial-gradient(circle at 78% 82%, rgba(59,130,246,0.15), transparent 45%),
          radial-gradient(circle at 52% 40%, rgba(248,250,252,0.08), transparent 60%);"
      ></div>
    </div>

    <!-- Paper noise -->
    <div
      class="absolute inset-0 -z-10 pointer-events-none opacity-15"
      style="background-image: url('https://grainy-gradients.vercel.app/noise.svg'); mix-blend-mode: soft-light;"
    ></div>

    <!-- Starfield -->
    <div class="pointer-events-none absolute inset-0 opacity-30 z-0"
         style="background-image: radial-gradient(circle at 10% 0%, rgba(248,250,252,0.18) 0, transparent 55%),
                                  radial-gradient(circle at 90% 100%, rgba(248,250,252,0.14) 0, transparent 55%);">
    </div>

    <!-- Paper strips -->
    <div class="pointer-events-none absolute inset-0">
      <div class="paper-strip strip-left"></div>
      <div class="paper-strip strip-right"></div>
    </div>

    <!-- Fog mask -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="fog-layer fog-top"></div>
      <div class="fog-layer fog-bottom"></div>
      <div class="fog-layer fog-left"></div>
      <div class="fog-layer fog-right"></div>
    </div>

    <!-- Header -->
    <header class="relative z-10 pt-16 pb-6 text-center">
      <p class="text-xs tracking-[0.35em] text-stone-500 mb-2 font-serif">SHAN HAI ATLAS</p>
      <h1 class="text-3xl md:text-4xl font-shanhaigu tracking-[0.3em] mb-3">Atlas</h1>
      <p class="text-sm text-stone-500 font-serif">Map section is temporarily removed.</p>
    </header>

    <!-- Message card -->
    <main class="relative z-10 flex items-center justify-center px-4 pb-16">
      <div
        class="atlas-hero-card relative max-w-3xl w-full rounded-3xl border border-stone-800/80 bg-gradient-to-br from-[#0b0d12]/90 via-[#0a0c11]/85 to-[#050507]/90 shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden px-8 py-10"
      >
        <div class="paper-overlay"></div>
        <div class="relative space-y-4 text-center">
          <p class="text-base md:text-lg font-serif tracking-[0.12em] text-stone-200">
            The interactive map is offline for now and will return with a more immersive scroll/ink style.
          </p>
          <p class="text-sm text-stone-400 font-serif">
            You can still browse the bestiary or head back home.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-4 text-xs font-serif tracking-[0.2em]">
            <router-link
              to="/explore"
              class="px-5 py-3 rounded-full border border-stone-400/70 hover:border-stone-100 hover:text-stone-100 bg-black/40 backdrop-blur-sm transition-colors"
            >
              Explore
            </router-link>
            <router-link
              to="/home"
              class="px-5 py-3 rounded-full border border-stone-400/70 hover:border-stone-100 hover:text-stone-100 bg-black/40 backdrop-blur-sm transition-colors"
            >
              Home
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fog-layer {
  position: absolute;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, rgba(148,163,184,0.7), transparent 60%);
  filter: blur(18px);
  opacity: 0.35;
}

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

.paper-strip {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 18px;
  background: linear-gradient(180deg, rgba(248,113,113,0.22), rgba(251,191,36,0.12));
  opacity: 0.35;
}

.strip-left { left: 28px; }
.strip-right { right: 28px; }

.paper-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.07), transparent 45%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05), transparent 50%);
  mix-blend-mode: soft-light;
  opacity: 0.7;
}

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
