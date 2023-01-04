<template>
    <div style="padding: var(--padding-base);">
<div class="list">
  <ylPsersonDoctor :doctor="arr" class="list1"></ylPsersonDoctor>
</div>
<ylTitle title="预约挂号时间" theme="left" size="15px" />
<div style="margin: 10px 0;">


    <van-form @submit="onSubmit">
     <van-cell is-link @click="showPopup" ><van-icon name="clock-o"  size="1.5rem"/><span class="title">
         <span v-if="!this.time2">请填写预约时间:</span> 
         <span v-else>{{ time2 }}</span> 
        </span> </van-cell> 
<van-popup v-model="show" style="height: 50%;width:90%;border-radius:var(--border-radius-medium) ">
     <van-datetime-picker
  v-model="currentDate"
  type="datehour"
  title="选择年月日小时"
  :min-date="minDate"
  @confirm="Please"
  @cancel="cancel"
 
/>

</van-popup>
<ylTitle title="就诊人姓名" theme="left" style="margin: 20px 0;" size="15px" />
  <van-field
    v-model="password"
    type="text"
    name="姓名"
    label="姓名"
    placeholder="请输入预约姓名"
    :rules="[{ required: true, message: '请填写预约姓名' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">确认预约</van-button>
  </div>
</van-form>


</div>
    </div>
</template>

<script>
import ylPsersonDoctor from '@/components/ylPsersonDoctor.vue'

export default {
    components:{
        ylPsersonDoctor
    },
    data(){
        return {
        arr:{},
        password:'',
        currentDate: new Date(),
        minDate:new Date(),
        time2:'',
        time3:'',
        show: false,
        }
    },
    mounted(){
     this.arr=this.$route.params.name
       
    },
    methods:{
        onSubmit(values) {
      console.log('submit', values);
    },
    showPopup() {
      this.show = true;
    },
    Please(value){
        this.show = false;
        this.time3=value
      
       let yy=this.time3.getFullYear()
       let  mm=this.time3.getMonth()+1
       if(mm<10){
		mm='0'+mm
	}
       let  dd=this.time3.getDate()
       if(dd<10){
		dd='0'+dd
	}
       let hh=this.time3.getHours()
       if(hh<10){
		hh='0'+hh
	}
       this.time2=yy+'-'+mm+'-'+dd+"-"+hh
  
        

    },
    cancel(){
        this.show = false;
        this.currentDate=''
        this.time2=''
    }
    }
}
</script>

<style lang="scss" scoped>
.list{
    width: 380px;
    height: 100px;
    border-radius:var( --border-radius-large) ;
    background-color: var(--color-box-bg);
    margin: 20px auto;
 
}
.title{
    display: inline-block;
    width: 200px;
    margin-left: 13px;
    font-size: 16px;
    color: var(--color-second-text);
}
</style>