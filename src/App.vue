<template>
  <div id="app">
    <YlTopbar v-show="ylTopbarShow" />
    <router-view />
    <!-- 底部导航条 -->
    <YlNav
      v-show="ylNavShow"
      :itemIndex="itemIndex"
      @onItemClick="onNavItemClick"
    />
    <!-- :paths="['home','chart','medicine','user']" -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ylNavShow: false,
      ylTopbarShow: false,
      itemIndex: 0,
    };
  },
  // 监听路由变化
  watch: {
    $route(to, from) {
      console.log("route change:", { to, from });
      // 判断路由中navShow的值来选择显示/隐藏底部导航
      this.ylNavShow = to.meta?.navShow || false;
      // if (to.meta?.navShow == true) {
      //   this.ylNavShow = true;
      // } else {
      //   this.ylNavShow = false;
      // }
      // 判断路由中topBarShow的值来选择显示/隐藏底部导航
      this.ylTopbarShow = to.meta?.topBarShow || false;
      // if (to.meta?.topBarShow == true) {
      //   this.ylTopbarShow = true;
      // } else {
      //   this.ylTopbarShow = false;
      // }
      
    },
  },
  methods: {
    onNavItemClick(e) {
      let { index, name } = e;
      this.itemIndex = index;
      // 如果和当前路由同名则不跳转
      if (this.$route.name == name) return;
      this.$router.push(name);
    },
  },
};
</script>


<style>
@import url("./common/base.css");
@import url("./common/reset.css");
@import url("./common/font-icon.css");

#app {
  background: var(--color-mian-bg);
  width: 100vw;
  height: 100vh;
}
</style>
