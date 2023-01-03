import myAxios from "@/utils/instance";
const doctor = {
    subjct(data) {
      return myAxios({
        method: "post",
        url: "/hospital/subject",
        data,
      })
    },
    // 查询该医院科室的医生列表
    list(data) {
      return myAxios({
        method: "post",
        url: "/hospital/docotor",
        data,
      })
    },
    // 医院模糊查询
    doctor(params) {
      return myAxios({
        method: "get",
        url: "/hospital/name",
        params,
      })
    },
    hospital(data) {
      return myAxios({
        method: "post",
        url: "/hospital/limit",
        data,
      })
    }
  
   
  }
  export default doctor;