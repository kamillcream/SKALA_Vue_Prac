<template>
  <div>
    <p> {{ number }} </p>
    <button @click="increaseNumber">증가</button>
    <button @click="decreaseNumber">감소</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const number = ref(0);

const increaseNumber = () => {
    number.value++;
}


const decreaseNumber = () => {
    number.value--;
}


</script>

<style>

</style>