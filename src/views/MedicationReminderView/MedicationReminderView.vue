<template>
  <div class="medication-reminder-view">
    <ylSearch
      :searchBtn="false"
      placeholder="不记得药名？去找药"
      borderColor="var(--color-main)"
      @click="$router.push('/Medicine')"
    />
    <ylTitle class="__title" theme="left" title="我的提醒" />
    <ylEmpty v-if="reminders.length == 0" title="" />
    <div class="redrem-list">
      <div class="redrem-item" v-for="item in reminders" :key="item.rid">
        <div class="__content flex-d-column">
          <span class="__name"
            ><i class="yl-icon yl-icon-yaowan"></i>{{ item.medname }} 
            <span class="tag" v-show="item.icsurl" >ics</span>
            </span
          >
          <span class="text-small"
            >{{ `每${item.freq} / ${item.units}${item.dose} ` }}
            &emsp;
            <i class="yl-icon yl-icon-shizhong"></i>
            {{ item.dtstatr | time }} ~ {{ item.dtend | time }}</span
          >
          <div
            v-if="item.icsurl"
            class="create-ics flex-center"
            style="color:var(--color-main)"
            :data-ics-url="config.uploadUrl + item.icsurl"
          >
            <!-- <span>
               复制ICS&emsp;{{ config.uploadUrl}}{{ item.icsurl }}
            </span> -->
            <i class="yl-icon yl-icon-wenjianbangong"></i>
          </div>
          <span v-else class="create-ics icon-btn" v-show="!item.icsurl"
            ><i class="yl-icon yl-icon-chenggong1"></i> 生成日程提醒ICS</span
          >
        </div>
      </div>
    </div>
    <router-link to="/MedicationReminder/add" class="add-btn"
      ><i class="yl-icon yl-icon-plus"></i>添加用药提醒</router-link
    >
    <span class="help text-small">
      <!-- // TODO 跳转帮助页 -->
      <i class="yl-icon yl-icon-question"></i> 如何使用ICS导入日程？</span
    >
  </div>
</template>

<script>
import config from "@/utils/config";
export default {
  data() {
    return {
      config,
      reminders: [],
    };
  },
  created() {
    this.$api.remind.list().then((res) => {
      console.log(res);
      this.reminders = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
.medication-reminder-view {
  background: white;
  min-height: 100%;
  padding: var(--padding-base);
  .__title {
    margin: var(--margin-base) 0px;
  }
  .redrem-list {
    max-height: 50vh;
    .redrem-item {
      position: relative;
      width: auto;
      padding: var(--padding-base);
      // border: 2px solid var(--color-light);
      box-shadow: var(--box-shadow);
      border-radius: var(--border-radius-medium);
      margin: var(--margin-sm) 0px;
      .create-ics {
        position: absolute;
        right: var(--padding-base);
        top: var(--padding-base);
      }
      .__content {
        display: flex;
        justify-content: space-between;
        padding: var(--padding-base);
        font-size: var(--font-size-lg);
        .__name {
          color: var(--color-main);
          font-weight: bold;
          padding-bottom: var(--padding-sm);
        }
      }
    }
  }
  .add-btn {
    display: block;
    text-align: center;
    padding: var(--padding-base);
    font-size: var(--font-size-lgx);
    font-weight: bold;
    color: var(--color-main);
  }
  .help {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>