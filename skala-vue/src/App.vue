<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">Weather Vue</RouterLink>
    <nav aria-label="메인 메뉴">
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/choose">지역 선택</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
    </nav>
  </header>

  <main class="app-shell">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
  padding: 22px 0 4px;
}

.brand { color: #f8fafc; font-size: 1.1rem; font-weight: 800; }
nav { display: flex; flex-wrap: wrap; gap: 6px; }
nav a { border-radius: 8px; padding: 7px 11px; color: #94a3b8; font-weight: 650; }
nav a.router-link-exact-active { color: #052e25; background: #6ee7b7; }

@media (max-width: 600px) {
  .app-header { align-items: flex-start; flex-direction: column; }
}
</style>
