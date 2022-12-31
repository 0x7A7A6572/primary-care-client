<template>
  <div class="chat-view">
    <div class="text-larger __title">问诊消息列表</div>
    <YlMsgItem
      :user="{
        avatar:
          '	https://img02.mockplus.cn/image/2022-12-17/9d8c37c0-7e02-11ed-9b42-a536ac7c23fc.jpg',
        name: '李医生',
        grade: '主任医师',
      }"
      lastMsg="这个是未读消息，很长很长的未读消息,23123123123123123"
      lastTime="23:59"
      :unreadCount="6"
    ></YlMsgItem>
    <YlMsgItem
      :user="{
        avatar:
          '	https://img02.mockplus.cn/image/2022-12-17/9d8c37c0-7e02-11ed-9b42-a536ac7c23fc.jpg',
        name: '李医生',
        grade: '主任医师',
      }"
      lastMsg="这个是未读消息，很长很长的未读消息,23123123123123123"
      lastTime="23:59"
      :unreadCount="12"
    ></YlMsgItem>
  </div>
</template>

<script>
import YlMsgItem from "./ylMsgItem.vue";
export default {
  components: { YlMsgItem },
};
</script>
<style lang="scss" scoped>
.chat-view {
  .__title {
    text-align: center;
    margin: var(--margin-lg);
  }
}
</style>