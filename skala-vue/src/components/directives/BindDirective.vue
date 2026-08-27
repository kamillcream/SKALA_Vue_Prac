<script setup>
import { ref } from 'vue'
const imageUrl = 'https://vuejs.org/images/logo.png'
const isActive = ref(true)
const isRounded = ref(true)
const accent = ref('#42b883')
const fontSize = ref(18)
</script>

<template>
  <article class="directive-card">
    <header class="card-head">
      <h2>v-bind</h2>
      <p>속성, 클래스, 스타일과 단축 문법을 바인딩합니다.</p>
    </header>
    <div class="card-body">
      <div
        class="demo-box bind-preview"
        :class="{ active: isActive, rounded: isRounded }"
        :style="{ borderColor: accent, fontSize: fontSize + 'px' }"
      >
        <img :src="imageUrl" alt="Vue logo" width="44" height="38" /><span
          >동적으로 바인딩된 카드</span
        >
      </div>
      <div class="controls">
        <button @click="isActive = !isActive">Class: {{ isActive ? 'active' : 'off' }}</button>
        <button @click="isRounded = !isRounded">Rounded</button>
        <input v-model="accent" type="color" aria-label="강조 색상" />
        <input v-model="fontSize" type="range" min="14" max="28" aria-label="글자 크기" />
      </div>
      <div class="demo-box code">
        v-bind:src="imageUrl" → :src="imageUrl"<br />:class="{ active: isActive }"<br />:style="{
        color: accent }"
      </div>
    </div>
  </article>
</template>

<style scoped>
.bind-preview {
  display: flex;
  gap: 12px;
  align-items: center;
  border-width: 2px;
  transition: 0.25s;
}
.bind-preview.active {
  background: #ecfbf4;
  color: #157d58;
  font-weight: 750;
}
.bind-preview.rounded {
  border-radius: 28px;
}
input[type='color'] {
  width: 42px;
  height: 38px;
  padding: 3px;
}
</style>
