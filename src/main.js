import { createApp } from 'vue'
import './style.css'  // 确保这行还在，这是 Tailwind 的样式入口
import App from './App.vue'
import router from './router' // 1. 引入我们刚才写好的路由配置

// 2. 创建应用 -> 使用路由 -> 挂载到页面
createApp(App)
  .use(router) 
  .mount('#app')
