import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpApi from "@/http";
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$api = httpApi;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
