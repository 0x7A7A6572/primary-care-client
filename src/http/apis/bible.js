// 医疗宝典接口
import myAxios from "@/utils/instance";
const bible = {
  // 查询疾病分类列表
  query(params) {
    return myAxios({
      method: "GET",
      url: "/bible/query",
      params,
    })
  },
  // 查询分类下病种列表
  queryFid(data){
    return myAxios({
      method: "post",
      url: "/bible/queryFid",
      data,
    })
   },
}
export default bible;