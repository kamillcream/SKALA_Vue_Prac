<template>
  <div>
    <input v-model = "inputId" type="number"/>
    <input v-model = "inputName" type="text">
    <input v-model = "inputGender" type="text">
    <button @click="onAdd">추가</button>
    <ul>
        <li v-for="(item, index) in obj" :key="item.id">
            <p>{{ item.id }} {{ item.name }} {{ item.gender }}</p>
            <button @click="onRemove(index)">삭제</button>
        </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const obj = reactive([
    {
        "id" : 1, "name" : "박진영", "gender" : "남성"
    },
    {
        "id" : 2, "name" : "홍길동", "gender" : "남성"
    },
    {
        "id" : 3, "name" : "홍길순", "gender" : "남성"
    },
]);

const inputId = ref('');
const inputName = ref('');
const inputGender = ref('');

const onRemove = (i) => {
    obj.splice(i, 1);
}

const onAdd = () => {
    obj.push({
        id: inputId.value, name: inputName.value, gender: inputGender.value
    })
    inputId.value = '';
    inputName.value = '';
    inputGender.value = '';

    console.log(obj);
}


</script>

<style>

</style>