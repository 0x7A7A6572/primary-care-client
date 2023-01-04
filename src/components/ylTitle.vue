<template>
  <!-- 标题组件封装 -->
  <div
    class="yl-title text-large"
    :style="{
      '--title-text-color': color,
      '--bar-color': barColor,
      '--bar-width': barWidth,
      '--bar-height': barHeight,
      '--bar-offset': barOffset,
      '--bar-font-size': size
    }"
  >
    <span :class="'__text-' + theme"> {{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "ylTitle",
  props: {
    // 标题文字
    title: String,
    // 文字颜色
    color: {
      type: String, 
      default: 'var( --color-second-text)'
    }, 
    size: {
      type: String,
      default: 'medium'
    },
    // 高亮条显示的样式 （bottom/left）
    theme: {
      type: String,
      default: "bottom",
    },
    barColor: {
      type: String,
      default: "var(--color-main)",
    },
    // 底部高亮条宽度和高度
    barWidth: {
      type: String,
      default: "4em",
    },
    barHeight: {
      type: String,
      default: "10px",
    },
    // 底部高亮条宽左偏移量
    barOffset: {
      type: String,
      default: "0.8em",
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-title {
  display: flex;
  align-items: center;
  font-size: var(--bar-font-size);
  > .__text-bottom {
    position: relative;
    color: var(--title-text-color);
    font-size: var(--fontsize-large);
    font-style: italic;
    z-index: 0;
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
  > .__text-left {
    position: relative;
    color: var(--title-text-color);
    font-size: var(--bar-font-size);
    // font-style: italic;
    padding-left: 15px;
    z-index: 0;
    &::after {
      content: "";
      position: absolute;
      // bottom: calc(var(--bar-height) * -0.4);
      left: 0;
      width: 5px;
      height: 100%;
      border-radius: 1rem;
      background: var(--bar-color);
      // margin-left: var(--bar-offset);
      z-index: -1;
    }
  }
}
</style>