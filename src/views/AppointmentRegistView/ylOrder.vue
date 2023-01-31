<template>
  <div class="box order">
 
    <div class="right">
      <span
        >预约号 <br/> <span style="color: var(--color-main); font-size: 8vw;">{{order.oid}}</span></span
      >
    </div>
    <div class="order-info text-small">
      <span
        ><span style="color: var(--color-third-text)">预约时间:</span>
        {{ order.yy_time | datetime }}</span
      >
      <span>
        <span style="color: var(--color-third-text)">预约医生:</span>
        {{ order.name }}</span
      >
      <span>
        <span style="color: var(--color-third-text)">医院地址:</span>
        {{ order.title }}</span
      >
      <span>
        <span style="color: var(--color-third-text)">状态:</span>
        {{ returnStateName(order.state) }}</span
      >
    </div> 
    <div class="cancelRegBtn" v-if="order.state == 0" @click="$emit('onCancelReg',order)">取消挂号</div>
  </div>
</template>
<script >
export default {
  name: "ylOrder",
  props: {
    order: Object,
  },
  methods: {
    returnStateName(id) {
      let states = ['待诊断','正在诊断','诊断完成','取消挂号'];
      return states[id];
    },
  }
};
</script>
<style lang='scss' scoped>
.order {
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-base);
  .order-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: var(--padding-base);
    > span {
      padding: 2px 0;
      white-space: nowrap;
    }
  }
  .right {
    white-space: nowrap;
    // padding: calc(var(--padding-base) * 2) calc(var(--padding-base) * 2);

    :nth-child(1) {
      flex-direction: column;
      align-items: center;
      display: inline-flex;
      justify-content: center;
      font-size: var(--font-size-lg);
      font-weight: bold;
      color: var(--color-second-text);
    }
  }

  .cancelRegBtn{
    color: var(--color-error);
    font-weight: bold;
    align-self: start;
  }
}
</style>