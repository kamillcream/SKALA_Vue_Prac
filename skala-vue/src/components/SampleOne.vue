<template>
<div class="practice-section">
<h2>Hello Skala-Vue</h2>
<h3>일반 변수 클릭: {{ normalCount }}</h3>
<button @click="normalCount++">일반 변수 증가</button>
<br />
<h3>Vue 반응성 변수 클릭: {{ vueCount }}</h3>
<button @click="vueCount++">Vue 변수 증가</button>
<p v-if="vueCount % 2 == 1">VueCount는 홀수입니다.</p>
<p v-else>VueCount는 짝수입니다.</p>
</div>
</template>

<script setup>
import { ref } from 'vue'

let normalCount = 1;
const vueCount = ref(1);



</script>

<style>

</style>