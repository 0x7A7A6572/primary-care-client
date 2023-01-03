<template>
  <div class="home">
    <!-- 用户信息 -->
    <div class="home-user">
      <img class="__avatar" :src="$store.getters.user.avatar" alt="">
      <span class="text-larger" style=""> 您好！</span>
        <span class="text-larger">{{$store.getters.user.name}}</span>
    </div>
    <!-- 主功能模块 -->
    <div class="main-func">
      <div class="box __func-item">
        <van-icon class-prefix="yl-icon" name="yiliaoqicai2" />
        <span>在线问诊</span>
        
      </div>
      <div class="box __func-item">
        <van-icon class-prefix="yl-icon" name="jijiu1" />
        <span>预约挂号</span>
      </div>
    </div>
    <!-- ylTitle 演示 -->
    <div class="box">
      <ylTitle title="健康新闻" />
      <br />balibalibalibali
    </div>

    <br />
    <ylTitle title="科室列表" theme="left" color="var(--color-second-text)" />

    <br />

    <!-- 使用第三方图标 演示 -->
    <!-- 通过 class-prefix 指定类名为 yl-icon -->
    <van-icon class-prefix="yl-icon" name="dingwei" />
    <van-icon class-prefix="yl-icon" name="qiche2" size="5vw" />
    <van-icon class-prefix="yl-icon" name="qiche2" color="#dd6ff3" />

    <br />
    <!-- 路由跳转 -->
    <router-link to="/MedicationReminder/add">
      <div class="box-round flex-d-column flex-center" style="color: red">
        <van-icon class-prefix="yl-icon" name="wancheng" size="8vw" />
        <span style="padding-top: 5px">用药提醒</span>
      </div></router-link
    >
  </div>
</template>
<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style lang="scss" scoped>
.home {
  padding: var(--padding-base);
  .home-user{
    display: flex;
    align-items: center;
    .__avatar{
      width: 20vw;
      height: 20vw;
      background: var(--color-main);
      border-radius: 50%;
      margin-right: var(--margin-base);
    }
  }
  .main-func{
    display: flex;
  }
}
</style>