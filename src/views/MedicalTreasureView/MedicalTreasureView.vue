<template>
  <van-tree-select
    class="medical-treasure-view"
    :items="items"
    :active-id.sync="activeId"
    :main-active-index.sync="activeIndex"
  />
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "浙江",
          children: [
            { text: "浙江1", children: [], dot: true },
            { text: "浙江2", children: [], dot: true },
            { text: "浙江3", children: [], dot: true },
          ],
          dot: false,
        },
        { text: "江苏", children: [] },
      ],
      activeId: 1,
      activeIndex: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.medical-treasure-view {
  background: white;
  min-height: 100%;
  padding: var(--padding-base);
  ::v-deep .van-sidebar-item--select::before {
    background: var(--color-main);
  }
}
</style>