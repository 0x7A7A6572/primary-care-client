<template>
  <div class="home">
    <div class="box">
      <ylTitle title="健康新闻" />
    </div>
    <!-- 通过 class-prefix 指定类名为 yl-icon -->
    <van-icon class-prefix="yl-icon" name="yiliaoxiang" />
    <van-icon name="wap-home-o" />
  </div>
</template>

<script>
import ylTitle from "@/components/ylTitle.vue";
export default {
  name: "HomeView",
  components: {
    ylTitle,
  },
};
</script>