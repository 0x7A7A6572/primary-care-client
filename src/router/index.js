import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' 
  },
  { path: '/home', name: 'home',component: HomeView,meta: { tabbarShow: true }},
  {
    path: '/chat',
    name: 'chat',
    meta: { tabbarShow: true  },
    component: () => import('../views/ChatView/ChatView.vue')
  },
  // 预约挂号
  {
    path: '/doctor',
    name: 'doctor',
    meta: { tabbarShow:false,
    title: '预约挂号', navbarShow: true},
    component: () => import('../views/HomeView/doctor.vue')
  },
  {
    path: '/medicine',
    name: 'medicine',
    meta: { tabbarShow: true },
    component: () => import('../views/MedicineView/MedicineView.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { tabbarShow: true  },
    component: () => import('../views/UserView/UserView.vue')
  },
  { // 用药提醒页
    path: '/home/MedicationReminder',
    name: 'MedicationReminder',
    meta: { title: '添加用药提醒', navbarShow: true  },
    component: () => import('../views/HomeView/MedicationReminder.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
