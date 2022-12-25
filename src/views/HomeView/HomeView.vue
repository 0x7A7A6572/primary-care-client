<template>
  <div class="home">
    <!-- ylTitle 演示 -->
    <div class="box">
      <ylTitle title="健康新闻" />
      <br/>balibalibalibali
    </div>

    <br />
    <ylTitle title="科室列表" theme="left" color="var(--color-second-text)" />

    <br />

    <!-- 使用第三方图标 演示 -->
    <!-- 通过 class-prefix 指定类名为 yl-icon -->
    <van-icon class-prefix="yl-icon" name="dingwei" />
    <van-icon class-prefix="yl-icon" name="qiche2"  size="5vw" />
    <van-icon class-prefix="yl-icon" name="qiche2"  color="#dd6ff3" />
    
    <div class="box-round flex-d-column flex-center" style="color:red">
       <van-icon class-prefix="yl-icon" name="wancheng" size="8vw" />
       <span style="padding-top:5px">用药提醒</span>
    </div>

    <br />
   <!-- 路由跳转 -->
    <router-link to="/home/MedicationReminder">进入用药提醒</router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style scoped>
.home {
  padding: 10px;
}
</style>