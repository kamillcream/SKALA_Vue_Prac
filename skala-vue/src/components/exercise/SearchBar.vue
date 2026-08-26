<template>
  <form class="search-bar" @submit.prevent="onSearching">
    <input v-model.trim="searchQuery" type="search" placeholder="도시 또는 날씨를 입력하세요" />
    <button type="submit">검색</button>
  </form>
  <p class="search-result">검색 결과 {{ resultCount }}건</p>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  resultCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['search'])
const searchQuery = ref('')

const onSearching = () => {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.search-bar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
}

input {
  min-width: 0;
  border: 1px solid #475569;
  border-radius: 10px;
  padding: 12px 14px;
  color: #f8fafc;
  background: #0f172a;
  outline: none;
}

input:focus {
  border-color: #6ee7b7;
  box-shadow: 0 0 0 3px rgba(110, 231, 183, 0.12);
}

input::placeholder { color: #64748b; }

button {
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  padding: 0 18px;
  color: #052e25;
  background: #6ee7b7;
  font-weight: 800;
}

.search-result {
  margin: 10px 2px 0;
  color: #94a3b8;
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .search-bar { grid-template-columns: 1fr; }
  button { padding: 11px 18px; }
}
</style>
