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
          <ylTitle
            class="__name"
            theme="left"
            barColor="white"
            :title="item.medname"
          />
          <!-- <span class="__name">
            <i class="yl-icon yl-icon-yaowan"></i>&emsp;{{ item.medname }} 
            </span> -->
          <span class="text-small"
            >{{ `每${item.freq} / ${item.units}${item.dose} ` }}
            &emsp;
            <i class="yl-icon yl-icon-shizhong"></i>
            {{ item.dtstatr | time }} ~ {{ item.dtend | time }}</span
          >
          <!-- 操作控制 -->
          <div class="flex create-ics" v-if="item.icsurl">
            <!-- <div
              class="flex-center"
              style="color: white"
              :data-ics-url="config.uploadUrl + item.icsurl"
            >
              <i class="yl-icon yl-icon-wenjianbangong"></i>
            </div> -->
            <span
              class="icon-btn"
              id="icsel"
              ref="icsurl"
              @click="copyICS(item)"
              ><i class="yl-icon yl-icon-wenjianbangong"></i> 复制ICS</span
            >
            <span
              class="icon-btn"
              style="margin-left: var(--margin-base)"
              @click="showDelPopup(item)"
              ><i class="yl-icon yl-icon-docu_delete"></i> 删除</span
            >
          </div>
          <div class="flex-cloumn create-ics" v-else>
            <span
              class="icon-btn"
              v-show="!item.icsurl"
              @click="createICS(item)"
              ><i class="yl-icon yl-icon-chenggong1"></i> 生成日程提醒ICS</span
            >
            <span
              class="icon-btn"
              style="margin-left: var(--margin-base)"
              @click="showDelPopup(item)"
              ><i class="yl-icon yl-icon-docu_delete"></i> 删除</span
            >
          </div>

          <div>
            <!-- <span class="text-small" v-show="!item.icsurl" @click="createICS(item)"
              ><i class="yl-icon yl-icon-chenggong1"></i> 生成日程提醒ICS</span
            > -->
            <span class="tag" v-show="item.icsurl">ics</span>
            <span v-show="item.icsurl" class="ics-text text-small">
              {{ config.uploadUrl + item.icsurl }}</span
            >
          </div>
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
    this.updateRemList();
  },
  methods: {
    delRemItem(item) {
      this.$api.remind.del({ rid: item.rid }).then((res) => {
        if (res.code == 200) {
          this.$ylToast({
            type: "success",
            msg: res.msg,
          });
          // 刷新列表
          this.updateRemList();
        } else {
          this.$ylToast({
            type: "error",
            msg: res.msg,
          });
        }
      });
    },
    createICS(item) {
      this.$api.remind.ics({ rid: item.rid }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.$ylToast({
            type: "success",
            msg: res.msg,
          });
          // 刷新列表
          this.updateRemList();
        } else {
          this.$ylToast({
            type: "error",
            msg: res.msg,
          });
        }
      });
    },
    copyICS(item) {
      navigator.clipboard.writeText(config.uploadUrl + item.icsurl).then(
        () => {
          this.$ylToast({ type: "success", msg: "复制成功" });
        },
        () => {
          this.$ylToast({ type: "error", msg: "复制失败" });
        }
      );
    },
    updateRemList() {
      this.$api.remind.list().then((res) => {
        console.log(res);
        this.reminders = res.data;
      });
    },
     showDelPopup(item) {
      this.$Dialog.confirm({
        title: '删除提醒',
        message: `确定删除 ${item.medname} 提醒吗?`,
      }).then(()=>{
        this.delRemItem(item);
       }).catch(()=>{});
    },
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
    display: flex;
    flex-direction: column-reverse;

    max-height: 60vh;
    overflow: scroll;
    .redrem-item {
      // background: var(--color-main);
      background: var(--color-item-bg);
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
          // color: var(--color-main);
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
    display: block;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
  .ics-text {
    user-select: all;
  }
}
</style>