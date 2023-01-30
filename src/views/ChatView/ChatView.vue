<template>
  <div class="chat-view">
    <ylStickyHead title="问诊记录">
      <!-- 改造日历组件 -->
      <van-calendar
        ref="dargCalendar"
        title=""
        color="var(--color-main)"
        :poppable="false"
        :show-confirm="false"
        :max-date="new Date()"
        :min-date="new Date(2022, 10, 1)"
        :default-date="defaultDate"
        :formatter="formatterCalendar"
        @select="onSelectCalendar"
        :style="{
          height: calendarHeight + 'px',
          maxHeight: '60vh',
          transition: onTouchSign ? 'none' : '0.5s',
        }"
      />
      <div
        class="calendar-ctrl-bar"
        @touchstart="onCalendarBarTouchStart"
        @touchend="onTouchSign = false"
        @touchmove="onCalendarBarTouch"
        @click.stop="/* 防止点击穿透导致日期被选择(@Wraning 1) */"
      >
        <div class="__ctrl" @click="onCalendarBarClick"></div>
      </div>
    </ylStickyHead>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
      <ylEmpty
        title="当前选择的日期无问诊记录"
        type="msg"
        v-show="chatList()?.length == 0"
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
      storeChatList: this.chatList(),
      user: this.$store.getters.user,
      isLoading: false,
      calendarHeight: 80,
      calendarStartY: 336,
      // 记录拖拽状态 用于拖动时关闭动画属性
      onTouchSign: false,
      // calendarHasChats: this.$store.getters.calendarHasChats
      defaultDate: new Date(),
      isFilterChatList: false,
    };
  },
  mounted() {
    // vuex 没有则从api获取
    // if (this.$store.getters.getChat instanceof Array && this.$store.getters.getChat?.lenght <= 0) {
    this.$store.dispatch("getChatlist").then((res) => {
      // console.log("getters.getChat", this.$store.getters.getChat);
      // this.storeChatList = res;
    });
    // }else{
    // }
    // this.$refs['dargCalendar'].onClickDay = function(e){
    //   console.log("onClickDay",e);
    // }
  },
  methods: {
    onRefresh() {
      //  console.log('下拉刷新');
      this.$store.dispatch("getChatlist").then((res) => {
        // console.log("getters.getChat", this.$store.getters.getChat);
        this.isLoading = false;
        // this.storeChatList = res;
      });
    },
    chatList() {
      if (this.isFilterChatList) {
        let chatByDay = this.$store.getters.getChatByDay(this.defaultDate);
        return chatByDay;
      } else {
        return this.$store.getters.getChat;
      }
      // @Wraning [影响性能] 即使没有选择日期也会触发重新渲染
      // console.log("isFilterChatList", this.defaultDate);
    },
    toChatRoom(e) {
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
            ctime: e.stime,
            desc: e.descs,
            patient: {
              avatar: e.u_avatar,
              name: e.u_name,
              gender: e.u_gender,
              birthday: e.u_birthday,
            },
          },
          title: e.d_name,
          sinfo: e, // 会话信息
        },
      });
      // console.log(e);
    },
    onCalendarBarTouchStart(e) {
      let screenY = e.targetTouches[0].screenY;
      this.calendarStartY = screenY;
      this.onTouchSign = true;
    },
    onCalendarBarTouch(e) {
      let screenY = e.targetTouches[0].screenY;
      let needChange = Math.abs(this.calendarStartY - screenY);
      if (needChange < 2) return; //防止抖动
      if (this.calendarStartY > screenY) {
        // console.log("上划");
        this.calendarHeight -= needChange;
      } else {
        // console.log("下划");
        this.calendarHeight += needChange;
      }
      if (this.calendarHeight < 80) return (this.calendarHeight = 80);
      this.calendarStartY = screenY;
      // console.log(this.calendarHeight)
    },
    onCalendarBarClick(e) {
      if (this.calendarHeight < 200) {
        this.calendarHeight = 400;
      } else {
        this.calendarHeight = 80;
      }
      // console.log(e);
      this.calendarStartY = e.screenX;
    },
    formatterCalendar(day) {
      if (this.$store.getters.dayHasChat(day)) {
        day.bottomInfo = "问诊";
      }
      return day;
    },
    onSelectCalendar(day) {
      this.isFilterChatList = !(day.getTime() == this.defaultDate?.getTime());
      // 选择之后收起日历
      this.calendarHeight = 80;

      if (day.getTime() == this.defaultDate?.getTime()) {
        this.defaultDate = null;
      } else {
        this.defaultDate = day;
      }
      setTimeout(() => {
        // TODO 收起日历后应显示选择的日期,
        let selectDateEl = document.querySelector(
          ".van-calendar__selected-day"
        );
        selectDateEl?.scrollIntoView();

        // this.chatList 会多次触发,暂时放这里
        if (this.defaultDate != null) {
          this.$ylToast({
            type: "success",
            msg: `筛选完成`,
            duration: 1000,
          });
        }
      }, 500);
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
  // 改日历样式
  .dragCalendar {
    transition: 0.5s;
  }
  ::v-deep .van-calendar__bottom-info {
    color: var(--color-main);
    font-weight: bold;
  }
  ::v-deep .van-calendar__header-title {
    display: none;
  }
  ::v-deep .van-calendar__header-subtitle {
    position: absolute;
    top: 10px;
    right: 20px;
  }
  ::v-deep .van-calendar__selected-day {
    width: 40px;
    // height: 40px;
    .van-calendar__bottom-info {
      display: none;
    }
  }
  // 日历控制条
  .calendar-ctrl-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--padding-base);
    height: 8px;
    min-height: 8px;
    // 防止点击穿透@2
    position: relative;
    z-index: 10;
    // background: transparent;
    .__ctrl {
      background: var(--color-main);
      border-radius: 2rem;
      width: 10vw;
      height: 8px;
    }
  }
}
</style>