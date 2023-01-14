<template>
  <div class="onlinecon-confirm-view">
    <ylPsersonDoctor class="box-round shadow" :doctor="doctor">
      <!-- <div class="slot-doctor-info">
        <span>
          <i class="yl-icon yl-icon-yiwurenyuan2"></i>
          接诊人数：<span class="__service-count text-medium">{{
            doctor?.service_count
          }}</span>
        </span>

        <span>
          &nbsp;&nbsp;
          <i class="yl-icon yl-icon-haoping"></i>
          评价
          <span class="__score text-medium">{{ doctor?.score }}</span></span
        >
      </div> -->
    </ylPsersonDoctor>
          <div class="slot-doctor-info">
        <span>
          <i class="yl-icon yl-icon-yiwurenyuan2"></i>
          接诊人数：<span class="__service-count text-medium">{{
            doctor?.service_count
          }}</span>
        </span>

        <span>
          &nbsp;&nbsp;
          <i class="yl-icon yl-icon-haoping"></i>
          评价
          <span class="__score">{{ doctor?.score }}</span></span
        >
      </div>
      <div class="padding-base text-medium-int" style="padding-left:16px">医生简介: <span>{{doctor.descs || '无'}}</span></div>
    <!-- <van-field
      label="医生简介:"
    ><template #input>
        {{doctor.descs || '无'}}
      </template>
    </van-field> -->
    <van-divider>患者信息</van-divider>
    <van-field
      label="问诊人:"
      :value="consultInfor.patient?.name"
      :disabled="true"
    />
    <van-field
      class="yl-van-field border-round"
      label="症状描述:"
      :disabled="loading"
    >
      <template #input>
        <textarea
          v-model="consultInfor.desc"
          placeholder="通过症状部位丶症状表现症状特征等病情资料来描述症状"
        ></textarea>
      </template>
    </van-field>
    <div class="padding-base">
      <van-button class="yl" round block 
      type="info" :loading="loading"
      @click="initiateConsultation"
        >发送给医生</van-button
      >
    </div>
  </div>
</template>

<script>
import ylPsersonDoctor from "@/components/ylPsersonDoctor.vue";
export default {
  components: { ylPsersonDoctor },
  data() {
    return {
      loading: false,
      doctor: this.$route.params.doctor,
      consultInfor: { // 问诊信息
        patient: this.$store.getters.user, // 患者信息
        ctime: new Date().getTime(), // 发起时间
        desc: '' // 症状描述
      }
    };
  },
  methods:{
    // 发起问诊
    initiateConsultation(){
      this.$router.push({
        name: 'ChatRoom',
        path: '/ChatList/ChatRoom',
        params:{
          doctor: this.doctor,
          consultInfor: this.consultInfor,
          title: this.doctor.name
        }
      })
    }
  },
  created(){
    // 从问诊窗口页返回时 直接再向上一层返回
    if(!this.doctor){
      return this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>

.onlinecon-confirm-view {
  padding: var(--padding-base);
  background: #fff;
  height: 100%;
  .slot-doctor-info {
    display: flex;
    white-space: nowrap;
    align-items: center;
    font-size: var(--font-size-base);
    // justify-content: center;
    padding-left: var(--padding-lg);
    .__service-count {
      color: var(--color-success);
      font-weight: bold;
    }
    .__score {
      color: var(--color-warning);
      font-weight: bold;
    }
  }
  ::v-deep .border-round {
    .van-field__control {
      height: 10rem;
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