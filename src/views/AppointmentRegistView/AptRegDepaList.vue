<template>
  <div class="ad" style="padding: var(--padding-base)">
    <div class="box h-info">
      <img :src="hid.logo || ''" alt="" />
      <div class="flex-d-column">
        <span>{{ hid.title }}</span>
        <div class="hospital-grade_category">
          <span>{{ hid.grade }}</span>
          <span v-if="hid.category">{{ hid.category }}</span>
        </div>
        <span class="text-small text-of-e">
          <i class="yl-icon yl-icon-dingwei"></i>
          地址:{{ hid.address }}</span
        >
      </div>
    </div>
    <div class="li">
      <ylTitle title="科室列表" theme="left" color="var(--color-second-text)" />
    </div>
    <van-list class="SbjList">
      <div
        class="sbjlist1 text-large"
        v-for="item in subjct"
        :key="item.did"
        @click="doctor(item)"
      >
        <!-- <i class="yl-icon yl-icon-ganzang"></i> -->
        <div>{{ item.title }}</div>
      </div>
    </van-list>
  </div>
</template>
<script>
import doctor from "@/http/apis/doctor";
export default {
  data() {
    return {
      hid: {},
      list: [],
      subjct: [],
    };
  },
  mounted() {
    this.hid = JSON.parse(sessionStorage.getItem("hid"));
    let data = { hid: this.hid.hid };
    doctor.subjct(data).then((res) => {
      this.subjct = res.data.result;
    });
  },
  methods: {
    doctor(e) {
      sessionStorage.setItem("doctor", JSON.stringify(e));
      this.$router.push({ path: "/AppointmentRegist/DoctorList" });
    },
  },
};
</script>
<style lang="scss" scoped>


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

.list {
  display: inline-block;
  color: #998a8d;
  margin-top: 2px;
  width: 100px;
}

.li {
  display: flex;
  margin-left: 10px;
  margin-top: 40px;
}

.SbjList {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > .sbjlist1 {
    padding: var(--padding-base);
    color: white;
    background: var(--color-main);
    // background: linear-gradient(45deg, var(--color-main), var(--color-primary));
    width: 28vw;
    min-height: 20vw;
    margin: 5px;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius-small);
    font-size: medium;
    > div {
      position: relative;
      &::before {
        position: absolute;
        background: white;
        content: "";
        width: 49%;
        bottom: -6px;
        height: 4px;
        border-radius: 1rem;
      }
    }
  }
}
</style>