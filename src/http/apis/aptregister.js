// 挂号订单相关
import myAxios from "@/utils/instance";
const aptregister = {
  // 查询用户挂号订单列表
  list(data) {
    return myAxios({
      method: "POST",
      url: "/register/list",
      data
    })
  },
  // 添加用户挂号订单
  add(data) {
    return myAxios({
      method: "post",
      url: "/register/add",
      data,
    })
  },
  // 修改用户挂号信息
  update(data) {
    return myAxios({
      method: "post",
      url: "/register/updata",
      data,
    })
  },
}
export default aptregister;