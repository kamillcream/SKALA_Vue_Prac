<template>
  <section class="city-choose">
    <header class="city-choose__header">
      <p>SELECT LOCATION</p>
      <h1>어느 지역의 날씨를<br />확인할까요?</h1>
      <span>도시를 선택하면 상세 기상 정보로 이동합니다.</span>
    </header>

    <div class="city-grid">
      <button
        v-for="city in cities"
        :key="city.id"
        type="button"
        class="city-button"
        @click="moveWithId(city.id)"
      >
        <span class="city-button__icon" aria-hidden="true">{{ city.icon }}</span>
        <span class="city-button__text">
          <strong>{{ city.name }}</strong>
          <small>{{ city.region }}</small>
        </span>
        <span class="city-button__arrow" aria-hidden="true">→</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const cities = [
  { id: 'city_01', name: '서울', region: '서울특별시', icon: '🏙️' },
  { id: 'city_02', name: '수원', region: '경기도', icon: '🌤️' },
  { id: 'city_03', name: '부산', region: '부산광역시', icon: '🌊' },
  { id: 'city_04', name: '인천', region: '인천광역시', icon: '✈️' },
  { id: 'city_05', name: '광주', region: '광주광역시', icon: '☀️' },
]

const moveWithId = (id) => {
  router.push({ name: 'detail', params: { cityId: id } })
}
</script>

<style scoped>
.city-choose {
  overflow: hidden;
  padding: clamp(28px, 6vw, 56px);
  border: 1px solid #334155;
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(110, 231, 183, 0.12), transparent 32%),
    #1e293b;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.22);
}

.city-choose__header {
  margin-bottom: 34px;
}

.city-choose__header p {
  margin: 0 0 9px;
  color: #6ee7b7;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.city-choose__header h1 {
  margin: 0 0 14px;
  color: #f8fafc;
  font-size: clamp(2rem, 6vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.08;
}

.city-choose__header > span {
  color: #94a3b8;
  font-size: 0.95rem;
}

.city-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.city-button {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  border: 1px solid #334155;
  border-radius: 14px;
  padding: 18px;
  color: #f8fafc;
  background: #0f172a;
  text-align: left;
  transition:
    transform 0.2s,
    border-color 0.2s,
    background 0.2s,
    box-shadow 0.2s;
}

.city-button:hover {
  transform: translateY(-3px);
  border-color: #6ee7b7;
  background: #142036;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.city-button:focus-visible {
  outline: 3px solid rgba(110, 231, 183, 0.28);
  outline-offset: 3px;
}

.city-button__icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  background: #1e293b;
  font-size: 1.35rem;
}

.city-button__text {
  display: grid;
  gap: 2px;
}

.city-button__text strong {
  font-size: 1.05rem;
  font-weight: 800;
}

.city-button__text small {
  color: #64748b;
  font-size: 0.76rem;
}

.city-button__arrow {
  color: #6ee7b7;
  font-size: 1.25rem;
  transition: transform 0.2s;
}

.city-button:hover .city-button__arrow {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .city-grid {
    grid-template-columns: 1fr;
  }
}
</style>
