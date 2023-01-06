<template>
  <div class="login-view yl">
    <div class="__logo">
      <img src="@/assets/logo-text.svg" alt="" />

      <!-- <span class="text-small">社区医疗</span> -->
    </div>
    <div class="login-from">
      <van-form @submit="onSubmit">
        <span class="text-larger" style="color: var(--color-second-text)"
          >登录</span
        >
        <van-field
          class="yl-van-field"
          v-model="username"
          name="phone"
          placeholder="请输入登陆手机号或身份证号"
          :rules="rules.phone"
          :disabled="loading"
        />
        <van-field
          class="yl-van-field"
          v-model="password"
          type="password"
          name="pwd"
          placeholder="请输入密码"
          :rules="rules.pwd"
          :disabled="loading"
        />
        <div style="margin: 16px">
          <van-button class="yl" :disabled="loading" :loading="loading" round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
      <span class="no-acount-desc text-medium"
        >没有账号？
        <span
          style="color: var(--color-main)"
          @click="$router.push('/Login/Register')"
        >
          立即注册</span
        >
      </span>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
// 判断手机和身份证正则表达式
const Reg_phone_id =
  /^1[3456789]\d{9}$|^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export default {
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      rules: {
        phone: [
          {
            required: true,
            pattern: Reg_phone_id,
            message: "请填写正确身份证或手机号",
          },
        ],
        pwd: [{ required: true, message: "请填写密码" }],
      },
    };
  },
  methods: {
    onSubmit(e) {
      this.loading = true;
      let { phone, pwd } = e;
      this.$api.user.login({ phone, pwdmd5: md5(pwd) }).then((res) => {
        if (res.code === 200) {
          // 保存用户信息和token 到vuex
          this.$store.commit("updateUser", res.data.user);
          this.$store.commit("updateToken", res.data.token);
          this.$router.push("/home");
          this.$ylToast({
            msg: "登陆成功",
            type: "success",
            duration: 2000,
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
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background: #fff;
  padding: var(--padding-lg);
  margin: auto;
  .__logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
    text-align: center;
    width: 100%;
    margin-bottom: 10vh;
    padding: var(--padding-lg);
    > img {
      margin: auto;
      // width: 30vw;
      height: 50vw;
      // padding: var(--padding-base);
      // background: var(--color-light);
      border-radius: var(--border-radius-larger);
      margin-bottom: var(--margin-lg);
      opacity: 0;
      animation: show-in-top  1s ease-in-out 0s 1 alternate forwards;
    }
  }
  .login-from {
    display: flex;
    flex-direction: column;
    animation: show-in-bottom  1s ease-in-out 0s 1 alternate forwards;
    .van-field {
      font-size: var(--font-size-base);
      padding: var(--padding-base);
    }
  }
  .no-acount-desc {
    margin: auto;
    color: var(--color-third-text);
  }
}
@keyframes show-in-top {
  0% {
    opacity: 0;
    transform: translateY(-30vw);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes show-in-bottom {
  0% {
    // opacity: 0;
    transform: translateY(30vw);
  }
  100% {
    // opacity: 1;
    transform: translateY(0);
  }
}
</style>