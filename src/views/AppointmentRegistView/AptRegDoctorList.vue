<template>
    <div>
      <div>
            <ul class="ad1">
                <li >
                    <img src="../../assets/images/Snipaste_2022-12-28_19-24-28.jpg" alt="">
                    <div>
                        <h3>{{ arr1.title }}</h3>
                        <span>{{ arr1.grade }}</span>
                        <span v-if="arr1.type">{{ arr1.type }}</span>
                        <p>地址:{{ arr1.address }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <ylTitle title="医生列表" theme="left" color="var(--color-second-text)" />
        <div>
        <ul class="ad">
          <li v-for="(item) in arr " :key="item.id" class="doctor" >
            <img :src="item.avatar" alt="">
            <div>
              <h3>{{ item.name }}</h3>
              <span>{{ item.grade }}</span>
                <p>擅长:{{ item.good_at }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import doctor from '@/http/apis/doctor'

export default {
  data(){
    return {
        hid:'',
        did:'',
        arr:[],
        arr1:[]
    }
  },
  mounted(){
 this.hid= JSON.parse( sessionStorage.getItem('doctor')).hid
 console.log(this.hid)
 this.did=JSON.parse( sessionStorage.getItem('doctor')).did
this.$route.meta.title=JSON.parse( sessionStorage.getItem('doctor')).title
 this.arr1=this.hid = JSON.parse((sessionStorage.getItem('hid')))
let data={hid:this.hid.hid,did:this.did}
console.log(data)
doctor.list(data).then(res=>{
  console.log(res)
  this.arr=res.data.result
})
  }
}
</script>

<style lang="scss" scoped>
.ad,.ad1 {
  background-color: #e1e1e1;
  margin-bottom: 49px;
  margin-top: 15px;
  >.doctor{
  width: 370px;
  margin: 15px auto;
  border-radius: var(  --border-radius-large);}
  li {
    display: flex;
    background-color: #ffffff;

    >img {
      width: 50px;
      height: 50px;
      margin-top: 20px;
      margin-left: 15px;
      border-radius: 50px;
    }

    >div {
      margin-left: 40px;

      >span:nth-child(2) {
        background-color: #145d8d;
        border-radius: 10px;
        width: 100px;
        display: inline-block;
        text-align: center;
        color: #ffffff;
        margin-top: 15px;
        margin-bottom: 15px;

      }
      >span:nth-child(3) {
        border: 1px solid #145d8d;
        color: #145d8d;
        margin-left: 10px;
        border-radius: var(  --border-radius-large);
        width: 100px;
        text-align: center;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: -4px;
      }
      p {
        color: #998a8d;
        margin-bottom: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 300px;
        margin-left: -25px;
      }
      >h3{
        margin-top: 15px;
      }
    }
  }
}
.ad1{
  box-shadow: var(--box-shadow);
}
</style>