<template>
  <div class="doctor-auth" v-if="!$store.getters.user?.isdoctor">
    <div class="__avatar">
      <van-image
        round
        width="24vw"
        height="24vw"
        fit="cover"
        :src="$store.getters.user?.avatar"
      />
      <van-uploader
        class="upload-btn"
        :show-upload="false"
        name="file"
        action="http://localhost:9010/upload"
        :after-read="afterRead"
      >
        <i class="yl-icon yl-icon-xiugai_bi" />
      </van-uploader>
    </div>
    <van-field class="vf-center" label="医院选择" :disabled="loading">
      <template #input>
        <van-dropdown-menu
          class="list-filter"
          active-color="var(--color-main)"
          :overlay="true"
        >
          <van-dropdown-item
            v-model="hsptSelect"
            :options="hospitals"
            @change="dropdownHospitalsChange"
          />
        </van-dropdown-menu>
      </template>
    </van-field>

    <van-field class="vf-center" label="科室选择" :disabled="loading">
      <template #input>
        <van-dropdown-menu
          class="list-filter"
          active-color="var(--color-main)"
          :overlay="true"
        >
          <van-dropdown-item
            v-model="depaSelect"
            :options="depas"
            :disabled="hsptSelect == -1"
            @change="dropdownDepaChange"
          />
        </van-dropdown-menu>
      </template>
    </van-field>

    <van-field class="vf-center" label="职称级别" :disabled="loading">
      <template #input>
        <van-dropdown-menu
          class="list-filter"
          active-color="var(--color-main)"
          :overlay="true"
        >
          <van-dropdown-item v-model="gradeSelect" :options="grades" />
        </van-dropdown-menu>
      </template>
    </van-field>

    <van-field
      class="yl-van-field border-round"
      label="擅长领域"
      :disabled="loading"
    >
      <template #input>
        <textarea placeholder="请输入您擅长的领域"></textarea>
      </template>
    </van-field>

    <van-field
      class="yl-van-field border-round"
      label="自我简介"
      :disabled="loading"
    >
      <template #input>
        <textarea placeholder="请简单介绍一下自己"></textarea>
      </template>
    </van-field>

    <van-field
      class="yl-van-field disable"
      label="姓名"
      :value="$store.getters.user?.name"
      :disabled="true"
    />
    <van-field
      class="yl-van-field disable"
      label="居民身份证"
      :value="$store.getters.user?.uid"
      :disabled="true"
    />

    <van-button
      class="yl"
      round
      block
      type="info"
      native-type="submit"
      :loading="loading"
      >申请认证</van-button
    >
  </div>
  <!-- 已认证 -->
  <div class="doctor-auth" v-else>
    <!-- // TODO 获取用户信息相关的医生信息 -->
    <ylPsersonDoctor :doctor="{}" />

    <div class="auth-success">
      <i class="yl-icon yl-icon-jiangzhang_jifen \e81c" />
      <span>您已认证为医生</span>
    </div>
  </div>
</template>

<script>
import ylPsersonDoctor from "@/components/ylPsersonDoctor.vue";

export default {
  components: { ylPsersonDoctor },
  data() {
    return {
      form: {
        hid: 1,
      },
      loading: false,
      finished: false,
      page: 1,
      doctors: [],
      searchDoctorRes: [],
      recommendDoctors: [],
      showPanel: false,
      showSearchBtn: false,
      inpt: "",
      hsptSelect: -1,
      depaSelect: -1,
      gradeSelect: 1,
      hospitals: [{ text: "全部医院", value: -1 }],
      depas: [{ text: "全部科室", value: -1 }],
      grades: [
        { text: "主任医师", value: 0 },
        { text: "副主任医师", value: 1 },
        { text: "主治任医师", value: 2 },
        { text: "领域专家", value: 3 },
        { text: "住院医师", value: 4 },
        { text: "主管护师", value: 5 },
      ],
    };
  },
  mounted() {
    // 医院列表
    this.$api.info
      .queryHospital({
        page: 1,
        pagenum: 100,
      })
      .then((res) => {
        console.log(res);
        // this.hospitals =
        this.hospitals.unshift(
          ...res.data.result.map((v) => {
            return {
              text: v.title,
              value: v.hid,
            };
          })
        );
      });

    // 医生列表
    // this.queryDoctorList();
  },
  methods: {
    dropdownHospitalsChange(v) {
      // console.log("dropdownHospitalsChange:", v, this.hospitals[v]);
      this.$api.info.queryDepa({ hid: v }).then((res) => {
        // console.log("res:", res);
        res.data.result.push({ title: "全部科室", did: -1 });
        this.depas = res.data.result.map((v) => {
          return {
            text: v.title,
            value: v.did,
          };
        });
        // 重置科室选择
        this.depaSelect = -1;
      });
    },
    // 科室下拉选择改变
    dropdownDepaChange(v) {
      this.$api.info
        .queryDoctors({ hid: this.hsptSelect, did: v })
        .then((res) => {
          this.doctors = res.data;
          this.finished = true;
          console.log("res:", this.doctors, res);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.doctor-auth {
  padding: var(--padding-base);
  background: white;
  min-height: 100%;

  .__avatar {
    width: fit-content;
    margin: auto;
    position: relative;
    .van-image {
      border: 2px solid var(--color-main);
    }
    .upload-btn {
      position: absolute;
      bottom: 6px;
      right: 6px;
      background: var(--color-main);
      // border: 2px solid var(--color-main);
      // padding: 6px;
      border-radius: 50%;
      width: fit-content;
      height: fit-content;
      i {
        display: flex;
        justify-content: center;
        align-items: center;
        display: block;
        color: white;
        padding: 6px;
        font-size: 6px;
      }
    }
  }

  // 认证成功页面
  .auth-success{
    display: block;
    text-align: center;
    color: var(--color-main);
    font-weight: bold;
   >i{
    margin-right: 5px;
   }
  }
  ::v-deep .border-round {
    .van-field__control {
      // min-height: 5rem;
      border: 2px solid var(--color-secondary);
      border-radius: var(--border-radius-larger);
    }
  }
  ::v-deep .van-field {
    &.vf-center {
      align-items: center;
    }
    .van-field__label {
      font-size: var(--font-size-lg);
      font-weight: bold;
    }
  }
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
  }
}
</style>