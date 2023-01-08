<template>
  <van-form class="medreminder-add-view">
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
    <van-field
      class="yl-van-field"
      label="药品名"
      v-model="form.medname"
      name="medname"
      placeholder="请输入药品名"
      :rules="rules.medname"
      :disabled="loading"
    />
    <div class="flex-around">
      <div>
        <span class="text-large __title">用药开始时间</span>
        <div @click="show = true" style="color: var(--color-main)">
          {{ form.dtstatr }}
        </div>
      </div>
      <div>
        <span class="text-large __title">用药结束时间</span>
        <div @click="show = true" style="color: var(--color-main)">
          {{ form.dtend }}
        </div>
      </div>
    </div>
    <div class="flex-around">
      <van-popover
        style="flex: 1"
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
      >
        <template #reference>
          <div class="flex">
            <span class="text-large __title">单位</span>
            <div style="color: var(--color-main)">
              {{ `片` }}
            </div>
          </div>
        </template>
      </van-popover>
      <van-field
        style="flex: 1"
        class="yl-van-field-flex"
        label="剂量"
        v-model="form.medname"
        name="medname"
        placeholder="请输入剂量"
        :rules="rules.medname"
        :disabled="loading"
      />
    </div>
    <ylTitle theme="left" title="重复提醒设置" />
    <div class="flex-around">
      <van-popover
        style="flex: 1"
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
      >
        <template #reference>
          <div class="flex">
            <span class="text-large __title">周期</span>
            <div style="color: var(--color-main)">
              {{ `天` }}
            </div>
          </div>
        </template>
      </van-popover>
      <van-field
        style="flex: 1"
        class="yl-van-field-flex"
        label="间隔"
        v-model="form.medname"
        name="medname"
        placeholder="重复间隔"
        :rules="rules.medname"
        :disabled="loading"
      />
    </div>
        <div>
        <span class="text-large __title">结束重复提醒时间</span>
        <div @click="show = true" style="color: var(--color-main)">
          {{ form.dtstatr }}
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
        type="time"
        title="选择出生日期"
        v-model="currentDate"
        :min-date="minDate"
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
        dtstatr: "---- -- --",
        dtend: "---- -- --",
        freq: "",
        until: "",
        units: 1,
        dose: "",
      },
      rules: {
        medname: [],
      },
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "粒" },
        { text: "片" },
        { text: "毫升" },
        { text: "针" },
      ],
      freqActions: [{ text: "天" }, { text: "周" }, { text: "月" }],
      // 时间选择器
      show: false,
      currentDate: new Date(),
      minDate: new Date(),
    };
  },
  methods: {
    onSelect(action) {
      this.$ylToast({ msg: action.text });
    },
    changeTimePicker(v) {
      // this.form.birthday = this.datetime(v);
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.medreminder-add-view {
  background: white;
  min-height: 100%;
  padding: var(--padding-base);
}
</style>