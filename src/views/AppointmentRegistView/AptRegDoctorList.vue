<template>
  <div style="padding: var(--padding-base)">
    <div>
      <div class="box h-info">
        <img :src="arr1.logo || ''" alt="" />
        <div class="flex-d-column">
          <span>{{ arr1.title }}</span>
          <div class="hospital-grade_category">
            <span>{{ arr1.grade }}</span>
            <span v-if="arr1.category">{{ arr1.category }}</span>
          </div>
          <span class="text-small text-of-e">
            <i class="yl-icon yl-icon-dingwei"></i>
            地址:{{ arr1.address }}</span
          >
        </div>
      </div>
    </div>
    <ylTitle title="医生列表" theme="left" color="var(--color-second-text)" />
    <div>
      <ul class="ad">
        <ylPsersonDoctor
          class="doctor box"
          v-for="item in arr"
          :key="item.id"
          :doctor="item"
        >
          <span class="icon-btn yu" @click="jump(item)">预约</span>
        </ylPsersonDoctor>
      </ul>
    </div>
  </div>
</template>
<script>
import ylPsersonDoctor from "@/components/ylPsersonDoctor.vue";
export default {
  components: {
    ylPsersonDoctor,
  },
  data() {
    return {
      hid: "",
      did: "",
      arr: [],
      arr1: [],
      title1: "",
      name1: "",
    };
  },
  mounted() {
    this.hid = JSON.parse(sessionStorage.getItem("doctor")).hid;
    this.did = JSON.parse(sessionStorage.getItem("doctor")).did;
    this.$route.meta.title = JSON.parse(sessionStorage.getItem("doctor")).title;
    this.name1 = JSON.parse(sessionStorage.getItem("doctor")).title;
    this.arr1 = this.hid = JSON.parse(sessionStorage.getItem("hid"));
    this.title1 = JSON.parse(sessionStorage.getItem("hid")).title;
    let data = { hid: this.hid.hid, did: this.did };
    this.$api.info.queryDoctors(data).then((res) => {
      this.arr = res.data;
    });
  },
  methods: {
    jump(name) {
      this.$router.push({
        name: "RegistConfirm",
        params: { name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.yu {
  position: absolute;
  top: 18px;
  right: 14px;
}
.ad,
.ad1 {
  background-color: #e1e1e1;
  margin-bottom: 49px;
  margin-top: 15px;
  .tit {
    display: flex;
    > span {
      margin-right: 50px;
    }
  }
  > .doctor {
    width: 90vw;
    margin: 15px auto;
    position: relative;
    border-radius: var(--border-radius-large);
  }
  li {
    display: flex;
    background-color: #ffffff;

    > img {
      width: 13vw;
      height: 9vh;
      margin-top: 20px;
      margin-left: 15px;
      border-radius: 50px;
    }

    > div {
      margin-left: 40px;

      > span:nth-child(2) {
        background-color: #145d8d;
        border-radius: 10px;
        width: 26vw;
        display: inline-block;
        text-align: center;
        color: #ffffff;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      > span:nth-child(3) {
        border: 1px solid #145d8d;
        color: #145d8d;
        margin-left: 10px;
        border-radius: var(--border-radius-large);
        width: 26vw;
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
        width: 80vw;
        margin-left: -25px;
      }
      > h3 {
        margin-top: 15px;
      }
    }
  }
}
.ad1 {
  box-shadow: var(--box-shadow);
}

.h-info {
  display: flex;
  align-items: center;
  margin: var(--margin-base) 0;

  > img {
    width: 13vw;
    height: 13vw;
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
  }
}
</style>