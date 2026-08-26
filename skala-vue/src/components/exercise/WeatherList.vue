<template>
    <ul v-if="props.filteredWeatherList.length" class="weather-list">
        <li v-for="item in props.filteredWeatherList" :key="item.id">
          <WeatherCard :city="item" @detail="handleDetailEvent" @select="handleSelectCard" />
        </li>
    </ul>
    <p v-else class="empty-message">검색 결과가 없습니다.</p>
</template>

<script setup>
import { defineProps } from 'vue';
import WeatherCard from './WeatherCard.vue'
const props = defineProps({
    filteredWeatherList: {
        type: Array,
        required: true,
    }
})
const emit = defineEmits(['select', 'detail'])

const handleDetailEvent = (name) => {
  emit('detail', name)
}

const handleSelectCard = (name) => {
  emit('select', name)
}

console.log(props)

</script>

<style>
.weather-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.empty-message {
  margin: 0;
  padding: 28px;
  border: 1px dashed #475569;
  border-radius: 12px;
  color: #94a3b8;
  text-align: center;
}

</style>