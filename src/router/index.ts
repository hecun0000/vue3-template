
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { UserLayout, BasicLayout, BlankLayout } from '../layouts'
// import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login.vue')
      }
    ]
  }

  // {
  //   path: '/404',
  //   component: () => import('@/views/exception/404')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
