<template>
  <div style="padding: var(--padding-base)">
    <ylSearch
      v-model="value"
      :searchBtn="false"
      :boxShadow="true"
      @search="search"
      placeholder="请输入医院名称"
    ></ylSearch>
    <!-- <van-search v-model="value" shape="round" background="var(--color-main)" @search="search" placeholder="请输入医院名称" /> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div>
        <ul class="ad">
          <li
            class="box"
            v-for="item in list"
            :key="item.hid"
            @click="Jump(item)"
          >
            <img :src="item.logo || ''" alt="" />
            <div class="flex-d-column">
              <span>{{ item.title }}</span>
              <div class="hospital-grade_category">
                <span>{{ item.grade }}</span>
                <span v-if="item.category">{{ item.category }}</span>
              </div>
              <span class="text-small text-of-e">
                <i class="yl-icon yl-icon-dingwei"></i>
                地址:{{ item.address }}</span
              >
            </div>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>
  
  <script>
import doctor from "@/http/apis/doctor";
export default {
  data() {
    return {
      value: "",
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    search() {
      let params = { name: this.value };
      doctor.doctor(params).then((res) => {
        this.list = res.data.result;
      });
    },
    onLoad() {
      let data = { page: this.page++, pagenum: 10 };
      doctor.hospital(data).then((res) => {
        let lie = res.data.result;
        this.list.push(...lie);
        this.loading = false;
        if (this.list.length == res.data.total) {
          this.finished = true;
        }
      });
    },
    Jump(e) {
      this.$router.push("/AppointmentRegist/DepaList");
      sessionStorage.setItem("hid", JSON.stringify(e));
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.ad {
  background-color: #e1e1e1;

  li {
    display: flex;
    align-items: center;
    margin: var(--margin-base) 0;
    // background-color: #ffffff;

    > img {
      width: 13vw;
      height: 13vw;
      // margin-top: 20px;
      // margin-left: 15px;
    }

    > div {
      margin-left: 10px;
      font-weight: bold;
      .hospital-grade_category {
        font-size: small;
        padding: var(--padding-sm);
        > span:nth-child(1) {
          border: 2px solid var(--color-main);
          background: var(--color-main);
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
        }

        > span:nth-child(2) {
          border: 2px solid var(--color-main);
          color: var(--color-main);
          padding: 2px 6px;
          border-radius: 6px;
          margin-left: var(--margin-base);
        }
      }
      // > span:nth-child(2) {
      //   background-color: #145d8d;
      //   border-radius: 10px;
      //   width: 13vw;
      //   display: inline-block;
      //   text-align: center;
      //   color: #ffffff;
      //   margin-top: 15px;
      //   margin-bottom: 15px;
      // }

      // > span:nth-child(3) {
      //   border: 1px solid #145d8d;
      //   color: #145d8d;
      //   margin-left: 10px;
      //   border-radius: 10px;
      //   width: 26vw;
      //   text-align: center;
      //   display: inline-block;
      //   overflow: hidden;
      //   white-space: nowrap;
      //   text-overflow: ellipsis;
      //   margin-bottom: -4px;
      // }

      // p {
      //   color: #998a8d;
      //   margin-bottom: 15px;
      // }
      // > h3 {
      //   margin-top: 15px;
      // }
    }
  }
}
</style>