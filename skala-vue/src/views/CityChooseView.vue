<template>
  <button @click="moveWithId('city_01')">서울</button>
  <button @click="moveWithId('city_02')">수원</button>
  <button @click="moveWithId('city_03')">부산</button>
  <button @click="moveWithId('city_04')">인천</button>
  <button @click="moveWithId('city_05')">광주</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const moveWithId = (id) => {
  router.push({ name: 'detail', params: { cityId: id } })
}
</script>

<style></style>
