<script setup>
import { computed, ref } from 'vue'

const userInput = ref('<strong style="color:#42b883">굵은 HTML</strong>도 렌더링됩니다.')
const safeHtml = computed(() => userInput.value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '[script 제거됨]').replace(/ on\w+="[^"]*"/gi, ''))
</script>

<template>
  <article class="directive-card">
    <header class="card-head"><h2>v-html / XSS / v-text</h2><p>HTML 렌더링과 안전한 텍스트 출력을 비교합니다.</p></header>
    <div class="card-body">
      <input v-model="userInput" aria-label="HTML 입력" />
      <div class="demo-box"><span class="demo-title"><code class="code">v-html</code> — 정제된 HTML</span><p v-html="safeHtml"></p></div>
      <div class="demo-box"><span class="demo-title"><code class="code">v-text</code> — 항상 문자열</span><p v-text="userInput"></p></div>
      <div class="demo-box warning"><strong>XSS 주의</strong><p class="muted">사용자 입력을 그대로 v-html에 전달하면 악성 스크립트가 실행될 수 있습니다. 신뢰하거나 정제한 HTML만 사용하세요.</p></div>
    </div>
  </article>
</template>
