<template>
  <!-- 标签栏/ 底部导航栏 -->
  <div class="yl-tabbar-pro">
    <div
      :class="['tabbar-item', itemIndex === 0 ? 'active' : '']"
      @click="itemClick(0, 'Home')"
    >
      <van-icon class-prefix="yl-icon" name="aixinzhijia1" />
      <span>首页</span>
    </div>
    <div
      :class="['tabbar-item', itemIndex === 1 ? 'active' : '']"
      @click="itemClick(1, 'ChatList')"
    >
      <van-icon class-prefix="yl-icon" name="xiaoxi" />
      <span>问诊</span>
    </div>
    <div
      :class="['tabbar-item', itemIndex === 2 ? 'active' : '']"
      @click="itemClick(2, 'Medicine')"
    >
      <van-icon class-prefix="yl-icon" name="xiangzi1" />
      <span>查药</span>
    </div>
    <div
      :class="['tabbar-item', itemIndex === 3 ? 'active' : '']"
      @click="itemClick(3, 'User')"
    >
      <van-icon class-prefix="yl-icon" name="danren" />
      <span>我的</span>
    </div>
    <!-- 动态悬浮球背景 -->
    <div
      class="active-bg"
      :style="{
        left: 4.5 + itemIndex * 25 + 'vw',
      }"
    ></div>
    <!-- 分离背景 方便实现不影响其他页面的悬浮圆角 -->
    <div class="tabbar-bg">
      <!-- 虚拟悬浮球 -->
      <div
        class="false-active-bg"
        :style="{
          left: 4.5 + itemIndex * 25 + 'vw',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "ylTabbarPro",
  components: {
    [Icon.name]: Icon,
  },
  props: {
    // paths: Array,
    // icons: Array,
    itemIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // itemIndex: this.$route.meta.tabbarIndex,
    };
  },
  methods: {
    itemClick(index, name) {
      this.$emit("onItemClick", { index, name });
      // this.itemIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-tabbar-pro {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--color-main);
  // width: 100vw;
  bottom: 0vh;
  padding: 0;
  // background: var(--color-box-bg);
  height: 16vw;
  font-size: 8vw;
  font-weight: bolder;
  // border-radius: 20px 20px 0px 0px;
  // box-shadow: 0px -2px 8px var(--color-third-text);
  .tabbar-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    background: var(--color-box-bg);
    border-radius: 16px 16px 0px 0px;
    height: 16vw;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    box-shadow: 0px -2px 6px rgba(159, 159, 159, 0.366);


    .false-active-bg {
      position: absolute;
      background: transparent;
      border-radius: 50%;
      width: 16vw;
      height: 16vw;
      top: -8vw;
      z-index: 2;
      transition: 0.3s;
      border: 2vw solid var(--color-mian-bg);
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 8vw;
        height: 8vw;
        background: transparent;
      }
      &::before {
        left: -9vw;
        border-radius: 0 4vw 0 0;
        box-shadow: 0 -2vw 0 0 var(--color-mian-bg);
      }
      &::after {
        right: -9vw;
        border-radius: 4vw 0 0 0;
        box-shadow: 0 -2vw 0 0 var(--color-mian-bg);
      }
    }
  }
  > .tabbar-item {
    // line-height: 60px;
    // text-align: center;
    display: flex;
    z-index: 3;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 20vw;
    width: 25vw;
    transition: 0.5s;
    &.active {
      transform: translateY(-7.5vw);

      color: white;
      > span {
        color: var(--color-second-text);
        font-size: small;
        opacity: 1;
      }
    }
    > span {
      position: absolute;
      bottom: -4vw;
      display: block;
      font-size: small;
      opacity: 0;
      transition: 0.5;
    }
  }
  .active-bg {
    position: absolute;
    background: var(--color-fab-bg);// var(--color-main);
    border-radius: 50%;
    width: 14vw;
    height: 14vw;
    top: -8vw;
    z-index: 2;
    transition: 0.3s;
    // border: 1vw solid var(--color-mian-bg);
    margin: 1vw; // 代替border 同时宽高-2vw
    box-shadow: 0px 2px 8px var(--color-main);
  }
}
</style>