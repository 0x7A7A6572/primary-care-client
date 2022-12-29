import myAxios from "@/utils/instance";
const doctor = {
    register(data) {
      return myAxios({
        method: "post",
        url: "/user/register",
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