<template>
  <div class="content">
    <div class="field">
      <van-field v-model="height" class="yl-van-field" label="身高(cm)" :disabled="loading" placeholder="输入身高信息" />
      <van-field v-model="weight" class="yl-van-field" label="体重(kg)" :disabled="loading" placeholder="输入体重信息" />
      <van-field
      v-model="blood_ressure"
        class="yl-van-field"
        label="血压(mmHg)"
        placeholder="血压信息"
        :disabled="loading"
      />
      <van-field v-model="blood_sugar" class="yl-van-field" label="血糖(mmol/L)" :disabled="loading" placeholder="血糖信息" />
    </div>
          <div style="margin: 16px">
        <van-button
        @click="updateUserHealthInfo"
          class="yl"
          round
          block
          type="info"
          native-type="submit"
          :loading="loading"
          >确认修改</van-button
        >
      </div>
  </div>
</template>

<script>
import user from '@/http/apis/user';
export default {
  data() {
    return {
      loading: false,
      height:'',
      weight:'',
      blood_ressure:'',
      blood_sugar:'',
    };
  },
  methods:{
    updateUserHealthInfo(){
        let data = {height: this.height,weight: this.weight,blood_ressure: this.blood_ressure,blood_sugar: this.blood_sugar}
        this.$api.user.updateUserHealthInfo(data).then(res=>{
            this.$router.go(-1);
            if(res.code == 200){
              let user = this.$store.getters.user
              user.height = this.height
              user.weight = this.weight
              user.blood_ressure = this.blood_ressure
              user.blood_sugar = this.blood_sugar
              this.$store.commit('updateUser',user)
            }
        })
    }
  },
  created(){
     this.$api.user.userHealthInfo().then(res=>{
        let {blood_ressure,blood_sugar,height,weight} = res.data?.[0];
        this.weight = weight;
        this.height = height;
        this.blood_ressure = blood_ressure;
        this.blood_sugar = blood_sugar;
      })
  }
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background: #fff;
  padding: var(--padding-sm);
}
.field{
    padding-top: calc(var(--padding-base)*2) ;
}
</style>