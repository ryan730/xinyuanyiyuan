import { request } from "@/utils";
import domain from "@/service/domain";
import Mock from "./user";
export class LoginService {
  public static async login(data:any) {
    // TODO: 如果是调用接口 改用下面的方式. <User> 这个就是返回的类型. 请求的时候 就给 Login 函数增加 参数即可.
    let res = await request<any>({
      url: domain.suffix+`/psyadm/userLogin?name=${data.name}&pass=${data.pass}`,
      //url: domain.suffix+"/user/testBasic?utid=11111",
      method: "post",
      data,
    });
    if(res.code ==1){
      return {
        data: {
          token: res?.data?.token,
          id: 1,
        },
        code: 200,
        message: "用户登录成功",
        success: true,
      }
    }else {
      return {...res};
    }
    // alert("这里是登录请求模拟!");
    // return new Promise((resolve) => {
    //   resolve(Mock);
    // });
  }
}
