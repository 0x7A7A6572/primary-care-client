<template>
  <div class="chat-room" ref="chatRoom">
    <!-- S 嵌入ylNavbar -->
    <div ref="avatar" class="slot-title-avatar">
      <img
        :src="doctor?.avatar"
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
    <span
      v-show="state == 0"
      ref="endChat"
      style="color: var(--color-error)"
      @click="showEndPopup"
    >
      结束问诊
    </span>
    <!-- E 嵌入ylNavbar -->
    <!-- 聊天窗口 -->
    <div class="chat-room-content" ref="chatRoomWindow">
      <!-- 患者信息 -->
      <div class="patient-info box-round margin-base shadow">
        <div class="__info">
          <van-image round :src="consultInfor?.patient?.avatar"></van-image>
          <span class="__name">{{ consultInfor?.patient?.name }}&emsp; </span>
          <span class="__age"
            >{{ consultInfor?.patient?.gender == 0 ? "女" : "男" }}&emsp;
          </span>
          <span class="__age"
            >{{ consultInfor?.patient?.birthday | age }}岁&emsp;
          </span>
          <span>{{ consultInfor?.ctime | time }} </span>
        </div>
        <hr />
        <div
          :class="['_desc', ellipsis ? 'text-of-e' : '']"
          @click="ellipsis = !ellipsis"
        >
          <span class="text-blod">症状描述：</span>
          <span>{{ consultInfor?.desc || "无" }}</span>
        </div>
      </div>
      <ylChatMsg
        v-for="item in msgs"
        :key="item.mid"
        :msg="item.msg"
        :avatar="
          item.role == 'others' ? doctor?.avatar : $store.getters.user.avatar
        "
        :theme="item.role"
      />
    </div>
    <ylChatInput
      v-show="state == 0"
      @send="send"
      v-model="inptxt"
    ></ylChatInput>
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
      sid: null, // 当前问诊会话id
      doctor: this.$route.params.doctor || this.$route.query.doctor,
      consultInfor: this.$route.params.consultInfor,
      inptxt: "",
      msgs: [], //this.$store.getters.getMsglist,
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
        sid: this.sid,
        uid: this.$store.getters.user.uid,
        token: this.$store.getters.token,
        touid: this.doctor?.uid,
        time: new Date().getTime(),
        msg: v,
        type: "text",
        role: "self", // socket传输中有点多余的属性
      };
      this.msgs.push(Msg);
      // @弃用
      // this.$store.dispatch('addMsg',Msg).then(res=>{
      //   console.log("ssss:",res)
      // });
      this.$io.emit("uchat", Msg);
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
          console.log("visit-end", this.sid);
          this.$io.emit("visit-end", {
            msg: "问诊结束",
            sid: this.sid, // 问诊会话id
            endid: this.$store.getters.user.uid, // 结束发起人
            touid:  this.doctor?.uid
          });
          this.state = 1; //结束问诊
          this.msgs.push({
            time: new Date().getTime(),
            msg: "问诊结束",
            type: "text",
            role: "system",
          });
        })
        .catch(() => {});
    },
  },
  created() {
    this.$route.meta.title = this.$route.params.title;
    // 会话信息同步
    if (this.$route.params.sinfo) {
      let { sid, state } = this.$route.params.sinfo;
      this.sid = sid;
      this.state = state;
      this.doctor = this.$route.params.doctor;
      this.consultInfor = this.$route.params.sinfo;
      console.log("???", this.$route.params);
    }
    // 滑动到最新消息
    this.$nextTick(() => {
      this.$refs.chatRoom.scrollTop = this.$refs.chatRoomWindow.scrollHeight;
    });
  },
  mounted() {
    // 挂载到navBar
    this.$route.params.slotTitle = this.$refs["avatar"];
    this.$route.params.slotTitleBefore = this.$refs["endChat"];

    // 获取历史消息
    if (this.sid) {
      this.$api.chat.details({ sid: this.sid }).then((res) => {
        console.log("details:", res);
        // @弃用
        // this.$store.dispatch('setMsgList',res.data).then(sres=>{
        //   this.msgs = sres;
        //   // console.log('sres',sres)
        // });
        this.msgs = res.data.map((v) => {
          return {
            mid: v.mid,
            sid: v.sid,
            uid: v.sender,
            touid: v.recipient,
            time: v.sendtime,
            msg: v.content,
            type: v.type,
            role: v.sender == this.$store.getters.user.uid ? "self" : "others",
          };
        });
      });
    }

    // socket 服务
    if (this.sid && this.state == 0) {
      // 重连未结束的会话
      this.$io.emit("visit-reload", {
        sid: this.sid,
        uid: this.$store.getters.user.uid, // 发送者
        token: this.$store.getters.token,
        touid: this.doctor?.uid, // 接收者
        descs: this.consultInfor?.desc, // 症状描述
        type: this.consultInfor.type, // 问诊类型
      });
      console.log("重连问诊", this.sid, this.doctor?.uid);
    } else if (this.sid && this.state == 1) {
      // 已结束的问诊

    } else {
      
      // 开始问诊
      console.log("发起问诊",this.sid, this.state, this.doctor);
      this.$io.emit("visit-start", {
        uid: this.$store.getters.user.uid, // 发送者
        token: this.$store.getters.token,
        touid: this.doctor?.uid, // 接收者
        descs: this.consultInfor?.desc, // 症状描述
        type: this.consultInfor?.type, // 问诊类型
      });
    }

    // 问诊会话信息通知
    this.$io.on("visit-start", (msg) => {
      console.log("visit-start", msg);
      // $('.chart-box').scroll(-1);
      this.msgs.push(msg);
      switch (msg.code) {
        case 0x7a7a6572: // 会话创建成功标识
          this.sid = msg.sid;
          console.log("已获取会话id", msg.sid);
          break;
      }
    });
    // 任何一方结束问诊通知另一方
    this.$io.on("visit-end", (msg) => {
      // console.log("对方结束问诊", msg);
      // $('.chart-box').scroll(-1);
         this.state = 1; //结束问诊
          this.msgs.push({
            time: new Date().getTime(),
            msg: "问诊结束",
            type: "text",
            role: "system",
          });
    });

    // 系统通知
    this.$io.on("schat", (msg) => {
      console.log("schat", msg);
      // $('.chart-box').scroll(-1);
      this.msgs.push(msg);
      switch (msg.code) {
        case 0x7a7a6572: // 会话创建成功标识
          this.sid = msg.sid;
          break;
      }
    });

    // 私聊消息 (已在App.vue处理)
    // this.$io.on("uchat", (msg) => {
    //   console.log("uchat", msg);
    //   this.msgs.push(msg);
    //   // $('.chart-box').scroll(-1);
    // });
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