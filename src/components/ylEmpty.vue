<template>
  <div class="yl-empty">
    <img :src="stateImage" alt="" :style="{
      width: width
    }" />
    <span class="__desc">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "ylEmpty",
  props: {
    /* search/net/msg/list  */
    type: String,
    title: {
      type: String,
      default: "暂无内容",
    },
    width: {
      type: String,
      default: "60%",
    },
  },
  computed: {
    stateImage() {
      switch (this.$props.type || "list") {
        case "net":
          return require("@/assets/images/state_no_net.png");
        case "search":
          return require("@/assets/images/state_no_search.png");
        case "msg":
          return require("@/assets/images/state_no_msg.png");
        case "list":
          return require("@/assets/images/state_no_list.png");
      }
      // let states = {
      //   "net": require('@/assets/images/state_no_net.png'),
      //   "search": require('@/assets/images/state_no_search.png'),
      //   "msg": require('@/assets/images/state_no_msg.png'),
      //   "list": require('@/assets/images/state_no_list.png')
      // }
      // return states[this.$props.type || 'list']
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-empty {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: var(--color-third-text);
  >img{
    margin: auto;
  }
  >.__desc{
    padding: 10px;
  }
}
</style>