<template>
  <div class="chat-view">
    <ylStickyHead title="问诊记录" />
    <YlMsgItem
      v-for="item in chatlist"
      :key="item.sid"
      :user="{
        avatar: user.uid == item.uid ? item.d_avatar : item.u_avatar,
        name: user.uid == item.uid ? item.d_name : item.u_name,
        grade: user.uid == item.uid ? item.d_grade : '患者',
      }"
      lastMsg="?"
      :lastTime="item.stime"
      :stime="item.stime"
      :etime="item.etime"
      :desc="item.descs"
      @click="toChatRoom(item)"
    />
  </div>
</template>

<script>
import YlMsgItem from "./ylMsgItem.vue";
import ylStickyHead from "@/components/ylStickyHead.vue";
import { effectScope } from 'vue';
export default {
  components: { YlMsgItem, ylStickyHead },
  data() {
    return {
      user: this.$store.getters.user,
      chatlist: [],
    };
  },
  mounted() {
    this.$api.chat.list().then((res) => {
      console.log("list",res);
      this.chatlist = res.data;
    });
  },
  methods: {
    toChatRoom(e) {
      console.log("e:",e);
      this.$router.push({
        path: "/ChatList/ChatRoom",
        name: "ChatRoom",
        params: {
          doctor: {
            uid: this.user.uid == e.uid ? e.did : e.uid,
            avatar: this.user.uid == e.uid ? e.d_avatar : e.u_avatar,
            name: this.user.uid == e.uid ? e.d_name : e.u_name,
            grade: this.user.uid == effectScope.uid ? e.d_grade : "患者",
          },
          title: e.d_name,
          sinfo: e, // 会话信息
        },
      });
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-view {
  padding-bottom: 10vh;
  .__title {
    text-align: center;
    margin: var(--margin-lg);
  }
}
</style>