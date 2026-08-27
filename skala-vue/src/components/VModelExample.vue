<template>
  <div>
    <h2>도시 검색</h2>

    <input
      type="text"
      :value="searchText"
      placeholder="도시 이름을 입력하세요"
      @input="handleInput"
    />

    <p>
      검색어: <strong>{{ searchText }}</strong>
    </p>

    <ul v-if="filteredWeatherList.length">
      <li v-for="item in filteredWeatherList" :key="item.id">
        {{ item.name }} / {{ item.temp }}℃ / {{ item.status }}
      </li>
    </ul>

    <p v-else>검색 결과가 없습니다.</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const searchText = ref('')
const isComposing = ref(false)

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const handleInput = (event) => {
  // 한글이 조합 중이면 값을 갱신하지 않음
  if (isComposing.value) return

  searchText.value = event.target.value
}

const filteredWeatherList = computed(() => {
  const keyword = searchText.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter(
    (item) => item.name.includes(keyword) || item.status.includes(keyword),
  )
})
</script>
