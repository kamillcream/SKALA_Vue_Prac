<template>
  <div>
      <h2>과제 1: 날씨(Mock Up)</h2>
  <ul>
    <li v-for="(item) in weatherList" :key="item.id">
        <p> {{ item.name }} </p>
        <p> {{ item.temp }} </p>
        <p> {{ item.status }} </p>
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref } from 'vue';

const weatherList = ref([
{ id: 'city_01', name: '서울', temp: 28, status: '맑음' },
{ id: 'city_02', name: '수원', temp: 24, status: '비' },
{ id: 'city_03', name: '부산', temp: 26, status: '구름' },
]);


</script>

<style>

</style>