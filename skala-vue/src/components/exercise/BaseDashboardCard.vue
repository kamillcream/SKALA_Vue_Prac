<template>
  <section class="dashboard">
    <header class="dashboard__header">
      <p class="dashboard__eyebrow">WEATHER DASHBOARD</p>
      <h1>오늘의 도시 날씨</h1>
    </header>

    <div class="dashboard__panel">
      <h2>도시 검색</h2>
      <slot name="search" />
    </div>

    <div class="dashboard__panel">
      <h2>지역별 날씨 현황</h2>
      <slot name="weather" />
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
  width: 100%;
}

.dashboard__header {
  padding: 8px 4px;
}

.dashboard__eyebrow {
  margin: 0 0 6px;
  color: #6ee7b7;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.dashboard__header h1 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(2rem, 6vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.dashboard__panel {
  padding: 26px;
  border: 1px solid #334155;
  border-radius: 18px;
  background: #1e293b;
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.22);
}

.dashboard__panel h2 {
  margin: 0 0 18px;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 750;
}

@media (max-width: 640px) {
  .dashboard__panel {
    padding: 20px;
  }
}
</style>
