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
  },
 // 更新用户基本资料
 updateUserBaseInfo(data){
  return myAxios({
    method: "post",
    url: "/user/update",
    data,
  })
 },

 // 更新用户健康数据
 updateUserHealthInfo(data){
  return myAxios({
    method: "post",
    url: "/user/update_health",
    data,
  })
 },
 // 获取用户健康数据
 userHealthInfo(params){
  return myAxios({
    method: "GET",
    url: "/user/health",
    params,
  })
 },
 // 删除病史
 delMedicalHistory(data){
  return myAxios({
    method: "post",
    url: "/user/del_medical_history",
    data,
  })
 },
 // 添加用户病史
 addMedicalHistory(data){
  return myAxios({
    method: "post",
    url: "/user/add_medical_history",
    data,
  })
 },
 // 获取用户病史
 getUserHealthInfo(params){
  return myAxios({
    method: "GET",
    url: "/user/medical_history",
    params,
  })
 },
 // 医生入驻认证
 doctorCer(data){
  return myAxios({
    method: "post",
    url: "/user/doctor_cer",
    data,
  })
 },
 // 获取认证信息
 getDoctorCer(data){
  return myAxios({
    method: "post",
    url: "/user/cer_info",
    data,
  })
 },
 
}

export default user;