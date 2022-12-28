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
  },
  { // 用药提醒页
    path: '/home/OnlineConsultation',
    name: 'OnlineConsultation',
    meta: { title: '线上问诊', navbarShow: true  },
    component: () => import('../views/OnlineConsultation/OnlineConsultation.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
