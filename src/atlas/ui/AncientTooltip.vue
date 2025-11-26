<template>
  <div class="tooltip" role="tooltip">
    <p class="label">{{ label }}</p>
    <p class="meta" v-if="meta">{{ meta }}</p>
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '原文摘录'
  },
  meta: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.tooltip {
  min-width: 180px;
  max-width: 260px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(248, 113, 113, 0.45);
  background: radial-gradient(circle at 30% 20%, rgba(248, 250, 252, 0.08), rgba(5, 5, 7, 0.9)),
              linear-gradient(135deg, rgba(127, 29, 29, 0.55), rgba(5, 5, 7, 0.95));
  color: #f8fafc;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.label {
  font-family: 'STKaiti', serif;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: #fecdd3;
  margin-bottom: 4px;
}

.meta {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #e2e8f0;
  margin-bottom: 6px;
  opacity: 0.8;
}

.slot {
  font-family: 'LXGW WenKai', 'Times New Roman', serif;
  font-size: 12px;
  line-height: 1.7;
  color: #f1f5f9;
}
</style>
