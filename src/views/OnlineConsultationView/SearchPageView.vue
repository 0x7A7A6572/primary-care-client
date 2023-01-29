<template>
  <div class="search-doctor-page">
    <van-sticky :offset-top="60">
      <ylSearch
        :autoFocus="true"
        placeholder="请输入医生/疾病搜索"
        v-model="inpt"
        :disabled="false"
        :loading="false"
        :searchBtn="false"
        :boxShadow="true"
        :panel="false"
        @search="onSearch"
        @input="onSearchInput"
      />
    </van-sticky>
    <div class="doctor-list box">
      <!-- 搜索医生结果 -->
      <ylEmpty
        v-show="doctors?.length == 0"
        width="60%"
        type="search"
        title="未搜索到相关结果"
      />
        <ylPsersonDoctor v-for="item in doctors" :key="item.id" :doctor="item">
          <div class="slot-doctor-info">
            <span>
              <i class="yl-icon yl-icon-yiwurenyuan2"></i>
              接诊人数：<span class="__service-count text-medium">{{
                item.service_count
              }}</span>
            </span>

            <span>
              &nbsp;&nbsp;
              <i class="yl-icon yl-icon-haoping"></i>
              评价
              <span class="__score text-medium">{{ item.score }}</span></span
            >
            <div class="icon-btn consulting" @click="consultingService(item)">
              <van-icon class-prefix="yl-icon" name="liaotian4" />
              咨询
            </div>
          </div>
        </ylPsersonDoctor>
      <van-skeleton
        v-for="index in 8"
        title
        avatar
        avatar-size="16vw"
        :row="4"
        :loading="loading"
        :key="index"
      />
      <ylEmpty v-show="doctors == null" width="60%" type="list" title="" />
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
      inpt: "",
      doctors: null,
    };
  },
  methods: {
    onSearch(e) {
      this.loading = true;
      this.showPanel = true;
      this.$api.info.searchDoctor({ key: this.inpt }).then((res) => {
        this.doctors = res.data;
        // console.log("doctors:", this.doctors);
        this.loading = false;
      });
    },
    consultingService(item) {
      // console.log("进入咨询聊天", item);
      this.$router.push({
        name: "OnlineConConfirm",
        params: { doctor: item },
      });
      // this.$router.push({
      //   path: "/ChatList/ChatRoom",
      //   query: {
      //     doctor: item,
      //     title: item.name,
      //   },
      // });
    },
    onSearchInput(e) {
      if (!e && this.doctors?.length == 0) {
        // 重置empty面板
        this.doctors = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-doctor-page {
  padding: var(--padding-base);
  height: 100%;
  .doctor-list {
    background: white;
    min-height: 100%;
    .slot-doctor-info {
      display: flex;
      white-space: nowrap;
      align-items: center;
      font-size: var(--font-size-sm);
      .__service-count {
        color: var(--color-success);
        font-weight: bold;
      }
      .__score {
        color: var(--color-warning);
        font-weight: bold;
      }
    }
  }
}
</style>