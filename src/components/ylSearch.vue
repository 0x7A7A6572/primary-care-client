<template>
  <div
    @click="$emit('click')"
    :class="['yl-search', 'box', boxShadow ? 'shadow' : '']"
    :disabled="disabled"
    :style="{ border: '2px solid ' + borderColor }"
  >
    <van-icon
      class-prefix="yl-icon"
      name="fangdajing"
      :color="color"
      size="var(--icon-size)"
    />
    <input
      ref="yl-search-input"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @change="change"
      @input="inputload"
      :disabled="disabled"
      @keyup.enter="search"
    />
<!--  v-focus="autoFocus" -->
    <div
      v-show="searchBtn"
      class="__search-btn box"
      @click="search"
      :disabled="disabled"
    >
      <van-icon
        v-show="loading"
        class-prefix="yl-icon"
        name="jiazai1"
        color="var(--color-mian-bg)"
      />
      <span v-show="!loading"> {{ searchText }}</span>
    </div>
    <div class="result-panel" v-show="panel"><slot></slot></div>
    <div
      class="panel-mask"
      v-show="panel"
      @click.stop="$emit('closePanel', false)"
      @scroll.stop="
        () => {
          return false;
        }
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: "ylSearch",
  model: {
    value: "value",
  },
  props: {
    placeholder: String,
    color: {
      type: String,
      default: "var(--color-main)",
    },
    searchBtn: {
      type: Boolean,
      default: true,
    },
    searchText: {
      type: String,
      default: "搜索",
    },
    boxShadow: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: "transparent",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    panel: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    autoFocus: Boolean,
  },
  data() {
    return {
      // currentValue: '',
    };
  },
  methods: {
    change(e) {
      //  this.currentValue = e.target.value
      this.$emit("change", e.target.value);
    },
    inputload(e) {
      //  this.currentValue = e.target.value
      this.$emit("input", e.target.value);
    },
    search(e) {
      this.$emit("search", e.target.value);
    },
  },
  mounted(){
    if(this.$props.autoFocus) this.$refs['yl-search-input']?.focus();
  }
};
</script>

<style lang="scss" scoped>
.yl-search {
  position: relative;
  // overflow: hidden;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  padding: var(--padding-base);
  border-radius: var(--border-radius-medium);

  > input {
    border: none;
    padding-left: 20px;
    &::placeholder {
      font-size: small;
      color: var(--color-third-text);
    }
    &[disabled] {
      color: var(--color-third-text);
    }
  }
  > .__search-btn {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background: var(--color-main);
    width: fit-content;
    height: 100%;
    position: absolute;
    right: 0;
    min-width: 4rem;
    color: white;
    font-weight: bold;
    &[disabled] {
      filter: grayscale(0.5) brightness(1.2);
    }
  }
  > .result-panel {
    position: absolute;
    top: calc(100% - var(--border-radius-small));
    left: 0;
    width: 100%;
    min-height: 50px;
    background: white;
    z-index: 3;
    box-shadow: var(--box-shadow);
    // border: 2px solid var(--color-main);
    // border-top: none;
    padding: 6px;
    max-height: 50vh;
    overflow: scroll;
    border-bottom-left-radius: var(--border-radius-medium);
    border-bottom-right-radius: var(--border-radius-medium);
  }
  .panel-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.562);
    z-index: 1;
  }
}
</style>