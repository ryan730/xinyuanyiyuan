import { platform } from "@/config/platform";
import { queryString } from "@/utils";
import yishifuwuBus from "./yishifuwuBus";
import mianshitiBus from "./mianshitiBus";
/**
 * 工厂方法，创建各种平台方法
 */
export default class AppBusFactory {
  static _getInstance;
  constructor(opt) {}
  // 获取当前非微信的环境
  static async getOtherPlatform() {
    const _otherPlatform = sessionStorage.getItem("otherPlatform") || "";
    if (!_otherPlatform) {
      const env = {}; //await yishifuwuBus.getEnv(platform) || {};
      console.log("cnative-env::", env);
      let result = {
        isPass: false,
        name: env.name || "mianshiti" || "yishifuwu", // 这里目前只有一个平台，强制yishifuwuBus
        loginUrl: "",
      };
      if (result.name == "yishifuwu") {
        result.isPass = true;
        //result.loginUrl = `${platform.yishifuwu.URL_LOGIN}?clientId=${platform.yishifuwu.clientId}&returnUrl=${platform.yishifuwu.returnUrl}`;
        //result.loginUrl = `${platform.yishifuwu.URL_LOGIN}?clientId=${platform.yishifuwu.clientId}&returnUrl=${encodeURIComponent(location.href)}`;
        result.loginUrl = `${platform.yishifuwu.URL_LOGIN}?clientId=${
          platform.yishifuwu.clientId
        }&returnUrl=${encodeURIComponent(location.origin + location.pathname)}`;
        result.subPageUrl = `${platform.yishifuwu.URL_LOGIN}?clientId=${
          platform.yishifuwu.clientId
        }&returnUrl=${encodeURIComponent(location.origin + "/content")}`;
      } else if (result.name == "mianshiti") {
      }
      sessionStorage.setItem("otherPlatform", JSON.stringify(result));
    }

    return JSON.parse(sessionStorage.getItem("otherPlatform") || "{}");
  }
  // 异步单例
  static getInstance() {
    if (!AppBusFactory._getInstance) {
      const factory = new AppBusFactory();
      AppBusFactory._getInstance = factory.getFactory();
    }
    return AppBusFactory._getInstance;
  }

  getFactory(platform) {
    if (!platform) {
      platform = JSON.parse(sessionStorage.getItem("otherPlatform") || "{}");
    }
    switch (platform.name) {
      case "yishifuwu":
        return new yishifuwuBus(platform);
        break;
      case "mianshiti":
        return new mianshitiBus(platform);
        break;
      default:
        throw new Error("参数错误");
    }
  }
}
