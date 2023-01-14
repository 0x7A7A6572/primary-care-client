<template>
  <div class="pastmed-history">
    <ylTitle class="__title" theme="left" title="我的病史" />
    <ylEmpty v-if="reminders.length == 0" title="" />
    <div class="redrem-list">
      <div class="redrem-item" v-for="item in reminders" :key="item.mid">
        <div class="__content flex-d-column">
          <ylTitle
            class="__name"
            theme="left"
            barColor="white"
            :title="item.descs"
          />
          <span class="text-small">
            <i class="yl-icon yl-icon-shizhong"></i>
            {{ item.medical_time | datetime }}</span
          >
          <!-- 操作控制 -->

          <div class="flex-cloumn create-ics" >
            <span
              class="icon-btn"
              style="margin-left: var(--margin-base)"
              @click="showDelPopup(item)"
              ><i class="yl-icon yl-icon-docu_delete"></i> 删除</span
            >
          </div>

          <div></div>
        </div>
      </div>
    </div>
    <div class="add-btn" @click="show = true">
      <i class="yl-icon yl-icon-plus"></i>添加病史数据
    </div>
    <van-popup class="addh-popup" round v-model="show" closeable style="min-width: 80%">
      <div>
        <!-- <van-field class="yl-van-field border-round" label="病史描述" /> -->
    <van-field
      class="yl-van-field border-round"
      label="病史描述:"
      :disabled="loading"
    >
      <template #input>
        <textarea placeholder="简单描述病史信息"  v-model="descs"></textarea>
      </template>
    </van-field>
        <span class="__timepicker-text text-large padding-base" @click="tpShow = true">
         患病时间: <!--  <i class="yl-icon yl-icon-riqi1"></i>  --> <span>{{ selectTime }}</span>
        </span>
        <van-button
          class="yl"
          round block
          type="info"
          :loading="loading"
          @click="addMedHistory"
          >添加</van-button
        >
      </div>
    </van-popup>
    <!-- 时间选择器弹窗 -->
    <van-popup v-model="tpShow" position="bottom">
      <van-datetime-picker
        type="date"
        title="患病时间"
        :min-date="new Date(1910,1,1)"
        @confirm="changeTimePicker"
        @cancel="tpShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import config from "@/utils/config";
export default {
  data() {
    return {
      loading: false,
      show: false,
      tpShow: false,
      descs: "",
      selectTime: this.date(new Date()),
      config,
      reminders: [],
    };
  },
  created() {
    this.updateRemList();
  },
  methods: {
    addMedHistory(){
      this.loading = true;
      this.$api.user.addMedicalHistory({
        descs: this.descs,
        medical_time:this.selectTime
        }).then(res=>{
          if(res.code == 200) {
            this.updateRemList();
          }
          this.$ylToast({
            type: res.code == 200 ? 'success' :'error',
            msg: res.msg
          });
          this.loading = false;
          this.show = false;
        });
    },
    delRemItem(item) {
      this.$api.user.delMedicalHistory({ mid: item.mid }).then((res) => {
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
            msg: '删除失败',
          });
        }
      });
    },
    updateRemList() {
      this.$api.user.getUserHealthInfo().then((res) => {
        this.reminders = res.data;
      });
    },
     showDelPopup(item) {
      this.$Dialog.confirm({
        title: '删除提醒',
        message: `确定删除 ${item.descs} 提醒吗?`,
      }).then(()=>{
        this.delRemItem(item);
       }).catch(()=>{});
    },
    changeTimePicker(v) {
      this.selectTime = this.date(v);
      this.tpShow = false;
    },
    date(str = "1960-1-1") {
      let d = new Date(str);
      let Y = d.getFullYear();
      let M = d.getMonth() + 1;
      let D = d.getDate();
      return `${Y}-${M < 10 ? "0" + M : M}-${D < 10 ? "0" + D : D}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.pastmed-history {
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
  .addh-popup{
    padding: var(--padding-base);
  .__timepicker-text {
    display: block;
    // text-align: center;
    color:  var(--color-second-text);
    >i,span{
      margin-left: 6px;
    color: var(--color-main);
   
    }
  }
  }
  ::v-deep .border-round {
   
    .van-field__control {
       min-height: 6rem;
        height: 6rem;
      border: 2px solid var(--color-secondary);
      border-radius: var(--border-radius-larger);
    }
  }
}
</style>