<template>
    <div> 
        <input v-model="nameInput" placeholder="이름을 입력하세요">
        <ChildComponent :name="nameInput" @confirm="handleConfirm"/>
        <p v-if="phone.length != 0">{{ phone }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const nameInput = ref('');
const phone = ref('');

const handleConfirm = (tel) => {
    console.log("전화번호: ", tel)
    phone.value = tel;
}

</script>

<style>

</style>