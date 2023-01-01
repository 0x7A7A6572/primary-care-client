// 用药提醒相关
import myAxios from "@/utils/instance";
const remind = {
  // 查询用户用药提醒列表
  list() {
    return myAxios({
      method: "GET",
      url: "/reminder/list"
    })
  },
  // 添加提醒
  add(data) {
    return myAxios({
      method: "post",
      url: "/reminder/add",
      data,
    })
  },
  // 删除提醒
  del(data) {
    return myAxios({
      method: "post",
      url: "/reminder/del",
      data,
    })
  },
  // 生成ics
  ics(data) {
    return myAxios({
      method: "post",
      url: "/reminder/ics",
      data,
    })
  },
}
export default remind;