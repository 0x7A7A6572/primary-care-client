<template>
  <div v-if="items.length == 2" class="yl-switch" @click="onSwitchChange" @change="onSwitchChange">
    <span :class="['__item', 'left' ,value==0 ?'acvtive':'']" :data-value="0">{{ items[0] }}</span>
    <span :class="['__item', 'right' ,value==1 ?'acvtive':'']"  :data-value="1">{{ items[1] }}</span>
  </div>
  <div v-else class="yl-switch" >
    <span class="__item acvtive">{{ items[0] || items }}</span>
  </div>
</template>

<script>
export default {
  name: "ylSwitch",
  props: {
    items: {
      type: Array,
      default: () => ["男", "女"],
    },
  },
  data() {
    return{
      value: 0
    }
  },
  methods: {
    onSwitchChange(e) {
      // console.log(e.target);
      this.value = e.target.dataset.value;
      this.$emit("change",e.target.dataset.value);
      this.$emit("input",e.target.dataset.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-switch {
  display: flex;
  .__item {
    color: var(--color-light);
    border: 2px solid var(--color-light);
    padding: 2px var(--padding-lg);
    border-radius: var(--border-radius-small);
    font-weight: bold;
    &.left {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.right {
      margin-left: -2px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &.acvtive {
      color: var(--color-secondary);
      border: 2px solid var(--color-secondary);
    }
  }
}
</style>