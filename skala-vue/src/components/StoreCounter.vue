<template>
  <p>{{ counterStore.count }}</p>
  <p>{{ counterStore.doubleCount }}</p>
  <button @click="counterStore.increment">증가</button>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<style></style>
