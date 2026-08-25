<template>
  <div>
    <h2>과제 3: 양방향 바인딩 및 한글 처리 (:value, @input)</h2>
    <input type="text" v-model="text1" placeholder="여기에 입력하세요" />
    <p>
    입력된 값: <strong>{{ text1 }}</strong>
    </p>
    <input type="text" :value="text2" @input="(e) => (text2 = e.target.value)" placeholder="원리 파악용 입력창" />
    <p>
    입력된 값: <strong>{{ text2 }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text1 = ref('') 
const text2 = ref('') 

</script>

<style>

</style>