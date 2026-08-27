<template>
  <div>
    <input v-model="latInput" type="text" placeholder="lat input" />
    <input v-model="lonInput" type="text" placeholder="lon input" />
    <button @click="handleRead"></button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const API_KEY = `111b3fda6bc93704bbe4b4c299176bee`
const latInput = ref('')
const lonInput = ref('')
const weather = ref([])

const handleRead = async () => {
  if (!latInput.value || !lonInput.value) {
    console.error('위도와 경도를 입력해주세요.')
    return
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latInput.value,
        lon: lonInput.value,
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
</script>
