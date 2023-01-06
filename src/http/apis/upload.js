import myAxios from "@/utils/instance";
import config from "@/utils/config";
const upload = {

  /**
   * 文件上传
   */
  upload(data) {
    return myAxios({
      method: "post",
      url: config.uploadUrl + '/upload',
      data,
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    });
  }
}

export default upload;