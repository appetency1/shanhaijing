<template>
  <div class="bamboo-note">
    <div class="note-header">
      <span class="dot"></span>
      <p class="title">{{ title }}</p>
    </div>
    <div class="body">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '竹简记录'
  },
  content: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.bamboo-note {
  background: linear-gradient(90deg, rgba(120, 53, 15, 0.2), rgba(234, 179, 8, 0.12), rgba(120, 53, 15, 0.2));
  border: 1px solid rgba(163, 98, 7, 0.4);
  border-radius: 14px;
  padding: 12px 14px;
  color: #e7e5e4;
  backdrop-filter: blur(6px);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 10px 30px rgba(0, 0, 0, 0.35);
}

.note-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'STKaiti', serif;
  letter-spacing: 0.16em;
  font-size: 12px;
  color: #fbbf24;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fef3c7, #f59e0b);
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
}

.body {
  font-family: 'LXGW WenKai', 'Times New Roman', serif;
  font-size: 12px;
  line-height: 1.8;
  color: #e7e5e4;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
}
</style>
