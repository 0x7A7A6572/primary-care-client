<template>
  <div class="home">
    <!-- 用户信息 -->
    <div class="home-user">
      <van-image
        class="__avatar" round
        :src="$store.getters.user?.avatar"
      />
      <!-- <img class="__avatar" :src="$store.getters.user?.avatar" alt="" /> -->
      <span
        class="text-larger"
        style="color: var(--color-second-text); font-weight: unset"
      >
        您好！</span
      >
      <router-link to="/User" class="text-larger">{{
        $store.getters.user?.name || "未登录"
      }}</router-link>
    </div>
    <!-- 主功能模块 -->
    <div class="main-func text-larger">
      <router-link to="/OnlineConsultation" class="box __func-item left">
        <div>
          <van-icon class-prefix="yl-icon" name="yiwurenyuan2" size="8vw" />
          <span class="__title">线上问诊</span>
        </div>
        <span class="text-small" style="color: #fffd">面对面的解答病状</span>
      </router-link>
      <router-link to="/AppointmentRegist" class="box __func-item right">
        <div>
          <van-icon class-prefix="yl-icon" name="tingzhenqi" size="8vw" />
          <span class="__title">预约挂号</span>
        </div>
        <span class="text-small" style="color: #fffd">快速解决"一号难求"</span>
      </router-link>
    </div>

    <!-- 常用模块 -->
    <div class="common-func">
      <div style="color: var(--color-success)">
        <router-link
          to="/MedicalTreasure"
          class="box-round flex-d-column flex-center"
        >
          <van-icon class-prefix="yl-icon" name="yiyaoxiang" size="8vw" />
          <span style="padding-top: 5px; font-size: small">医疗宝典</span>
        </router-link>
      </div>
      <div style="color: var(--color-warning)">
        <router-link to="/Medicine" class="box-round flex-d-column flex-center">
          <van-icon class-prefix="yl-icon" name="yaoping" size="8vw" />
          <span style="padding-top: 5px; font-size: small">药品查询</span>
        </router-link>
      </div>
      <div style="color: var(--color-primary)">
        <router-link to="/Pharmacy" class="box-round flex-d-column flex-center">
          <van-icon class-prefix="yl-icon" name="shangdian" size="8vw" />
          <span style="padding-top: 5px; font-size: small">社区药房</span>
        </router-link>
      </div>
      <div style="color: var(--color-error)">
        <router-link
          to="/MedicationReminder"
          class="box-round flex-d-column flex-center"
        >
          <van-icon class-prefix="yl-icon" name="dingdan2" size="8vw" />
          <span style="padding-top: 5px; font-size: small">用药提醒</span>
        </router-link>
      </div>
    </div>
    <!-- 健康新闻 -->
    <div class="news-list box-round">
      <ylTitle title="健康新闻" />

      <!-- <van-list finished-text="没有更多了"> -->
      <ylNewsItem
        v-for="item in newsList"
        :key="item.id"
        :news="item"
        @click="toNewsPage(item)"
      />
      <!-- </van-list> -->
    </div>

    <!-- 社区活动 -->
    <div class="activity-list box-round">
      <ylTitle title="社区活动" />
    </div>
  </div>
</template>
<script>
import ylNewsItem from "./ylNewsItem.vue";
export default {
  name: "HomeView",
  components: { ylNewsItem },
  data() {
    return {
      newsList: [],
    };
  },
  created() {
    this.$api.news
      .list({
        page: 1,
        pagenum: 2,
      })
      .then((res) => {
        if (res.code == 200) {
          console.log(res);
          this.newsList = res.data.data;
        }
      });
  },
  methods: {
    toNewsPage(news) {
      this.$router.push({
        path: "/News/Details",
        query:{
         nid: news.nid
        },
        params: {
          news,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: var(--padding-base);
  padding-bottom: 10vh;
  .home-user {
    display: flex;
    align-items: center;
    margin-bottom: var(--margin-base);
    .__avatar {
      width: 20vw;
      height: 20vw;
      background: var(--color-main);
      border-radius: 50%;
      margin-right: var(--margin-base);
    }
  }
  .main-func {
    display: flex;
    .__func-item {
      flex: 1;
      border-radius: var(--border-radius-larger);
      min-height: 24vw;
      padding: var(--padding-lg);
      &.left {
        margin: var(--margin-base) calc(var(--margin-base) / 2)
          var(--margin-base) 0;
        background: var(--color-secondary);
        color: white;
        box-shadow: 2px 2px 8px var(--color-secondary);
      }
      &.right {
        margin: var(--margin-base) 0 var(--margin-base)
          calc(var(--margin-base) / 2);
        background: var(--color-primary);
        color: white;
        box-shadow: 2px 2px 8px var(--color-primary);
      }
      // width: ;
      .__title {
        white-space: nowrap;
      }
      span {
        padding: var(--padding-sm);
      }
    }
  }
  .common-func {
    display: flex;
    justify-content: space-between;
    margin: var(--margin-base) 0;
    > div {
      // 兼容横屏
      min-width: 22vw;
      flex: 1;
      > a {
        min-width: 90%;
        margin: auto;
      }
    }
  }
  .news-list {
    width: 100%;
  }
  .activity-list {
    width: 100%;
    margin: var(--margin-base) 0;
    min-height: 30vh;
  }
}
</style>