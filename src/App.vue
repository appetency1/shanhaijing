<script setup>
// 这里是脚本区，必须在最外面，不能被 template 包裹
import SpiritCursor from './components/SpiritCursor.vue'
import SpiritPet from './components/SpiritPet.vue'

</script>

<template>
  <SpiritPet />

  <!-- 这里是 HTML 结构区 -->
  
  <!-- 1. 全局鼠标跟随特效 (挂载在最外层，所有页面都会有) -->
  <SpiritCursor />

  <!-- 2. 路由出口 (根据网址变化，这里会显示 Home.vue 或 Explore.vue 等) -->
  <router-view />
</template>

<style>
/* 这里是全局样式区 */
</style>
