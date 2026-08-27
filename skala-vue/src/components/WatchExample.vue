<template>
  <div>
    <input v-model="sentence" type="text" />
    <div>
      <label>변경 전 : {{ before }}</label>
    </div>
    <div>
      <label>변경 후 : {{ after }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const sentence = ref('')
const before = ref('')
const after = ref('')

watch(sentence, (newVal, oldVal) => {
  before.value = oldVal
  after.value = newVal
})
</script>

<style></style>
