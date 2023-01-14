<template>
    <div>
    <van-tabs v-model="active" color="var(--color-main)">
  <van-tab title="全部">
    <div class="box whole" v-for="(item,i) in list" :key="i">
        <div class="left" >
            <span>预约时间:{{item.yy_time | datetime}} {{item.yy_time | time}}</span>
            <span>预约医生:{{item.name}}</span>
            <span>医院地址:{{item.title}}</span>
        </div>
        <div class="right">
            <span>预约号: <span style="color:var(--color-main)">20</span></span>
        </div>
    </div>
  </van-tab>
  <van-tab title="待预约">内容 2</van-tab>
  <van-tab title="已完成">内容 3</van-tab>
</van-tabs>

    </div>
</template>

<script>


export default {
   data(){
    return {
        active:'',
        list:[]
    }
   },
   methods:{
    aptregister(){
        let data = {uid:this.$store.getters.user.uid}
        this.$api.aptregister.list(data).then(res=>{
            console.log('ok',res);
            this.list = res.data.result
        })
    }
   },
   mounted(){
   this.aptregister()
   }
}
</script>

<style lang="scss" scoped>
    .whole{
        display: flex;
        margin-top: var(--padding-base);
    }

    .left{
        display: flex;
        flex-direction: column;
        >span{
            padding: 2px 0;
        }
    }

    .right{ 
        flex: 1;
        white-space: nowrap;
        padding: calc(var(--padding-base)*2)  calc(var(--padding-base)*2) ;
        :nth-child(1){
            font-size: var(--font-size-lgxx);
            font-weight: bold;
            color: var(--color-second-text);
        }
    }
</style>