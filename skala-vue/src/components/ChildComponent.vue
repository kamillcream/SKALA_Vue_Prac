<template>
    <div>
        <p>이름 : {{ props.name }} </p>
        <input v-model="tel" type="text" placeholder="전화번호를 입력하세요">
        <button @click="onConfirm()">제출</button>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
const tel = ref('');
const emit = defineEmits(['confirm']);
const props = defineProps(
    {
        name: {
            type: String,
            required: true,
        },
    }
)

const onConfirm = () => {
    emit('confirm', tel.value);
}

</script>

<style>

</style>