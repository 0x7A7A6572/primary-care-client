<template>
  <div class="chat-room" ref="chatRoom">
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
    <div class="chat-room-content" ref="chatRoomWindow">
      <ylChatMsg
        v-for="item in msgs"
        :key="item.msg + item.time"
        :msg="item.msg"
        :avatar="item.role == 'others'? doctor.avatar : null"
        :theme="item.role"
      />
    </div>
    <ylChatInput @send="send" v-model="inptxt"></ylChatInput>
  </div>
</template>

<script>
import ylChatMsg from "./ylChatMsg.vue";
import ylChatInput from "../ChatRoom/ylChatInput.vue";
export default {
  components: { ylChatMsg, ylChatInput },
  data() {
    return {
      doctor: this.$route.query.doctor,
      inptxt: "",
      msgs: [
        // 模拟数据
        {
          time: "00",
          msg: "我是xxx科的李医生，请详细描述一下您的病情。",
          type: "text",
          role: "others",
        },
        { time: "00", msg: "您好", type: "text", role: "self" },
        { time: "2-25 23:59", msg: "2-25 23:59", type: "text", role: "system" },
        { time: "00", msg: "是这样的....", type: "text", role: "self" },
        {
          time: "00",
          msg: "嗯，大概的情况我已经了解了",
          type: "text",
          role: "others",
        },
        {
          time: "00",
          msg: "您这边平时睡眠情况还好吗？",
          type: "text",
          role: "others",
        },
        {
          time: "00",
          msg: "我....... , 就是.........., 除此之外....... ，其他没有感觉！",
          type: "text",
          role: "self",
        },
        { time: "00", msg: "！", type: "text", role: "others" },
        { time: "2-25 23:59", msg: "2-26 01:30", type: "text", role: "system" },
        { time: "00", msg: "寄了🤔", type: "text", role: "others" },
        { time: "00", msg: "？？？？？😧....", type: "text", role: "self" },
      ],
    };
  },
  methods: {
    send(v) {
      if (!v.trim()) {
        console.log("请先输入文字再发送！");
        return;
      }
      this.msgs.push({
        time: new Date().getTime(),
        msg: v,
        type: "text",
        role: "self",
      });
      // 滑动到最新消息
      this.$nextTick(() => {
        this.$refs.chatRoom.scrollTop = this.$refs.chatRoomWindow.scrollHeight;
      });
    },
  },
  created() {
    this.$route.meta.title = this.$route.query.title;
    // 滑动到最新消息
    this.$nextTick(() => {
      this.$refs.chatRoom.scrollTop = this.$refs.chatRoomWindow.scrollHeight;
    });
  },
  mounted() {
    this.$route.query.slotTitle = this.$refs["avatar"];
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  height: 100vh;
  overflow: scroll;
  .chat-room-content {
    padding-bottom: 20vh;
  }
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