<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 7 个整屏 section
const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'intro', label: 'INTRO' },
  { id: 'geography', label: 'GEO' },
  { id: 'beast-jiuweihu', label: 'JWH' },
  { id: 'beast-taotie', label: 'TT' },
  { id: 'beast-yinglong', label: 'YL' },
  { id: 'ending', label: 'END' }
]

const activeIndex = ref(0)
const triggers = []

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const navOffset = 80
  const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset
  window.scrollTo({ top, behavior: 'smooth' })
}

onMounted(async () => {
  await nextTick()

  // 首屏入场
  const tl = gsap.timeline()
  tl.from('.hero-bg-layer', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: 'power3.out'
  })
    .from(
      '.hero-title-main',
      { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out' },
      '-=0.8'
    )
    .from(
      '.hero-subtitle',
      { y: 20, opacity: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.7'
    )

  // 每个整屏 page 的切换动画（滚到中间时淡入上浮）
  const pages = gsap.utils.toArray('.page-section')
  pages.forEach((el, i) => {
    if (i === 0) return // 首屏已经有单独动画
    gsap.from(el, {
      opacity: 0,
      y: 80,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top center',
        toggleActions: 'play reverse play reverse'
      }
    })
  })

  // 左侧导航高亮当前页面
  sections.forEach((s, i) => {
    const el = document.getElementById(s.id)
    if (!el) return
    const t = ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => (activeIndex.value = i),
      onEnterBack: () => (activeIndex.value = i)
    })
    triggers.push(t)
  })
})

onBeforeUnmount(() => {
  triggers.forEach((t) => t.kill())
})
</script>

<template>
  <div class="relative min-h-screen bg-[#050507] text-stone-200 overflow-hidden">
    <!-- 噪点背景 -->
    <div
      class="pointer-events-none fixed inset-0 opacity-30"
      style="background-image: url('https://grainy-gradients.vercel.app/noise.svg'); mix-blend-mode: soft-light;"
    ></div>

    <!-- 左侧导航：当前为圆，其他为菱形 -->
    <div class="left-rail hidden md:flex">
      <button
        v-for="(s, i) in sections"
        :key="s.id"
        class="rail-item"
        :class="{ active: activeIndex === i }"
        @click="scrollToSection(s.id)"
        :aria-label="`Scroll to ${s.label}`"
      >
        <span v-if="activeIndex === i" class="nav-orb"></span>
        <span v-else class="diamond"></span>
      </button>
    </div>

    <!-- 顶部导航 -->
    <nav
      class="relative z-20 flex items-center justify-between px-6 md:px-12 pt-5 text-xs md:text-sm tracking-[0.25em] text-stone-400 font-serif"
    >
      <router-link to="/home" class="flex items-center gap-2 uppercase">
        <span class="w-6 h-[1px] bg-stone-500"></span>
        <span>SHAN HAI JING</span>
      </router-link>

      <div class="hidden md:flex items-center gap-8">
        <router-link to="/explore" class="hover:text-stone-100 transition-colors">
          圖鑑
        </router-link>
        <router-link to="/atlas" class="hover:text-stone-100 transition-colors">
          山海圖
        </router-link>
        <router-link to="/summon" class="hover:text-stone-100 transition-colors">
          召喚
        </router-link>
      </div>
    </nav>

    <!-- 1️⃣ HERO -->
    <section
      id="hero"
      class="page-section relative z-10 h-screen flex items-center justify-center px-6 md:px-16"
    >
      <!-- 背景层：首屏专用 -->
      <div class="absolute inset-0 overflow-hidden hero-bg-layer -z-10">
        <!-- 背景图片：HOME -->
        <div
          class="absolute inset-0 bg-cover bg-center opacity-70"
          style="background-image: url('/images/backgrounds/hero.jpg');"
        ></div>
        <!-- 渐变叠加 -->
        <div
          class="absolute inset-0 
            bg-[radial-gradient(circle_at_50%_0,rgba(30,64,175,0.3),transparent_60%),
                 radial-gradient(circle_at_20%_80%,rgba(15,23,42,0.8),transparent_55%),
                 radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.8),transparent_55%)]"
        ></div>

        <div
          class="absolute bottom-0 left-0 right-0 h-[30%]
                 bg-[radial-gradient(circle_at_10%_0,rgba(15,23,42,0.8),transparent_55%),radial-gradient(circle_at_90%_0,rgba(15,23,42,0.8),transparent_55%)]"
        ></div>

        <!-- 云雾 -->
        <div class="pointer-events-none absolute inset-0 mix-blend-screen opacity-70">
          <div class="fog-strip fog-strip-top"></div>
          <div class="fog-strip fog-strip-bottom"></div>
        </div>
      </div>

      <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl w-full">
        <div class="flex-1 flex justify-center md:justify-start">
          <div class="flex gap-8 writing-vertical hero-title-main select-none">
            <span
              class="font-shanhaigu text-5xl md:text-7xl tracking-[0.3em] text-stone-100
                     drop-shadow-[0_0_18px_rgba(248,250,252,0.5)]"
            >山</span>
            <span
              class="font-shanhaigu text-5xl md:text-7xl tracking-[0.3em] text-stone-100
                     drop-shadow-[0_0_18px_rgba(248,250,252,0.5)]"
            >海</span>
            <span
              class="font-shanhaigu text-5xl md:text-7xl tracking-[0.3em] text-red-500
                     drop-shadow-[0_0_30px_rgba(248,113,113,0.9)]"
            >經</span>
          </div>
        </div>

        <div class="flex-1 hero-subtitle max-w-xl">
          <p class="text-xs md:text-sm tracking-[0.3em] text-stone-400 font-serif mb-4 uppercase">
            RECORD OF MOUNTAINS & SEAS
          </p>
          <h2 class="text-xl md:text-2xl text-stone-100 font-serif mb-4 leading-relaxed">
            「中國最早的地理志，<br class="hidden md:block" />亦是最古老的奇幻圖鑑。」
          </h2>
          <p class="text-sm text-stone-400 font-serif leading-relaxed mb-6">
            《山海經》囊括山川、河海、異獸、神祇與方國傳說——所記之地，未必真有；所載之獸，皆可入夢。
          </p>
          <p class="text-xs text-stone-500 font-serif leading-relaxed">
            將它視作一部「世界觀設定集」：山川是坐標，異獸是標記，人與神在其間行走。
          </p>
        </div>
      </div>
    </section>

    <!-- 2️⃣ INTRO -->
    <section
      id="intro"
      class="page-section relative z-10 min-h-screen flex items-center"
    >
      <!-- 背景：INTRO -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-65"
          style="background-image: url('/images/backgrounds/intro.jpg');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 md:px-12 py-16 w-full">
        <div class="grid md:grid-cols-3 gap-10 items-start">
          <div class="md:col-span-2">
            <p class="text-xs tracking-[0.3em] text-stone-300 font-serif mb-3 uppercase">INTRODUCTION</p>
            <h3 class="text-xl md:text-2xl font-shanhaigu tracking-[0.25em] mb-6">
              何 為 《 山 海 經 》
            </h3>
            <p class="text-sm text-stone-200/90 font-serif leading-relaxed mb-3">
              相傳成書於先秦至漢代之間，由多部山川記錄與神話傳說輯佚而成。全書分為《山經》《海經》等篇，故名「山海」——兼具地理志、志怪錄、族譜與圖鑑之性質。
            </p>
            <p class="text-sm text-stone-200/90 font-serif leading-relaxed mb-3">
              其中既有對山川走向、河流源流的精細記述，也有對異獸、神人、怪國的奇詭描寫。後世無數作品，如《封神》《西游》《聊齋》，皆或多或少受其啟發。
            </p>
            <p class="text-sm text-stone-200/90 font-serif leading-relaxed">
              在這裡，我們暫時拋下考證，把它視為一套「上古奇幻世界設定集」來閱讀。
            </p>
          </div>

          <div
            class="relative h-full rounded-3xl border border-stone-700/80 bg-black/55 backdrop-blur-sm p-5 flex flex-col justify-between"
          >
            <div>
              <p class="text-xs tracking-[0.3em] text-stone-300 font-serif mb-3 uppercase">OVERVIEW</p>
              <ul class="space-y-2 text-xs text-stone-100/90 font-serif">
                <li>· 成書：大致在先秦 - 西漢之間</li>
                <li>· 結構：《山經》《海經》等篇章</li>
                <li>· 涵蓋：山川 / 水系 / 異獸 / 神話 / 方國</li>
                <li>· 性質：地理志 / 神話志 / 志怪錄 交織</li>
              </ul>
            </div>
            <div class="mt-6 text-[10px] text-stone-300 font-serif">
              <span class="inline-block w-10 h-[1px] bg-stone-400 mr-2"></span>
              本站以「圖鑑」與「地圖」之形，為這部古籍搭建一個可遊走的想像空間。
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3️⃣ GEOGRAPHY -->
    <section
      id="geography"
      class="page-section relative z-10 min-h-screen flex items-center"
    >
      <!-- 背景：GEOGRAPHY -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-70"
          style="background-image: url('/images/backgrounds/geography.jpg');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 md:px-12 py-16 w-full">
        <div class="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p class="text-xs tracking-[0.3em] text-stone-300 font-serif mb-3 uppercase">GEOGRAPHY</p>
            <h3 class="text-xl md:text-2xl font-shanhaigu tracking-[0.25em] mb-6">
              山 海 四 極 · 五 方 世 界
            </h3>
            <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-3">
              《山海經》的世界，以「四極、五方」為骨架：東有滄海，西有流沙，南北多奇山大澤，其中又以《五藏山經》記山脈為主。
            </p>
            <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-3">
              它更像是一張上古的「遊戲世界地圖」：每一座山、每一條水系，皆是關於某種神獸、某位神祇，或某個族群的線索。
            </p>
            <p class="text-sm text-stone-100/90 font-serif leading-relaxed">
              若把它視作開放世界遊戲的底圖，那麼每一卷篇章，便是一條可以被觸發的任務線。
            </p>
          </div>

          <div
            class="relative rounded-3xl border border-stone-700/80 bg-black/55 backdrop-blur-sm p-6 flex flex-col"
          >
            <div class="flex-1 grid grid-cols-2 gap-4 text-xs text-stone-100 font-serif">
              <div>
                <p class="text-stone-400 mb-1">東 方</p>
                <p class="text-[11px] leading-relaxed">
                  多海與日出之地，常與扶桑、朝陽、鳥族與羽族神祇相關。
                </p>
              </div>
              <div>
                <p class="text-stone-400 mb-1">西 方</p>
                <p class="text-[11px] leading-relaxed">
                  多流沙與幽都之境，常見金石之山、刑罰與冥界意象。
                </p>
              </div>
              <div>
                <p class="text-stone-400 mb-1">南 方</p>
                <p class="text-[11px] leading-relaxed">
                  山多而高，炎熱潮濕，鳥獸繁盛，亦有眾多毒蟲與疫瘴。
                </p>
              </div>
              <div>
                <p class="text-stone-400 mb-1">北 方</p>
                <p class="text-[11px] leading-relaxed">
                  多寒境與大澤，荒遠而怪異，常為兇獸與異族出沒之所。
                </p>
              </div>
            </div>

            <div class="mt-6 text-[10px] text-stone-300 font-serif">
              這些方位與地名，未必指向具體坐標，更像是對未知世界的情緒標籤。
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4️⃣ 神兽 1：九尾狐 -->
    <section
      id="beast-jiuweihu"
      class="page-section relative z-10 min-h-screen flex items-center"
    >
      <!-- 背景：九尾狐 -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-70"
          style="background-image: url('/images/backgrounds/beast-jiuweihu.jpg');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 md:px-12 py-16 w-full flex flex-col md:flex-row items-center gap-10">
        <div class="flex-1">
          <p class="text-xs tracking-[0.3em] text-red-300 font-serif mb-3 uppercase">SPIRIT BEAST</p>
          <h3 class="text-2xl md:text-3xl font-shanhaigu tracking-[0.35em] mb-4">九 尾 狐</h3>
          <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
            出自《南山經》等記載。其形如狐而九尾，性溫馴，鳴聲如嬰兒，食之可禦百毒。原典中的九尾狐，更接近一種帶有靈性的瑞獸。
          </p>
          <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
            九尾象徵多變與魅惑，也隱含「福壽綿長」之意。它多棲於山川交界、煙霞縈繞之地，是邊界與迷霧的守望者。
          </p>
        </div>

        <div class="flex-1 flex items-center justify-center">
          <div class="relative w-full max-w-md">
            <div class="relative aspect-[3/4] overflow-hidden bg-transparent">
              <img src="/images/beasts/fox.png" alt="九尾狐" class="w-full h-full object-cover" />
              <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(circle at center, rgba(5,5,7,0) 45%, rgba(5,5,7,0.5) 72%, rgba(5,5,7,0.9) 100%);"
              ></div>
            </div>

            <div class="mt-3 h-24 relative overflow-hidden">
              <img src="/images/beasts/fox.png" alt="九尾狐镜像" class="w-full h-full object-cover scale-y-[-1]" />
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, rgba(5,5,7,0.6), rgba(5,5,7,1));"></div>
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(circle at center, rgba(5,5,7,0.1) 20%, rgba(5,5,7,0.6) 70%, rgba(5,5,7,1) 100%);"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5️⃣ 神兽 2：饕餮 -->
    <section
      id="beast-taotie"
      class="page-section relative z-10 min-h-screen flex items-center"
    >
      <!-- 背景：饕餮 -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-70"
          style="background-image: url('/images/backgrounds/beast-taotie.jpg');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 md:px-12 py-16 w-full flex flex-col md:flex-row-reverse items-center gap-10">
        <div class="flex-1">
          <p class="text-xs tracking-[0.3em] text-amber-300 font-serif mb-3 uppercase">FEROCIOUS BEAST</p>
          <h3 class="text-2xl md:text-3xl font-shanhaigu tracking-[0.35em] mb-4">饕 餮</h3>
          <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
            常被列為「四凶」之一。形象多見於青銅器紋飾：大口欲噬，雙目聚於面上，幾乎看不到軀幹。後世將其視為「貪食之獸」，但更深層的含義是無度膨脹的欲望本身。
          </p>
          <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
            在山海世界中，它出沒於邊界、禁區或刑罰之所，是「不可逾越」與「吞噬一切」的象徵。
          </p>
        </div>

        <div class="flex-1 flex items-center justify-center">
          <div class="relative w-full max-w-md">
            <div class="relative aspect-[3/4] overflow-hidden bg-transparent">
              <img src="/images/beasts/taotie.png" alt="饕餮" class="w-full h-full object-cover" />
              <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(circle at center, rgba(5,5,7,0) 45%, rgba(5,5,7,0.5) 72%, rgba(5,5,7,0.9) 100%);"
              ></div>
            </div>

            <div class="mt-3 h-24 relative overflow-hidden">
              <img src="/images/beasts/taotie.png" alt="饕餮镜像" class="w-full h-full object-cover scale-y-[-1]" />
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, rgba(5,5,7,0.6), rgba(5,5,7,1));"></div>
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(circle at center, rgba(5,5,7,0.1) 20%, rgba(5,5,7,0.6) 70%, rgba(5,5,7,1) 100%);"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6️⃣ 神兽 3：应龙 -->
    <section
      id="beast-yinglong"
      class="page-section relative z-10 min-h-screen flex items-center"
    >
      <!-- 背景：應龍 -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-70"
          style="background-image: url('/images/beasts/yinglong1.png');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 md:px-12 py-16 w-full flex flex-col md:flex-row items-center gap-10">
        <div class="flex-1">
          <p class="text-xs tracking-[0.3em] text-sky-300 font-serif mb-3 uppercase">DIVINE DRAGON</p>
          <h3 class="text-2xl md:text-3xl font-shanhaigu tracking-[0.35em] mb-4">應 龍</h3>
          <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
            有翼之龍，曾助禹導水，與蚩尤、共工相戰。既是戰神般的存在，又與治水、開疆有關——一方面象徵武力與威嚴，另一方面又承載秩序與功勳。
          </p>
          <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
            在許多後世再創作中，應龍常被視作「終局」或「轉折」性的角色：只在局勢失衡之際現身，一次出手便改寫世界走向。
          </p>
        </div>

        <div class="flex-1 flex items-center justify-center">
          <div class="relative w-full max-w-md">
            <div class="relative aspect-[3/4] overflow-hidden bg-transparent">
              <img src="/images/beasts/yinglong1.png" alt="應龍" class="w-full h-full object-cover" />
              <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(circle at center, rgba(5,5,7,0) 45%, rgba(5,5,7,0.5) 72%, rgba(5,5,7,0.9) 100%);"
              ></div>
            </div>

            <div class="mt-3 h-24 relative overflow-hidden">
              <img src="/images/beasts/yinglong1.png" alt="應龍镜像" class="w-full h-full object-cover scale-y-[-1]" />
              <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, rgba(5,5,7,0.6), rgba(5,5,7,1));"></div>
              <div
                class="absolute inset-0 pointer-events-none"
                style="background: radial-gradient(circle at center, rgba(5,5,7,0.1) 20%, rgba(5,5,7,0.6) 70%, rgba(5,5,7,1) 100%);"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7️⃣ ENDING -->
    <section
      id="ending"
      class="page-section relative z-10 min-h-screen flex items-center"
    >
      <!-- 背景：ENDING -->
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-70"
          style="background-image: url('/images/backgrounds/ending.jpg');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-6 md:px-12 py-16 w-full text-center">
        <p class="text-xs tracking-[0.3em] text-stone-300 font-serif mb-3 uppercase">
          EPILOGUE
        </p>
        <h3 class="text-2xl md:text-3xl font-shanhaigu tracking-[0.3em] mb-6">
          山 海 未 竟 · 待 君 補 全
        </h3>
        <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-4">
          《山海經》從未真正「完結」。每一次轉述、每一次再創作，都是在這張殘缺的世界地圖上補畫新的山與海。
        </p>
        <p class="text-sm text-stone-100/90 font-serif leading-relaxed mb-8">
          接下來，你可以從「圖鑑」進入異獸的細部設定，也可以打開「山海圖」，在一張抽象的地圖上尋找牠們的棲息地。
        </p>

        <div class="flex flex-wrap justify-center gap-4 text-xs font-serif tracking-[0.25em]">
          <router-link
            to="/explore"
            class="px-6 py-3 rounded-full border border-stone-400/70 hover:border-stone-100 hover:text-stone-100 bg-black/40 backdrop-blur-sm transition-colors"
          >
            進 入 圖 鑑
          </router-link>
          <router-link
            to="/atlas"
            class="px-6 py-3 rounded-full border border-stone-400/70 hover:border-stone-100 hover:text-stone-100 bg-black/40 backdrop-blur-sm transition-colors"
          >
            展 開 山 海 圖
          </router-link>
        </div>

        <div class="mt-12 text-[10px] text-stone-300 font-serif tracking-[0.2em]">
          © 山海計劃 · 此處所有設計與二次創作，皆以《山海經》為靈感來源。
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
}

/* 云雾条带 */
.fog-strip {
  position: absolute;
  left: -20%;
  right: -20%;
  height: 180px;
  background: radial-gradient(circle at 50% 50%, rgba(148, 163, 184, 0.7), transparent 60%);
  filter: blur(16px);
  opacity: 0.45;
  pointer-events: none;
}
.fog-strip-top {
  top: 5%;
  animation: fogSlide 40s linear infinite;
}
.fog-strip-bottom {
  bottom: 0;
  animation: fogSlide 50s linear infinite reverse;
}
@keyframes fogSlide {
  0% { transform: translateX(0); }
  50% { transform: translateX(80px); }
  100% { transform: translateX(0); }
}

/* 整屏页面：配合 scroll-snap 做整页切换手感 */
.page-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* 左侧导航：当前圆，其余菱形 */
.left-rail {
  position: fixed;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  opacity: 0.9;
  mix-blend-mode: screen;
}

.rail-item {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  opacity: 0.6;
  transition: transform 0.25s ease, opacity 0.25s ease, filter 0.25s ease;
}

.rail-item:hover {
  opacity: 1;
  transform: translateX(2px);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.45));
}

.rail-item.active {
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.85));
}

/* 默认菱形 */
.diamond {
  width: 9px;
  height: 9px;
  border-radius: 1.5px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  transform: rotate(45deg);
  background: rgba(255, 255, 255, 0.02);
}

/* 当前页面圆形 */
.nav-orb {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 1px solid rgba(250, 250, 250, 1);
  box-shadow:
    0 0 8px rgba(248, 250, 252, 0.9),
    0 0 20px rgba(248, 250, 252, 0.6);
  background: radial-gradient(circle at 30% 30%, rgba(248, 250, 252, 1), rgba(15, 23, 42, 1));
}

/* 小屏隐藏导航 */
@media (max-width: 767px) {
  .left-rail { display: none; }
}

/* 全局 scroll-snap：让 7 个页面像翻页一样切换 */
:global(html),
:global(body) {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}
</style>
