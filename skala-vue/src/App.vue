<script setup>
import HtmlTextDirective from './components/directives/HtmlTextDirective.vue'
import BindDirective from './components/directives/BindDirective.vue'
import ConditionalDirective from './components/directives/ConditionalDirective.vue'
import ForDirective from './components/directives/ForDirective.vue'
import RenderControlDirective from './components/directives/RenderControlDirective.vue'
</script>

<template>
  <main class="app-shell">
    <header class="hero">
      <span class="eyebrow">VUE 3 PLAYGROUND</span>
      <h1>Vue Directive Lab</h1>
      <p>각 카드를 직접 조작하며 Vue 디렉티브의 동작을 확인해 보세요.</p>
    </header>
    <section class="directive-grid">
      <HtmlTextDirective />
      <BindDirective />
      <ConditionalDirective />
      <ForDirective />
      <RenderControlDirective />
    </section>
  </main>
</template>

<style>
.app-shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 64px 0 80px; }
.hero { margin-bottom: 36px; }
.eyebrow { color: #42b883; font-size: .75rem; font-weight: 800; letter-spacing: .16em; }
.hero h1 { margin: 8px 0 10px; color: #17233c; font-size: clamp(2.2rem, 6vw, 4.5rem); font-weight: 800; letter-spacing: -.05em; line-height: 1; }
.hero p { color: #65708a; font-size: 1.05rem; }
.directive-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; align-items: start; }
.directive-card { overflow: hidden; border: 1px solid #e5e9f2; border-radius: 18px; background: #fff; box-shadow: 0 12px 35px rgba(26, 38, 67, .07); }
.directive-card.wide { grid-column: 1 / -1; }
.card-head { padding: 22px 24px 17px; border-bottom: 1px solid #edf0f5; }
.card-head h2 { margin: 0 0 4px; color: #202b45; font-size: 1.15rem; font-weight: 750; }
.card-head p { margin: 0; color: #7b8499; font-size: .88rem; }
.card-body { display: grid; gap: 16px; padding: 22px 24px 24px; }
.demo-box { padding: 16px; border: 1px solid #e8ebf2; border-radius: 12px; background: #f8fafc; }
.demo-title { display: block; margin-bottom: 8px; color: #59647b; font-size: .76rem; font-weight: 750; letter-spacing: .04em; text-transform: uppercase; }
.code { color: #a13f71; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .82rem; }
.controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
button, input, select { font: inherit; }
button { cursor: pointer; border: 0; border-radius: 9px; padding: 8px 12px; background: #35425f; color: #fff; font-weight: 650; }
button:hover { background: #42b883; }
input, select { min-width: 0; border: 1px solid #dce1eb; border-radius: 9px; padding: 8px 10px; background: white; color: #27314a; }
.muted { color: #7b8499; font-size: .85rem; }
.warning { color: #9f5b13; background: #fff5df; border-color: #f5d49d; }
@media (max-width: 760px) { .app-shell { padding-top: 38px; } .directive-grid { grid-template-columns: 1fr; } .directive-card.wide { grid-column: auto; } }
</style>
