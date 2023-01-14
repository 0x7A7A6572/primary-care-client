<template>
  <div class="chat-room" ref="chatRoom">
    <!-- S 嵌入ylNavbar -->
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
    <span ref="endChat" style="color: var(--color-error)" @click="showEndPopup">
      结束问诊
    </span>
    <!-- E 嵌入ylNavbar -->
    <!-- 聊天窗口 -->
    <div class="chat-room-content" ref="chatRoomWindow">
      <!-- 患者信息 -->
      <div class="patient-info box-round margin-base shadow">
        <div class="__info">
          <van-image round :src="consultInfor.patient.avatar"></van-image>
          <span class="__name">{{ consultInfor.patient.name }}&emsp; </span>
          <span class="__age"
            >{{ consultInfor.patient.gender == 0 ? "女" : "男" }}&emsp;
          </span>
          <span class="__age"
            >{{ consultInfor.patient.birthday | age }}岁&emsp;
          </span>
          <span>{{ consultInfor.ctime | time }} </span>
        </div>
        <hr />
        <div
          :class="['_desc', ellipsis ? 'text-of-e' : '']"
          @click="ellipsis = !ellipsis"
        >
          <span class="text-blod">症状描述：</span>
          <span>{{ consultInfor.desc || "无" }}</span>
        </div>
      </div>
      <ylChatMsg
        v-for="item in msgs"
        :key="item.msg + item.time"
        :msg="item.msg"
        :avatar="
          item.role == 'others' ? doctor.avatar : $store.getters.user.avatar
        "
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
      state: 0, //当前会话状态
      sid: 0, // 当前问诊会话id
      doctor: this.$route.params.doctor || this.$route.query.doctor,
      consultInfor: this.$route.params.consultInfor,
      inptxt: "",
      msgs: [
        /* 
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
       */
      ],
      ellipsis: true,
    };
  },
  methods: {
    send(v) {
      if (!v.trim()) {
        console.log("请先输入文字再发送！");
        return;
      }
      let Msg = {
        uid: this.$store.getters.user.uid,
        token: this.$store.getters.token,
        touid: this.doctor?.uid,
        time: new Date().getTime(),
        msg: v,
        type: "text",
        role: "self",
      };
      this.msgs.push(Msg);
      server.emit("uchat", Msg);
      // 滑动到最新消息
      this.$nextTick(() => {
        this.$refs.chatRoom.scrollTop = this.$refs.chatRoomWindow.scrollHeight;
      });
    },

    // 结束问诊弹出确认
    showEndPopup() {
      this.$Dialog
        .confirm({
          title: "结束问诊",
          message: `确定结束本次问诊吗?`,
        })
        .then(() => {
          // TODD 执行结束问诊
          console.log("end");
          server.emit('end',{
            msg: "问诊结束",
            sid: this.sid,
            endid: this.$store.getters.user.uid,
          });
        })
        .catch(() => {});
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
    // 挂载到navBar
    this.$route.params.slotTitle = this.$refs["avatar"];
    this.$route.params.slotTitleBefore = this.$refs["endChat"];

    // socket 服务
    this.$io.on("schat", (msg) => {
      console.log("schat", msg);
      // $('.chart-box').scroll(-1);
      this.msgs.push(msg);
    });
    this.$io.on("uchat", (msg) => {
      console.log("uchat", msg);
      this.msgs.push(msg);
      // $('.chart-box').scroll(-1);
    });
    this.$io.on("register", (msg) => {
      console.log("register", msg);
      // 发送验证消息告诉服务器开始用户发起问诊
      switch (msg.code) {
        case 0x7a7a6572:
          server.emit("register", {
            uid: this.$store.getters.user.uid, // 发送者
            token: this.$store.getters.token,
            touid: this.doctor?.uid,
            recipient: this.doctor?.uid, // 接收者
            descs: this.consultInfor.desc,
            type: this.consultInfor.type,
          });
          console.log("this.consultInfor", this.consultInfor);
          break;
        case 1: // 会话创建成功
          this.msgs.push(msg);
          this.sid = msg.sid;
          break;
      }
    });
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
    // width: 40px;
    width: auto;
    height: 40px;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .patient-info {
    margin: var(--margin-base);
    width: auto;
    .__info {
      position: relative;
      display: flex;
      align-items: center;
      > .van-image {
        width: 14vw;
        height: 14vw;
        margin: var(--margin-sm);
      }
      .__name {
        font-weight: bold;
      }
      .__age {
      }
    }
    .__desc {
      margin: var(--margin-base);
    }
  }
}
</style>