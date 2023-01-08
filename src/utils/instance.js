import axios from "axios";
import store from '../store';
import config from "./config";

const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
});

// 请求拦截器,在请求之前做一些处理
instance.interceptors.request.use(
  config => {

    // 请求时带上token
    if (store.getters.token) config.headers["authorization"] = store.getters.token;

    // TODO 测试环境 直接使用已鉴权的token
    //config.headers["authorization"] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0NTAxMTExMTExMzMzMTExMTIiLCJuYW1lIjoi55So5oi35ZCNIiwiaWF0IjoxNjcyMjEzMDkyLCJleHAiOjE2NzM1MDkwOTJ9.gChS5QSD81OC_nKoesAxi9_OgSWmc-D0NVafZS_rFu8';
    return config;
  },
  error => {
    console.log(error); // TODO for debug
    return Promise.reject(error);
  }
);

// 配置响应拦截器
instance.interceptors.response.use(res => {
  if (res.status == 200 || res.data?.code == 200) {
  //  store.commit('updateToken', res.headers?.['authorization']);
    return res.data
  } else {
    return Promise.reject(res);
  }
}, error => {
  if (error.response?.status) {
    switch (error.response?.status) {
      case 401:
        break;
      default:
        break;
    }
  }
  return Promise.reject(error)
})

export default instance;