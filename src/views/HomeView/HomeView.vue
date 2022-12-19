<template>
  <div class="home">
    <div class="box">
      <ylTitle title="健康新闻" />
    </div>
    <!-- 通过 class-prefix 指定类名为 yl-icon -->
    <van-icon class-prefix="yl-icon" name="dingwei" />
    <van-icon name="wap-home-o" />
    <router-link  to="/home/MedicationReminder">进入用药提醒</router-link>
  </div>
</template>

<script>
import ylTitle from "@/components/ylTitle.vue";
export default {
  name: "HomeView",
  components: {
    ylTitle
  },
};
</script>