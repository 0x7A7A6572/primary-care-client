<template>
  <div class="yl-news-item" @click="$emit('click',news)">
    <div class="__desc">
      <span class="__title">{{ news?.title }}</span>
      <div class="__hot-time">
        <div>
          <i class="yl-icon yl-icon-huo" style="color: var(--color-error);"></i>
          <span class="text-small">热度 {{ news?.hot }}</span>
        </div>
        <span class="text-small">{{ "2022-10-20" || news?.create_time }}</span>
      </div>
    </div>
    <img class="__cover" :src="baseUrl + news?.cover" alt="" />
  </div>
</template>

<script>
import config from '@/utils/config';
export default {
  name: "ylNewsItem",
  props: {
    baseUrl: {
      type: String,
      default: config.uploadUrl,
    },
    news: Object,
  },
};
</script>

<style lang="scss" scoped>
.yl-news-item {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: var(--padding-base);
  .__desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--padding-base);

    .__title {
      font-weight: bold;
    }
    .__hot-time {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .__cover {
    width: 24vw;
    height: 24vw;
    border-radius: var(--border-radius-larger);
  }
}
</style>