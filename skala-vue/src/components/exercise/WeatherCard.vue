<template>
  <article class="weather-card" :class="{ 'weather-card--favorite': city.isFavorite }">
    <div class="weather-card__top">
      <h3>{{ city.name }}</h3>
      <span v-show="city.isFavorite" aria-label="즐겨찾기">⭐</span>
    </div>
    <p v-show="city.isDetailShow" class="weather-card__detail">
      <strong>{{ city.temp }}℃</strong>
      <span>{{ city.status }}</span>
    </p>
    <p v-show="!city.isDetailShow" class="weather-card__hint">상세보기를 눌러 날씨를 확인하세요.</p>
    <div class="weather-card__actions">
      <button type="button" @click="onSelectCard">즐겨찾기</button>
      <button type="button" class="secondary" @click="onClickDetail">상세보기</button>
    </div>
  </article>
</template>

<script setup>
const emit = defineEmits(['select', 'detail'])
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const onClickDetail = () => {
  emit('detail', props.city.name)
}

const onSelectCard = () => {
  emit('select', props.city.name)
}
</script>

<style scoped>
.weather-card {
  height: 100%;
  padding: 20px;
  border: 1px solid #334155;
  border-radius: 14px;
  background: #0f172a;
  transition: transform 0.2s, border-color 0.2s;
}

.weather-card:hover { transform: translateY(-3px); border-color: #64748b; }
.weather-card--favorite { border-color: #fbbf24; }
.weather-card__top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.weather-card h3 { margin: 0; color: #fff; font-size: 1.15rem; font-weight: 750; }
.weather-card__detail { display: flex; gap: 10px; align-items: baseline; margin: 18px 0; color: #94a3b8; }
.weather-card__detail strong { color: #6ee7b7; font-size: 1.8rem; }
.weather-card__hint { min-height: 50px; margin: 18px 0; color: #64748b; font-size: 0.82rem; }
.weather-card__actions { display: flex; gap: 8px; }
button { cursor: pointer; flex: 1; border: 0; border-radius: 8px; padding: 9px; color: #052e25; background: #6ee7b7; font-weight: 750; }
button.secondary { border: 1px solid #475569; color: #cbd5e1; background: transparent; }
</style>
