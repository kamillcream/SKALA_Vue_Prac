<template>
  <BaseDashboardCard>
    <template #search>
      <SearchBar :result-count="filteredWeatherList.length" @search="handleSearch" />
    </template>

    <template #weather>
      <WeatherList
        :filtered-weather-list="filteredWeatherList"
        @detail="handleDetailEvent"
        @select="handleSelectCard"
      />
    </template>
  </BaseDashboardCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherList from './WeatherList.vue'

const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음', isFavorite: false, isDetailShow: false },
    { id: 'city_02', name: '수원', temp: 24, status: '비', isFavorite: false, isDetailShow: false},
    { id: 'city_03', name: '부산', temp: 26, status: '구름', isFavorite: false, isDetailShow: false },
    { id: 'city_04', name: '인천', temp: 29, status: '흐림', isFavorite: false, isDetailShow: false },
    { id: 'city_05', name: '광주', temp: 26, status: '맑음', isFavorite: false, isDetailShow: false },
])

const filteredWeatherList = ref([...weatherList.value])

const handleDetailEvent = (name) => {
  const detailedItem = weatherList.value.find(
    (item) => item.name === name
  )

  if(detailedItem) {
    detailedItem.isDetailShow = !detailedItem.isDetailShow
  }
}

const handleSelectCard = (name) => {
  const selectedItem = weatherList.value.find(
    (item) => item.name === name
  )

  if (selectedItem) {
    selectedItem.isFavorite = !selectedItem.isFavorite
  }
}

const handleSearch = (keyword) => {
  if (!keyword) {
    filteredWeatherList.value = weatherList.value
    return
  }
  
  return filteredWeatherList.value = weatherList.value.filter(
    (item) =>
      item.name.includes(keyword) ||
      item.status.includes(keyword)
  )
}

</script>

<style scoped>
@media (max-width: 640px) {
  .weather-list { grid-template-columns: 1fr; }
}
</style>
