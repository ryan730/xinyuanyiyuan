//http://h5.xinyunyiyun.cn/?openid=3734eb5c223cac1d23831a147bf9c4a2&validateCode=418e6466d5244ff5b8b4ed5f6a36c1ef
export const platform = {
    yishifuwu: {
        URL_LOGIN: "https://login.yishifuwu.cn/app/index.html",//医师服务
        clientId: "d3cd7f00dc15ad2a53b55a95a8ed7557",
        //returnUrl:encodeURIComponent("http://h5.xinyunyiyun.cn"),
        //returnUrl:encodeURIComponent("http://app.xinyunyiyun.cn"),
        //returnUrl: encodeURIComponent("http://127.0.0.1:9090?other=1"),
        returnUrl: encodeURIComponent(location.href),
        tester: {
            openid: "3734eb5c223cac1d23831a147bf9c4a2",
            validateCode: "418e6466d5244ff5b8b4ed5f6a36c1ef"
        }
    }
}
