// import yishifuwu from "@/service/yishifuwu";
import { config } from "@/config";
import { queryString, delay } from "@/utils";
import { Toast, Dialog, showToast } from "vant";
import AppBusFactory from "./appBusFactory";
import { getUtid } from "@/service/content";
import store from "../store/index";

const vt = require("vant");


export default class mianshitiBus {
  constructor(p) {
    this.platformInfo = p;
    // this.service = yishifuwu;
    // yishifuwu.init(this.platformInfo);
  }

  getToken() {
    const selfStorageData = localStorage.getItem("token") || "";
    return selfStorageData ? JSON.parse(selfStorageData) : null;
  }

  // 没有token的情况下
  async noTokenEntryProcess(to, next) {
    ///showToast("用户未登录,即将跳转到登录页...");
    if (to.name != "login" && to.name != "register") {
    //if (to.name != "login") {
      window.___router___.push("login");
    }
  }

  async redirectProcess(to, next) {
    //if (to.name == "login" || to.name == "register") {
    if (to.name == "login") {
      window.___router___.push("promotion");
      ///next();
    }
  }

  // 有token的情况下
  async haveTokenEntryProcess(userInfo, to, next) {
    let otherPlatform = this.platformInfo;
    const forceClear = queryString("forceClear"); // 强制清除缓存
    //http://127.0.0.1:9090?forceClear=1
    console.log(
      "haveTokenEntryProcess===",
      forceClear,
      otherPlatform,
      userInfo
    );
    const { time } = userInfo;
    const curTime = new Date().getTime();
    if (curTime - time >= config.OVERTIME || forceClear == 1) {
      //token 失效时间30天
      console.log("超过有效期！");
      localStorage.removeItem("token");
      alert("缓存过期,需要重新登录!");
      this.noTokenEntryProcess(to, next);
    } else {
      // 在缓存期限内
      console.log("在缓存期限内");
      this.redirectProcess(to, next);
    }
  }

  // 非微信平台启动逻辑
  async startProcess(to, from, next) {
    const userInfo = this.getToken();

    if (userInfo) {
      // 是否有缓存，也就时非首次
      await this.haveTokenEntryProcess(userInfo, to, next);
    } else {
      // 第一次进入,首先跳转医师服务平台登录
      await this.noTokenEntryProcess(to, next);
    }
  }
}
