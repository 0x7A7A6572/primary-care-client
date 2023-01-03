import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
  },
  getters: {
    user(state){
      return state.user;
    },
    token(state){
      return state.token;
    }
  },
  mutations: {
    /** 更新保存用户信息*/
    updateUser(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    /** 更新保存token字符串 */
    updateToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
  },
  actions: {
  },
  modules: {
  }
})
