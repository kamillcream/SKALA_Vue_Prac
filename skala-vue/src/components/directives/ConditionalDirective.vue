<script setup>
import { ref } from 'vue'
const score = ref(85)
const isVisible = ref(true)
</script>

<template>
  <article class="directive-card">
    <header class="card-head"><h2>v-if / v-else-if / v-else / v-show</h2><p>조건에 따라 생성하거나 CSS로 표시 여부를 바꿉니다.</p></header>
    <div class="card-body">
      <div class="controls"><label>점수 <input v-model.number="score" type="range" min="0" max="100" /> <strong>{{ score }}</strong></label></div>
      <div class="demo-box result">
        <strong v-if="score >= 90">🏆 A — Excellent</strong>
        <strong v-else-if="score >= 70">👏 B — Good</strong>
        <strong v-else>🌱 C — Keep going</strong>
      </div>
      <div class="controls"><button @click="isVisible = !isVisible">v-show 토글</button><span v-show="isVisible" class="show-message">저는 DOM에 남아 있어요!</span></div>
      <p class="muted">v-if는 DOM을 생성·제거하고, v-show는 display 속성만 바꿉니다.</p>
    </div>
  </article>
</template>

<style scoped>
label { color: #59647b; }
.result { color: #1e7758; font-size: 1.15rem; text-align: center; }
.show-message { color: #42b883; font-weight: 700; }
</style>
