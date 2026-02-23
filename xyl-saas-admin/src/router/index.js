import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/tenants',
    name: 'TenantList',
    component: () => import('../views/TenantList.vue')
  },
  {
    path: '/alumni',
    name: 'AlumniList',
    component: () => import('../views/AlumniList.vue')
  },
  {
    path: '/activities',
    name: 'ActivityList',
    component: () => import('../views/ActivityList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
