import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpApi from "@/http";
import io from "socket.io-client";
import config from '@/utils/config';
import {
	Icon, DropdownMenu, DropdownItem,
	Sticky, Popup, Search, List, Cell, Tag,
	Image, Button, Divider, Form, Field, DatetimePicker, Dialog, Uploader,
	Popover, TreeSelect,Tab,Tabs,  Collapse, CollapseItem,PullRefresh,
	Calendar, Skeleton 
} from 'vant'; // 按需导入

import 'vant/lib/index.css';

// 自定义的公共组件全局引入
import ylTabbarPro from "@/components/ylTabbarPro.vue";
// import ylTabbar from "@/components/ylTabbar.vue";
import ylNavbar from "@/components/ylNavbar.vue";
import ylTitle from "@/components/ylTitle.vue";
import ylSearch from "@/components/ylSearch.vue";
import ylEmpty from "@/components/ylEmpty.vue";
import ylSwitch from "@/components/ylSwitch.vue";

Vue.component("ylTabbarPro", ylTabbarPro);
// Vue.component("ylTabbar",ylTabbar);
Vue.component("ylNavbar", ylNavbar);
Vue.component("ylTitle", ylTitle);
Vue.component("ylSearch", ylSearch);
Vue.component("ylEmpty", ylEmpty);
Vue.component("ylSwitch", ylSwitch);

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
Vue.use(DatetimePicker);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Popup);
Vue.use(Tag);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Popover);
Vue.use(TreeSelect);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(PullRefresh);
Vue.use(Calendar);
Vue.use(Skeleton);

Vue.config.productionTip = false;
import ylToast from './components/ylToast/ylToast.js';
Vue.use(ylToast);
// Vue.prototype.$ylToast = ylToast;
Vue.prototype.$api = httpApi;
Vue.prototype.$Dialog = Dialog;
// scoket 
const server = io(config.chatUrl);
Vue.prototype.$io = server;

// 过滤器
Vue.filter('datetime', (num) => {
	if(!num) return '无';
	//参数是数字--时间戳 ,返回日期时间字符串
	let d = new Date(num) //把时间戳转换为日期对像
	//获取Date中的不同部分
	let yy = d.getFullYear()
	let MM = d.getMonth() + 1
	MM = MM < 10 ? '0' + MM : MM
	let dd = d.getDate()
	dd = dd < 10 ? '0' + dd : dd
	let hh = d.getHours()
	let mm = d.getMinutes()
	mm = mm < 10 ? '0' + mm : mm
	hh = hh < 10 ? '0' + hh : hh
	return `${yy}-${MM}-${dd} ${hh}:${mm}`
});
Vue.filter('date', (num) => {
	//参数是数字--时间戳 ,返回日期时间字符串
	let d = new Date(num) //把时间戳转换为日期对像
	//获取Date中的不同部分
	let yy = d.getFullYear()
	let mm = d.getMonth() + 1
	mm = mm < 10 ? '0' + mm : mm
	let dd = d.getDate()
	dd = dd < 10 ? '0' + dd : dd
	return `${yy}-${mm}-${dd}`
});
Vue.filter('time', (num) => {
	let d = new Date(num)
	let hh = d.getHours()
	let mm = d.getMinutes() + 1
	mm = mm < 10 ? '0' + mm : mm
	hh = hh < 10 ? '0' + hh : hh
	return `${hh}:${mm}`
});
// 年龄
Vue.filter('age', (num) => {
	let d = new Date(num);
	let currd = new Date();
	let yy = d.getFullYear();
	let currd_yy = currd.getFullYear();
	return currd_yy - yy;
});
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
