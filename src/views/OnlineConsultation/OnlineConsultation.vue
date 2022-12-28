<template>
  <div class="online-consultation">
    <ylSearch
      placeholder="请输入医生/疾病搜索"
      v-model="inpt"
      :disabled="false"
      :loading="false"
      :searchBtn="showSearchBtn"
      :boxShadow="true"
      :panel="showPanel"
      @input="onSearchInput"
      @search="onSearch"
    >
      <!-- 搜索医生结果 -->
      <ylEmpty 
      v-show="searchDoctorRes.length == 0" 
      width="30%"
      type="search"
      title="未搜索到相关医生"
      />
      <div
        class="search-doctor-res"
        v-for="item in searchDoctorRes"
        :key="item.id"
      >
        <img class="recom-avatar" :src="item.avatar || defaultAvatar" alt="" />
        <div class="__doctor-details">
          <span class="recom-name text-blod"
            >{{ item.name }}
            <span class="text-small">{{ item.grade }}</span></span
          >
          <span class="text-small"
            >擅长：<span class="__good-at">{{ item.good_at }}</span></span
          >
        </div>
        <div class="icon-btn consulting" @click="consultingService(item)">
          咨询
        </div>
      </div>
    </ylSearch>
    <ylTitle
      class="__title"
      title="专家推荐"
      color="var(--color-second-text)"
    />

    <div class="scroll-recommend">
      <div class="recom-item box" v-for="item in 6" :key="item">
        <img class="recom-avatar" :src="item.avatar || defaultAvatar" alt="" />
        <span class="recom-name text-blod">李医生</span>
        <span class="text-small">主任医师</span>
      </div>
    </div>

    <div class="doctor-list box">
      <van-dropdown-menu
        class="list-filter"
        active-color="var(--color-main)"
        :overlay="true"
      >
        <van-dropdown-item v-model="value1" :options="hospitals" />
        <van-dropdown-item v-model="value2" :options="depas" />
        <!-- <van-dropdown-item v-model="value2" :options="grades" /> -->
      </van-dropdown-menu>
      <div class="doctor-item" v-for="item in 27" :key="item">
        <img class="recom-avatar" :src="item.avatar || defaultAvatar" alt="" />
        <div class="__doctor-details">
          <span class="recom-name text-blod">李医生</span>
          <span class="text-small">深圳市XXXX医院</span>
          <span class="text-small"
            >擅长：<span class="__good-at"
              >大苏打实打实大苏打实打打上就打开</span
            ></span
          >
          <div class="icon-btn consulting" @click="consultingService(item)">
            <van-icon class-prefix="yl-icon" name="liaotian4" />
            咨询
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/images/default_doctor.png";
import emptySearch from "@/assets/images/state_no_search.png"
export default {
  data() {
    return {
      searchDoctorRes: [],
      showPanel: false,
      showSearchBtn: false,
      defaultAvatar,
      inpt: "",
      value1: -1,
      value2: "a",
      hospitals: [{ text: "全部医院", value: -1 }],
      depas: [{ text: "全部科室", value: "a" }],
      // grades: [{ text: "全部职称", value: "a" }],
    };
  },
  methods: {
    consultingService() {
      console.log("进入咨询聊天");
    },
    onSearchInput(e) {
      this.showPanel = false;
      // this.showSearchBtn = e.length > 0;
    },
    onSearch(e) {
      this.showPanel = true;
      this.$api.info.searchDoctor({ key: this.inpt }).then((res) => {
        console.log("search:", res.data);
        this.searchDoctorRes = res.data;
        console.log("searchDoctorRes:", this.searchDoctorRes);
      });
    },
  },
  created() {
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
  },
};
</script>

<style lang="scss" scoped>
.online-consultation {
  padding: 10px;
  > .__title {
    padding: 16px 10px 0px 10px;
  }
  > .scroll-recommend {
    display: flex;
    overflow: scroll;
    margin: 10px -10px;
    // width: 200%;
    > .recom-item {
      display: flex;
      margin: 10px;
      min-width: 30vw;
      flex-direction: column;
      text-align: center;
      > .recom-avatar {
        background: var(--color-mian-bg);
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        margin: auto;
        object-fit: cover;
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .doctor-list {
    // position: relative;
    .list-filter {
      // position: relative;
      // z-index: 0;
    }
    .doctor-item {
      display: flex;
      margin: 10px;
      justify-content: space-between;
      > .recom-avatar {
        background: var(--color-mian-bg);
        width: 14vw;
        height: 14vw;
        border-radius: 50%;
        margin: 0px 10px 0px 0px;
      }
      > .__doctor-details {
        display: flex;
        flex-direction: column;
        flex: auto;
        .__good-at {
          // white-space: nowrap;
          // overflow: ellipsis;
          text-overflow: ellipsis;
          color: var(--color-desc-text);
        }
        .consulting {
          margin: 10px;
          text-align: right;
          align-self: flex-end;
        }
      }
    }
  }

  /** 搜索结果 */
  .search-doctor-res {
    display: flex;
    margin: 10px;
    justify-content: space-between;
    > .recom-avatar {
      background: var(--color-mian-bg);
      width: 14vw;
      height: 14vw;
      border-radius: 50%;
      margin: 0px 10px 0px 0px;
    }
    > .__doctor-details {
      display: flex;
      flex-direction: column;
      flex: auto;
      .__good-at {
        // white-space: nowrap;
        // overflow: ellipsis;
        text-overflow: ellipsis;
        color: var(--color-desc-text);
      }
      .consulting {
        margin: 10px;
        text-align: right;
        align-self: flex-end;
        height: fit-content;
        white-space: nowrap;
        align-self: center;
      }
    }
  }
}
</style> 
