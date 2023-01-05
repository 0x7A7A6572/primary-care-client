<template>
  <div class="yl-regster-view">
    <div class="regster-view-header">
      <img class="__logo" src="@/assets/logo.png" alt="" />
      <div class="flex-d-column">
        <span class="text-small">社区医疗</span>
        <span class="text-larger">欢迎注册!</span>
      </div>
    </div>
    <div class="login-from">
      <van-form @submit="onSubmit">
        <van-field
          class="yl-van-field"
          label="手机号"
          v-model="form.phone"
          name="phone"
          placeholder="请输入登陆手机号或身份证号"
          :rules="rules.phone"
          :disabled="loading"
        />
        <van-field
          class="yl-van-field"
          label="密码"
          v-model="pwd"
          type="password"
          name="pwd"
          placeholder="设置密码"
          :rules="rules.pwd"
          :disabled="loading"
        />
        <van-field
          class="yl-van-field"
          label="确认密码"
          v-model="confirmPwd"
          type="password"
          placeholder="再次输入密码确认"
          :rules="rules.pwdComf"
          :disabled="loading"
        />
        <div class="form-user-info text-large flex-around">
          <div>
            <span class="text-large __title">出生日期</span>
            <div @click="showPopup" style="color: var(--color-main)">
              {{ form.birthday }}
            </div>
            <van-popup v-model="show" position="bottom">
              <van-datetime-picker
                type="date"
                title="选择出生日期"
                v-model="currentDate"
                :max-date="maxDate"
                :min-date="minDate"
                @confirm="changeBirthday"
                @cancel="show = false"
              />
            </van-popup>
          </div>
          <div>
            <span class="text-large __title">性别</span>
            <ylSwitch v-model="form.gender" />
          </div>
        </div>
        <van-field
          class="yl-van-field"
          label="居民身份证"
          v-model="form.uid"
          placeholder="请输入18位身份证"
          :rules="rules.uid"
          :disabled="loading"
        />
        <van-field
          class="yl-van-field"
          label="姓名"
          v-model="form.name"
          placeholder="请输入姓名"
          :rules="rules.name"
          :disabled="loading"
        />

        <div style="margin: 16px">
          <van-button
            class="yl"
            round
            block
            type="info"
            native-type="submit"
            :loading="loading"
            >确认注册</van-button
          >
        </div>
      </van-form>
      <span class="have-acount-desc text-medium"
        > 已有账号？
        <span
          style="color: var(--color-main)"
          @click="$router.push('/Login')"
        >
          去登陆</span
        >
      </span>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";

const reg_phone = /^1[3456789]\d{9}$/;
const reg_pwd = /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,12}$/;
const reg_uid =
  /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const reg_name = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;

export default {
  data() {
    return {
      loading: false,
      show: false,
      currentDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      minDate: new Date(1900, 1, 1),
      pwd: "",
      confirmPwd: "",
      form: {
        phone: "",
        name: "",
        uid: "",
        gender: 0,
        // pwdmd5: ,
        birthday: this.datetime(),
      },
      rules: {
        phone: [
          { required: true, pattern: reg_phone, message: "手机号格式不正确" },
        ],
        pwd: [
          {
            required: true,
            pattern: reg_pwd,
            message: "密码应为6~12位数组字母组合",
          },
        ],
        pwdComf: [
          {
            required: true,
            validator: this.verifyPwdSame,
            message: `两次密码不一致`,
          },
        ],
        uid: [
          { required: true, pattern: reg_uid, message: "身份证格式不正确" },
        ],
        name: [
          { required: true, pattern: reg_name, message: "请填写有效的姓名" },
        ],
      },
    };
  },
  methods: {
    onSubmit(data) {
      this.form.pwdmd5 = md5(this.pwd);
      // console.log(data, this.form);
      this.loading = true;
      this.$api.user.register(this.form).then((res) => {
        if (res.code == 200) {
          this.$ylToast({
            type: "success",
            msg: "注册成功",
          });
          this.$router.push({
            path: "/Login",
          });
        } else {
          this.$ylToast({
            type: "error",
            msg: res.msg,
          });
        }
        this.loading = false;
      });
    },
    showPopup() {
      this.show = true;
    },
    changeBirthday(v) {
      this.form.birthday = this.datetime(v);
      this.show = false;
    },
    datetime(str = "1960-1-1") {
      let d = new Date(str);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    },
    verifyPwdSame() {
      return this.pwd === this.confirmPwd;
    },
  },
};
</script>

<style lang="scss" scoped>
.yl-regster-view {
  background: #fff;
  min-height: 100%;
  padding: var(--padding-base);
  > .regster-view-header {
    display: flex;
    padding: var(--padding-lg);
    > .__logo {
      width: 20vw;
      height: 20vw;
      background: var(--color-light);
      border-radius: var(--border-radius-larger);
      padding: var(--padding-base);
    }
    > div {
      margin-left: var(--margin-lg);
      justify-content: space-around;
    }
  }
  .form-user-info {
    color: var(--color-second-text);
    padding: var(--padding-lg);
    > div {
      text-align: left;
      justify-self: center;
      flex: 1;
      .__title {
        display: block;
        padding-bottom: var(--padding-base);
      }
    }
  }
  .have-acount-desc{
    text-align: center;
    display: block;
    color: var(--color-second-text);
  }
}
</style>