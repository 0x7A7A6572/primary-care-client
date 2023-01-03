<template>
    <div>
<div class="list">
  <ylPsersonDoctor :doctor="arr" class="list1"></ylPsersonDoctor>
</div>
    </div>
</template>

<script>
import ylPsersonDoctor from '@/components/ylPsersonDoctor.vue'

export default {
    components:{
        ylPsersonDoctor
    },
    data(){
        return {
        arr:{}
        }
    },
    mounted(){
     this.arr=this.$route.params.name

    }
}
</script>

<style lang="scss" scoped>
.list{
    width: 380px;
    height: 100px;
    border-radius:var( --border-radius-large) ;
    background-color: var(--color-box-bg);
    margin: 20px auto;
 
}
</style>