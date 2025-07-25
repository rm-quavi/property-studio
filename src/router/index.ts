import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/property/:propertyId',
      name: 'property-detail',
      component: () => import('@/views/property/PropertyDetail.vue'),
    },
    {
      path: '/property/add',
      name: 'add-property',
      component: () => import('@/views/property/UpsertProperty.vue'),
    },
    {
      path: '/property/:propertyId/edit',
      name: 'edit-property',
      component: () => import('@/views/property/UpsertProperty.vue'),
    },
    {
      path: '/property/search',
      name: 'search-property',
      component: () => import('@/views/property/SearchProperty.vue'),
    },
  ],
})

export default router
