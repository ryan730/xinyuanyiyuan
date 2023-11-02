import { config } from "@/config";
import { Toast } from 'vant';

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