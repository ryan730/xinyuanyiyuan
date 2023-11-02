
import yishifuwu from "@/service/yishifuwu";
import { config } from '@/config';
import { queryString, delay } from '@/utils';
import { Toast, Dialog } from 'vant';
import AppBusFactory from './appBusFactory';
import { getUtid } from "@/service/content";
import store from '../store/index';

export default class yishifuwuBus {
    constructor(p) {
        this.platformInfo = p;
        this.service = yishifuwu;
        yishifuwu.init(this.platformInfo);
    }

    static getEnv(platform) {
        return new Promise((resovle, reject) => {
            const name = '';
            if (cnative) {
                const callAppExit = cnative.callFactory('applyAuthorize', 'applyClientCode', 'Yxcz');// TODO如何测试
                callAppExit({
                    clientId: platform.yishifuwu.clientId,
                }, (openid) => {
                    console.log('cnative-openid::', openid);
                    const name = openid ? 'yishifuwu' : ''
                    resovle({ name })
                })
            } else {
                resovle({ name });
            }

        })
    }

    // 普通获取授权手机
    getUserPhoneProcess(to, next) {
        let otherPlatform = this.platformInfo;
        const oauthCode = queryString('oauthCode');//用户token
        const phoneCode = queryString('phoneCode');//用户手机token
        let yishifuwu_phone = localStorage.getItem("yishifuwu_phone") || "";
        const userPhoneCount = sessionStorage.getItem("userPhoneCount");// 授权次数
        if (!yishifuwu_phone && !oauthCode && (!phoneCode && phoneCode != 0) && String(userPhoneCount) != '1') {// 上次没有登录没有授权成功
            window.sessionStorage.setItem("userPhoneCount", 1);// 弹出
            yishifuwu.getAuthorizeForPhone(otherPlatform.subPageUrl);
        }
    }

    getToken() {
        const selfStorageData = localStorage.getItem("token") || '';
        return selfStorageData ? JSON.parse(selfStorageData) : null;
    }

    // 获取麦塔的用户信息
    async getLoginForMaiTa({ openid, validateCode }) {
        let otherPlatform = this.platformInfo;
        const result = await yishifuwu.getUserInfoFromMaiTa({ openid, validateCode });
        console.log("{ openid, validateCode }:::", JSON.stringify(result));

        const userInfo = this.getToken();
        if (userInfo && userInfo.token) {
            const { token, time, isRegister } = userInfo;
            console.log("{ userInfo }:::", userInfo, isRegister);
            if (isRegister == 1) {// 第一次注册的新用户才判断用户信息
                Toast.success(`未授权的用户!`);
                yishifuwu.getAuthorizeForCode(otherPlatform.loginUrl);// 获取user授权,重要
            } else {
                Toast.success(`已授权的用户!`);
            }
        }
    }

    // 首次获取所有登录数据的流程,获取所有登录数据的流程
    async redirectProcess(to, next) {
        let otherPlatform = this.platformInfo;
        const oauthCode = queryString('oauthCode');//用户token
        const phoneCode = queryString('phoneCode');//用户手机token
        const ysorder = queryString('ysorder');//用户支付完成后
        console.log('redirectProcess===', oauthCode, phoneCode, ysorder);
        if (oauthCode) {//4、获取授权成功通过 oauthCode 基本信息授权的 token
            yishifuwu.updateUserInfoFromMaiTa({ oauthCode });
        } else if (phoneCode && phoneCode != 0) {//7、获取授权手机号授权的 code
            yishifuwu.getUserPhone(phoneCode);
        } else if (ysorder) {// 更新商品并获取订单号
            this.gotoTestProcess(ysorder, to, next);
        }
    }

    // 没有token的情况下
    async noTokenEntryProcess() {
        let otherPlatform = this.platformInfo;
        const openid = queryString('openid');
        const validateCode = queryString('validateCode');
        const no_refresh = queryString('no_refresh');//免刷新
        console.log('noTokenEntryProcess===', decodeURIComponent(otherPlatform.loginUrl), openid, validateCode, no_refresh);

        if (openid && validateCode) {//2、通过 validateCode 校验 openId 的真实性

            await this.getLoginForMaiTa({ openid, validateCode });
   
            if (sessionStorage.getItem("isshare")) {
                sessionStorage.removeItem("isshare");
                window.location.replace(location.origin + '/content');
            }

        } else if (!no_refresh) {
            console.log("{ valiateCodeHand-no_refresh }:::", no_refresh);
            yishifuwu.valiateCodeHand(otherPlatform.loginUrl);// 跳转到医师服务登录
        }
    }


    // 有token的情况下
    async haveTokenEntryProcess(userInfo, to, next) {
        let otherPlatform = this.platformInfo;
        const forceClear = queryString('forceClear');// 强制清除缓存
        //http://127.0.0.1:9090?forceClear=1
        console.log('haveTokenEntryProcess===', forceClear, otherPlatform, userInfo);
        const { time } = userInfo;
        const curTime = new Date().getTime();
        if (curTime - time >= config.OVERTIME || forceClear == 1) {//token 失效时间30天
            console.log('超过有效期！');
            localStorage.removeItem("yishifuwu_token");
            localStorage.removeItem("yishifuwu_user");
            localStorage.removeItem("yishifuwu_phone");
            localStorage.removeItem("token");
            window.sessionStorage.removeItem("userPhoneCount");
            window.sessionStorage.removeItem("otherPlatform");
            alert('缓存过期,需要重新登录!');
            this.noTokenEntryProcess();
        } else {// 在缓存期限内
            this.redirectProcess(to, next);
        }

    }

    // 非微信平台启动逻辑
    async startProcess(to, from, next) {

        if (from.name == 'content' && (to.name == 'index' || to.name == 'user' || to.name == 'recommend')) {
            window.history.replaceState({}, 0, location.origin + location.pathname + '?no_refresh=1');//强制清除 url 里 openid && validateCode / oauthCode, 防止刷新页面后判断
        } else if ((from.name == 'test' || from.name == 'userInfo' || from.name == 'reportLite' || from.name == 'reportFull') && to.name == 'content') {
            window.history.replaceState({}, 0, location.origin + location.pathname);//强制清除 url 里 openid && validateCode / oauthCode, 防止刷新页面后判断
        }
        const userInfo = this.getToken();

        if (userInfo) { // 是否有缓存，也就时非首次
            if (!window.sessionStorage.getItem("checkOrder")) {
                yishifuwu.getCheckOrderFromMaiTa();// 批量处理之前订单
            }
            this.haveTokenEntryProcess(userInfo, to, next);
            if (to.name == 'content') {// 进入子页面的情况
                ///this.getUserPhoneProcess(to, next);//暂时关闭获取电话授权,1057
            }
            sessionStorage.removeItem("isshare");
        } else {// 第一次进入,首先跳转医师服务平台登录
            this.noTokenEntryProcess();
        }
    }

    // 支付流程
    async payProcess({ productId, testId, process }) {
        const payforURL = location.origin + location.pathname + `?testId=${testId}&productId=${productId}&process=${process}`;
        let result = await yishifuwu.getOrderFromMaiTa({ productId, url: encodeURIComponent(payforURL) });
        if (result && result.data) {
            //alert('正在跳转' + result.data);
            Toast.loading({
                message: '正在跳转到支付...',
                forbidClick: true,
                duration: 2000
            });
            localStorage.setItem("payforURL:", JSON.stringify(result));
            window.location.replace(result.data);// 跳转到支付页面
        }

        return result;
        //window.location.replace(`${payforURL}&ysorder=1636915238513319936`);//测试
        //window.location.replace(`${payforURL}&ysorder=1637127819941289984`);//测试
    }

    // 支付成功后跳转到答题页面
    async gotoTestProcess(ysorder, to, next) {
        let testId = queryString('testId');
        let process = queryString('process');
        ysorder = ysorder || queryString('ysorder');
        Toast.loading({
            message: '订单确认中...',
            forbidClick: true,
            overlay: true,
            duration: 0
        });
        await delay(2000);// 刻意延迟一会

        try {
            let order = await yishifuwu.getCheckPayFromMaiTa({ ysorder });
            Toast.clear();
            console.log('gotTestProcess-order===', order);
            const { order_id } = order?.data || {};
            if (order_id) {
                const utidData = await getUtid({
                    testId,
                    orderId: order_id
                });
                window.history.replaceState({}, 0, location.origin + location.pathname + '?no_refresh=1');//强制清除 url,重定向带的参数，已经消费过
                if (to.name != 'userInfo' && utidData?.data?.utid) {
                    store.commit('addUtid', utidData.data.utid);
                    store.commit('addCurTestNum', ++process);
                    //alert('跳回答题页面：' + utidData.data.utid + '/' + process);
                    window.___router___.push('userInfo');
                    //window.location.replace(`${location.origin}/userInfo`);// 跳转到支付页面
                }
            }
        } catch (e) {
            console.log('gotTestProcess-err===', e,);
            Toast.clear();
            if (e?.data?.code && e?.data?.code != 1) {
                window.__closeDialogHandle__(true);// 拉取支付提示框
            }
        }

    }

    async confirmTestProcess(ysorder) {
        let testId = queryString('testId');
        let process = queryString('process');
        ysorder = ysorder || queryString('ysorder');

        let order = await yishifuwu.getCheckPayFromMaiTa({ ysorder });
        console.log('gotTestProcess-order===', order);
        const { order_id } = order?.data || {};
        if (order_id) {
            Toast.success(`支付完成跳转到测试页!`);
            const utidData = await getUtid({
                testId,
                orderId: order_id
            });
            window.history.replaceState({}, 0, location.origin + location.pathname + '?no_refresh=1');//强制清除 url,重定向带的参数，已经消费过
            if (to.name != 'userInfo' && utidData?.data?.utid) {
                store.commit('addUtid', utidData.data.utid);
                store.commit('addCurTestNum', ++process);
                //alert('跳回答题页面：' + utidData.data.utid + '/' + process);
                window.___router___.push('userInfo');
                //window.location.replace(`${location.origin}/userInfo`);// 跳转到支付页面
            }
        }
    }

}