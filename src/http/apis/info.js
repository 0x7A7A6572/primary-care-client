/* 用户模块相关接口 */
import myAxios from "@/utils/instance";
const info = {

  /**
   * 查询医院列表
   * @param {{page:Number,pagenum:Number}} data 
   * @returns 
   */
  queryHospital(data) {
    return myAxios({
      method: "post",
      url: "/hospital/limit",
      data,
    })
  },
  
  /**
   * 查询医院列表
   * @param {{hid:Number}} data 
   * @returns 
   */
  queryDepa(data) {
    return myAxios({
      method: "post",
      url: "/hospital/subject",
      data,
    })
  },

  /**
   * 查询科室下医生列表
   * @param {{hid:Number,did:Number}} data 
   * @returns 
   */
  queryDoctors(data) {
    return myAxios({
      method: "post",
      url: "/hospital/docotor",
      data,
    })
  },

  /**
   * 模糊搜索医生
   * @param {{key:String,hid:Number,did:Number}} params 
   * @returns 
   */
  searchDoctor(params) {
    return myAxios({
      method: "get",
      url: "/doctor/search",
      params,
    })
  },

  /**
   * 分页搜索医生
   * @param {{page:Number,pagenum:Number}} params 
   * @returns 
   */
  queryDoctorList(params) {
    return myAxios({
      method: "get",
      url: "/doctor/list",
      params,
    })
  },
  
  /**
   * @returns 获取专家推荐
   */
  recommendDoctor() {
    return myAxios({
      method: "get",
      url: "/doctor/recommend"
    })
  }

}
export default info;