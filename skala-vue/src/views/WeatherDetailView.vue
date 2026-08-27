<template>
  <section class="detail-page">
    <template v-if="selectedCity">
      <RouterLink class="back-link" to="/">← 메인 대시보드</RouterLink>
      <p class="eyebrow">LOCAL OBSERVATION</p>
      <div class="detail-heading">
        <div>
          <h1>{{ selectedCity.name }}</h1>
          <p>{{ selectedCity.status }}</p>
        </div>
        <strong>{{ displayTemp }}</strong>
      </div>
      <dl class="observations">
        <div>
          <dt>체감 온도</dt>
          <dd>{{ selectedCity.feelsLike }}℃</dd>
        </div>
        <div>
          <dt>습도</dt>
          <dd>{{ selectedCity.humidity }}%</dd>
        </div>
        <div>
          <dt>풍속</dt>
          <dd>{{ selectedCity.wind }}m/s</dd>
        </div>
        <div>
          <dt>관측 시각</dt>
          <dd>{{ selectedCity.observedAt }}</dd>
        </div>
      </dl>
    </template>

    <template v-else>
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <p>유효한 도시 코드를 선택해 주세요.</p>
      <RouterLink class="back-link" to="/choose">지역 선택으로 이동</RouterLink>
    </template>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const selectedCity = ref(null)
const configStore = useConfigStore()

const weatherMockData = [
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    feelsLike: 30,
    status: '맑음',
    humidity: 55,
    wind: 2.1,
    observedAt: '14:00',
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    feelsLike: 25,
    status: '비',
    humidity: 82,
    wind: 3.4,
    observedAt: '14:00',
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    feelsLike: 28,
    status: '구름',
    humidity: 70,
    wind: 4.2,
    observedAt: '14:00',
  },
  {
    id: 'city_04',
    name: '인천',
    temp: 29,
    feelsLike: 31,
    status: '흐림',
    humidity: 64,
    wind: 5.1,
    observedAt: '14:00',
  },
  {
    id: 'city_05',
    name: '광주',
    temp: 26,
    feelsLike: 27,
    status: '맑음',
    humidity: 58,
    wind: 1.8,
    observedAt: '14:00',
  },
]

onMounted(() => {
  selectedCity.value = weatherMockData.find((city) => city.id === route.params.cityId) ?? null
})

const displayTemp = computed(() => {
  const rawTemp = selectedCity.value.temp // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) + configStore.unitSymbol
  }
  return rawTemp + configStore.unitSymbol
})
</script>

<style scoped>
.detail-page {
  padding: clamp(28px, 6vw, 60px);
  border: 1px solid #334155;
  border-radius: 20px;
  background: #1e293b;
}
.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: #6ee7b7;
  font-weight: 700;
}
.eyebrow {
  margin: 0 0 8px;
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}
.detail-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}
.detail-heading h1 {
  margin: 0;
  color: #fff;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
}
.detail-heading p {
  margin: 4px 0 0;
  color: #cbd5e1;
  font-size: 1.2rem;
}
.detail-heading > strong {
  color: #6ee7b7;
  font-size: clamp(3rem, 9vw, 6rem);
  line-height: 1;
}
.observations {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 42px 0 0;
}
.observations div {
  padding: 18px;
  border: 1px solid #334155;
  border-radius: 12px;
  background: #0f172a;
}
.observations dt {
  color: #94a3b8;
  font-size: 0.8rem;
}
.observations dd {
  margin: 6px 0 0;
  color: #f8fafc;
  font-size: 1.15rem;
  font-weight: 750;
}
@media (max-width: 700px) {
  .observations {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .detail-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .observations {
    grid-template-columns: 1fr;
  }
}
</style>
