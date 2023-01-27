<template>
<div  class="chat-view">
<ylStickyHead title="问诊记录" />
  <van-pull-refresh  v-model="isLoading" @refresh="onRefresh">
    <YlMsgItem
      v-for="item in chatList()"
      :key="item.sid"
      :user="{
        avatar: user.uid == item.uid ? item.d_avatar : item.u_avatar,
        name: user.uid == item.uid ? item.d_name : item.u_name,
        grade: user.uid == item.uid ? item.d_grade : '患者',
      }"
      :lastMsg="item.lastMsg"
      :lastTime="item.stime"
      :stime="item.stime"
      :etime="item.etime"
      :desc="item.descs"
      :unreadCount="item.unreadCount"
      @click="toChatRoom(item)"
    />
  </van-pull-refresh>
</div>

</template>

<script>
import YlMsgItem from "./ylMsgItem.vue";
import ylStickyHead from "@/components/ylStickyHead.vue";
import { effectScope } from "vue";
export default {
  components: { YlMsgItem, ylStickyHead },
  data() {
    return {
      user: this.$store.getters.user,
      isLoading: false,
    };
  },
  mounted() {
    // vuex 没有则从api获取
    // if (this.$store.getters.getChat instanceof Array && this.$store.getters.getChat?.lenght <= 0) {
      this.$store.dispatch("getChatlist").then((res) => {
        // console.log("getters.getChat", this.$store.getters.getChat);
      });
    // }else{
    // }
  },
  methods: {
    onRefresh(){
    //  console.log('下拉刷新');
     this.$store.dispatch("getChatlist").then((res) => {
        // console.log("getters.getChat", this.$store.getters.getChat);
      this.isLoading = false;
      });
    },
    chatList() {
      return this.$store.getters.getChat;
    },
    toChatRoom(e) {
      // console.log("e:",e);
      this.$router.push({
        // path: "/ChatList/ChatRoom",
        name: "ChatRoom",
        params: {
          doctor: {
            uid: this.user.uid == e.uid ? e.did : e.uid,
            avatar: this.user.uid == e.uid ? e.d_avatar : e.u_avatar,
            name: this.user.uid == e.uid ? e.d_name : e.u_name,
            grade: this.user.uid == effectScope.uid ? e.d_grade : "患者",
          },
          // 患者信息
          consultInfor: {
            patient: {
              avatar: e.u_avatar,
              name: e.u_name,
              gender: e.u_gender,
              birthday: e.u_birthday,
            },
            ctime: e.ctime,
            desc: e.desc,
          },
          title: e.d_name,
          sinfo: e, // 会话信息
        },
      });
      // console.log(e);
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