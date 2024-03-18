import axios from '../utils/axios';
import qs from 'qs';
import { Toast, showDialog } from 'vant';
import { platform } from '@/config/platform';

let otherPlatform;
let refresh_token_timeout = 0;// token 超时只请求一次,防止死循环
const header = { headers: { 'Authorization': 'no' } };
const yishifuwu_baseURL = 'https://cloud-app.yishifuwu.cn';

export function init(pm) {
    otherPlatform = pm;
}

//--------------------------------------[登录和用户信息]--------------------------------------
//1.获取第三方登录的 openId 和 validateCode(openId 校验的 code)
export function valiateCodeHand(loginUrl) {
    console.log('valiateCodeHand::', loginUrl);
    window.location.replace(loginUrl);// 跳转到医师服务登录
}

// 0.麦塔接口,获取用户信息，基本的信息判断, 参数来自重定向
export function getUserInfoFromMaiTa({ openid, validateCode }) {
    const serve = axios.post(`/user/yishiLogin?openid=${openid}&validateCode=${validateCode}`)
    serve.then((data) => {
        console.log("getUserInfoFromMaiTa::", JSON.stringify(data));
        const { code, msg } = data
        const { nickname, avatar, openid, token } = data?.data;
        // 将token存储到localstorge
        if (code == 1 && token) {
            window.localStorage.setItem('token', JSON.stringify({
                ...data?.data,
                //isRegister:1,//测试
                time: new Date().getTime()
            }));
        } else {
            showFailToast(`授权异常！${msg}`);
        }
    }).catch((err) => {
        console.log("error:getUserInfoFromMaiTa", err);
        //Toast.fail(`网路异常！`);

    });
    return serve;
}

// 4.麦塔接口,替换上面的 getToken, 参数来自重定向
export function updateUserInfoFromMaiTa({ oauthCode }) {
    const serve = axios.post(`/user/yishiUserUpdate?oauthCode=${oauthCode}`);
    serve.then((data) => {
        console.log("updateUserInfoFromMaiTa::", data);
        const { code, msg } = data
        const { nickname, avatar, openid, token } = data?.data;
        // 将token存储到localstorge
        if (code == 1) {
            Toast.success(`授权成功!`);
            let oldToken = window.localStorage.getItem('token') || '{}';
            oldToken = JSON.parse(oldToken);
            if (oldToken.isRegister) {
                oldToken.isRegister = 0;// 变成老用户
                window.localStorage.setItem('token', JSON.stringify({
                    ...oldToken,
                    time: new Date().getTime()
                }));
            }

            // window.localStorage.setItem('yishifuwu_token', JSON.stringify({
            //     ...data,
            //     time: new Date().getTime()
            // }));
            window.history.replaceState({}, 0, location.origin + location.pathname + '?no_refresh=1');//强制清除 url 里 oauthCode, 防止刷新页面后判断 旧的oauthCode
        } else {
            Toast.fail(`授权异常！${msg}`);
        }
    }).catch((err) => {
        console.log("error:updateUserInfoFromMaiTa", err);
        //Toast.fail(`网路异常！`);

    });
    return serve;
}

//3、获取授权基本信息 code
export function getAuthorizeForCode(loginUrl) {
    console.log('authorize::', loginUrl + '&type=base');
    window.location.replace(loginUrl + '&type=base');// 跳转到医师授权服务
}


//5.1、token失效
export function tokenInvalidGrant(loginUrl) {
    console.log('tokenInvalidGrant::', loginUrl);
    getAuthorizeForCode(loginUrl)
}


//7、获取授权手机号授权的 code
export function getAuthorizeForPhone(loginUrl) {
    console.log('getAuthorizeForPhone::', loginUrl + '&type=phone');
    window.location.replace(loginUrl + '&type=phone');// 跳转到医师授权服务
}

//--------------------------------------[支付相关]----------------------------------------------
export function getOrderFromMaiTa({ productId, url }) {
    console.log("getOrderFromMaiTa-reqs::", { productId, url });
    const serve = axios.post(`/user/yishiOrder?productId=${productId}&url=${url}`);
    serve.then((data) => {
        console.log("getOrderFromMaiTa::", data);
        const { code, msg } = data
        const { nickname, avatar, openid, token } = data?.data;
        // 将token存储到localstorge
        if (code == 1 && data?.data) {
            Toast.success(`正在跳转支付页!`);

        } else {
            Toast.fail(`支付异常！${msg}`);
        }
    }).catch((err) => {
        console.log("error:getOrderFromMaiTa", err);
        //Toast.fail(`网路异常！`);

    });
    return serve;
}

// 支付完成后获取订单, 参数来自重定向
export function getCheckPayFromMaiTa({ ysorder }) {
    console.log("getCheckPayFromMaiTa-reqs::", { ysorder });
    const serve = axios.post(`/user/yishiCheckPay?ysorder=${ysorder}`);
    serve.then((data) => {
        console.log("getCheckPayFromMaiTa::", data);
        const { code, msg } = data
        const { order_id } = data?.data || {};
        // 将token存储到localstorge
        if (code == 1 && Number(order_id) > 0) {
            console.log("成功获取到订单号");

        } else {
            Toast.fail(`订单异常！${msg}`);
        }
        window.history.replaceState({}, 0, location.origin + location.pathname + '?no_refresh=1');//强制清除 url 里 oauthCode, 防止刷新页面后判断 旧的oauthCode
    }).catch((err) => {
        console.log("error:getCheckPayFromMaiTa", err);
        //Toast.fail(`网路异常！`);

    });
    return serve;
}

// 在刚进入时，批量处理未完成订单
export function getCheckOrderFromMaiTa() {
    window.sessionStorage.setItem("checkOrder", 1);
    const serve = axios.post(`/user/yishiCheckOrder`);
    serve.then((data) => {
        console.log("getCheckOrderFromMaiTa::", data);
        const { code, msg } = data
        const { order_id } = data?.data || {};
        // 将token存储到localstorge
        if (code == 1) {
            console.log("成功批量获取到订单号");
        } else {
            Toast.fail(`订单异常！${msg}`);
        }
    }).catch((err) => {
        console.log("error:getCheckOrderFromMaiTa", err);
    });
    return serve;
}

//8、通过手机号的授权 code 获取授权手机号
export function getUserPhone(phoneCode) {
    const serve = axios.post(`${yishifuwu_baseURL}/oauth/user/getUserPhone?phoneCode=${phoneCode}`, {}, header)
    serve.then((data) => {
        console.log("getUserPhone::", data);
        const { code, msg, phone, openid } = data;
        if (code == 0 && msg == "SUCCESS") {
            window.localStorage.setItem('yishifuwu_phone', JSON.stringify({// 更新已经保存的医师信息
                ...data,
                time: new Date().getTime()
            }));
        } else {
            Toast.fail(`授权手机号异常！`);
        }
        window.history.replaceState({}, 0, location.origin + location.pathname + '?no_refresh=1');//强制清除 url 里 oauthCode, 防止刷新页面后判断 旧的oauthCode
    }).catch((err) => {
        // 获取手机号失败
        console.log("tokenTimeOut-err::", err);
        Toast.fail(`网路异常！`);
    });;

    return serve;
}


export default {
    init,
    valiateCodeHand,
    getAuthorizeForCode,
    tokenInvalidGrant,
    getAuthorizeForPhone,
    getUserInfoFromMaiTa,
    updateUserInfoFromMaiTa,
    getCheckPayFromMaiTa,
    getCheckOrderFromMaiTa,
    getOrderFromMaiTa,
    getUserPhone,
}