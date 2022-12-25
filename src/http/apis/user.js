/* 用户模块相关接口 */
import myAxios from "@/utils/instance";
const user = {
  // 注册
  register(data) {
    return myAxios({
      method: "post",
      url: "/user/register",
      data,
    })
  },
  // 登陆
  login(data) {
    return myAxios({
      method: "post",
      url: "/user/login",
      data,
    })
  }
 // 更新用户基本资料

 // 更新用户健康数据

 // 添加用户病史

 
}
export default user;