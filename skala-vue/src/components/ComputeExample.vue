<template>
  <div>
    <p>{{ number }}</p>
    <button @click="number++">number 1 증가</button>
    <p>{{ doubledNumber }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const number = ref('0')

const doubledNumber = computed(() => {
  const res = number.value * 2
  return res
})
</script>

<style></style>
