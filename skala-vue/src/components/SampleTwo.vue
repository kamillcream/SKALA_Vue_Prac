<template>
<div class="practice-section">

<p v-for="(item, index) in items" :key="item.id"
:style="{color: 'red'}">
  {{ index + 1 }}. {{ item.name }} / {{ item.number }}
</p>
<h2>{{ welcomeMessage }}</h2>
<p>{{ welcomeMessage.toUpperCase() }}</p>
<p>{{ 'Random number: ' + Math.ceil(Math.random() * 100) }}</p>
</div>
</template>

<script setup>
import { ref } from 'vue';
const welcomeMessage = 'Welcome to Skala-Vue'
const items = ref([]);
items.value.push(
    {
        "id": 1, "name": "박진영", "number": "P151"
    },
    {
        "id": 2, "name": "가나다", "number": "P123"
    },
    {
        "id": 3, "name": "홍길동", "number": "P234"
    }
)

</script>

<style>

</style>