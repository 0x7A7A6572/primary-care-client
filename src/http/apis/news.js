// 新闻接口
import myAxios from "@/utils/instance";
const news = {
  // 获取新闻列表 
  list(params) {
    return myAxios({
      method: "GET",
      url: "/news/list",
      params,
    })
  },
  // 获取新闻详情
  detail(data){
    return myAxios({
      method: "post",
      url: "/news/detail",
      data,
    })
   },
}
export default news;