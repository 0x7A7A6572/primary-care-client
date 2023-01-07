<template >
  <div class="yl-toast" v-if="show">
    <i
      v-show="type !== 'none'"
      :class="['yl-icon', 'yl-icon-' + type]"
      :style="{
        color: colors[type],
      }"
    ></i>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: "toast",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: "提示",
    },
    duration: {
      type: Number,
      default: 3000,
    },
    type: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      colors: {
        success: "var(--color-success)",
        info: "var(--color-primary)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
      },
      timerDuration: null,
    };
  },
  watch: {
    show(n) {
      if (!n && this.timerDuration) {
        clearTimeout(this.timerDuration);
        this.timerDuration = null;
      }
    },
  },
  methods: {
    init() {
      this.show = true;
      this.timerDuration = setTimeout(() => {
        this.show = false;
      }, this.duration);
    },
    clear() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-toast {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: show 0.5s;
  padding: var(--padding-base);
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
  z-index: 999;
  > span {
    display: block;
    color: #fff;
    font-size: var(--font-size-base);
  }
  > i {
    margin-right: var(--margin-base);
    font-size: var(--font-size-lg);
  }
}
@keyframes show {
  0% {
    top: -10%;
  }
  100% {
    top: 10%;
  }
}
</style>
