<template>
  <div class="yl-chat-input">
    <input
      class="__inpt"
      type="text"
      :value="inptxt"
      @input="inputload"
      @keyup.enter="send"
      :placeholder="placeholder"
    />
    <div class="__btn box-round flex-d-column flex-center" @click="send">
      <van-icon
        class-prefix="yl-icon"
        name="fabu"
        color="var(--color-light-text)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ylChatInput",
  props: {
    placeholder: {
      type: String,
      default: "请输入消息...",
    },
  },
  data() {
    return {
      inptxt: "",
    };
  },
  methods: {
    inputload(e) {
      this.inptxt = e.target.value;
      this.$emit("input", e.target.value);
    },
    send() {
      this.$emit("send", this.inptxt);
      this.inptxt = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-chat-input {
  // position: sticky;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  width: 100%;
  .__inpt {
    line-height: 1.5rem;
    caret-color: var(--color-main);
    flex: 1;
    // font-size: large;
    padding: 10px;
    border: none;
    border-radius: var(--border-radius-small);
    box-shadow: var(--box-shadow);
  }
  .__btn {
    flex-grow: 0;
    min-width: 14vw;
    margin-left: 10px;
    background: var(--color-main);
    border-radius: var(--border-radius-small);
    box-shadow: var(--box-shadow);
  }
}
</style>