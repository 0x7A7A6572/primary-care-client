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
      <div
        class="recom-item box"
        v-for="item in recommendDoctors"
        :key="item.id"
        @click="consultingService(item)"
      >
        <img
          class="recom-avatar border-s"
          :src="item.avatar || defaultAvatar"
          alt=""
        />
        <span class="recom-name text-blod">{{ item.name }}</span>
        <span class="text-small">{{ item.grade }}</span>
      </div>
    </div>

    <div class="doctor-list box">
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
        <van-dropdown-item
          v-model="depaSelect"
          :options="depas"
          :disabled="hsptSelect == -1"
          @change="dropdownDepaChange"
        />
        <!-- <van-dropdown-item v-model="value2" :options="grades" /> -->
      </van-dropdown-menu>
      <div class="doctor-item" v-for="item in doctors " :key="item.id">
        <img class="recom-avatar" :src="item.avatar || defaultAvatar" alt="" />
        <div class="__doctor-details">
          <span class="recom-name text-blod">{{item.name }}</span>
          <span class="text-small">{{item.h_addr}}</span>
          <span class="text-small"
            >擅长：<span class="__good-at"
              >{{ item.good_at }}</span
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
export default {
  data() {
    return {
      doctors: [],
      searchDoctorRes: [],
      recommendDoctors: [],
      showPanel: false,
      showSearchBtn: false,
      inpt: "",
      hsptSelect: -1,
      depaSelect: -1,
      hospitals: [{ text: "全部医院", value: -1 }],
      depas: [{ text: "全部科室", value: -1 }],
      // grades: [{ text: "全部职称", value: "a" }],
    };
  },
  methods: {
    consultingService(item) {
      console.log("进入咨询聊天", item);
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
    dropdownHospitalsChange(v) {
      // console.log("dropdownHospitalsChange:", v, this.hospitals[v]);
      this.$api.info.queryDepa({ hid: v }).then((res) => {
        // console.log("res:", res);
        res.data.result.push({title: "全部科室", did: -1,});
        this.depas = 
        res.data.result.map((v) => {
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
    dropdownDepaChange(v){
      this.$api.info.queryDoctors({ hid: this.hsptSelect, did: v }).then((res) => {
        this.doctors =  res.data.result;
        console.log("res:", this.doctors );
      });
    }
  },
  created() {
    // 推荐医生
    this.$api.info.recommendDoctor().then((res) => {
      console.log(res);
      this.recommendDoctors = res.data;
    });
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
    this.$api.info.queryDoctorList({page:1,pagenum:10}).then(res=>{
      this.doctors = res.data;
    })
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
        min-width: 20vw;
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
        min-width: 14vw;
        border-radius: 50%;
        margin: 0px 10px 0px 0px;
        object-fit: cover;
      }
      > .__doctor-details {
        display: flex;
        flex-direction: column;
        flex: 1;
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
      object-fit: cover;
    }
    > .__doctor-details {
      display: flex;
      flex-direction: column;
      flex: 1;
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
