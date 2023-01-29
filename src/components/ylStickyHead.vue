<template>
  <van-sticky class="yl-sticky-head" offset-top="10px">
    <div style="background: #fff">
      <div class="text-larger __title">{{title}}</div>
      <slot></slot>
    </div>
  </van-sticky>
</template>

<script>
export default {
  name: "ylStickyHead",
  props:{
    title: String
  }
};
</script>

<style lang="scss" scoped>
.yl-sticky-head{
  padding: var(--padding-base);

  .__title {
    text-align: center;
    margin-bottom: var(--margin-lg);
  }
  /* 修改默认.van-sticky 粘连时的样式 */
  ::v-deep .van-sticky {
    // position: absolute;
    padding: 10px;
    margin: -10px;
    background: #fff;
    margin-bottom: 10px;
  }
   ::v-deep .van-sticky--fixed {
      padding: 10px 20px;
      box-shadow: var(--box-shadow);
  }
}
</style>