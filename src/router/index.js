import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Detail from '../views/Detail.vue'
import Summon from '../views/Summon.vue'
import Atlas from '../views/Atlas.vue'
import Collection from '../views/Collection.vue'
import Opening from '../views/Opening.vue'

const routes = [        
  { path: '/', name: 'Opening', component: Opening },
  { path: '/home', name: 'Home', component: Home },
  { path: '/explore', name: 'Explore', component: Explore },
  { path: '/beast/:id', name: 'Detail', component: Detail },
  { path: '/summon', name: 'Summon', component: Summon },
  { path: '/atlas', name: 'Atlas', component: Atlas },
  { path: '/collection', name: 'Collection', component: Collection },
  { path: '/detail/:id', redirect: { name: 'Detail' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router