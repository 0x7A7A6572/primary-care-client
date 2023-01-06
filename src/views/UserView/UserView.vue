<template>
  <div class="user-view">
    <!-- 用户登录显示模块 -->
    <div class="user">
      <van-image round width="5rem" height="5rem" fit="cover"
        :src="$store.getters.user?.avatar" />
      <div class="user_item">
        <h2 style="padding-bottom: 10px;">{{$store.getters.user?.name}}</h2>
        <span>{{$store.getters.user?.birthday | datetime}}</span>
        <div class="user_item_bi" @click="jump('/User/EditUserBaseInfo')">
          <van-icon class-prefix="yl-icon" name="xiugai_bi" color="var(--color-main)" />
        </div>
      </div>
    </div>
    <!-- 我的档案 -->
    <div class="mboder box">
      <ylTitle title="我的档案" theme="left" color="var(--color-second-text)" />
      <div class="archives">
        <div class="registered" @click="jump('/AppointmentRegist/RegistOrderList')">
          <van-icon class-prefix="yl-icon" name="jianchabaogao" color="var(--color-main)" size="4vh" />
          <span>挂号订单</span>
        </div>
        <div class="registered" @click="jump('/User/PastMedicalHistory')">
          <van-icon class-prefix="yl-icon" name="xiaohua1" color="var(--color-main)" size="4vh" />
          <span>过往病史</span>
        </div>
      </div>
    </div>
    <!-- 个人健康数据 -->
    <div class="box  mboder">
      <div class="health-item">
        <div class="health-item-health">
          <ylTitle title="个人健康数据" theme="left" color="var(--color-second-text)" />
          <span>{{user.update_time | datetime}}</span>
        </div>
        <div @click="jump('/User/EditUserHealthyInfo')">
          <van-icon class-prefix="yl-icon" name="xiugai_bi" color="var(--color-main)" />
        </div>
      </div>
      <van-divider
        :style="{ color: 'var(--color-third-text)', borderColor: 'var(--color-third-text)', padding: '0 0px' }" />
      <div class="health-list">
        <div class="health-list-item">
          <span>身高(cm)</span>
          <span>{{user.height}}cm</span>
        </div>
        <div class="health-list-item">
          <span>体重(kg)</span>
          <span>{{user.weight}}kg</span>
        </div>
        <div class="health-list-item">
          <span>血压(mmHg)</span>
          <span>{{user.blood_ressure}}mmHg</span>
        </div>
        <div class="health-list-item">
          <span>血糖(mmol/L)</span>
          <span>{{user.blood_sugar}}mmol/L</span>
        </div>
      </div>
    </div>
    <!-- 管理 -->
    <div class="box mboder">
      <div class="address_item">
        <div class="address">
          <div class="address_list">
            <van-icon class="address_list" class-prefix="yl-icon" name="dingwei4" color="var(--color-main)"
              size="3vh" />
            <span>地址管理</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="var(--color-main)" size="3vh" />
        </div>
        <van-divider
          :style="{ color: 'var(--color-third-text)', borderColor: 'var(--color-third-text)', margin: '15px 0' }" />
        <div class="address" @click="jump('/User/DoctorAuth')">
          <div class="address_list">
            <van-icon class="address_list" class-prefix="yl-icon" name="yiwurenyuan2" color="var(--color-main)"
              size="3vh" />
            <span>医生入驻</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="var(--color-main)" size="3vh" />
        </div>
        <van-divider
          :style="{ color: 'var(--color-third-text)', borderColor: 'var(--color-third-text)', margin: '15px 0' }" />
        <div class="address" @click="showPopup">
          <div class="address_list">
            <van-icon class="address_list" class-prefix="yl-icon" name="zengjia" color="var(--color-main)" size="3vh" />
            <span>退出账号</span>

          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="var(--color-main)" size="3vh" />
        </div>
        <van-divider
          :style="{ color: 'var(--color-third-text)', borderColor: 'var(--color-third-text)', margin: '15px 0' }" />
        <div class="address">
          <div class="address_list">
            <van-icon class="address_list" class-prefix="yl-icon" name="fasong" color="var(--color-main)" size="3vh" />
            <span>关于</span>
          </div>
          <van-icon class-prefix="yl-icon" name="page_right" color="var(--color-main)" size="3vh" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      user:[],
    }
  },
  methods: {
    userHealthInfo(){  
      this.$api.user.userHealthInfo().then(res=>{
        this.user = res.data?.[0];
      })
    },
    jump(path) {
      this.$router.push(path)
    },
    showPopup() {
      this.$Dialog.confirm({
        title: '退出登录',
        message: '确定退出登录吗?',
        beforeClose: (action, done)=> {
          if (action === 'confirm') {
           this.$router.push('/Login');
           this.$store.dispatch('logout');
           done();
          } else {
            done();
          }
        },
      }).then(()=>{
        // on confirm
      }).catch(()=>{

      });
    },
  },
  mounted(){
    this.userHealthInfo()
  }
};

</script>

<style lang="scss" scoped>
.mboder {
  border-radius: 15px;
  margin-bottom: 20px;
}

.user-view {
  padding: 0px var(--padding-base);
}

.user {
  display: flex;
  margin: 30px 0px 20px 10px;
}

.user_item {
  margin: 10px 0px 0px 20px;
  position: relative;

  >span {
    font-size: var(--font-size-sm);
    color: var(--color-second-text);
  }
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

.address_list {
  >span {
    font-weight: bolder;
  }
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

.health-item-health {
  display: flex;
  align-items: center;

  >span {
    margin-left: var(--padding-base);
    font-size: var(--font-size-sm);
    color: var(--color-second-text);
  }
}

.health-list-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--color-third-text);
  padding: 0 var(--padding-base);
  font-weight: bolder;
}

.address {
  display: flex;
  justify-content: space-between;
}

.address_item {
  margin-top: 10px;
  color: var(--color-second-text);
}

.address_list {
  margin-right: 10px;
}

.out {
  text-align: center;
  margin-top: calc(var(--margin-lg)*3);
}

.out_item {
  width: 80vw;
  word-wrap: break-word;
  margin: 20px auto;
  text-align: center;
}

.out_item_list {
  margin-top: 80px;
  border-top: 1px solid var(--color-second-text);
  display: flex;
}

.out_item_list_left {
  border-right: 1px solid var(--color-second-text);
  width: 40vw;
  height: 15vw;
  text-align: center;

  >span {
    line-height: 15vw;
  }
}

.out_item_list_right {
  width: 40vw;
  height: 15vw;
  text-align: center;

  >span {
    line-height: 15vw;
  }
}
</style>