import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token')
  },
  getters: {
  },
  mutations: {
    /** 更新保存token字符串 */
    updateToken(state, token){
      state.token = token;
      localStorage.setItem('token', token);
    },
  },
  actions: {
  },
  modules: {
  }
})
