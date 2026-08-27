# Weather Vue Dashboard

Vue 3의 주요 기능과 Vue Router를 학습하기 위해 만든 도시별 날씨 대시보드입니다. Mock Data를 이용한 도시 목록 검색과 외부 API를 이용한 실시간 날씨 검색을 지원합니다.

## 주요 기능

- 도시명 또는 날씨 상태로 Mock Data 검색
- Geocoding API를 이용한 도시 좌표 검색
- OpenWeather API를 이용한 실시간 날씨 조회
- 리스트 검색과 API 검색 모드 전환
- 모드 전환 시 이전 검색 결과와 입력값 초기화
- 도시 즐겨찾기 토글
- 도시별 상세 날씨 페이지 이동
- 섭씨·화씨 단위 전환 및 Pinia 전역 상태 공유
- 반응형 다크 모드 대시보드
- Element Plus를 이용한 날씨 결과 시각화
- 존재하지 않는 경로에 대한 404 페이지

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Frontend | Vue 3, Composition API, `<script setup>` |
| Build | Vite |
| Routing | Vue Router |
| State | Pinia |
| HTTP | Axios |
| UI | Element Plus |
| Code quality | ESLint, OXLint, Prettier |

## 실행 방법

이 프로젝트의 `package.json`은 `skala-vue` 디렉터리에 있습니다.

```sh
cd skala-vue
npm install
npm run dev
```

개발 서버가 출력한 주소로 접속합니다. 포트가 사용 중이면 Vite가 `5173`, `5174`와 같이 사용 가능한 다음 포트를 선택할 수 있습니다.

```sh
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 코드 검사
npm run lint

# 코드 포맷팅
npm run format
```

## 라우팅

모든 View는 동적 import를 사용해 지연 로딩합니다.

| 경로 | 이름 | View | 설명 |
| --- | --- | --- | --- |
| `/` | `home` | `WeatherHomeView.vue` | 메인 날씨 대시보드 |
| `/weather/:cityId` | `detail` | `WeatherDetailView.vue` | 도시 ID 기반 상세 기상 정보 |
| `/choose` | `choose` | `CityChooseView.vue` | 추가 View: 지역 선택 |
| `/about` | `about` | `WeatherAboutView.vue` | 서비스 소개와 홈 복귀 |
| `/:pathMatch(.*)*` | `NotFound` | `NotFoundView.vue` | Catch-all 404 페이지 |

`App.vue`는 `RouterLink`로 내비게이션을 제공하고 `RouterView`에 현재 경로의 View를 표시합니다.

```vue
<RouterLink to="/">홈</RouterLink>
<RouterLink to="/choose">지역 선택</RouterLink>
<RouterLink to="/about">서비스 소개</RouterLink>

<RouterView />
```

## 주요 화면

### WeatherHomeView

메인 대시보드의 데이터와 사용자 동작을 관리합니다.

- Mock Data와 필터링 결과 관리
- 리스트 검색과 API 검색 모드 관리
- 즐겨찾기 상태 변경
- 상세보기 클릭 시 `/weather/{cityId}`로 Programmatic Navigation
- Pinia를 통한 온도 단위 변경
- Geocoding API와 OpenWeather API 요청

```js
const moveToDetail = (id) => {
  router.push('/weather/' + id)
}
```

### WeatherDetailView

`route.params.cityId`를 읽고, Mount 시점에 상세 Mock Data에서 일치하는 도시를 선택합니다.

```js
onMounted(() => {
  selectedCity.value =
    weatherMockData.find((city) => city.id === route.params.cityId) ?? null
})
```

현재 온도, 체감 온도, 습도, 풍속과 관측 시각을 표시하며 유효하지 않은 도시 코드도 처리합니다.

### WeatherAboutView

서비스 목적을 안내하고 `RouterLink`를 통해 메인 대시보드로 돌아갈 수 있습니다.

### CityChooseView

과제의 추가 View입니다. 도시 버튼을 누르면 named route와 동적 파라미터를 이용해 상세 페이지로 이동합니다.

```js
router.push({ name: 'detail', params: { cityId: id } })
```

## 컴포넌트 구조

```text
src/
├── App.vue
├── components/
│   └── exercise/
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       ├── GeocodeSearchBar.vue
│       ├── WeatherList.vue
│       ├── WeatherCard.vue
│       └── WeatherParent.vue
├── router/
│   └── index.js
├── stores/
│   └── configStore.js
└── views/
    ├── WeatherHomeView.vue
    ├── WeatherDetailView.vue
    ├── WeatherAboutView.vue
    ├── CityChooseView.vue
    └── NotFoundView.vue
```

### 컴포넌트 역할

| 컴포넌트 | 역할 |
| --- | --- |
| `BaseDashboardCard` | 대시보드 공통 외형과 named slot 제공 |
| `SearchBar` | Mock Data 검색어 입력 및 `search` 이벤트 전달 |
| `GeocodeSearchBar` | API 검색어 입력, 유효성 검사 및 `search` 이벤트 전달 |
| `WeatherList` | 검색 결과 반복 렌더링과 Card 이벤트 중계 |
| `WeatherCard` | 도시 정보 출력 및 `select`, `detail` 이벤트 발생 |

각 컴포넌트 전용 디자인은 해당 `.vue` 파일의 `<style scoped>`에 배치했습니다.

## Slot 구조

`BaseDashboardCard`는 공통 레이아웃만 담당하고 실제 검색 UI와 날씨 목록은 부모 View가 주입합니다.

```vue
<BaseDashboardCard>
  <template #search>
    <SearchBar />
  </template>

  <template #weather>
    <WeatherList />
  </template>
</BaseDashboardCard>
```

- `#search`는 `<slot name="search" />`에 삽입됩니다.
- `#weather`는 `<slot name="weather" />`에 삽입됩니다.
- 공통 컴포넌트는 배치와 디자인을, 부모 View는 데이터와 내용을 결정합니다.

## Props와 Emit 흐름

날씨 목록의 데이터는 부모에서 자식 방향으로 Props로 전달되고, 사용자 이벤트는 자식에서 부모 방향으로 Emit됩니다.

```text
WeatherHomeView
  └─ props → WeatherList
                  └─ props → WeatherCard

WeatherCard
  └─ emit('detail', city.id) → WeatherList
                                  └─ emit('detail', id) → WeatherHomeView
```

`WeatherList`의 Emit은 `WeatherCard`에서 발생한 이벤트를 실제 데이터를 소유한 `WeatherHomeView`로 중계합니다.

## 검색 모드

### 리스트 검색

로컬 Mock Data에서 도시명 또는 날씨 상태가 검색어를 포함하는지 확인합니다.

```js
weatherList.value.filter(
  (item) => item.name.includes(keyword) || item.status.includes(keyword),
)
```

### API 검색

1. Open-Meteo Geocoding API에서 도시의 위도와 경도를 조회합니다.
2. 조회된 `latitude`, `longitude`를 OpenWeather API에 전달합니다.
3. 받은 날씨 응답을 Element Plus 컴포넌트로 출력합니다.

```text
검색어
  → Geocoding API
  → latitude / longitude
  → OpenWeather API
  → 현재 날씨 결과
```

실시간 결과에는 다음 Element Plus 컴포넌트를 사용합니다.

- `el-card`: 전체 결과 카드
- `el-tag`: 국가와 날씨 상태
- `el-image`: 날씨 아이콘
- `el-statistic`: 현재 온도
- `el-descriptions`: 상세 관측 정보
- `el-progress`: 습도와 구름 비율

## Pinia 온도 단위

`configStore`가 섭씨와 화씨 상태를 전역으로 관리합니다.

```js
const unit = ref('celsius')
const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
```

홈에서 단위를 변경하면 상세 View에서도 같은 설정을 사용합니다. 모드 변경 시에는 다음 상태가 초기화됩니다.

- 리스트 필터 결과를 전체 목록으로 복원
- Geocoding 좌표 제거
- 실시간 날씨 결과 제거
- `v-if`로 다시 생성되는 검색 컴포넌트의 입력값 초기화

## 외부 API

- Open-Meteo Geocoding API: 도시명 → 위도·경도 변환
- OpenWeather Current Weather API: 위도·경도 → 현재 기상 정보

OpenWeather API 응답에서 사용하는 주요 값은 다음과 같습니다.

| 필드 | 의미 |
| --- | --- |
| `weather[0].description` | 날씨 설명 |
| `weather[0].icon` | 날씨 아이콘 코드 |
| `main.temp` | 현재 온도 |
| `main.feels_like` | 체감 온도 |
| `main.humidity` | 습도 |
| `main.pressure` | 기압 |
| `wind.speed` | 풍속 |
| `clouds.all` | 구름 비율 |
| `visibility` | 가시거리(m) |

환경변수는 Vite가 브라우저 코드에 노출할 수 있도록 `VITE_` 접두사를 사용합니다.

```text
VITE_GEOCODING_API_URL=...
VITE_WEATHER_API_URL=...
VITE_WEATHER_API_KEY=...
```

> `VITE_` 환경변수는 빌드 결과에 포함되므로 비밀정보를 안전하게 숨기는 방법은 아닙니다. API 키 제한을 설정하거나 백엔드 프록시를 사용하는 것이 좋습니다.

## Vue 학습 예제

프로젝트에는 날씨 대시보드 외에도 다음 Vue 학습 컴포넌트가 포함되어 있습니다.

- `v-html`, XSS 주의사항, `v-text`
- `v-bind` 기본·Class·Style·단축 문법
- `v-if`, `v-else-if`, `v-else`, `v-show`
- `v-for`와 `:key`
- `v-pre`, `v-cloak`, `v-once`, `v-memo`
- `ref`, `reactive`, `computed`, `watch`
- 폼 요소와 `v-model` 수식어
- 기본·named·scoped slot
- Props와 Emit
- 생명주기 훅

## 검증

작업 후 다음 명령으로 프로덕션 빌드와 코드 검사를 수행할 수 있습니다.

```sh
npm run build
npm run lint
```
