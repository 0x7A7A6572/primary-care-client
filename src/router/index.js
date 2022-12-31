import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  /**---------------------
  *       首页
  * ---------------------*/
  { path: '/', redirect: '/Home' },
  { path: '/Home', name: 'Home', component: HomeView, meta: { tabbarShow: true } },
  // 预约挂号(模块负责人改完删掉)
  {
    path: '/doctor',
    name: 'doctor',
    meta: {
      tabbarShow: false,
      title: '预约挂号', navbarShow: true
    },
    component: () => import('../views/HomeView/doctor.vue')
  },
  // 选择科室(模块负责人改完删掉)
  {
    path: '/depa',
    name: 'depa',
    meta: {
      tabbarShow: false,
      title: '选择科室', navbarShow: true
    },
    component: () => import('../views/HomeView/depa.vue')
  },
  /**---------------------
  *       个人信息
  * ---------------------*/
  { // 主页个人信息面板
    path: '/User',
    name: 'User',
    meta: { tabbarShow: true },
    component: () => import('../views/UserView/UserView.vue')
  },
  { // 编辑个人基本信息
    path: '/User/EditUserBaseInfo',
    name: 'EditUserBaseInfo',
    meta: { title: '编辑个人基本信息', navbarShow: true },
    component: () => import('../views/UserView/EditUserBaseInfo.vue')
  },
  { // 编辑个人健康信息
    path: '/User/EditUserHealthyInfo',
    name: 'EditUserHealthyInfo',
    meta: { title: '更新健康信息', navbarShow: true },
    component: () => import('../views/UserView/EditUserHealthyInfo.vue')
  },
  { // 医生入驻认证
    path: '/User/DoctorAuth',
    name: 'DoctorAuth',
    meta: { title: '医生入驻认证', navbarShow: true },
    component: () => import('../views/UserView/DoctorAuth.vue')
  },
  { // 添加过往病史信息
    path: '/User/PastMedicalHistory',
    name: 'PastMedicalHistory',
    meta: { title: '过往病史', navbarShow: true },
    component: () => import('../views/UserView/PastMedicalHistory.vue')
  },
  /**---------------------
  *       用户登录注册
  * ---------------------*/
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/LoginView/LoginView.vue')
  },
  {
    path: '/Login/Register',
    name: 'Register',
    component: () => import('../views/LoginView/RegisterView.vue')
  },
  /**---------------------
  *       用药提醒
  * ---------------------*/
  { // 我的用药提醒
    path: '/MedicationReminder',
    name: 'MedicationReminder',
    meta: { title: '我的用药提醒', navbarShow: true },
    component: () => import('../views/MedicationReminderView/MedicationReminderView.vue')
  },
  { // 添加用药提醒
    path: '/MedicationReminder/add',
    name: 'MedicationReminder',
    meta: { title: '添加用药提醒', navbarShow: true },
    component: () => import('../views/MedicationReminderView/MedReminderAdd.vue')
  },
  /**---------------------
   *       线上问诊
   * ---------------------*/
  { // 问诊医生选择页
    path: '/OnlineConsultation',
    name: 'OnlineConsultation',
    meta: { title: '线上问诊', navbarShow: true },
    component: () => import('../views/OnlineConsultationView/OnlineConsultationView.vue')
  },
  {// 问诊消息列表
    path: '/ChatList',
    name: 'ChatList',
    meta: { tabbarShow: true },
    component: () => import('../views/ChatView/ChatView.vue')
  },
  { // 问诊聊天窗口页
    path: '/ChatList/ChatRoom',
    name: 'ChatRoom',
    meta: { title: ' ', navbarShow: true },
    component: () => import('../views/ChatView/ChatRoom/ChatRoomView.vue')
  },
  /**---------------------
   *       预约挂号
   * ---------------------*/
  { // 挂号选择医院
    path: '/AppointmentRegist',
    name: 'AppointmentRegist',
    meta: {
      tabbarShow: false,
      title: '预约挂号', navbarShow: true
    },
    component: () => import('../views/AppointmentRegistView/AppointmentRegistView.vue')
  },
  { // 挂号选择科室
    path: '/AppointmentRegist/DepaList',
    name: 'DepaList',
    meta: {
      title: '选择科室', navbarShow: true
    },
    component: () => import('../views/AppointmentRegistView/AptRegDepaList.vue')
  },
  { // 挂号选择医生
    path: '/AppointmentRegist/DoctorList',
    name: 'DoctorList',
    meta: { navbarShow: true },
    component: () => import('../views/AppointmentRegistView/AptRegDoctorList.vue')
  },
  { // 挂号信息确认
    path: '/AppointmentRegist/RegistConfirm',
    name: 'RegistConfirm',
    meta: {
      title: '挂号信息确认', navbarShow: true
    },
    component: () => import('../views/AppointmentRegistView/RegistConfirm.vue')
  },
  { // 挂号预约订单列表
    path: '/AppointmentRegist/RegistOrderList',
    name: 'RegistOrderList',
    meta: {
      title: '我的预约订单', navbarShow: true
    },
    component: () => import('../views/AppointmentRegistView/RegistOrderList.vue')
  },

  /**---------------------
  *       药物查询页
  * ---------------------*/
  {
    path: '/Medicine',
    name: 'Medicine',
    meta: { tabbarShow: true },
    component: () => import('../views/MedicineView/MedicineView.vue')
  },
  /**---------------------
   *     健康新闻详情页
   * ---------------------*/
  {
    path: '/News/Details',
    name: 'NewsDetails',
    meta: {
      title: '新闻详情', navbarShow: true
    },
    component: () => import('../views/NewsView/NewsDetails.vue')
  },
  /**---------------------
 *     医疗宝典
 * ---------------------*/
  { // 医疗宝典分类选择
    path: '/MedicalTreasure/',
    name: 'MedicalTreasure',
    meta: {
      title: '医疗宝典', navbarShow: true
    },
    component: () => import('../views/NewsView/NewsDetails.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
