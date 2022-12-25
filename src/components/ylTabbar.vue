<template>
<!-- 标签栏/ 底部导航栏 -->
  <div class="yl-tabbar">
    <div class="tabbar-item" @click="itemClick(0, 'home')">
      <van-icon  class-prefix="yl-icon" :name="itemIndex===0?'aixinzhijia':'aixinzhijia1'" />
    </div>
    <div class="tabbar-item" @click="itemClick(1, 'chat')">
      <van-icon  class-prefix="yl-icon" :name="itemIndex===1?'yiliao_wenzhen_zhenduan_xiaoxi':'xiaoxi'" />
    </div>
    <div class="tabbar-item center box"></div>
    <div class="tabbar-item" @click="itemClick(3, 'medicine')">
      <van-icon  class-prefix="yl-icon" :name="itemIndex===3?'xiangzi2':'xiangzi1'" />
    </div>
    <div class="tabbar-item" @click="itemClick(4, 'user')">
       <van-icon class-prefix="yl-icon" :name="itemIndex===4?'danren1':'danren'" />
    </div>
  </div>
</template>

<script>
import {Icon} from "vant";
export default {
  name: "ylTabbar",
  components:{
    [Icon.name]:Icon
  },
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
.yl-tabbar {
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
  > .tabbar-item {
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