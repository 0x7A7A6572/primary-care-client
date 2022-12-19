<template>
  <div class="yl-nav">
    <div class="nav-item" @click="itemClick(0, 'home')">
      <van-icon v-show="itemIndex===0" class-prefix="yl-icon" name="aixinzhijia" />
      <van-icon v-show="itemIndex!==0" class-prefix="yl-icon" name="aixinzhijia1" />
    </div>
    <div class="nav-item" @click="itemClick(1, 'chat')">
      <van-icon v-show="itemIndex===1" class-prefix="yl-icon" name="yiliao_wenzhen_zhenduan_xiaoxi" />
      <van-icon v-show="itemIndex!==1" class-prefix="yl-icon" name="xiaoxi" />
    </div>
    <div class="nav-item center box"></div>
    <div class="nav-item" @click="itemClick(3, 'medicine')">
      <van-icon v-show="itemIndex===3" class-prefix="yl-icon" name="xiangzi2" />
      <van-icon v-show="itemIndex!==3" class-prefix="yl-icon" name="xiangzi1" />
    </div>
    <div class="nav-item" @click="itemClick(4, 'user')">
       <van-icon v-show="itemIndex===4" class-prefix="yl-icon" name="danren1" />
      <van-icon v-show="itemIndex!==4" class-prefix="yl-icon" name="danren" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ylTitle",
  props: {
    // paths: Array,
    // icons: Array,
    // itemIndex: {
    //   type: Number,
    //   default: 0
    // }
  },
  data(){
   return {
     itemIndex: 0
   }
  },
  methods:{
    itemClick(index, name){
       this.$emit("onItemClick",{index, name});
       this.itemIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.yl-nav {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--color-main);
  width: 100vw;
  bottom: 0;
  padding: 10px;
  background: var(--color-box-bg);
  height: 60px;
  font-size: 8vw;
  font-weight: bolder;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -2px 8px var(--color-main-bg);
  > .nav-item {
    // line-height: 60px;
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    &.center {
      width: 80px;
      min-width: 18%;
      height: 100%;
      background: var(--color-main);
    }
  }
}
</style>