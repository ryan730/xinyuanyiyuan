<template>
    <div class="page flex-col">
        <div class="section_1 flex-col">
            <div class="group_2 flex-col">
                <div class="group_3 flex-row justify-between">
                    <img class="image_2" 
                    style="opacity: 0"
                    referrerpolicy="no-referrer" :src="require('../assets/images/qrback.png')"
                        @click="onClickLeft" />
                    <span class="text_2">生成推广二维码</span>
                </div>
                <div class="text-wrapper_1 flex-row">
                    <span class="text_3">生成二维码</span>
                </div>
                <div class="group_4 flex-row">
                    <div class="image-wrapper_1 flex-col">
                        <div id="qrcode"></div>
                    </div>
                </div>
                <div class="group_5 flex-row">
                    <div class="text-wrapper_2 flex-col" @click="handleSave">
                        <span class="text_4">保存二维码为图片</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import { ref, reactive, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

export default {
    setup() {
        onMounted(() => {
            // options 配置项方式使用
            const qrcode = new QRCode("qrcode", {
                // text: "https://juejin.cn/user/1582891999692093",
                text: "http://192.168.3.200:9090/QRcode",
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        })
    },
    methods: {
        handleSave: () => {
            showToast({
                message: "长按二维码图片保存至手机相册",
                wordBreak: 'break-word',
            });
        },
        onClickLeft: () => {
            history.back();
        }
    }
};
</script>
<style lang="less" scoped>
body * {
    box-sizing: border-box;
    //flex-shrink: 0;
}

body {
    font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
        Arial, PingFang SC-Light, Microsoft YaHei;
}

input {
    background-color: transparent;
    border: 0;
}

button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
}

button:active {
    opacity: 0.6;
}

.van-nav-bar__left:active,
.van-nav-bar__right:active {
    opacity: 1;
}

[class*='van-']::after {
    border-bottom: 0;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.flex-row {
    display: flex;
    flex-direction: row;
}

.justify-start {
    display: flex;
    justify-content: flex-start;
}

.justify-center {
    display: flex;
    justify-content: center;
}

.justify-end {
    display: flex;
    justify-content: flex-end;
}

.justify-evenly {
    display: flex;
    justify-content: space-evenly;
}

.justify-around {
    display: flex;
    justify-content: space-around;
}

.justify-between {
    display: flex;
    justify-content: space-between;
}

.align-start {
    display: flex;
    align-items: flex-start;
}

.align-center {
    display: flex;
    align-items: center;
}

.align-end {
    display: flex;
    align-items: flex-end;
}

.page {
    position: relative;
    width: 750px;
    height: 1624px;
    overflow: hidden;

    .section_1 {
        background-color: rgba(255, 255, 255, 1);
        height: 1624px;

        .group_1 {
            background-color: rgba(255, 255, 255, 1);
            padding: 27px 28px 25px 40px;

            .text_1 {
                overflow-wrap: break-word;
                color: rgba(0, 0, 0, 1);
                font-size: 30px;
                letter-spacing: -0.6000000238418579px;
                font-family: SFProText-Semibold;
                font-weight: 600;
                text-align: center;
                white-space: nowrap;
                line-height: 36px;
            }

            .label_1 {
                width: 34px;
                height: 21px;
                margin: 8px 0 7px 440px;
            }

            .label_2 {
                width: 31px;
                height: 22px;
                margin: 8px 0 6px 10px;
            }

            .image_1 {
                width: 50px;
                height: 24px;
                margin: 7px 0 5px 9px;
            }
        }

        .group_2 {
            padding: 26px 134px 26px 48px;

            .group_3 {
                width: 453px;
                margin-right: 115px;

                .image_2 {
                    width: 20px;
                    height: 36px;
                    margin: 7px 0 5px 0;
                }

                .text_2 {
                    overflow-wrap: break-word;
                    color: rgba(34, 34, 34, 1);
                    font-size: 34px;
                    letter-spacing: 1.806249976158142px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 48px;
                }
            }

            .text-wrapper_1 {
                margin: 188px 141px 0 227px;

                .text_3 {
                    overflow-wrap: break-word;
                    color: rgba(34, 34, 34, 1);
                    font-size: 40px;
                    font-family: PingFang-SC-Bold;
                    font-weight: normal;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 56px;
                }
            }

            .group_4 {
                margin: 62px 55px 0 141px;
                justify-content: center;

                .image-wrapper_1 {
                    background-color: rgba(240, 240, 240, 1);
                    border-radius: 14px;
                    padding: 17px 17px 17px 17px;

                    .image_3 {
                        width: 338px;
                        height: 338px;
                    }
                }
            }

            .group_5 {
                margin: 54px 0 0 86px;

                .text-wrapper_2 {
                    background-color: rgba(35, 188, 187, 1);
                    border-radius: 20px;
                    padding: 29px 106px 26px 106px;

                    .text_4 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 32px;
                        letter-spacing: 1.7000000476837158px;
                        font-family: PingFang-SC-Bold;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 45px;
                    }
                }
            }

            .group_6 {
                margin: 595px 121px 0 185px;

                .box_1 {
                    background-color: rgba(59, 59, 59, 1);
                    border-radius: 5px;
                    width: 262px;
                    height: 10px;
                }
            }
        }
    }
}
</style>
  