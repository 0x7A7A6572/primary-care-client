<template>
  <div id="app">
    <!-- 顶部标题导航 -->
    <van-sticky>
      <ylNavbar v-show="ylNavbarShow" />
    </van-sticky>
    <!-- <keep-alive>  -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <!-- 底部标签栏 -->
    <ylTabbarPro
      v-show="ylTabbarShow"
      :itemIndex="itemIndex"
      @onItemClick="onNavItemClick"
    />
  </div>
</template>

<script>
export default {
  created() {
    // 防止首次进入页面时,因未触发路由改变而导致ylTabbar不显示的问题
    // （ylTabbarShow 默认为fasle 可以减少路由对于meta.tabbarShow的配置)
    if (this.$route.name == "home") {
      this.ylTabbarShow = true;
    }
  },
  data() {
    return {
      ylTabbarShow: false,
      ylNavbarShow: false,
      itemIndex: 0,
    };
  },
  // 监听路由变化
  watch: {
    $route(to, from) {
      console.log("route change:", { to, from });
      // 判断路由中navShow的值来选择显示/隐藏底部导航
      this.ylTabbarShow = to.meta?.tabbarShow || false;
      // 判断路由中topBarShow的值来选择显示/隐藏底部导航
      this.ylNavbarShow = to.meta?.navbarShow || false;
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


<style  lang="scss">
@import url("./common/base.css");
@import url("./common/reset.css");
@import url("./common/font-icon.css");

body {
  background: var(--color-mian-bg);
}
::-webkit-scrollbar{display: none;}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
