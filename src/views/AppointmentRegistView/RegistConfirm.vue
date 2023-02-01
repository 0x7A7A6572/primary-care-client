<template>
  <div class="resgist-confirm-view" style="padding: var(--padding-base)">
    <div class="list shadow">
      <ylPsersonDoctor :doctor="arr" class="list1"></ylPsersonDoctor>
    </div>
    <ylTitle title="预约挂号时间" theme="left" size="15px" />
    <div style="margin: 10px 0">
      <van-form @submit="onSubmit">
        <van-cell is-link @click="showPopup"
          ><van-icon class-prefix="yl-icon" name="riqi1" size="1.2rem" /><span class="title">
            <span v-if="!this.time2">请选择预约时间:</span>
            <span v-else>{{ time2 }}</span>
          </span>
        </van-cell>
        <van-popup
          v-model="show"
          style="
            height: 50%;
            width: 90%;
            border-radius: var(--border-radius-medium);
          "
        >
          <van-datetime-picker
            v-model="currentDate"
            type="datehour"
            title="选择年月日小时"
            :min-date="minDate"
            @confirm="Please"
            @cancel="cancel"
            class="yl-van-field"
          />
        </van-popup>
        <ylTitle
          title="就诊人姓名"
          theme="left"
          style="margin: 20px 0"
          size="15px"
        />
        <van-field
          v-model="name"
          type="text"
          class="yl-van-field"
          name="姓名"
          label="姓名"
          placeholder="请输入预约姓名"
          :rules="[{ required: true, message: '请填写预约姓名' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            :disabled="count > 0 ? true : false"
            class="yl"
            native-type="submit"
            >确认预约</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import ylPsersonDoctor from "@/components/ylPsersonDoctor.vue";
import aptregister from "@/http/apis/aptregister";
export default {
  components: {
    ylPsersonDoctor,
  },
  data() {
    return {
      arr: {},
      currentDate: new Date(),
      minDate: new Date(),
      time2: "",
      time3: "",
      show: false,
      uid: "",
      hid: "",
      did: "",
      state: 0,
      create_time: "",
      update_time: "",
      count: 0,
      name: "",
    };
  },
  mounted() {
    this.arr = this.$route.params.name;
    // console.log(this.$store.getters.user.name)
    this.uid = this.$store.getters.user.uid;
    this.hid = JSON.parse(sessionStorage.getItem("doctor")).hid;
    this.did = JSON.parse(sessionStorage.getItem("doctor")).did;
    this.create_time = new Date().getTime();
    this.update_time = new Date().getTime();
    this.name = this.$store.getters.user.name;
  },
  methods: {
    onSubmit(value) {
      let data = {
        uid: this.uid,
        did: this.did,
        create_time: this.timeToDate(this.create_time),
        yy_time:  this.time2,
        state: this.state,
        update_time: this.timeToDate(this.update_time),
        hid: this.hid,
      };
      if (this.time2 && value) {
        aptregister.add(data).then((res) => {
          if (res.code == 200) {
            this.count++;
            let arr = this.arr;
            let time = this.time2;
            // this.$router.push('/AppointmentRegist/AppointmentResult')
            this.$router.push({
              name: "AppointmentResult",
              params: { arr, time },
            });
          } else {
            this.$ylToast({
              type: "error",
              msg: res.msg,
            });
          }
        });
      }
    },
    showPopup() {
      this.show = true;
    },
    Please(value) {
      this.show = false;
      this.time3 = value;

      let yy = this.time3.getFullYear();
      let MM = this.time3.getMonth() + 1;
      let mm = this.time3.getMinutes();
       mm = mm < 10 ? "0" + mm : mm;
      if (MM < 10) {
        MM = "0" + MM;
      }
      let dd = this.time3.getDate();
      if (dd < 10) {
        dd = "0" + dd;
      }
      let hh = this.time3.getHours();
      if (hh < 10) {
        hh = "0" + hh;
      }
      this.time2 = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm;
    },
    cancel() {
      this.show = false;
      this.currentDate = "";
      this.time2 = "";
    },
    timeToDate(time) {
      let d = new Date(time); 
      let yy = d.getFullYear();
      let mm = d.getMonth() + 1;
      mm = mm < 10 ? "0" + mm : mm;
      let dd = d.getDate();
      dd = dd < 10 ? "0" + dd : dd;
      console.log(time, d);
      return `${yy}-${mm}-${dd}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.resgist-confirm-view {
  padding: var(--padding-base);
  background: white;
  height: 100%;
}

.list {
  width: 90vw;
  // height: 16vh;
  border-radius: var(--border-radius-large);
  background-color: var(--color-box-bg);
  margin: 20px auto;
}
.title {
  display: inline-block;
  width: 52vw;
  margin-left: 13px;
  font-size: 16px;
  color: var(--color-second-text);
}
</style>