<template>
  <div class="chat-room">
    <!-- 嵌入ylNavbar -->
    <template name="slot-title">
      <div ref="avatar" class="slot-title-avatar">
        <img
          :src="doctor.avatar"
          alt=""
          width="40px"
          height="40px"
          style="
            border-radius: 50%;
            margin-right: 10px;
            border: 2px solid var(--color-main);
          "
        />
      </div>
    </template>

    <!-- 聊天窗口 -->
    <div class="chat-room-content">
      <ylMsg msg="sssssssssssssssssss" theme="others"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="2022-10-20" theme="system"></ylMsg>
      <ylMsg msg="你麻痹" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="others"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg
        msg="啊是发卡号是否可见哈萨克回复客户是分开是开发和空间是看"
        theme="selft"
      ></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="2022-10-20" theme="system"></ylMsg>
      <ylMsg
        msg="What's wrong with you ? funck you! get the fucking out!!!"
        theme="others"
      ></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>
      <ylMsg msg="131321313" theme="selft"></ylMsg>

      <!-- <van-sticky offset-top="80vh"> -->
        <ylChatInput></ylChatInput>
      <!-- </van-sticky> -->
    </div>
  </div>
</template>

<script>
import ylMsg from "../ChatRoom/ylMsg.vue";
import ylChatInput from "../ChatRoom/ylChatInput.vue";
export default {
  components: { ylMsg, ylChatInput },
  data() {
    return {
      doctor: this.$route.query.doctor,
    };
  },
  created() {
    this.$route.meta.title = this.$route.query.title;
  },
  mounted() {
    console.log(this.$route);
    this.$route.query.slotTitle = this.$refs["avatar"];
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  .slot-title-avatar {
    width: 40px;
    height: 40px;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>