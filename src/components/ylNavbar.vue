<template>
  <div class="yl-navbar">
    <div @click="onLeftArrowClick">
      <van-icon class-prefix="yl-icon" name="left_arrow" />
    </div>
    <div class="yl-navbar-title text-large">
      <div  ref="slotTitle"  v-show="slotTitle != null">
        <!-- 自定义导航条的内容显示 -->
      </div>
      <!-- 通过路由配置控制title显示的文本 
       权重： params.title > meta.title -->
      {{ title }}
      <div ref="slotTitle-before" v-show="slotTitleBefore != null"><!-- 自定义导航条的内容显示 --></div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "ylNavbar",
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      title: "",
      slotTitle: null,
      slotTitleBefore: null,
    };
  },
  watch: {
    $route(to, from) {
      this.title = to.params.title || to.meta.title;
      this.slotTitle = to.params?.slotTitle/* ?.innerHTML */ || null;
      this.slotTitleBefore = to.params?.slotTitleBefore/* ?.innerHTML */ || null;
      // this.$refs["slotTitle"].innerHTML = "";
     if (this.slotTitle) {
        this.$refs["slotTitle"].replaceChildren(this.slotTitle);
      }
      // this.$refs["slotTitle-before"].innerHTML = "";
      if (this.slotTitleBefore) {
        this.$refs["slotTitle-before"].replaceChildren(this.slotTitleBefore);
      }
    },
  },
  mounted() {},
  methods: {
    onLeftArrowClick() {
      let back = this.$route.params?.back || this.$route.meta?.back;
      if (!back) return this.$router.go(-1);
      if (typeof back == "number") {
        this.$router.go(back);
      } else {
        this.$router.replace({ name: back });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.yl-navbar {
  position: sticky;
  display: flex;
  align-items: center;
  color: var(--color-main);
  width: 100vw;
  top: 0;
  padding: 10px;
  background: var(--color-box-bg);
  height: 60px;
  font-size: 20px;
  font-weight: bolder;
  box-shadow: 0px 2px 8px var(--color-third-text);
  z-index: 10;
  > .yl-navbar-title {
    display: flex;
    width: 100%;
    justify-content: space-between;
    // font-size: var();
    align-items: center;
    color: var(--color-main);
    padding-left: 10px;
  }
}
</style>