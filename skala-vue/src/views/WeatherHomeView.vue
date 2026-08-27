<template>
  <BaseDashboardCard>
    <template #search>
      <div class="search-tools">
        <div class="search-tools__bar">
          <SearchBar :result-count="filteredWeatherList.length" @search="handleSearch" />
        </div>

        <div class="unit-control">
          <p class="unit-control__status">
            <span>현재 온도 단위</span>
            <strong>{{ currentUnit }}</strong>
          </p>
          <button type="button" class="unit-control__button" @click="toggle">
            {{ nextUnit }}로 변경
          </button>
        </div>
      </div>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherList from '@/components/exercise/WeatherList.vue'

const router = useRouter()
const configStore = useConfigStore()

const currentUnit = computed(() =>
  configStore.unit === 'celsius' ? '섭씨 (℃)' : '화씨 (℉)',
)

const nextUnit = computed(() => (configStore.unit === 'celsius' ? '화씨' : '섭씨'))

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

const toggle = () => {
  configStore.toggleUnit()
}
</script>

<style scoped>
.search-tools {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
}

.search-tools__bar {
  min-width: 0;
}

.unit-control {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 7px;
  border: 1px solid #475569;
  border-radius: 12px;
  background: #0f172a;
}

.unit-control__status {
  display: grid;
  gap: 1px;
  min-width: 112px;
  margin: 0;
  padding-left: 8px;
}

.unit-control__status span {
  color: #64748b;
  font-size: 0.68rem;
  font-weight: 650;
}

.unit-control__status strong {
  color: #f8fafc;
  font-size: 0.9rem;
  font-weight: 800;
}

.unit-control__button {
  cursor: pointer;
  border: 0;
  border-radius: 8px;
  padding: 10px 13px;
  color: #052e25;
  background: #6ee7b7;
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
  transition: background 0.2s, transform 0.2s;
}

.unit-control__button:hover {
  transform: translateY(-1px);
  background: #a7f3d0;
}

.unit-control__button:focus-visible {
  outline: 3px solid rgba(110, 231, 183, 0.25);
  outline-offset: 2px;
}

@media (max-width: 760px) {
  .search-tools {
    grid-template-columns: 1fr;
  }

  .unit-control {
    justify-content: space-between;
  }
}
</style>
