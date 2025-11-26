import { createRouter, createWebHistory } from 'vue-router'

const introKey = 'shanhai:intro-played'

const routes = [
  { path: '/', name: 'Opening', component: () => import('../views/Opening.vue') },
  { path: '/home', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/explore', name: 'Explore', component: () => import('../views/Explore.vue') },
  {
    path: '/beast/:id',
    name: 'Detail',
    alias: '/detail/:id',
    component: () => import('../views/Detail.vue')
  },
  { path: '/summon', name: 'Summon', component: () => import('../views/Summon.vue') },
  { path: '/atlas', name: 'Atlas', component: () => import('../views/Atlas.vue') },
  { path: '/collection', name: 'Collection', component: () => import('../views/Collection.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({ history: createWebHistory(), routes })

const hasPlayedIntro = () => {
  if (typeof window === 'undefined') return true
  return window.localStorage.getItem(introKey) === 'true'
}

router.beforeEach((to) => {
  // 首次进入站点时强制先播放开场动画
  if (to.name !== 'Opening' && !hasPlayedIntro()) {
    return { name: 'Opening', replace: true }
  }
})

export default router
