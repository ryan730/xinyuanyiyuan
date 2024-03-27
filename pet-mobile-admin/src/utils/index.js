import { config } from "@/config";
import { Toast } from 'vant';
import { getcfg } from "@/service/wxShare";

export function queryString(item) {
    var sValue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
    return sValue ? sValue[1] : sValue;
}

// 判断当前页面是否登录
function loginHelper(url) {
    const redirectUri = encodeURIComponent(`${config.URL}login?metaCallback=${url}`);
    // const redirectUri = encodeURIComponent(`${config.URL}login`);
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ee605c9b206596c&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=aaa#wechat_redirect`;
}

export function login(url) {
    const loginToken = window.localStorage.getItem('token');
    Toast('提示内容loginToken', loginToken);
    if (loginToken == null) {
        loginHelper(url);
    } else {
        const { time, token } = JSON.parse(loginToken);
        console.log(time, token);
        const curTime = new Date().getTime();
        if (curTime - time >= config.OVERTIME) {
            // loginHelper(url);
        }
    }
}

export function formatDate(date) {
    // var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

export function delay(ms) {
    return new Promise((resolve, reject) =>
        setTimeout(resolve, ms))
}

export function debounce(fn, wait) {
    let callback = fn;
    let timerId = null;

    function debounced() {
        // 保存作用域
        let context = this;
        // 保存参数，例如 event 对象
        let args = arguments;

        clearTimeout(timerId);
        timerId = setTimeout(function () {
            callback.apply(context, args);
        }, wait);
    }

    // 返回一个闭包
    return debounced;
}
export function getPxToRem(val) {
    return window.getPx2Rem ? window.getPx2Rem(val) : val + 'px';
}

export async function ASTPxToRem(arr, options) {
    var parseAttrs = require('posthtml-attrs-parser');
    var posthtml = require('posthtml');
    var pxRegex = /(\d*\.?\d+)px/ig;

    options = Object.assign({
        rootValue: 16, // root font-size
        unitPrecision: 3, // numbers after `.`
        minPixelValue: 0 // set it 2 if you want to ignore value like 1px & -1px
    }, options);

    function createPxReplace(rootValue, unitPrecision, minPixelValue) {
        return function (m, $1) {
            // ignoring `PX` `Px`
            if (m.indexOf('px') === -1) {
                return m;
            }
            if (!$1) {
                return m;
            }
            var pixels = parseFloat($1);

            if (pixels < minPixelValue) {
                return m;
            }
            return toFixed((pixels / rootValue), unitPrecision) + 'rem';
        };
    }

    function toFixed(number, precision) {
        var multiplier = Math.pow(10, precision + 1),
            wholeNumber = Math.floor(number * multiplier);
        return Math.round(wholeNumber / 10) * 10 / multiplier;
    }

    var pxReplace = createPxReplace(options.rootValue, options.unitPrecision, options.minPixelValue);

    return await Promise.all(arr.map(async (ele) => {
        if (!window.getPx2Rem || typeof (ele.data) != 'string' || ele.data.indexOf('style') == -1) {
            return Promise.resolve(ele.data);
        }
        const transHtml = await posthtml()
            .use(function (tree) {
                tree.match({ attrs: { style: true } }, function (node) {
                    var attrs = parseAttrs(node.attrs);
                    for (var x in attrs['style']) {
                        if (attrs['style'].hasOwnProperty(x)) {
                            var styleValue = attrs['style'][x];

                            // e.g. style="width=10px; width=20px;"
                            if (typeof styleValue == 'object')
                                styleValue = styleValue[styleValue.length - 1];

                            var newStyleValue;
                            newStyleValue = styleValue.toString().replace(pxRegex, pxReplace);

                            attrs['style'][x] = newStyleValue;
                        }
                    }

                    node.attrs = attrs.compose();
                    return node;
                });
            })
            .process(ele.data);

        ele.data = transHtml.html;
        return Promise.resolve(ele.data);
    }));
}

const APPNAME = "乐嘟宠物测试分佣";
const routers = {
    "promotion": "我的推广",
    "QRcode": "生成推广二维码",
    "setting": "设置",
    "commissionList": "佣金明细",
    "promotionList": "推广订单",
    "cashList": "提现记录",
}
export function shareAction(wx, to) {
    if (!wx) {
        return
    }
    // 微信分享自定义设置
    getcfg(encodeURIComponent(location.href))    //访问接口获取以下需要的参数
        .then((res) => {
            wx.config({
                debug: false,
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名
                jsApiList: [
                    "checkJsApi",
                    'onMenuShareTimeline',                      //分享到微信朋友圈
                    'onMenuShareAppMessage',                    //分享给微信朋友
                    'onMenuShareQQ',                            //分享到QQ
                    'onMenuShareQZone',                         //分享到QQ空间
                    "updateAppMessageShareData",  //分享到微信及QQ（新接口）
                    "updateTimelineShareData",//分享到朋友圈”及“分享到QQ空间（新接口）
                    "onMenuShareWeibo",//分享到微博
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                let sharedParams = {            //分享参数(朋友圈除外)
                    title: APPNAME, // 分享标题
                    link: location.href, // 分享链接
                    imgUrl: 'http://img.xinyunyiyun.cn/img/logo_1.png' // 分享图标
                }
                let sharedParamsmore = {            //分享参数(朋友圈除外)
                    title: APPNAME, // 分享标题
                    desc: APPNAME, // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: 'http://img.xinyunyiyun.cn/img/logo_1.png' // 分享图标
                }
                sharedParamsmore.desc = routers[to.name] || APPNAME;
                wx.updateAppMessageShareData(sharedParamsmore);
                wx.updateTimelineShareData(sharedParams);
                wx.onMenuShareWeibo(sharedParamsmore);
                // else if (to.name == 'content' || to.name == 'test' || to.name == 'userInfo' || to.name == 'reportLite' || to.name == 'reportFull') {
                //     console.log('12233', store)
                //     let productId = store.state.productId;
                //     let testId = store.state.testId;
                //     let title = store.state.title;
                //     sharedParams.title = title;
                //     sharedParamsmore.title = title;
                //     sharedParamsmore.link = 'http://h5.xinyunyiyun.cn/test';
                //     getContent(testId).then(res => {
                //         console.log('获取test分享数据', res);
                //         let desc = res.data.sub_title;
                //         let img = res.data.image.replace('2.png', '1.png');
                //         let link = 'http://h5.xinyunyiyun.cn/test?isshare=true&' + 'testId=' + testId + "&productId=" + productId + "&title=" + title
                //         sharedParamsmore.desc = desc;
                //         sharedParams.link = link;
                //         sharedParamsmore.link = link;
                //         sharedParams.imgUrl = img;
                //         sharedParamsmore.imgUrl = img;
                //         console.log('test参数', sharedParamsmore, sharedParams);
                //         wx.updateAppMessageShareData(sharedParamsmore);
                //         wx.updateTimelineShareData(sharedParams);
                //         wx.onMenuShareWeibo(sharedParamsmore);
                //     })
                // }

            });
        })
}
