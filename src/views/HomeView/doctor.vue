<template>
  <div>
    <van-search v-model="value" shape="round" background="var(--color-main)" @search="search" placeholder="请输入医院名称" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

      <div>
        <ul class="ad">
          <li v-for="item in list " :key="item.hid" @click="Jump(item)">
            <img src="../../assets/images/Snipaste_2022-12-28_19-24-28.jpg" alt="">
            <div>
              <h3>{{ item.title }}</h3>
              <span>{{ item.grade }}</span>
              <span v-if="item.type">{{ item.type }}</span>
              <p>地址:{{ item.address }}</p>
            </div>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<script>

import doctor from '@/http/apis/doctor'
export default {
  data() {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      page: 1,
    }
  },
  methods: {
    search() {
      let params = { name: this.value }
      doctor.doctor(params).then(res => {
        this.list = res.data.result
      })
    },
    onLoad() {
      let data = { page: this.page++, pagenum: 10 }
      doctor.hospital(data).then(res => {
        let lie = res.data.result
        this.list.push(...lie);
        this.loading = false;
        if (this.list.length == res.data.total) {
          this.finished = true;
        }
      })
    },
    Jump(e){
   this.$router.push('/depa')
   console.log(e)
 sessionStorage.setItem('hid',  JSON.stringify(e))
    }
  },

}
</script>

<style lang="scss" scoped>
.ad {
  background-color: #e1e1e1;

  li {
    display: flex;
    margin: 15px;
    background-color: #ffffff;

    >img {
      width: 50px;
      height: 50px;
      margin-top: 20px;
      margin-left: 15px;
    }

    >div {
      margin-left: 10px;

      >span:nth-child(2) {
        background-color: #145d8d;
        border-radius: 10px;
        width: 50px;
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
        border-radius: 10px;
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
      }
      >h3{
        margin-top: 15px;
      }
    }
  }
}
</style>