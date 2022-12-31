<template>
  <div class="yl-msg-item box-round">
    <img :src="user?.avatar" alt="" />
    <div class="__user-info">
      <span class="__name text-large"
        >{{ user?.name }}
        <van-tag type="primary">{{ user?.grade }}</van-tag>
      </span>
      <span class="__msg-content text-of-e">{{ lastMsg }}</span>
    </div>
    <div class="__msg-info">
      <span class="__time text-large">{{ lastTime }}</span>
      <span class="unread-count" v-show="unreadCount !== 0">{{ unreadCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ylMsgItem",
  props: {
    lastMsg: String,
    type: String,
    lastTime: String,
    unreadCount: Number,
    user: Object,
  },
};
</script>

<style lang="scss" scoped>
.yl-msg-item {
  display: flex;
  padding: var(--padding-base);
  margin: var(--margin-base);
  user-select: none;

  > img {
    width: 18vw;
    height: 18vw;
    border-radius: 50%;
  }
  .__user-info,
  .__msg-info {
    display: flex;
    flex-direction: column;
    padding-left: var(--padding-base);
    justify-content: space-around;

    .__msg-content, .__time {
      color: var( --color-second-text) !important;
    }
  }
  .unread-count{
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: bold;
    width: 1.5em;
    height: 1.5em;
    background: var(--color-error);
    color: white;
    width: fit-content;
    padding: var(--padding-sm);
    border-radius: 2em;
  }
}
</style>