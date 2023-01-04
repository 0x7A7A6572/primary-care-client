<template>
  <!-- 医生组件封装 -->
  <div class="yl-person-doctor">
    <img class="recom-avatar" :src="doctor.avatar" alt="" />
    <div class="__doctor-details">
      <span class="recom-name text-blod"
        >{{ doctor.name }}
        <van-tag type="primary">{{ doctor.grade }}</van-tag>

        <van-tag plain type="primary"> {{ doctor.d_title }} </van-tag>
      </span>
      <span class="text-small">{{ doctor.h_title }} </span>
      <span :class="['text-small', ellipsis ? 'text-of-e' : '']"
      @click="ellipsis = !ellipsis"
        >擅长：<span class="__good-at">{{ doctor.good_at }}</span></span
      >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ylPsersonDoctor",
  props: {
    doctor: Object,
  },
  data() {
    return {
      ellipsis: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.yl-person-doctor {
  display: flex;
  margin: 20px;
  justify-content: space-between;
  > .recom-avatar {
    background: var(--color-mian-bg);
    width: 14vw;
    height: 14vw;
    min-width: 14vw;
    border-radius: 50%;
    margin: 10px 10px 0px 0px;
    object-fit: cover;
  }
  > .__doctor-details {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 10px;
    .__good-at {
      // white-space: nowrap;
      // overflow: ellipsis;
      text-overflow: ellipsis;
      color: var(--color-desc-text);
    }
    .text-small {
      margin-bottom: 10px;
    }
    .consulting {
      margin: 10px;
      text-align: right;
      align-self: flex-end;
    }
    .recom-name {
      padding-bottom: 8px;
    }
  }
}
</style>