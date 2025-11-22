import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Detail from '../views/Detail.vue'
import Summon from '../views/Summon.vue'
import Atlas from '../views/Atlas.vue'
import Collection from '../views/Collection.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/explore', component: Explore },
  { path: '/beast/:id', component: Detail, name: 'Detail' }, // 动态路由
  { path: '/summon', name: 'Summon', component: Summon },
  { path: '/atlas', name: 'Atlas', component: Atlas },
  { path: '/collection', name: 'Collection', component: Collection },
  { path: '/detail/:id', name: 'Detail', component: () => import('../views/Detail.vue') },
  {path: '/atlas',name: 'Atlas',component: () => import('../views/Atlas.vue')
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
