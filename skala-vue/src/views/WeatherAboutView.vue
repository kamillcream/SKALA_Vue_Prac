<template>
  <section class="about-page">
    <p>ABOUT WEATHER VUE</p>
    <h1>도시의 날씨를 간단하고 빠르게 확인하세요.</h1>
    <p class="description">
      특정 지역의 날씨를 검색하고 즐겨찾기할 수 있으며, 지역별 상세 기상관측 정보도 확인할 수 있는 Vue Router 학습용 서비스입니다.
    </p>
    <RouterLink to="/">메인 대시보드로 돌아가기 →</RouterLink>
  </section>
</template>

<script setup></script>

<style scoped>
.about-page { padding: clamp(32px, 7vw, 72px); border: 1px solid #334155; border-radius: 20px; background: #1e293b; }
.about-page > p:first-child { color: #6ee7b7; font-size: .72rem; font-weight: 800; letter-spacing: .15em; }
h1 { max-width: 720px; margin: 12px 0 20px; color: #fff; font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; line-height: 1.15; }
.description { max-width: 700px; margin-bottom: 32px; color: #cbd5e1; font-size: 1.05rem; line-height: 1.8; }
a { display: inline-block; border-radius: 9px; padding: 10px 14px; color: #052e25; background: #6ee7b7; font-weight: 800; }
</style>
