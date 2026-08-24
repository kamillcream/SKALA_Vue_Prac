<script setup>
import { ref } from 'vue'
const count = ref(0)
const memoKey = ref(0)
</script>

<template>
  <article class="directive-card wide">
    <header class="card-head"><h2>v-pre / v-cloak / v-once / v-memo</h2><p>컴파일 시점과 불필요한 렌더링을 제어합니다.</p></header>
    <div class="card-body control-grid">
      <div class="demo-box"><span class="demo-title">v-pre</span><p v-pre>{{ 이 중괄호는 컴파일되지 않습니다 }}</p><code class="code">Vue 문법을 그대로 표시</code></div>
      <div class="demo-box"><span class="demo-title">v-cloak</span><p v-cloak>Vue가 마운트되기 전 깜빡임을 CSS로 숨깁니다.</p><code class="code">[v-cloak] { display: none }</code></div>
      <div class="demo-box"><span class="demo-title">v-once</span><p v-once>최초 값만 렌더링: {{ count }}</p><p>현재 반응형 값: {{ count }}</p><button @click="count++">count + 1</button></div>
      <div class="demo-box">
        <span class="demo-title">v-memo</span><div v-memo="[memoKey]">메모 영역 — count: {{ count }}, key: {{ memoKey }}</div>
        <div class="controls memo-buttons"><button @click="count++">count + 1</button><button @click="memoKey++">memo key + 1</button></div>
        <p class="muted">key가 바뀔 때만 이 영역이 다시 렌더링됩니다.</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.control-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.memo-buttons { margin-top: 12px; }
@media (max-width: 760px) { .control-grid { grid-template-columns: 1fr; } }
</style>
