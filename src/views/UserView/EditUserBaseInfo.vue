<template>
  <div class="content">
    <!-- 更换头像 -->
    <div class="Personal_information">
      <van-image
        width="100"
        height="100"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        fit="cover"
        round
      />
      <div class="Personal">
        <van-icon
          class-prefix="yl-icon"
          name="xiugai_bi"
          color="var(--color-main)"
        />
      </div>
    </div>
    <!-- 详细地址 -->
    <div>
        <van-field
          class="yl-van-field"
          label="详细地址"
          placeholder="请输入详细地址"
        />
                <div class="form-user-info text-large flex-around">
          <div>
            <span class="text-large __title">出生日期</span>
            <div>1996-11-2</div>
          </div>
          <div>
            <span class="text-large __title">性别</span>
            <ylSwitch items="男" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content{
    min-height: 100vh;
    background: #fff;
    padding: var(--padding-sm);
}
.Personal_information {
  position: relative;
  width: fit-content;
  margin: calc(var(--margin-base) * 5) auto;
  .Personal {
    background-color: var(--color-box-bg);
    width: fit-content;
    padding: var(--padding-sm);
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>>
