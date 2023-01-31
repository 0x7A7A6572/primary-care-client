<template>
  <div>
    <van-tabs v-model="active" color="var(--color-main)">
      <van-tab title="全部" class="order-list">
       <ylOrder :order="item"  v-for="item in list"
        @onCancelReg="onCancelReg"
       :key="item.oid"></ylOrder>
          <ylEmpty v-show="list?.lenght == 0" />
      </van-tab>

      <van-tab class="order-list" title="待诊断">
        <ylOrder :order="item"  v-for="(item, i) in getFilterList('待问诊')"
          :key="i"></ylOrder>
        <ylEmpty v-show="!getFilterList('待问诊')"
      /></van-tab>

      <van-tab class="order-list" title="已完成">
        <ylOrder :order="item"  v-for="(item, i) in getFilterList('已完成')"
          :key="i"></ylOrder>
        <ylEmpty v-show="getFilterList('已完成')" />
      </van-tab>
      <van-tab class="order-list" title="已取消">
        <ylOrder :order="item"  v-for="(item, i) in getFilterList('已取消')"
          :key="i"></ylOrder>
        <ylEmpty v-show="getFilterList('已完成')" />
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
      unlist: this.list?.filter((v) => {
        return v.state == 0;
      }),
      endlist: this.list?.filter((v) => {
        return v.state == 1;
      }),
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
    getFilterList(type) {
      switch (type) {
        case "待问诊":
          return this.list?.filter((v) => {
            return v.state == 0;
          });
        case "已完成":
          return this.list?.filter((v) => {
            return v.state == 1;
          });
          case "已取消":
          return this.list?.filter((v) => {
            return v.state == 3;
          });
      }
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