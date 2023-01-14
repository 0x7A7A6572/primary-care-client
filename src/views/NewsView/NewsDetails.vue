<template>
  <div class="news-details">
    <!-- <van-sticky offset-top="0"> -->
    <ylTitle :title="news.title"  theme="left"/>
    <div class="__hot-time text-small">
      <div class="text-small">
        <i class="yl-icon yl-icon-view" style="color: var(--color-main)"></i>
        阅读<span style="color:var(--color-secondary)">  {{ news?.hot }}</span>
      </div>
      <span class="text-small">&emsp;发布时间：{{ news?.create_time | datetime }}</span>
    </div>
    <!-- </van-sticky> -->
    <van-divider>
    </van-divider>
    <van-image
      width="80vw"
      height="60vw"
      fit="cover"
      :src="config.uploadUrl + news.cover"
      style="display: block; margin: auto"
    />
    <pre class="news-content padding-base" v-html="news.content"></pre>
      <van-divider>到底了</van-divider>
  </div>
</template>

<script>
import config from "@/utils/config";
export default {
  data() {
    return {
      config,
      news: {},
    };
  },
  created() {
    let nid = this.$route.query.nid;
    this.$api.news.detail({ nid }).then((res) => {
      console.log(res);
      this.news = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.news-details {
  user-select: unset;
  background: white;
  // height: 100%;
  padding: var(--padding-base);
  .__hot-time {
    display: flex;
    align-items: center;
    padding: var(--padding-sm);
    > div {
      margin-right: var(--margin-base);
    }
  }
  .news-content {
    white-space: pre-wrap;
  }
}
</style>