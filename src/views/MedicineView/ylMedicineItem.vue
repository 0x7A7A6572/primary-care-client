<template>
  <div class="yl-medicine-item box-round">
    <div class="__name flex">
      <span class="text-of-e" v-html="formatKeyword(meddata.name)"></span>
      <span class="tag">{{ meddata.type }}型</span>
    </div>
    <span>{{ meddata.signid }}</span>
    <span>规格：<span>{{ meddata.spec }}</span></span>
    <span>药品编号：<span>{{ meddata.code }}</span></span>
    <span >制药公司：{{ meddata.pro_unit }}</span>
    <a class="to-baidu-baike" :href="returnBaikeUrl(meddata.name)" title="跳转百科查看详情">
     <i class="yl-icon yl-icon-yaowan icon-btn" />
    </a>
  </div>
</template>

<script>
export default {
  name: "ylMedicineItem",
  props: {
    meddata: Object,
    keyword: String
  },
  data(){
    return{
      baikeUrl: 'https://baike.baidu.com/item/&fromModule=search_box'
    }
  },
  methods:{
    // 搜索结果关键字标红
    formatKeyword(str=str.toString()){
    if(!this.$props.keyword) return str;
      let keyIndex = str.indexOf(this.$props.keyword[0]);
      let keyEndIndex = str.indexOf(this.$props.keyword[this.$props.keyword.length-1]);
      if(keyIndex == -1 || keyEndIndex == -1) return str;
      if(keyEndIndex == -1) keyEndIndex = keyIndex+1;
      if(keyIndex == keyEndIndex) ++keyEndIndex;
      // 避免不止一个字符时 高亮少一位的问题
      if(this.$props.keyword.length>1) ++keyEndIndex;

      return `${
        str.slice(0,keyIndex)}<span style='color:red;'>${
        str.slice(keyIndex,keyEndIndex)}</span>${str.slice(keyEndIndex)}`
    },

    returnBaikeUrl(name){
      return `https://baike.baidu.com/item/${name}?timestamp=${new Date().getTime()}&fromModule=search_box`
    }

  }
};
</script>

<style lang="scss" scoped>
.yl-medicine-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--padding-base);
  margin: var(--margin-base) 0;
  user-select: none;
  font-size: var(--font-size-sm);
  color: var(--color-second-text);
  padding-left: 26px;
  width: auto;
  &::before {
    position: absolute;
    left: 10px;
    content: "";
    width: 4px;
    height: 60%;
    background: var(--color-main);
    border-radius: 2rem;
  }
  span{
    >span{
      color: var(--color-main);
      font-weight: bold;
    }
  }
  .__name {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: var(--font-size-lg);
    color: var(--color-second-text);
    >.tag {
      margin-left: 10px;
      color: var(--color-main);
      white-space: nowrap;
    }
  }
  .to-baidu-baike{
    position: absolute;
    right: 10px;
    top: 50%;
    >.icon-btn{
    font-size: var(--font-size-lgx);
    border-radius: 50%;
    width: fit-content !important;
    height: fit-content;
    padding: 6px;
    }
  }
}
</style>