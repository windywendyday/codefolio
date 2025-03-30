import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LogIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/signup/SignUp.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue')
  },
  {
    path: '/upload',
    name: 'UploadResume',
    component: () => import('@/views/uploadResume/UploadResume.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
