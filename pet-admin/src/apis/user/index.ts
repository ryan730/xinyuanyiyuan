import { request } from "@/utils";
import Mock from "../../config/menu";

export class UserService {
  public static async getUserMenu() {
    return new Promise((resolve) => {
      resolve(Mock.menu);
    });
  }

  public static async getList(params: any) {
    return request({
      url: "http://ivapi.xinyunyiyun.cn/admin/userlist",
      method: "post",
      params,
    });
  }

  public static async downLoad(params: any) {
    // let res = request({
    //   url: "http://ivapi.xinyunyiyun.cn/admin/rdownload",
    //   method: "post",
    //   responseType: "blob", // arraybuffer是js中提供处理二进制的接口
    //   headers: { // 这里需要使用form-data格式数据发送请求
    //     "Content-Type": " application/json;charset=UTF-8"
    //   },
    //   params,
    // });

    // let blob = new Blob([res], { type: 'application/zip' })
    // let url = window.URL.createObjectURL(blob)
    let url = `http://ivapi.xinyunyiyun.cn/admin/rdownload?uids=${params?.uids}`
    const link = document.createElement('a') // 创建a标签
    link.setAttribute('target', '_blank');
    link.href = url;
    link.click();
    URL.revokeObjectURL(url); // 释放内存
  }
}
