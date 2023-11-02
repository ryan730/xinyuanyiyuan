<template>
    <van-dialog :show="showDialog" title="">
        <div class="dialog_header">
            <div @click="$event => closeDialogHandle(false)"><img class="dialog_icon_close" :src="resource.chahao" />
            </div>
        </div>
        <div class="dialog_img"> <img class="dialog_icon" :src="resource.yiwancheng" />
        </div>
        <div class="dialog_txt">
            请确认支付是否完成
        </div>
        <div class="dialog_btn">
            <div class="dialog_b" @click="cofirmDialogHandle">
                <div class="dialog_t">
                    支付完成
                </div>
            </div>
        </div>
    </van-dialog>
    <div class="reportIntr">
        <div class="cont">
            <img :src="contentData.image" style="width:100%" alt="" />
            <dl>
                <dt>
                    <strong>{{ contentData.title }}</strong>
                    <p>{{ contentData.sub_title }}</p>
                    <span class="labA"><em></em>共{{ contentData.topic_num }}题</span>
                    <span class="labB"><em></em>约需{{ contentData.estimate_time }}分钟</span>
                </dt>
                <dd>
                    ¥{{ contentData.price }}<del>¥{{ contentData.price_show }}</del>
                </dd>
            </dl>
        </div>
        <div v-html="contentData.brief">
        </div>
    </div>

    <div class="footer">
        <a href="javascript:;" :class="['testA', !dissableBtn ? '' : 'testB', { 'one': btnData.length == 1 }]"
            :key="item.id" v-for="item in btnData" @click="goToPage(item.text, item.type, item.list)">
            {{ item.text }}
        </a>
    </div>
    <div class="foottips">
        该款项仅供当次测试；可重复购买，购买成功后不予退款
    </div>
    <div class="mask" v-if="isShowMask">
    </div>
    <div class="content-page" v-if="isShowMask">
        <div class="mask-wrap">
            <a href="javascript:void(0)" class="btn" @click="hiddenMask"></a>
            <h5 class="title">{{ maskData.title }}</h5>
            <p class="sub_title">该测试共有{{ maskData.count }}个{{ maskData.typeText }}，请点击查看</p>
            <ul class="content">
                <li class="list" :key="item.utid" v-for="item in maskData.list">
                    <div class="time">
                        <p>完成时间：</p>
                        {{ item.updated_at }}
                    </div>
                    <button class="res-btn" @click="goToPageMask(item.utid, item.report_id, item.process)">{{ maskData.text
                    }}</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { getContent, userOrder, getUtid } from "@/service/content";
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { debounce, getPxToRem } from "@/utils";

import resource from "@/resource";

import AppBusFactory from "@/appBus/appBusFactory";

export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        const router = useRouter();
        let testId, utid, productId, orderId; /// 支付id,目前Moon账户使用7

        const state = reactive({
            contentData: [],
            btnData: [],
            isShowMask: false,
            maskData: {},
            dissableBtn: false,
            showDialog: false,
        })

        onMounted(async () => {
            // if (JSON.stringify(route.params) == "{}") {
            //     location.replace('/');
            // }
            // const { id, pid } = route.params;
            testId = store.state.testId;
            productId = store.state.productId;

            const { data } = await getContent(testId);
            handleBtns(data);
            state.contentData = data;
            store.commit('addTitle', data.title)
        });

        // type 1 需要支付，跳userInfo; type 2 已支付，process = 0跳userInfo; type 3 process > 0, 跳test; type 4,跳报告
        const handleBtns = (data) => {
            if (data.done == null && data.not_done == null) {
                state.btnData.push({
                    text: `¥${data.price} 立即测试`,
                    type: 1
                })
            } else if (data.done != null && data.not_done != null) {
                state.btnData.push({
                    text: `继续答题`,
                    type: 2,
                    list: data.not_done
                }, {
                    text: `查看报告`,
                    type: 3,
                    list: data.done
                })
            } else if (data.done != null && data.not_done == null) {
                state.btnData.push({
                    text: `¥${data.price} 立即测试`,
                    type: 1,
                }, {
                    text: `查看报告`,
                    type: 3,
                    list: data.done
                })
            } else if (data.done == null && data.not_done != null) {
                state.btnData.push({
                    text: `¥${data.price} 立即测试`,
                    type: 1
                }, {
                    text: `继续答题`,
                    type: 2,
                    list: data.not_done
                })
            }

            let id = 1;
            state.btnData.forEach((value) => {
                value.id = id++;
            });
        }
        const closeDialogHandle = (flag) => {
            state.showDialog = flag;
        }
        window.__closeDialogHandle__ = closeDialogHandle;

        // 二次确认支付
        const cofirmDialogHandle = () => {
            state.showDialog = false;
            let subPlatform = AppBusFactory.getInstance();
            if (subPlatform) {
                subPlatform.gotoTestProcess();
            }
        }

        const hiddenMask = () => {
            state.isShowMask = false;
        }

        const showMask = (list, text, count, typeText) => {
            state.isShowMask = true;
            state.maskData = {
                title: state.contentData.title,
                text,
                count,
                list,
                typeText
            };
        }

        const goToReport = (utid, reportId) => {
            store.commit('addUtid', utid);
            store.commit('addReportId', reportId);
            router.push({
                name: 'reportLite',
                // params: {
                //     utid,
                //     reportId,
                //     title: state.contentData.title
                // }
            })
        }

        const goToUserInfo = (utid, process) => {
            store.commit('addCurTestNum', ++process);
            router.push({
                name: 'userInfo',
                // params: {
                //     utid,
                //     testId,
                //     curNum: ++process,
                //     title: state.contentData.title
                // }
            });
        }

        const goToTest = (utid, process) => {
            console.log('goToTest', state.btnData, utid, process);
            store.commit('addUtid', utid);
            if (process == 0) {
                goToUserInfo(utid, process);
            } else {
                store.commit('addCurTestNum', ++process);
                router.push({
                    name: 'test',
                    // params: {
                    //     utid,
                    //     testId,
                    //     curNum: ++process,
                    //     title: state.contentData.title
                    // }
                });
            }
        }

        const onBridgeReady = async (productId, testId, process) => {
            const { data } = await userOrder(productId);
            orderId = data.order_id;

            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', data.js_params,
                async (res) => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        const utidData = await getUtid({
                            testId,
                            orderId
                        })
                        utid = utidData.data.utid;
                        store.commit('addUtid', utidData.data.utid);
                        goToUserInfo(utid, process);
                    }
                });
        }

        const callPay = (productId, testId, process) => {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady(productId, testId, process);
            }
        }

        const goToPage = debounce(async (text, type, list) => {

            let count = 0;
            if (list) {
                count = list.length;
            }

            switch (type) {
                case 1:
                    let subPlatform = AppBusFactory.getInstance();
                    console.log('subPlatform===>', text, type, list, subPlatform, productId);
                    if (subPlatform?.platformInfo?.name == 'yishifuwu') {
                        state.dissableBtn = true;
                        try {
                            await subPlatform.payProcess({ productId, testId, process: 0 })
                        } catch (e) {
                            state.dissableBtn = false;
                        }
                    } else {
                        callPay(productId, testId, 0);
                    }
                    break;
                case 2:
                    if (count == 1) {
                        goToTest(list[0].utid, list[0].process)
                    } else {
                        showMask(list, text, count, '未完成的测试');
                    }
                    break;
                case 3:
                    if (count == 1) {
                        goToReport(list[0].utid, list[0].report_id)
                    } else {
                        showMask(list, text, count, '结果报告');
                    }
                    break;
            }
        }, 500);

        const goToPageMask = (utid, reportId, process) => {
            if (reportId == 0) {
                goToTest(utid, process);
            } else {
                goToReport(utid, reportId);
            }
        }

        return {
            ...toRefs(state),
            hiddenMask,
            goToPage,
            goToPageMask,
            resource,
            closeDialogHandle,
            cofirmDialogHandle,
            mb: getPxToRem(54)
        }
    }
}
</script>
<style lang="less">
.van-toast {
    width: 25vw;
}

.van-dialog {
    .dialog_txt {
        height: 35px;
        text-align: center;
        font-weight: bold;
        padding: 20px 0;
        color: black;
    }

    .dialog_header {
        display: flex;
        justify-content: right;

        .dialog_icon_close {
            width: 26px;
            width: 26px;
            padding: 25px 25px 12px 25px;
        }
    }

    .dialog_img {
        display: flex;
        justify-content: center;

        .dialog_icon {
            width: 76px;
            width: 76px;
        }
    }

    .dialog_btn {
        display: flex;
        justify-content: center;
        justify-items: center;
        padding-bottom: 50px;

        .dialog_t {
            height: 35px;
            text-align: center;
            color: white;
        }

        .dialog_b {
            width: 240px;
            height: 80px;
            border-radius: 20px;
            background-color: #23BCBB;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .van-dialog__footer {
        display: none;
    }
}


.content-page {
    // display: flex;
    // justify-content: center; /* 水平居中 */
    // align-items: center;
    position: relative;

    .mask-wrap {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 650px;
        // height: 503px;
        background: #FFFFFF;
        border-radius: 20px;
        z-index: 11;

        .btn {
            position: absolute;
            background: url('../assets/images/btn.png') no-repeat;
            background-size: contain;
            width: 26px;
            height: 26px;
            top: 40px;
            right: 40px;
        }

        .title {
            height: 45px;
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 45px;
            width: 100%;
            margin-top: 82px;
            text-align: center;
        }

        .sub_title {
            width: 100%;
            height: 37px;
            font-size: 26px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: #84888E;
            line-height: 37px;
            text-align: center;
            margin-top: 9px;
        }

        .content {
            margin: 45px 38px;

            .list {
                width: 100%;
                height: 104px;
                background: #F5F5F5;
                border-radius: 16px;
                position: relative;
                margin-top: 20px;

                .res-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 28px;
                    width: 156px;
                    // height: 58px;
                    line-height: 58px;
                    background: #23BCBB;
                    border-radius: 10px;
                    font-weight: 500;
                    color: #FFFFFF;
                    font-size: 24px;
                    border: none;
                }

                .time {
                    font-size: 24px;
                    font-family: PingFang-SC-Medium, PingFang-SC;
                    font-weight: 500;
                    color: #222222;
                    line-height: 32px;
                    padding: 20px 0px 0px 20px;
                }
            }
        }
    }


}

.footer .testA:last-child {
    background-color: #23BCBB !important;
}

.footer .testB:last-child {
    background-color: gray !important;
    pointer-events: none;
}

.footer {
    bottom: 66px;
    width: 100%;
}

.foottips {
    position: fixed;
    bottom: 0;
    height: 50px;
    padding-bottom: 20px;
    background-color: #fff;
    font-size: 22px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #BDBDBD;
    line-height: 30px;
    z-index: 1;
    width: 100%;
    text-align: center;
}

.reportIntr {
    center {
        padding: 0 40px;

        img {
            width: 100% !important;
            margin-bottom: v-bind(mb) !important;
        }

    }
}
</style>