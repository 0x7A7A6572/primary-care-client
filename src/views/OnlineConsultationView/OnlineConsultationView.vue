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
        <!-- <img class="recom-avatar" :src="item.avatar" alt="" /> -->
        <div class="__doctor-details">
          <span class="recom-name text-blod"
            >{{ item.name }}
            <van-tag type="primary">{{ item.grade }}</van-tag>

            <van-tag plain type="primary"> {{ item.d_title }} </van-tag>
          </span>
          <span class="text-small"
            >擅长：<span class="__good-at">{{ item.good_at }}</span></span
          >
        </div>
        <div class="icon-btn consulting" @click="consultingService(item)">
          咨询
        </div>
      </div>
    </ylSearch>

    <!-- 专家列表 -->
    <ylTitle
      class="__title"
      title="专家推荐"
      color="var(--color-second-text)"
    />
    <div class="scroll-recommend">
      <ylPsersonExpert
        class="recom-item box"
        v-for="item in recommendDoctors"
        :expert="item"
        :key="item.id"
        @click="consultingService(item)"
      >
      </ylPsersonExpert>
    </div>
  <!-- 医生列表 -->
    <div class="doctor-list box">
      <van-sticky :offset-top="50">
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
      </van-sticky>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      
        <ylPsersonDoctor
        v-for="item in doctors" :key="item.id"
        :doctor="item">
          <div class="icon-btn consulting" @click="consultingService(item)">
            <van-icon class-prefix="yl-icon" name="liaotian4" />
            咨询
          </div>
        </ylPsersonDoctor>
      </van-list>
    </div>
  </div>
</template>

<script>
import ylPsersonDoctor from "@/components/ylPsersonDoctor.vue";
import ylPsersonExpert from "@/components/ylPsersonExpert.vue";


export default {
  components:{ylPsersonDoctor, ylPsersonExpert},
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
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
      this.$router.push({
        path:'/chat/room',
        query:{
          doctor: item,
          title: item.name,
        }
      })
    },
    onSearchInput(e) {
      this.showPanel = false;
      // this.showSearchBtn = e.length > 0;
    },
    onSearch(e) {
      this.showPanel = true;
      this.$api.info.searchDoctor({ key: this.inpt }).then((res) => {
        // console.log("search:", res.data);
        this.searchDoctorRes = res.data;
        console.log("searchDoctorRes:", this.searchDoctorRes);
      });
    },
    dropdownHospitalsChange(v) {
      // console.log("dropdownHospitalsChange:", v, this.hospitals[v]);
      this.$api.info.queryDepa({ hid: v }).then((res) => {
        // console.log("res:", res);
        res.data.result.push({ title: "全部科室", did: -1 });
        this.depas = res.data.result.map((v) => {
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
    dropdownDepaChange(v) {
      this.$api.info
        .queryDoctors({ hid: this.hsptSelect, did: v })
        .then((res) => {
          this.doctors = res.data;
          this.finished = true;
          console.log("res:", this.doctors, res);
        });
    },
    // 触底加载
    onLoad() {
      this.queryDoctorList(this.page++, 10, (data) => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.doctors.length >= data.total) {
          this.finished = true;
        }
      });
    },
    queryDoctorList(page = 1, pagenum = 10, callback) {
      this.$api.info.queryDoctorList({ page, pagenum }).then((res) => {
        // this.doctors = res.data.result;
        this.doctors.push(...res.data.result);
        // console.log(" this.doctors: ",  this.doctors)
        callback?.(res.data);
      });
    },
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
    // this.queryDoctorList();
  },
};
</script>

<style lang="scss" scoped>
.online-consultation {
  padding: 10px;
  > .__title {
    padding: 16px 10px 0px 10px;
  }
  /* 专家推荐样式 */
  > .scroll-recommend {
    display: flex;
    overflow: scroll;
    margin: 10px -10px;
  }
  ::-webkit-scrollbar {
    display: none;
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
      .recom-name {
        padding-bottom: 8px;
      }
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
</style> 
