import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' 
  },
  { path: '/home', name: 'home',component: HomeView,meta: { navShow: true }},
  {
    path: '/chat',
    name: 'chat',
    meta: { navShow: true  },
    component: () => import('../views/ChatView/ChatView.vue')
  },
  {
    path: '/medicine',
    name: 'medicine',
    meta: { navShow: true },
    component: () => import('../views/MedicineView/MedicineView.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { navShow: true  },
    component: () => import('../views/UserView/UserView.vue')
  },
  { // 用药提醒页
    path: '/home/MedicationReminder',
    name: 'MedicationReminder',
    meta: { title: '添加用药提醒', topBarShow: true  },
    component: () => import('../views/HomeView/MedicationReminder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
