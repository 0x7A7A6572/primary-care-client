// 药物查询相关
import myAxios from "@/utils/instance";
const medicine = {
  // 查询药品列表（分页） 
  drugsList(params) {
    return myAxios({
      method: "GET",
      url: "/search/drugs/list",
      params,
    })
  },
  // 模糊搜索药品
  searchDrugs(data){
    return myAxios({
      method: "post",
      url: "/search/drugs",
      data,
    })
   }, 
}
export default medicine;