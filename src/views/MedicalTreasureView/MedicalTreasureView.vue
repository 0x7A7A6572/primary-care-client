<template>
  <van-tree-select
    class="medical-treasure-view"
    :items="items"
    :active-id.sync="activeId"
    :main-active-index.sync="activeIndex"
    @click-nav="clickNav"
    @click-item="clickItem"
  />
</template>

<script>
export default {
  data() {
    return {
      items: [],
      activeId: 1,
      activeIndex: 0,
    };
  },
  created(){
    this.$api.bible.query().then(res=>{
      // console.log(res);
       this.items = res.data.map(v=>{
          return { text: v.subject, children: [], id:v.sid , sid: v.sid }
       });
      // 显示第一个
      this.queryFid(res.data[0].sid, this.items[0]);
    });
  },
  methods:{
    queryFid(id, parent){
       this.$api.bible.queryFid({id}).then(res=>{
        // console.log(res);
        parent.children = res.data.map(v=>{
          return { text: v.Disease, id:v.did ,sid: v.did }
        });
       })
    },
    clickNav(e){
        // console.log(e);
        // 避免重复请求
        if(this.items[e].children.length == 0) this.queryFid(this.items[e].sid, this.items[e]);
    },
    clickItem(e){
        // console.log(e);
        this.$ylToast({
          type:'success',
          msg: '跳转详情：' + e.text
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.medical-treasure-view {
  background: white;
  min-height: 100%;
  padding: var(--padding-base);
  ::v-deep .van-sidebar-item--select::before {
    background: var(--color-main);
  }
  ::v-deep .van-tree-select__item--active{
     color: var(--color-main);
  }
  .van-sidebar-item {
    // color: white;
    // background-color: var(--color-main);
    // font-style: italic;
    font-weight: bold;
    }
  .van-sidebar-item--select, .van-sidebar-item--select:active{
  //  background: white;
  //   color: var(--color-second-text);
    font-style: italic;

  }
}
</style>