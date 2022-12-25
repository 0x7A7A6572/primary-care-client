import axios from "axios";
import store from '../store';

const instance = axios.create({
  baseURL: 'http://localhost:3010/',
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