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
   * 模糊搜索医生
   * @param {{name}} params 
   * @returns 
   */
  searchDoctor(params) {
    return myAxios({
      method: "get",
      url: "/doctor/search",
      params,
    })
  }

}
export default info;