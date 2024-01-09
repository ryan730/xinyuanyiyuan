<template>
    <div class="page flex-col">
        <div class="block_1 flex-col">
            <div class="block_2 flex-col">
                <div class="section_2 flex-row justify-between">
                    <img class="image_2" 
                    style="opacity: 0"
                    referrerpolicy="no-referrer" :src="require('../assets/images/qrback.png')"
                        @click="onClickLeft" />
                    <span class="text_2">设置</span>
                </div>
            </div>
            <div class="block_3 flex-col">
                <div class="text-wrapper_1 flex-col" @click="handleSet">
                    <span class="text_3">重新绑定微信账户</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
    setup() {
        
    },
    methods: {
        onClickLeft(){
            history.back();
        },
        handleSet() {
            this.$router.push({
                name: 'register',
            })
        },
    },
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

    .block_1 {
        background-color: rgba(245, 247, 247, 1);
        height: 1624px;

        .block_2 {
            background-color: rgba(255, 255, 255, 1);
            padding-bottom: 39px;

            .section_1 {
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

            .section_2 {
                width: 363px;
                margin: 26px 339px 0 48px;

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
        }

        .block_3 {
            padding: 435px 134px 26px 134px;

            .text-wrapper_1 {
                background-color: rgba(35, 188, 187, 1);
                border-radius: 20px;
                padding: 29px 106px 26px 106px;

                .text_3 {
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

            .group_1 {
                background-color: rgba(59, 59, 59, 1);
                border-radius: 5px;
                width: 262px;
                height: 10px;
                margin: 853px 121px 0 99px;
            }
        }
    }
}
</style>
  