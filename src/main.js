import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpApi from "@/http";
import Vant from 'vant';
import 'vant/lib/index.css';

// 自定义的公共组件全局引入
import ylNav from "@/components/ylNav.vue";
import ylTopbar from "@/components/ylTopbar";


Vue.component("YlNav",ylNav);
Vue.component("YlTopbar",ylTopbar);

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.$api = httpApi;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
