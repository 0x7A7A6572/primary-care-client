<template>
  <div>
    <van-tabs v-model="active" color="var(--color-main)">
      <van-tab title="全部" class="order-list">
       <ylOrder :order="item"  v-for="item in list"
        @onCancelReg="onCancelReg"
       :key="item.oid"></ylOrder>
          <ylEmpty v-show="!list || list?.length == 0" />
      </van-tab>

      <van-tab class="order-list" title="待诊断">
        <ylOrder :order="item"  v-for="(item, i) in getFilterList(0)"
          :key="i"></ylOrder>
          <ylEmpty v-if="getFilterList(0)?.length == 0" />

    </van-tab>

      <van-tab class="order-list" title="已完成">
        <ylOrder :order="item"  v-for="(item, i) in getFilterList(1)"
          :key="i"></ylOrder>
        <ylEmpty v-if="getFilterList(1)?.length == 0" />
      </van-tab>

      <van-tab class="order-list" title="已取消">
        <ylOrder :order="item"  v-for="(item, i) in getFilterList(3)"
          :key="i"></ylOrder>
          <ylEmpty v-if="getFilterList(3)?.length == 0" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ylOrder from "./ylOrder.vue";
export default {
  components: { ylOrder },
  data() {
    return {
      active: "",
      list: [],
    };
  },
  methods: {
    aptregister() {
      let data = { uid: this.$store.getters.user.uid };
      this.$api.aptregister.list(data).then((res) => {
        console.log("ok", res);
        this.list = res.data.result;
      });
    },

    onCancelReg(order){
        this.$Dialog.confirm({
        title: '提示',
        message: `确定取消预约号${order.oid}的挂号信息?`,
        beforeClose: (action, done)=> {
          if (action === 'confirm') {
         this.$api.aptregister.update({
            oid: order.oid,
            state: 3,
            uid: this.$store.getters.user.uid
         }).then(res=>{
            console.log(res);
            if(res.code == 200){
              this.aptregister();
            }
            this.$ylToast({
                type: (res.code == 200 ? 'success' : 'error'),
                msg: res.msg,
            })
         })
           done();
          } else {
            done();
          }
        },
      }).then(()=>{
        // on confirm
      }).catch(()=>{

      });
    },
    getFilterList(state) {
     let list = this.list?.filter((v) => {
            return (v.state == state);
          });
         return list
    },
  },
  mounted() {
    this.aptregister();
  },
};
</script>

<style lang="scss" scoped>
.order-list {
  padding: var(--padding-base);
  .order {
    display: flex;
    align-items: center;
  }
}
.whole {
  display: flex;
  margin-top: var(--padding-base);
}

.left {
  display: flex;
  flex-direction: column;
  padding-left: var(--padding-base);
  > span {
    padding: 2px 0;
    white-space: nowrap;
  }
}

.right {
  flex: 1;
  white-space: nowrap;
  padding: calc(var(--padding-base) * 2) calc(var(--padding-base) * 2);

  :nth-child(1) {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    font-size: var(--font-size-lg);
    font-weight: bold;
    color: var(--color-second-text);
  }
}

::v-deep .van-tab__text--ellipsis {
  font-size: larger;
  font-weight: bold;
}
::v-deep .van-tab--active .van-tab__text--ellipsis {
  color: var(--color-main);
}
</style>