<template>
  <van-form class="medreminder-add-view" @submit="onSubmit">
    <!-- {
    "rid": 2,
    "uid": "450122199611021512",
    "medname": "维生素C片",
    "dtstatr": "2023-01-01T00:00:00.000Z",
    "dtend": "2023-01-01T02:00:00.000Z",
    "freq": "DAILY",
    "until": "2023-02-01T15:50:00.000Z",
    "icsurl": null,
    "intervalue": 1,
    "units": "1",
    "dose": "片",
    "create_time": "2022-12-27T06:26:24.000Z"
} -->
    <ylTitle theme="left" title="用量信息设置" color="var(--color-main)" />
    <van-field
      class="yl-van-field"
      label="药品名"
      v-model="form.medname"
      name="medname"
      placeholder="请输入药品名"
      :rules="rules.medname"
      :disabled="loading"
    />
    <van-field name="time" :rules="rules.time">
      <template #input>
        <!-- <div class="flex-around padding-base"> -->
        <div style="text-align: center">
          <span class="text-large __title">用药开始时间</span>
          <div
            @click="
              [show, timeTitle, timeType] = [
                true,
                '选择开始用药时间',
                'datetime',
              ]
            "
            class="text-large padding-base"
            style="color: var(--color-main)"
          >
            {{ form.dtstatr }}
          </div>
        </div>
        <div style="text-align: center">
          <span class="text-large __title">用药结束时间</span>
          <div
            @click="
              [show, timeTitle, timeType] = [
                true,
                '选择用药结束时间',
                'datetime',
              ]
            "
            class="text-large padding-base"
            style="color: var(--color-main)"
          >
            {{ form.dtend }}
          </div>
        </div>
        <!-- </div> -->
      </template>
    </van-field>

    <div class="flex-around padding-base">
      <div class="flex-center">
        <span class="text-large">剂量</span>
        <input
          class="yl-input-style"
          :min="0"
          type="number"
          v-model="form.dose"
        />
      </div>
      <!-- <van-field
        style="flex: 1"
        class="yl-van-field-flex"
        label="剂量"
        v-model="form.dose"
        name="dose"
        placeholder="请输入剂量"
        type="number"
        :rules="rules.dose"
        :disabled="loading"
      /> -->
      <van-popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
      >
        <template #reference>
          <div class="flex text-large">
            <span class="text-large __title">单位：</span>
            <div style="color: var(--color-main)">
              {{ selectedActions }}
            </div>
          </div>
        </template>
      </van-popover>
    </div>
    <ylTitle theme="left" title="重复提醒设置" color="var(--color-main)" />
    <div class="flex-around padding-base">
      <div class="flex-center">
        <span class="text-large">间隔</span>
        <input
          class="yl-input-style"
          :min="0"
          type="number"
          v-model="form.intervalue"
        />
      </div>
      <!-- <van-field
        style="flex: 1"
        class="yl-van-field-flex"
        label="间隔"
        v-model="form.intervalue"
        name="intervalue"
        placeholder="重复间隔"
        type="number"
        :rules="rules.intervalue"
        :disabled="loading"
      /> -->
      <van-popover
        v-model="showFreqPopover"
        trigger="click"
        :actions="freqActions"
        @select="onFreqSelect"
      >
        <template #reference>
          <div class="flex">
            <span class="text-large __title">周期：</span>
            <div class="text-large" style="color: var(--color-main)">
              {{ selectedFreqActions }}
            </div>
          </div>
        </template>
      </van-popover>
    </div>
    <div class="flex-center padding-base text-large">
      <span class="text-large __title">结束重复提醒时间：</span>
      <div
        @click="
          [show, timeTitle, timeType] = [true, '选择结束重复提醒时间', 'date']
        "
        class="padding-base"
        style="color: var(--color-main)"
      >
        {{ form.until }}
      </div>
    </div>
    <van-button
      class="yl"
      round
      block
      type="info"
      native-type="submit"
      :loading="loading"
      >确认添加</van-button
    >
    <!-- 时间选择器弹窗 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        :type="timeType"
        :title="timeTitle"
        :min-date="new Date()"
        @confirm="changeTimePicker"
        @cancel="show = false"
      />
    </van-popup>
  </van-form>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        medname: "",
        dtstatr: this.datetime(new Date()),
        dtend: this.datetime(new Date()),
        freq: "DAILY",
        until: this.datetime(new Date()),
        units: "片",
        dose: 1,
        intervalue: 1, // 间隔
      },
      rules: {
        medname: [{ required: true, message: "药物名字不能为空" }],
        time: [
          {
            trigger: "onBlur",
            // required: true,
            validator: this.verifyTime,
            message: `结束时间应大于开始时间`,
          },
        ],
      },
      showPopover: false,
      showFreqPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "粒" },
        { text: "片" },
        { text: "毫升" },
        { text: "包" },
        { text: "针" },
      ],
      freqActions: [
        { text: "小时", value: "HOURLY" },
        { text: "天", value: "DAILY" },
        { text: "周", value: "WEEKLY" },
        { text: "月", value: "MONTHLY" },
      ],
      selectedActions: "片",
      selectedFreqActions: "天",
      // 时间选择器
      timeType: "datetime",
      show: false,
      timeTitle: "选择开始用药时间",
      // currentDate: new Date(),
      // minDate: new Date(),
    };
  },
  methods: {
    onSelect(action) {
      this.selectedActions = action.text;
      this.form.units = action.text;
      // this.$ylToast({ msg: action.text });
    },
    onFreqSelect(action) {
      this.selectedFreqActions = action.text;
      this.form.freq = action.value;
      // this.$ylToast({ msg: action.text });
    },
    changeTimePicker(v) {
      // console.log(v);
      if (this.timeTitle == "选择开始用药时间") {
        this.form.dtstatr = this.datetime(v);
      } else if (this.timeTitle == "选择用药结束时间") {
        this.form.dtend = this.datetime(v);
      } else {
        this.form.until = this.datetime(v);
      }
      this.show = false;
    },
    // 提交表单
    onSubmit() {
      this.$api.remind.add(this.form).then((res) => {
        console.log(res, this.form);
        if (res.code == 200) {
          this.$router.back();
          this.$ylToast({
            msg: res.msg,
          });
        }else{
           this.$ylToast({
            type:'error',
            msg: res.msg,
          });
        }
      });
    },
    // 验证时间
    verifyTime() {
      // console.log(new Date('2023-01-01 '+this.form.dtstatr), new Date('2023-01-01 '+this.form.dtend));
      return (
        new Date(this.form.dtstatr).getTime() <
        new Date(this.form.dtend).getTime()
      );
    },
    date(str = "1960-1-1") {
      let d = new Date(str);
      let Y = d.getFullYear();
      let M = d.getMonth() + 1;
      let D = d.getDate();
      return `${Y}-${M < 10 ? "0" + M : M}-${D < 10 ? "0" + D : D}`;
    },
    datetime(str = "1960-1-1 00:00") {
      let d = new Date(str);
      let Y = d.getFullYear();
      let M = d.getMonth() + 1;
      let D = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      return `${Y}-${M < 10 ? "0" + M : M}-${D < 10 ? "0" + D : D} ${
        h < 10 ? "0" + h : h
      }:${m < 10 ? "0" + m : m}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.medreminder-add-view {
  background: white;
  min-height: 100%;
  padding: var(--padding-base);
  color: var(--color-second-text);
  // van-field 插槽的样式
  ::v-deep .van-field__control--custom {
    justify-content: space-around;
  }
}
</style>