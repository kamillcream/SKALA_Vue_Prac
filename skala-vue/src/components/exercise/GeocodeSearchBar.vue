<template>
  <form class="search-bar" @submit.prevent="searchLocation">
    <input v-model.trim="location" type="search" placeholder="실시간 날씨를 조회할 도시를 입력하세요" />
    <button type="submit">위치 검색</button>
  </form>
  <p v-if="errorMessage" class="search-message search-message--error">{{ errorMessage }}</p>
  <p v-else class="search-message">도시 좌표를 검색해 현재 날씨를 불러옵니다.</p>
</template>

<script setup>
import { ref } from 'vue'

const location = ref('')
const errorMessage = ref('')
const emit = defineEmits(['search'])

const searchLocation = () => {
  if (!location.value) {
    errorMessage.value = '검색할 도시 이름을 입력해 주세요.'
    return
  }

  errorMessage.value = ''
  emit('search', location.value)
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

input::placeholder {
  color: #64748b;
}

button {
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  padding: 0 18px;
  color: #052e25;
  background: #6ee7b7;
  font-weight: 800;
  transition: background 0.2s, transform 0.2s;
}

button:hover {
  transform: translateY(-1px);
  background: #a7f3d0;
}

button:focus-visible {
  outline: 3px solid rgba(110, 231, 183, 0.25);
  outline-offset: 2px;
}

.search-message {
  margin: 10px 2px 0;
  color: #94a3b8;
  font-size: 0.85rem;
}

.search-message--error {
  color: #fca5a5;
}

@media (max-width: 480px) {
  .search-bar {
    grid-template-columns: 1fr;
  }

  button {
    padding: 11px 18px;
  }
}
</style>
