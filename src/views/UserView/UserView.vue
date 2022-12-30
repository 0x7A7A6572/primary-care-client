<template>
  <div class="user-view">
    <!-- 用户登录显示模块 -->
    <div class="user">
      <van-image round width="5rem" height="5rem" fit="cover"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <div class="user_item">
        <h2 style="padding-bottom: 10px;">用户名</h2>
        <span>1996-11-02</span>
        <div class="user_item_bi">
          <van-icon class-prefix="yl-icon" name="xiugai_bi" color="#00DC05" />
        </div>
      </div>
    </div>
    <!-- 我的档案 -->
    <div class="mboder box">
      <ylTitle title="我的档案" theme="left" color="var(--color-second-text)" />
      <div class="archives">
        <div class="registered">
          <van-icon class-prefix="yl-icon" name="jianchabaogao" color="#00DC05" size="4vh" />
          <span>挂号订单</span>
        </div>
        <div class="registered">
          <van-icon class-prefix="yl-icon" name="xiaohua1" color="#00DC05" size="4vh" />
          <span>过往病史</span>
        </div>
      </div>
    </div>
    <!-- 个人健康数据 -->
    <div class="box  mboder">
      <div class="health-item">
        <ylTitle title="个人健康数据" theme="left" color="var(--color-second-text)" />
        <span>2022-12-21</span>
        <van-icon class-prefix="yl-icon" name="xiugai_bi" color="#00DC05" />
      </div>
      <van-divider :style="{ color: '#adadad', borderColor: '#adadad', padding: '0 0px' }" />
      <div class="health-list">
        <div class="health-list-item">
          <span>身高(cm)</span>
          <span>180cm</span>
        </div>
        <div class="health-list-item">
          <span>体重(kg)</span>
          <span>200kg</span>
        </div>
        <div class="health-list-item">
          <span>血压(mmHg)</span>
          <span>2mmHg</span>
        </div>
        <div class="health-list-item">
          <span>血糖(mmol/L)</span>
          <span>餐前25mmol/L</span>
        </div>
      </div>
    </div>
    <!-- 管理 -->
    <div class="box mboder">
      <div class="address_item">
        <div class="address">
          <div>
            <van-icon class="address_list" class-prefix="yl-icon" name="dingwei" color="#00DC05" size="3vh" />
            <span>地址管理</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="#00DC05" size="3vh" />
        </div>
        <van-divider :style="{ color: '#adadad', borderColor: '#adadad', margin: '15px 0' }" />
        <div class="address">
          <div>
            <van-icon class="address_list" class-prefix="yl-icon" name="yiwurenyuan2" color="#00DC05" size="3vh"  />
            <span>医生入驻</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="#00DC05" size="3vh" />
        </div>
        <van-divider :style="{ color: '#adadad', borderColor: '#adadad', margin: '15px 0' }" />
        <div class="address">
          <div>
            <van-icon class="address_list" class-prefix="yl-icon" name="quit" color="#00DC05" size="3vh" />
            <span>退出账号</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="#00DC05" size="3vh" />
        </div>
        <van-divider :style="{ color: '#adadad', borderColor: '#adadad', margin: '15px 0' }" />
        <div class="address">
          <div>
            <van-icon class="address_list" class-prefix="yl-icon" name="fabu" color="#00DC05" size="3vh" />
            <span>关于</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="#00DC05" size="3vh" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
.mboder {
  border-radius: 15px;
  margin-bottom: 20px;
}

.user-view {
  padding: 0px 20px 0px 20px;
}

.user {
  display: flex;
  margin: 30px 0px 20px 10px;
}

.user_item {
  margin: 10px 0px 0px 20px;
  position: relative;
}

.user_item_bi {
  width: 30px;
  height: 30px;
  background-color: var(--color-box-bg);
  border-radius: 50px;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: -40px;
}

.archives {
  display: flex;
  margin: 15px 0px 0px 0px;
}

.registered {
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  font-size: var(--font-size-sm);
  text-align: center;
  color: var(--color-third-text);
}

.health-item {
  display: flex;
  justify-content: space-between;
}

.health-list-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-third-text);
}

.address {
  display: flex;
  justify-content: space-between;
}

.address_item{
  margin-top: 10px;
  color: var(--color-second-text);
}

.address_list{
  margin-right: 10px;
}
</style>