import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
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
    updateUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    removeUser(state){
      state.user = null;
      localStorage.removeItem('user');
    },
    /** 更新保存token字符串 */
    updateToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    removeToken(state){
      state.token = null;
      localStorage.removeItem('token');
    }

  },
  actions: {
    // 退出登陆
    logout(context){
      context.commit(removeToken);
      context.commit(removeUser);
    }
  },
  modules: {
  }
})
