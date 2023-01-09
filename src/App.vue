<template>
  <div id="app" v-if="_isMobile() || $route.query.showPhone">
    <!-- 顶部标题导航 -->
    <van-sticky>
      <ylNavbar v-show="ylNavbarShow" />
    </van-sticky>
    <!-- --------------- S  缓存路由 ------------------- -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"> </router-view>
    <!-- --------------- E ------------------------- -->
    <!-- 底部标签栏 -->
    <ylTabbarPro
      v-show="ylTabbarShow"
      :itemIndex="itemIndex"
      @onItemClick="onNavItemClick"
    />
  </div>

  <!-- 临时解决方案 -->
  <PhoneHomeView id="app" v-else></PhoneHomeView>

</template>

<script>
export default {
  components:{
    PhoneHomeView: ()=>import('@/views/HomeView/PhoneHomeView.vue')
  },
  created() {
    // 防止首次进入页面时,因未触发路由改变而导致ylTabbar不显示的问题
    // （ylTabbarShow 默认为fasle 可以减少路由对于meta.tabbarShow的配置)
    if (this.$route.name == "Home") {
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
      // console.log("route change:", { to, from });
      // 判断路由中navShow的值来选择显示/隐藏底部导航
      this.ylTabbarShow = to.meta?.tabbarShow || false;
      // 判断路由中topBarShow的值来选择显示/隐藏底部导航
      this.ylNavbarShow = to.meta?.navbarShow || false;
      // 刷新时更新itemIndex 防止刷新页面回到0
      this.itemIndex = to.meta.tabbarIndex;

      // TODO 防止用户刷新行为的数据持久化
      let routeData = JSON.parse(sessionStorage.getItem(to.name));
      // 持久化数据恢复
      if (from.name == null && routeData) {
        for (let k in routeData.params) {
          to.params[k] = routeData.params[k];
        }
        for (let k in routeData.query) {
          to.query[k] = routeData.query[k];
        }
      } else {
        sessionStorage.setItem(
          to.name,
          JSON.stringify({ params: to.params, query: to.query })
        );
      }

      // 😀  pc mei xie hahah
      if (from.query.showPhone) {
        to.query.showPhone = true;
      }
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
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
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
  user-select: none;
}
::-webkit-scrollbar {
  display: none;
}

#app {
  width: 100vw;
  height: 100vh;
}

.yl {
  /* 修改vant组件全局样式  (需要同时使用yl样式)*/

  van-field .van-field__body {
    > input {
      border-bottom: 1px solid var(--color-third-text);
    }
  }
  .van-field__body {
    > input:focus {
      border-bottom: 1px solid var(--color-main) !important;
    }
  }
  .van-field__control {
    padding: var(--padding-base) 0px !important;
  }
  .van-field--error .van-field__control,
  .van-field--error .van-field__control::placeholder {
    color: var(--color-third-text) !important;
    -webkit-text-fill-color: currentColor;
  }

  &.van-button {
    background: var(--color-secondary) !important;
    border: none !important;
    border-radius: var(--border-radius-medium) !important;
    font-size: var(--font-size-lg) !important;
    box-shadow: var(--box-shadow);
    font-weight: bold;
  }
}
/* 修改默认的vant输入框组件为设计图的样式 */
.yl-van-field,.yl-van-field-flex {

  &.van-field {
    display: flex;
    &::after{
      // 去掉原有的下边框线
      border: none;
    }
    > .van-field__label {
      font-weight: bold;
      font-size: var(--font-size-lg);
      padding-bottom: var(--padding-sm);
    }
    .van-field__control {
      padding: var(--padding-base);
      border-bottom: 2px solid var(--color-secondary);
      &:disabled{
 border-bottom: 2px solid var(--color-light-text);
      }
      &::placeholder {
        color: var(--color-third-text) !important;
        -webkit-text-fill-color: currentColor;
      }
    }
  }
}
.yl-van-field-flex{
  align-items: center;
  .van-cell__title{
    flex: 0;
    white-space: nowrap;
  }
}
.yl-van-field.van-field{ flex-direction: column;}

/* .van-popup--bottom 的上半部分圆角样式 */
.van-popup--bottom{
  border-top-left-radius: var(--border-radius-larger);
  border-top-right-radius: var(--border-radius-larger);
}
</style>
