<template>
  <div class="show-phone">
    <div style="width: fit-content; margin-left: 50px; text-align: center">
      <img height="300" src="@/assets/logo-text.svg" alt="" />
      <br />
      <hr style="background: transparent" />
      <br />
      <h1 style="color: #6b6b6b">建议您使用手机访问</h1>
    </div>
    <!-- <iframe class="phone"  :src="config.backupUrl"  seamless width="400" height="780" frameborder="0"> -->
    <iframe
      class="phone"
      :src="config.curUrl + '#/Home?showPhone=true'"
      width="400"
      height="780"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
import config from "@/utils/config";
export default {
  data(){
    return {
      config
    }
  }
}
</script>
<style lang="scss" scoped>
.show-phone {
  min-width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    white 30%,
    rgb(40, 255, 155),
    rgb(28, 202, 255)
  ) !important;
}
.phone {
  position: absolute;
  z-index: 100;
  right: 20vw/* 20px */;
  top: 50px;
  background: #fff;
  width: 400px;
  height: 780px;
  box-shadow: 1px 1px 10px rgba(124, 124, 124, 0.637);
  border-radius: 16px;
}
</style>