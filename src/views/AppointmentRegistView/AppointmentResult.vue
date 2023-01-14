<template>
    <div style="padding: var(--padding-base);background:linear-gradient(150deg,var(--color-secondary),var(--color-box-bg)) ;height: 100vh;">
        <div class="passed">
            <van-icon  class-prefix="yl-icon" name="success"  size="23"/>
            <span class="span">预约成功</span>
        </div>
        <div class="result">
            <ylPsersonDoctor :doctor="arr1"></ylPsersonDoctor>
            <div class="yuyue">
            <van-icon  class-prefix="yl-icon" name="wancheng"  size="20"/>
            <span>预约时间</span>
        </div>
        <div class="time">
         <span>{{ time }}</span>  
         <span v-if="time1<12">上午{{time1}}时</span>
         <span v-else>下午{{time1}}时</span>
        </div>
        <div class="hospital">
            <van-icon  class-prefix="yl-icon" name="dingwei4"  size="20"/>
            <span>就诊医院</span>
        </div>
        <div class="address">
         <span>医院名称: {{ title }}</span>  
         <p >医院地址:{{ address }}</p>
         
        </div>
        <div class="xinxi">
            <van-icon  class-prefix="yl-icon" name="wenjianbangong"  size="20"/>
            <span>预约信息</span>
        </div>
        <div class="name">
         <span>预约人姓名: {{ name }}</span>  
         <p >预约人电话:{{ phone }}</p>
         
        </div>
        <div class="btn">
            <van-button  to="/AppointmentRegist/RegistOrderList" type="primary" size="large" style="margin:8px 3px">我的预约记录</van-button>
            <van-button to="/" type="default" size="large" style="margin:8px 3px">首页</van-button>
        </div>
 
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
            arr1:{},
            time:'',
            time1:'',
            title:'',
            address:'',
            name:'',
            phone:''
        }
    },
    mounted(){
        this.arr1=this.$route.params.arr
        this.time=this.$route.params.time.slice(0,10)
        this.time1=Number( this.$route.params.time.slice(11))
        this.title=JSON.parse( sessionStorage.getItem('hid')).title
       this.address=JSON.parse( sessionStorage.getItem('hid')).address
       this.name=this.$store.getters.user.name
       this.phone= this.$store.getters.user.phone

    }
}
</script>

<style lang="scss" scoped>
.passed{
    color: var(  --color-light-text);
    width: 50vw;
    margin: 10px 100px;
    display: flex;
    .span{
        margin-left: 10px;
        font-weight: bold;
        font-size: 20px;
        display: inline-block;
        margin-top: -4px;

    }
}
.result{
    background-color: var( --color-box-bg);
    width: 94vw;
    height: 100vh;
    margin-top: 26px;
    border-radius: var(  --border-radius-medium);
    .address{
        margin: 15px 20px;
        border-bottom: 2px solid var(  --color-secondary);
        height: 11vh;
        span{
            font-size: 18px;
            font-weight: bold;
        }
        p{
            margin-top: 8px;
        }
    }
    .name{
        margin: 15px 20px;
        border-bottom: 2px solid var(  --color-secondary);
        height: 11vh;
        span{
            font-size: 18px;
            font-weight: bold;
        }
        p{
            margin-top: 8px;
        }
    }
    .time{
        font-size: 17px;
        margin: 15px 20px;
        border-bottom: 2px solid var(  --color-secondary);
        height: 6vh;
        span:nth-child(2){
            font-weight: bold;
            font-size: 20px;
            margin-left: 9px;
            
        }
        span:nth-child(3){
            font-weight: bold;
            font-size: 20px;
            margin-left: 9px;
        }
    }
    .hospital{
     margin: 15px 20px;
     color: var( --color-third-text);
    span{
        display: inline-block;
        margin-left: 15px;
    }
    }
    .xinxi{
     margin: 15px 20px;
     color: var( --color-third-text);
    span{
        display: inline-block;
        margin-left: 15px;
    }
    }
    .yuyue{
     margin: 15px 20px;
     color: var( --color-third-text);
    span{
        display: inline-block;
        margin-left: 15px;
    }
    }
    .btn{
        
    }
}

</style>