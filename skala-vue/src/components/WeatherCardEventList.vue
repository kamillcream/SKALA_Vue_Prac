<template>
  <div>
    <h2>과제 4: 이벤트 및 수식어</h2>
    <ul>
      <li v-for="item in weatherList" :key="item.id">
        <div v-if="item.temp >= 25">
          <p>{{ item.name }} {{ item.temp }} {{ item.status }} 🔥 더움 (25도 이상)</p>
          <button @click="handleButtonClick(item.name)"></button>
        </div>
        <div v-if="item.temp < 25">
          <p>{{ item.name }} {{ item.temp }} {{ item.status }} ❄️ 선선함 (25도 미만)</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const handleButtonClick = (city) => {
  alert(city + '가 클릭되었습니다.')
}
</script>

<style></style>
