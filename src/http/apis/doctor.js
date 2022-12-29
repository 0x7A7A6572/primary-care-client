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
        url: "http://localhost:3010/hospital/name",
        params,
      })
    },
    hospital(data) {
      return myAxios({
        method: "post",
        url: "http://127.0.0.1:3010/hospital/limit",
        data,
      })
    }
  
   
  }
  export default doctor;