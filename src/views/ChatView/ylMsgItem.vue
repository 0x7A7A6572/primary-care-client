<template>
  <div class="yl-msg-item box-round">
    <div class="__item-content"  @click="$emit('click', { user })">
      <van-image round width="18vw" height="18vw" :src="user?.avatar" alt="" />

      <div class="__user-info">
        <span class="__name text-large"
          >{{ user?.name }}
          <van-tag type="primary">{{ user?.grade }}</van-tag>
        </span>
        <span class="__msg-content text-of-e">{{ lastMsg }}</span>
      </div>
      <div class="__msg-info">
        <span class="__time text-small">{{ lastTime | time }}</span>
        <span class="unread-count" v-show="unreadCount !== 0">{{
          unreadCount
        }}</span>
      </div>
    </div>
    <van-collapse class="desc-info text-small"  v-model="descShow"  @click.stop>
  <van-collapse-item title="问诊描述" name="desc"> {{ desc }}</van-collapse-item>
  </van-collapse>
    <div class="time-info text-small">
      <span>问诊时间：</span> {{ stime | datetime }} - {{ etime | datetime }}
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
    unreadCount: {
      type: Number,
      default: 0
    },
    user: Object,
    stime: String,
    etime: String,
    desc: String
  },
  data(){
    return{
      descShow: []
    }
  }
};
</script>

<style lang="scss" scoped>
.yl-msg-item {
  padding: var(--padding-base);
  margin: var(--margin-base);
  user-select: none;
  width: auto;

  .__item-content {
    display: flex;

    justify-content: space-between;
    // > img {
    //   width: 18vw;
    //   height: 18vw;
    //   border-radius: 50%;
    // }
    .__user-info,
    .__msg-info {
      flex-direction: column;
      padding-left: var(--padding-base);
      justify-content: space-around;

      .__msg-content,
      .__time {
        color: var(--color-second-text) !important;
      }
    }
    .__user-info {
      flex: auto;
    }
    .unread-count {
      flex: auto;
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
  .time-info{
    margin: 2px 14px;

    color: var(--color-third-text);
    /* text-align: right; */
    border-top: 1px solid var(--color-third-text);
  }
}
</style>