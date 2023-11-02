import { request } from "@/utils";
import Mock from "../../config/menu";

export class UserService {
  public static async getUserMenu() {
    return new Promise((resolve) => {
      resolve(Mock.menu);
    });
  }

  public static async query(params: any) {
    return request({
      url: "http://ivapi.xinyunyiyun.cn/admin/userlist",
      method: "post",
      params,
    });
    return new Promise((resolve) => {
      resolve(Mock.user);
    });
  }
}
