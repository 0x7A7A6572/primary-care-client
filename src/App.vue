<template>
  <div id="app">
   <!-- 顶部标题导航 -->
    <ylNavbar v-show="ylTopbarShow" />
      <router-view></router-view>
    <!-- 底部标签栏 -->
    <ylTabbar
      v-show="ylNavShow"
      :itemIndex="itemIndex"
      @onItemClick="onNavItemClick"
    />
    <!-- :paths="['home','chart','medicine','user']" -->
  </div>
</template>

<script>
export default {
  created() {
    // 防止首次进入页面时,因未触发路由改变而导致ylNavShow不显示的问题
    // （ylNavShow 默认为fasle 可以减少路由对于meta.navShow的配置)
    if (this.$route.name == "home") {
      this.ylNavShow = true;
    }
  },
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
      // 判断路由中topBarShow的值来选择显示/隐藏底部导航
      this.ylTopbarShow = to.meta?.topBarShow || false;
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

body{ background: var(--color-mian-bg);}

#app {
  width: 100vw;
  height: 100vh;
}


</style>
