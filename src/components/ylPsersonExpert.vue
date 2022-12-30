<template>
  <!-- 专家医生组件封装 -->
  <div class="yl-person-expert" @click="$emit('click',expert)">
    <img class="recom-avatar border-s" :src="expert.avatar" alt="" />
    <span class="recom-name text-blod text-of-e">{{ expert.name }}</span>
    <div class="title-tag text-small"></div>
    <van-tag class="text-small expert-tag" type="warning">
      {{ expert.d_title }}
    </van-tag>
  </div>
</template>

<script>
export default {
  name: "ylPsersonExpert",
  props: {
    expert: Object,
  },
};
</script>

<style lang="scss" scoped>
.yl-person-expert {
  position: relative;
  display: flex;
  margin: 10px;
  min-width: 30vw;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  > .recom-name {
    padding: 6px 0px 2px 0px;
  }
  > .recom-avatar {
    background: var(--color-mian-bg);
    width: 20vw;
    height: 20vw;
    min-width: 20vw;
    border-radius: 50%;
    margin: auto;
    object-fit: cover;
  }
  .title-tag {
    position: relative;
    display: block;
    position: absolute;

    &::before {
      position: absolute;
      content: "专家";
      text-shadow: 2px 2px 4px var(--color-main);
      white-space: nowrap;
      color: white;
      font-weight: bold;
      left: -1vw;
      top: -2vw;
      font-size: 4vw;
      z-index: 1;
    }
    &::after {
      z-index: 0;
      position: absolute;
      content: "";
      width: 10vw;
      height: 10vw;
      left: -5vw;
      top: -5vw;
      background: var(--color-main);
      border-radius: 50%;
      box-shadow: 2px 2px 6px var(--color-main);
    }
  }
  .expert-tag {
    background: rgb(255, 146, 57);
    color: white;
    width: fit-content;
    margin: auto;
    padding: 2px 6px;
    border-radius: 6px;
    box-shadow: 2px 2px 6px rgba(255, 159, 81, 0.836);
  }
}
</style>