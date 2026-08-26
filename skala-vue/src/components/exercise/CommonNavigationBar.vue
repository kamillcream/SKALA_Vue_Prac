<template>
  <div>
    <button @click="moveTo('/')">홈</button>
    <button @click="moveTo('/choose')">지역 선택</button>
    <button @click="moveTo('/about')">서비스 소개</button>
    <button @click="moveTo('/qwewq')">ETC</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const moveTo = (path) => {
  router.push(path)
}
</script>
