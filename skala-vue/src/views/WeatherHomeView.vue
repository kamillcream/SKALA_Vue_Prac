<template>
  <BaseDashboardCard>
    <template #search>
      <div class="search-tools">
        <div class="search-tools__bar">
          <div class="mode-switch">
            <p class="mode-switch__status">
              <span>현재 검색 모드</span>
              <strong>{{ mode }}</strong>
            </p>
            <button type="button" class="mode-switch__button" @click="modeToggle">
              <span aria-hidden="true">⇄</span>
              {{ mode === '리스트 검색' ? 'API 검색으로' : '리스트 검색으로' }}
            </button>
          </div>
          <SearchBar
            v-if="mode === '리스트 검색'"
            :result-count="filteredWeatherList.length"
            @search="handleSearch"
          />
          <GeocodeSearchBar v-if="mode === 'API 호출'" @search="handleGeoCodeApiSearch" />
          <el-card v-if="weather?.main" class="weather-result" shadow="hover">
            <template #header>
              <div class="weather-header">
                <div>
                  <el-tag type="info" effect="dark">
                    {{ weather.sys.country }}
                  </el-tag>

                  <h2>{{ weather.name }}</h2>
                </div>

                <el-image
                  :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
                  :alt="weather.weather[0].description"
                  fit="contain"
                />
              </div>
            </template>

            <div class="weather-current">
              <el-statistic title="현재 온도" :value="Math.round(weather.main.temp)" suffix="℃" />

              <div class="weather-status">
                <el-tag type="primary" size="large">
                  {{ weather.weather[0].description }}
                </el-tag>

                <el-text type="info"> 체감온도 {{ Math.round(weather.main.feels_like) }}℃ </el-text>
              </div>
            </div>

            <el-divider />

            <el-descriptions :column="2" border>
              <el-descriptions-item label="최저 온도">
                {{ Math.round(weather.main.temp_min) }}℃
              </el-descriptions-item>

              <el-descriptions-item label="최고 온도">
                {{ Math.round(weather.main.temp_max) }}℃
              </el-descriptions-item>

              <el-descriptions-item label="습도">
                <el-progress :percentage="weather.main.humidity" :stroke-width="10" />
              </el-descriptions-item>

              <el-descriptions-item label="구름">
                <el-progress :percentage="weather.clouds.all" :stroke-width="10" color="#94a3b8" />
              </el-descriptions-item>

              <el-descriptions-item label="풍속">
                {{ weather.wind.speed }}m/s
              </el-descriptions-item>

              <el-descriptions-item label="기압">
                {{ weather.main.pressure }}hPa
              </el-descriptions-item>

              <el-descriptions-item label="가시거리" :span="2">
                {{ (weather.visibility / 1000).toFixed(1) }}km
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
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
import axios from 'axios'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherList from '@/components/exercise/WeatherList.vue'
import GeocodeSearchBar from '@/components/exercise/GeocodeSearchBar.vue'
import { ElCard, ElTag, ElText, ElImage, ElStatistic } from 'element-plus'

const mode = ref('리스트 검색')

const API_KEY = `111b3fda6bc93704bbe4b4c299176bee`
const weather = ref(null)

const router = useRouter()
const configStore = useConfigStore()
const currentUnit = computed(() => (configStore.unit === 'celsius' ? '섭씨 (℃)' : '화씨 (℉)'))
const nextUnit = computed(() => (configStore.unit === 'celsius' ? '화씨' : '섭씨'))

const latlonResult = ref('')

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

const handleRead = async () => {
  if (!latlonResult.value) {
    console.error('위도와 경도를 먼저 받아와주세요')
    return
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latlonResult.value.latitude,
        lon: latlonResult.value.longitude,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    weather.value = response.data
    console.log('GET 성공:', response.data)
  } catch (error) {
    console.error('GET 실패:', error.response?.data ?? error)
  }
}

const handleGeoCodeApiSearch = async (keyword) => {
  try {
    console.log(keyword)
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: keyword,
        count: 1,
        language: 'ko',
        format: 'json',
      },
    })
    console.log(response)

    const locationData = response.data.results?.[0]

    if (!locationData) {
      return
    }

    latlonResult.value = locationData

    console.log('위도:', locationData.latitude)
    console.log('경도:', locationData.longitude)

    if (response.status === 200) {
      handleRead()
    }
  } catch (error) {
    latlonResult.value = null
    console.error(error)
  }
}

const toggle = () => {
  configStore.toggleUnit()
}

const modeToggle = () => {
  filteredWeatherList.value = [...weatherList.value]
  latlonResult.value = null
  weather.value = null

  if (mode.value === '리스트 검색') mode.value = 'API 호출'
  else if (mode.value === 'API 호출') mode.value = '리스트 검색'
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
  display: grid;
  gap: 12px;
  min-width: 0;
}

.mode-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 9px 10px 9px 14px;
  border: 1px solid #334155;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.72);
}

.mode-switch__status {
  display: grid;
  gap: 1px;
  margin: 0;
}

.mode-switch__status span {
  color: #64748b;
  font-size: 0.68rem;
  font-weight: 650;
}

.mode-switch__status strong {
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 800;
}

.mode-switch__button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 9px 12px;
  color: #cbd5e1;
  background: #1e293b;
  font-size: 0.78rem;
  font-weight: 750;
  white-space: nowrap;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
}

.mode-switch__button span {
  color: #6ee7b7;
  font-size: 1rem;
  line-height: 1;
}

.mode-switch__button:hover {
  transform: translateY(-1px);
  border-color: #6ee7b7;
  color: #f8fafc;
  background: #253449;
}

.mode-switch__button:focus-visible {
  outline: 3px solid rgba(110, 231, 183, 0.22);
  outline-offset: 2px;
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
  transition:
    background 0.2s,
    transform 0.2s;
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

@media (max-width: 480px) {
  .mode-switch {
    align-items: stretch;
    flex-direction: column;
  }

  .mode-switch__button {
    justify-content: center;
  }
}
</style>
