<template>
  <BaseDashboardCard>
    <template #search>
      <SearchBar :result-count="filteredWeatherList.length" @search="handleSearch" />
    </template>

    <template #weather>
      <WeatherList
        :filtered-weather-list="filteredWeatherList"
        @detail="moveToDetail"
        @select="handleSelectCard"
      />
    </template>
  </BaseDashboardCard>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherList from '@/components/exercise/WeatherList.vue'

const router = useRouter()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', isFavorite: false, isDetailShow: false },
  { id: 'city_02', name: '수원', temp: 24, status: '비', isFavorite: false, isDetailShow: false },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', isFavorite: false, isDetailShow: false },
  { id: 'city_04', name: '인천', temp: 29, status: '흐림', isFavorite: false, isDetailShow: false },
  { id: 'city_05', name: '광주', temp: 26, status: '맑음', isFavorite: false, isDetailShow: false },
])

const filteredWeatherList = ref([...weatherList.value])

const moveToDetail = (id) => {
  router.push('/weather/' + id)
}

const handleSelectCard = (id) => {
  const selectedItem = weatherList.value.find((item) => item.id === id)
  if (selectedItem) selectedItem.isFavorite = !selectedItem.isFavorite
}

const handleSearch = (keyword) => {
  if (!keyword) {
    filteredWeatherList.value = weatherList.value
    return
  }

  filteredWeatherList.value = weatherList.value.filter(
    (item) => item.name.includes(keyword) || item.status.includes(keyword),
  )
}
</script>
