<template>
  <div class="chat-room">
    <!-- 嵌入ylNavbar -->
    <div ref="avatar" class="slot-title-avatar">
      <img :src="doctor.avatar" alt="" width="40px" height="40px" 
      style="border-radius: 50%; margin-right:10px; border: 2px solid var(--color-main);"
      />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      doctor: this.$route.query.doctor,
    };
  },
  created() {
    this.$route.meta.title = this.$route.query.title;
  },
  mounted() {
    console.log(this.$route);
    this.$route.query.slotTitle = this.$refs["avatar"];
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  .slot-title-avatar {
    width: 40px;
    height: 40px;
    > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>