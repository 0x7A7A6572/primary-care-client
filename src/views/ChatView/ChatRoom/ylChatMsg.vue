<template>
    <div class="yl-chat-msg" v-if="theme == 'system'">
    <span class="__system">{{ msg }} </span>
  </div>
    <div class="yl-msg" v-else-if="theme == 'others'">
    <img class="__msg-avatar" :src="avatar" alt="" />
    <div class="__msg-content">{{ msg }}</div>
  </div>
  <div class="yl-msg __self" v-else>
    <div class="__msg-content">{{ msg }}</div>
    <img class="__msg-avatar" :src="avatar" alt="" />
  </div>

</template>

<script>
export default {
  name: "ylChatMsg",
  props: {
    avatar: String,
    msg: String,
    theme: {
      type: String, //['self','others','system'],
      default: "others",
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-chat-msg {
  display: flex;
  margin: calc(12px + 1rem) 12px;
  .__msg-avatar {
    min-width: 12vw;
    width: 12vw;
    height: 12vw;
    background: var(--color-third-text);
    border-radius: 50%;
    object-fit: cover;
  }
  .__msg-content {
    text-align: left;
    max-width: calc(100% - 16vw);
    position: relative;
    top: 1rem;
    left: 10px;
    background: var(--color-box-bg);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 12px;
  }
  .__system{
    display: block;
    text-align: center;
    margin: 16px auto;
    font-size: small;
    color: var(--color-second-text);
  }
}

.__self {
    justify-content: right;
    > .__msg-content {
   
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 0;
      left: -10px;
      background: var(--color-main);
    }
  }
</style>