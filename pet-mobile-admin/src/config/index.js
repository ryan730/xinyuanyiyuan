const protocol = location.protocol;
export const config = {
  // APIURL : '47.100.75.167',
  //APIURL: "http://ivapi.xinyunyiyun.cn",
  APIURL: protocol + "//api.xinyunyiyun.cn",
  //URL: "https://h5.xinyunyiyun.cn/",
  URL: protocol + "//pets.xinyunyiyun.cn/",
  OVERTIME: 30 * 24 * 60 * 60 * 1000,
  //OVERTIME: 10 * 60 * 60 * 1000,
  CLASS: ["初一", "初二", "初三"],
};
