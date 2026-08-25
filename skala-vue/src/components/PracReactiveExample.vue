<template>
    <div>
    <input v-model="searchQuery" type="text"/>
    <p>검색 결과: {{ searchResultCount }}건</p>
    <p v-if="isNeverSearched == false">마지막 검색 시간: {{ lastSearchDate }}</p>
    <ul v-if="searchQuery.length == 0">
        <li v-for="item in weatherList" :key="item.id">
            <p> {{ item.name }} {{ item.temp }} {{ item.status }}</p>
            <button @click="onHandleClick(item)">선택</button>
        </li>
    </ul>
    <ul v-else-if="searchQuery.length > 0 && filteredWeatherList.length > 0">
        <li v-for="item in filteredWeatherList" :key="item.id">
            <p> {{ item.name }} {{ item.temp }} {{ item.status }}</p>
            <button @click="onHandleClick(item)">선택</button>
        </li>
    </ul>
    <div v-else-if="searchQuery.length > 0 && filteredWeatherList.length == 0">
        <p> 검색 결과와 일치하는 도시가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue';

const searchQuery = ref('');
const selectedCityInfo = ref('');
const isNeverSearched = ref(true);
const lastSearchDate = ref('');
const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 24, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
    { id: 'city_04', name: '인천', temp: 29, status: '흐림' },
    { id: 'city_05', name: '광주', temp: 26, status: '맑음' },
])


const onHandleClick = (item) => {
    selectedCityInfo.value = item;
}

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter(
    (item) =>
      item.name.includes(keyword) ||
      item.status.includes(keyword)
  )
})

const searchResultCount = computed(() => {
  return filteredWeatherList.value.length
})



watch(selectedCityInfo, (newVal, oldVal) => {
    console.log("새로운 값: ", newVal);
    console.log("이전 값: ", oldVal);
})

watch(filteredWeatherList, (newVal) => {
    if(isNeverSearched.value == true) {
        isNeverSearched.value = false;
    }
    searchResultCount.value = newVal.length;
    lastSearchDate.value = new Date().toLocaleString('sv-SE')
})


watchEffect(() => {
    console.log(`검색어 자동 감지 : ${searchQuery.value}`)
})


</script>

<style>

</style>