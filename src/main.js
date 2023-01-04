import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpApi from "@/http";
// import Vant from 'vant'; // 全部导入
import { Icon, DropdownMenu, DropdownItem,
   Sticky ,Popup ,Search,List,Cell,Tag,
    Image,Button,Divider,Form,Field,Dialog
 } from 'vant'; // 按需导入

import 'vant/lib/index.css';

// 自定义的公共组件全局引入
import ylTabbarPro from "@/components/ylTabbarPro.vue";
// import ylTabbar from "@/components/ylTabbar.vue";
import ylNavbar from "@/components/ylNavbar.vue";
import ylTitle from "@/components/ylTitle.vue";
import ylSearch from "@/components/ylSearch.vue";
import ylEmpty from "@/components/ylEmpty.vue";

Vue.component("ylTabbarPro",ylTabbarPro);
// Vue.component("ylTabbar",ylTabbar);
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
Vue.use(Image);
Vue.use(Popup);
Vue.use(Button);

Vue.use(Tag);
Vue.use(Divider);

Vue.use(Popup);
Vue.use(Tag);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Form);
Vue.use(Field);
// Vue.use(Dialog);

Vue.config.productionTip = false;
import ylToast from './components/ylToast/ylToast.js';
Vue.use(ylToast);
// Vue.prototype.$ylToast = ylToast;
Vue.prototype.$api = httpApi;
Vue.prototype.$Dialog = Dialog;
Vue.filter('datetime',(num)=>{
  	//参数是数字--时间戳 ,返回日期时间字符串
	let d = new Date(num) //把时间戳转换为日期对像
	//获取Date中的不同部分
	let yy = d.getFullYear()
	let mm = d.getMonth()+1 
	mm = mm<10?'0'+mm:mm
	let dd = d.getDate()
	dd = dd<10?'0'+dd:dd
	return `${yy}-${mm}-${dd}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
