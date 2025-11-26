<template>
  <div class="log-panel">
    <header>
      <p class="eyebrow">探险日志</p>
      <p class="count">{{ entries.length }} 条</p>
    </header>
    <ul>
      <li v-for="(item, idx) in entries" :key="idx">
        <span class="time">{{ item.time }}</span>
        <span class="text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  entries: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.log-panel {
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(4, 6, 10, 0.92), rgba(38, 38, 38, 0.45));
  border: 1px solid rgba(148, 163, 184, 0.35);
  color: #e5e7eb;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 0.18em;
  color: #a5b4fc;
  font-family: 'STKaiti', serif;
}

.count {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

ul {
  display: grid;
  gap: 6px;
}

li {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 6px;
  font-size: 12px;
  letter-spacing: 0.04em;
  background: rgba(255, 255, 255, 0.02);
  padding: 6px 8px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.time {
  color: #fcd34d;
  font-family: 'IBM Plex Mono', monospace;
}

.text {
  color: #e2e8f0;
  line-height: 1.6;
  font-family: 'LXGW WenKai', 'Times New Roman', serif;
}
</style>
