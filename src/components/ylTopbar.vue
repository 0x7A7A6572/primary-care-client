<template>
  <div class="yl-topbar">
    <div @click="onLeftArrowClick">
      <van-icon class-prefix="yl-icon" name="left_arrow" />
    </div>
    <div class="yl-topbar-title text-larger">
      {{ $route.meta.title || $route.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  data() {
    return {};
  },
  methods: {
    onLeftArrowClick() {
      if (this.$route.meta?.return) {
        this.$router.push(this.$route.meta?.return);
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.yl-topbar {
  position: sticky;
  display: flex;
  align-items: center;
  color: var(--color-main);
  width: 100vw;
  top: 0;
  padding: 10px;
  background: var(--color-box-bg);
  height: 60px;
  font-size: 8vw;
  font-weight: bolder;
  box-shadow: 0px -2px 8px var(--color-main-bg);
  > .yl-topbar-title {
    // font-size: var();
    color: var(--color-main);
    padding-left: 10px;
  }
}
</style>