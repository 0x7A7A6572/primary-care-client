import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpApi from "@/http";
// import Vant from 'vant'; // 全部导入
import { Icon, DropdownMenu, DropdownItem, Sticky ,Popup ,Search,List,Cell} from 'vant'; // 按需导入

import 'vant/lib/index.css';

// 自定义的公共组件全局引入
import ylTabbar from "@/components/ylTabbar.vue";
import ylNavbar from "@/components/ylNavbar.vue";
import ylTitle from "@/components/ylTitle.vue";
import ylSearch from "@/components/ylSearch.vue";
import ylEmpty from "@/components/ylEmpty.vue";
Vue.component("ylTabbar",ylTabbar);
Vue.component("ylNavbar",ylNavbar);
Vue.component("ylTitle",ylTitle);
Vue.component("ylSearch",ylSearch);
Vue.component("ylEmpty",ylEmpty);

/* 引入vant组件 */
// Vue.use(Vant);
// 手动按需引入
Vue.use(Icon);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Search);
Vue.use(List);
Vue.use(Cell);
Vue.use(Sticky);
Vue.use(Popup);

Vue.config.productionTip = false;
Vue.prototype.$api = httpApi;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
