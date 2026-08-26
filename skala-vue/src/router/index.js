import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/WeatherHomeView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'detail',
      component: () => import('@/views/WeatherDetailView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/WeatherAboutView.vue'),
    },
    {
      path: '/choose',
      name: 'choose',
      component: () => import('@/views/CityChooseView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
