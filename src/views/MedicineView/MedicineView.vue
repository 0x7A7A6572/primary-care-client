<template>
  <div class="medicine-view">
    <van-sticky offset-top="10px">
      <div style="background: #fff">
        <div class="text-larger __title">药品查询</div>
        <ylSearch
          placeholder="请输入药名/条码/制药厂搜索药品"
          v-model="inpt"
          :disabled="false"
          :loading="false"
          :searchBtn="false"
          :boxShadow="true"
          :panel="false"
          borderColor="var(--color-main)"
          @search="onSearch"
         @input="onChange"
        /> 
      </div>
    </van-sticky>
    <div v-show="!search.onSearch || search.meddatas.length == 0"  class="hot-search box-round" >
        <ylTitle title="大家在搜" barColor="white" />
        <div><!-- @click="onSearch(item)" -->
          <span v-for="(item,index) in drugsHotSearch" class="tag" :key="index" @click="()=>{onSearch(item); inpt=item}">
            <i class="yl-icon yl-icon-yaowan" />
            {{item}}
            </span>
        </div>
    </div>
    <!-- 空状态处理 -->
    <ylEmpty v-if="showEmpty()" type="search" title="抱歉！搜索结果为空" />
    <van-list
      class="drugs-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ylMedicineItem
        v-show="search.onSearch"
        v-for="item in search.meddatas"
        :keyword="inpt"
        :meddata="item"
        :key="'search-' + item.id"
      />
      <ylMedicineItem
        v-show="!search.onSearch"
        v-for="item in meddatas"
        :meddata="item"
        :key="item.id"
      />
    </van-list>
  </div>
</template>

<script>
import ylMedicineItem from "./ylMedicineItem.vue";
export default {
  components: { ylMedicineItem },
  data() {
    return {
      page: 1,
      pagenum: 20,
      total: 0,
      search: {
        onSearch: false,
        meddatas: [],
        page: 1,
        pagenum: 20,
        total: 0,
      },
      loading: false,
      finished: false,
      inpt: "",
      meddatas: [],
      // TODO 这个接口没写
      drugsHotSearch:['布洛芬缓释胶囊','莲花清温','六位地黄丸','小儿肠胃康颗粒','藿香正气水']
    };
  },
  created() {
    this.$api.medicine.drugsList({ page: 1, pagenum: 10 }).then((res) => {
      // console.log(res);
      this.meddatas = res.data.result;
    });
  },
  methods: {
    onLoad() {
      // 判断当前是搜索模式还是全部模式
      if (this.search.onSearch) {
        this.pushSearchMedatas((res) => {
          this.loading = false;
          // 数据全部加载完成
          if (this.search.meddatas.length >= this.search.total) {
            this.finished = true;
          }
        });
      } else {
        this.pushMedatas((res) => {
          this.loading = false;
          // 数据全部加载完成
          if (this.meddatas.length >= this.total) {
            this.finished = true;
          }
        });
      }
    },
    onSearch(v) {
      if(!v || !v.trim()) return;
      this.$api.medicine
        .searchDrugs({
          name1: v,
          page: this.search.page,
          pagenum: this.search.pagenum,
        })
        .then((res) => {
          // console.log(res);
          // 显示搜索结果标识符
          this.search.onSearch = true;
          this.search.meddatas = res.data.result;
          this.search.total = res.data.total;
          this.$ylToast({
            msg: `搜索到${res.data.total}条结果`,
          });
        });
    },
    onChange(e) {
  
      if (!e) {
        // 关闭搜索结果标识符
        this.search.onSearch = false;
      }
      // 重置搜索page
      this.search.page = 1;
    },
    pushMedatas(callback) {
      this.$api.medicine
        .drugsList({ page: ++this.page, pagenum: this.pagenum })
        .then((res) => {
          this.meddatas.push(...res.data.result);
          this.total = res.data.total;
          callback?.(res);
        });
    },
    pushSearchMedatas(callback) {
      this.$api.medicine
        .searchDrugs({
          name1: this.inpt,
          page: ++this.search.page,
          pagenum: this.search.pagenum,
        })
        .then((res) => {
          this.search.meddatas.push(...res.data.result);
          this.search.total = res.data.total;
          callback?.(res);
        });
    },

    // 判断是否搜索为空
    showEmpty() {
      if (this.search.onSearch) {
        return this.search.meddatas.length < 1;
      } else {
        return this.meddatas.length < 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.medicine-view {
  padding: var(--padding-base);
  .__title {
    text-align: center;
    margin-bottom: var(--margin-lg);
  }

  .drugs-list {
    padding-bottom: 10vh;
  }

  .hot-search{
    // margin: var(--margin-sm);
    width: auto;
    background: linear-gradient(135deg, var(--color-secondary), rgb(0, 184, 178));
    .yl-title{
      padding-bottom: 10px;
    }
    >div{
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    >span{
      font-size: var(--font-size-base);
      margin: 6px;
      padding: 4px 6px;
      color: white;
      font-weight: bold;
    }
    }

  }

  /* 修改默认.van-sticky 粘连时的样式 */
  ::v-deep .van-sticky {
    // position: absolute;
    padding: 10px;
    margin: -10px;
    background: #fff;
    margin-bottom: 10px;
  }
  ::v-deep .van-sticky--fixed {
    padding: 10px 20px;
  }
}
</style>