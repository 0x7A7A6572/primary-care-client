<template>
  <div class="content">
    <!-- 更换头像 -->
    <div class="Personal_information">
      <van-image width="100" height="100" :src="avatar" fit="cover" round />
      <van-uploader
        class="Personal"
        :show-upload="false"
        name="file"
        :action="config.uploadUrl + '/upload'"
        :after-read="afterRead"
      >
        <van-icon
          class-prefix="yl-icon"
          name="xiugai_bi"
          color="var(--color-main)"
        />
      </van-uploader>
    </div>
    <!-- 详细地址 -->
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="address"
          class="yl-van-field"
          label="详细地址"
          placeholder="请输入详细地址"
          :rules="rules.Detailed"
        />
      </van-form>
      <div class="form-user-info text-large flex-around">
        <div>
          <span class="text-large __title">出生日期</span>
          <div style="color: var(--color-main)">
            <span>{{ this.$store.getters.user.birthday | date }}</span>
          </div>
        </div>
        <div class="sex">
          <span class="text-large __title">性别</span>
          <ylSwitch :items="[(gender == 0 ? '女' : '男')]" />
        </div>
      </div>
      <van-field v-model="name" class="yl-van-field" label="姓名" disabled />
      <van-field
        v-model="uid"
        class="yl-van-field"
        label="居民身份证"
        disabled
      />
      <van-field
        class="yl-van-field"
        label="手机号"
        name="phone"
        v-model="phone"
        disabled
      />

      <div style="margin: 16px">
        <van-button
          @click="updateUserBaseInfo"
          class="yl"
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          >确认修改</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/utils/config";
export default {
  data() {
    return {
      config,
      loading: false,
      show: false,
      currentDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      minDate: new Date(1900, 1, 1),
      address: this.$store.getters.user.address,
      avatar: this.$store.getters.user.avatar,
      name: this.$store.getters.user.name,
      uid: this.$store.getters.user.uid,
      phone: this.$store.getters.user.phone,
      gender: this.$store.getters.user.gender,
      rules: {
        Detailed: [{ required: true, message: "请填写详细地址" }],
      },
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    changeBirthday(v) {
      this.show = false;
    },
    afterRead(file) {
      console.log(file);
      this.$api.upload.upload(file).then((res) => {
        console.log("上传成功", res);
        this.avatar = res.data;
        this.$store.commit("setUserAvatar", this.avatar);
      });
    },
    updateUserBaseInfo() {
      let data = { avatar: this.avatar, address: this.address };
      this.$api.user.updateUserBaseInfo(data).then((res) => {
        if (res.code == 200) {
          let user = this.$store.getters.user;
          user.address = this.address;
          user.avatar = this.avatar;
          user.uid = this.uid;
          user.phone = this.phone;
          user.gender = this.gender;
          this.$store.commit("updateUser", user);
        }
        console.log(res);
        if (res.code == 200) {
          this.$ylToast({
            msg: "修改成功",
            type: "success",
            duration: 2000,
          });
        } else {
          this.$ylToast({
            msg: "修改失败",
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background: #fff;
  padding: var(--padding-sm);
}
.Personal_information {
  position: relative;
  width: fit-content;
  margin: calc(var(--margin-base) * 5) auto;
  .Personal {
    background-color: var(--color-box-bg);
    width: fit-content;
    padding: var(--padding-sm);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
.form-user-info {
  color: var(--color-second-text);
  padding: var(--padding-lg);
  align-items: self-start;
  .sex {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
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
</style>>
