// 问诊消息接口
import myAxios from "@/utils/instance";
const chat = {
  list(data){
    return myAxios({
      method: "post",
      url: "/chat/list",
      data,
    })
   },
   details(data){
    return myAxios({
      method: "post",
      url: "/chat/details",
      data,
    })
   }
   
}
export default chat;