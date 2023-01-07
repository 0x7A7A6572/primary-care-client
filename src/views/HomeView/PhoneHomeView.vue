<template>
  <div class="show-phone">
    <div style="width: fit-content; margin-left: 50px; text-align: center">
      <img height="300" src="@/assets/logo-text.svg" alt="" />
      <br />
      <!-- <hr style="background: transparent" /> -->
      <!-- <br /> -->
      <!-- <h2 style="color: #6b6b6b">建议您使用手机浏览器访问</h2> -->
      <van-divider  :style="{ 
        color: 'var(--color-main)', 
        borderColor: 'var(--color-main)', 
        padding: '0 16px',
        fontSize: '20px' }">建议您使用手机浏览器访问</van-divider>
      <br />
      <span style="color: #8b8b8b">或通过以下方式</span>
      <div class="visit">
        <div><van-icon name="shop" title="正在开发中" />应用商店</div>
        <div><van-icon name="wechat" title="正在开发中" />微信小程序</div>
      </div>
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
  data() {
    return {
      config,
    };
  },
};
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
  right: 20vw /* 20px */;
  top: 50px;
  background: #fff;
  min-width: 360px;
  min-height: 700px;
  height: 80vh;
  width: 40vh;
  box-shadow: 1px 1px 10px rgba(124, 124, 124, 0.637);
  border-radius: 16px;
}
.visit {
  padding: 10px;
  display: flex;
  justify-content: center;
  > div {
    display: flex;
    flex-direction: column;
    margin: 10px;
    // font-weight: bold;
    font-size: small;

    &:nth-child(1){
      color: rgb(216, 58, 0);
    text-shadow: 1px 1px 10px rgba(255, 68, 0, 0.624);

    }
    &:nth-child(2){
      color: rgb(53, 151, 0);
    text-shadow: 1px 1px 10px rgba(89, 255, 0, 0.621);

    }
    .van-icon {
      display: block;
      margin: auto;
      width: fit-content;
      font-size: 30px;
      background: white;
      box-shadow: 1px 1px 20px rgba(130, 130, 130, 0.332);
      padding: 8px;
      border-radius: 50%;
      margin-bottom: 8px;
    }
  }
}
</style>