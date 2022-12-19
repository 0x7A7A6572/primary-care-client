<template>
<!-- 标题组件封装 -->
  <div class="yl-title text-large" :style="{
        '--bar-color': barColor,
        '--bar-width': barWidth,
        '--bar-height': barHeight,
        '--bar-offset': barOffset
      }">
    <span class="__text"> {{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "ylTitle",
  props: {
    // 标题文字
    title: String,
    barColor: {
      type: String,
      default: "var(--color-main)"
    },
    // 底部高亮条宽度和高度
    barWidth: {
      type: String,
      default: "4em"
    },
    barHeight: {
      type: String,
      default: "10px"
    },
    // 底部高亮条宽左偏移量
    barOffset: {
      type: String,
      default: "0.8em"
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-title {
  > .__text {
    position: relative;
    color: var(--color-mian-text);
    font-size: var(--fontsize-large);
    font-style: italic;
    z-index: 1;
    &::after {
      content: "";
      position: absolute;
      bottom: calc(var(--bar-height) * -0.4);
      left: 0;
      width: var(--bar-width);
      height: var(--bar-height);
      background: var(--bar-color);
      margin-left: var(--bar-offset);
      z-index: -1;
    }
  }
}
</style>