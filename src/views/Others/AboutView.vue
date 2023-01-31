<template>
  <div class="about-view">
    <div class="__logo">
      <img src="@/assets/logo-text.svg" alt="" />

      <span >version - 0.0.1</span>
    </div>
  </div>
</template>
<script >

</script>
<style lang='scss' scoped>
.about-view{
  height: 100%;
 background: white;
 .__logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
    text-align: center;
    width: 100%;
    margin-bottom: 10vh;
    padding: var(--padding-lg);
    > img {
      margin: auto;
      // width: 30vw;
      height: 50vw;
      // padding: var(--padding-base);
      // background: var(--color-light);
      border-radius: var(--border-radius-larger);
      margin-bottom: var(--margin-lg);
    }
  }
}
</style>