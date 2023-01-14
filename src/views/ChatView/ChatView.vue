<template>
  <div class="chat-view">
    <!-- <div class="text-larger __title">问诊消息列表</div> -->
    <ylStickyHead title="问诊记录" />
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
      @click="toChatRoom"
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
    <YlMsgItem
     v-for="item in chatlist" :key="item.sid"
    :user="{
       avatar: user.uid == item.uid ? item.d_avatar : item.u_avatar,
       name: user.uid == item.uid ? item.d_name : item.u_name,
       grade: user.uid == item.uid ? item.d_grade : '患者',
       lastMsg: '?',
       lastTime:  item.stime
    }"
    />
    <!-- <div class="box" v-for="item in chatlist" :key="item.sid">
      {{item}}
    </div> -->
  </div>
</template>

<script>
import YlMsgItem from "./ylMsgItem.vue";
import ylStickyHead from "@/components/ylStickyHead.vue";
export default {
  components: { YlMsgItem,ylStickyHead },
  data(){
    return{
      user: this.$store.getters.user,
      chatlist:[]
    }
  },
  mounted(){
    this.$api.chat.list().then(res=>{
      console.log(res);
      this.chatlist = res.data;
    })
  },
  methods:{
    toChatRoom(e){
      this.$router.push({
        path:'/ChatList/ChatRoom',
        query:{
          doctor: e.user,
          title: e.user.name
        }
        });
        console.log(e)
    }
  }
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