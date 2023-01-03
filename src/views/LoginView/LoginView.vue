<template>
  <div class="login-view">
    <div class="__logo">
      <img :src="null" />
      <!-- <img src="@/assets/logo.png" alt="" /> -->

      <span class="text-small">社区医疗</span>
    </div>
    <div class="login-from">
      <van-form @submit="onSubmit">
        <span class="text-larger" style="color: var(--color-second-text)"
          >登录</span
        >
        <van-field
          v-model="username"
          name="phone"
          placeholder="请输入登陆手机号或身份证号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="pwd"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
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

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(e) {
      let { phone, pwd } = e;
      this.$api.user.login({ phone, pwdmd5: md5(pwd) }).then((res) => {
        console.log("login res:", res);
        if (res.code === 200) {
          // 保存用户信息和token 到vuex
          this.$store.commit("updateUser", res.data.user);
          this.$store.commit("updateToken", res.data.token);
          this.$router.push('/home');
          this.$ylToast({
            msg: "登陆成功",
            duration: 200,
          });
        } else {
          this.$ylToast({
            type:'error',
            msg: res.msg
          });
        }
      });
      console.log("onSubmit:", e, md5(pwd));
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
      width: 30vw;
      height: 30vw;
      padding: var(--padding-base);
      background: var(--color-light);
      border-radius: var(--border-radius-larger);
      margin-bottom: var(--margin-lg);
    }
  }
  .login-from {
    display: flex;
    flex-direction: column;
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
</style>