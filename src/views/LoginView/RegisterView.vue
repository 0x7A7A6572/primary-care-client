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
        />
        <van-field
          class="yl-van-field"
          label="密码"
          v-model="pwd"
          type="password"
          name="pwd"
          placeholder="设置密码"
          :rules="rules.pwd"
        />
        <van-field
          class="yl-van-field"
          label="确认密码"
          v-model="confirmPwd"
          type="password"
          placeholder="再次输入密码确认"
          :rules="rules.pwd"
        />
        <div class="form-user-info text-large flex-around">
          <div>
            <span class="text-large __title">出生日期</span>
            <div>1996-11-2</div>
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
          type="password"
          placeholder="请输入18位身份证"
          :rules="rules.pwd"
        />
        <van-field
          class="yl-van-field"
          label="姓名"
          v-model="form.name"
          placeholder="请输入姓名"
          :rules="rules.pwd"
        />

        <div style="margin: 16px">
          <van-button class="yl" round block type="info" native-type="submit"
            >确认注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
const reg_phone = /.*/g;
const reg_pwd = /.*/g;
const reg_uid = /.*/g;
const reg_name = /.*/g;

export default {
  data() {
    return {
      pwd: "",
      confirmPwd: "",
      form: {
        phone: "",
        name: "",
        uid: "",
        gender: 0,
        pwdmd5: "",
        birthday: "",
      },
      rules: {
        phone: [
          { required: true, pattern: reg_phone, message: "手机号格式不正确" },
        ],
        pwd: [{ required: true, message: "请填写密码" }],
      },
    };
  },
  methods: {
    onSubmit(data) {
      console.log(data);
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
  .form-user-info{
    color: var(--color-second-text);
    padding: var(--padding-lg);
    >div{
      text-align: left;
      justify-self: center;
      flex: 1;
      .__title{
        display: block;
        padding-bottom: var(--padding-base);
      }
    }
  }
}
</style>