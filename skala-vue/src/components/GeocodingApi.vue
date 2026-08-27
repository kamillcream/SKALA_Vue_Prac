<template>
  <div>
    <input v-model="location" type="text" placeholder="예: 서울" @keyup.enter="searchLocation" />

    <button @click="searchLocation">위치 검색</button>

    <div v-if="result">
      <p>지역: {{ result.name }}</p>
      <p>위도: {{ result.latitude }}</p>
      <p>경도: {{ result.longitude }}</p>
    </div>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const location = ref('')
const result = ref(null)
const errorMessage = ref('')

const searchLocation = async () => {
  if (!location.value.trim()) {
    errorMessage.value = '지역명을 입력해주세요.'
    return
  }

  try {
    errorMessage.value = ''

    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: location.value.trim(),
        count: 1,
        language: 'ko',
        format: 'json',
      },
    })

    const locationData = response.data.results?.[0]

    if (!locationData) {
      result.value = null
      errorMessage.value = '검색 결과가 없습니다.'
      return
    }

    result.value = locationData

    console.log('위도:', locationData.latitude)
    console.log('경도:', locationData.longitude)
  } catch (error) {
    result.value = null
    errorMessage.value = '지역 검색에 실패했습니다.'
    console.error(error)
  }
}
</script>
