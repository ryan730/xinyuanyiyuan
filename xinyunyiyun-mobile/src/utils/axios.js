import axios from "axios";
import { Toast, showFailToast } from "vant";
import { config } from "@/config";

axios.defaults.baseURL =
  process.env.NODE_ENV == "development" ? config.APIURL : config.APIURL;
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
  const localStorageData = localStorage.getItem("token") || "";

  if (localStorageData && config?.headers?.Authorization != "no") {
    // Authorization 不特别处理的都加上 Bearer...
    const { token } = JSON.parse(localStorageData);
    console.log("token:::", token);
    config.headers.Authorization = token;
  }
  // config.headers.Authorization = 'Bearer bzJZMXk2Qmc5R1dfS2Z1akdid3dMSGhPeTVFa3x8OHx8NDcxYzZjYjA4YWVhOGM4ZjY0Njg3ZGZjYjliMTY4ZGM=';
  return config;
});

axios.interceptors.response.use((res) => {
  if (res.status != 200) {
    showFailToast(`网络请求异常!`);
    //return Promise.reject(res);
    return null;
  }

  const { data } = res;
  console.log("axios:", data, res.data);
  if (isNaN(data.code) && res?.config?.headers?.Authorization != "no") {
    // 其他平台有可能不是这个规则
    showFailToast(`服务端异常！${data?.code}`);
    //return Promise.reject(res);
    return null;
  }
  let result = res.data ? res.data : res;
  return result;
});

export default axios;
