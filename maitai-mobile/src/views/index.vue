<template>
    <van-nav-bar title="入职测评" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="index index2">
        <div class="introduction">
            <van-row class="title_1" justify="start" align="center">
                <van-col span="1">
                    <div class="start-line"></div>
                </van-col>
                <van-col span="23">
                    <span>测评须知</span>
                </van-col>

            </van-row>
            <van-row class="title_2" justify="start">
                <span>简易应对方式问卷是国内研究者在国外应对方式量表基础上，根据实际应用的需要，结合我国人群的特点编制而成。人群测试表明简易应对问卷反映出人群不同应对方式特征及其与心理健康之间的关系。</span>
            </van-row>
        </div>
        <van-divider style="margin:0" />
        <div ref="listContainerRef" class="list-container">
            <div class="nav">
                <span class="text">共{{ listData?.length || '' }}个测试</span>
            </div>
            <div ref="listContentRef" :class="['list-content', showMenuHolder ? 'smClass' : '']">
                <dl class="list-cell" :key="item.utid" v-for="item in listData" @click="goToContent(item)">
                    <dt><img :src="item.image" alt=""></dt>
                    <dd>
                        <strong class="title">{{ item.title }}</strong>
                        <p class="sub-title">{{ item.sub_title }}</p>
                        <div class="aside">
                            <span class="lab" style="background: #fff">{{ '职场' || item.type_text }}</span>
                            <p class="price-btn">{{ item.finished == 1 ? '完成' : '未完成' }}</p>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="submit">
            <van-button type="primary" block native-type="submit" :loading="loading" color="#FFA000" @click="showPopup">
                提 交
            </van-button>
        </div>
        <van-popup class="tip" v-model:show="popShow" duration="0" forbidClick="true" closeable>
            <div class="box_tip flex-col">
                <van-icon class="image_tip" name="records-o" />
                <span class="text_1_tip">{{ tipText }}</span>
                <div class="text-wrapper_tip flex-col" @click="onGoback">
                    <span class="text_2_tip">回到测评列表</span>
                </div>
            </div>
        </van-popup>

    </div>
</template>

<script>
import { reactive, onMounted, onBeforeUpdate, ref, toRefs } from 'vue';
import { getIndexList } from "@/service/index";
import { getContent } from "@/service/content";
// import { getType } from "@/service/user";
import { useRouter } from 'vue-router';
import { type } from "@/config/type";
import { useStore } from 'vuex';
import { showToast } from 'vant';

export default {
    setup() {
        const onClickLeft = () => history.back();
        const store = useStore();
        const router = useRouter();
        const listContainerRef = ref(null);
        const listContentRef = ref(null);

        let curType = 1;// ryan,题库类型
        const state = reactive({
            listData: [],
            typeData: [],
            btnData: [],
            contentData: [],
            tipText: '',
        })

        const popShow = ref(false);
        const showPopup = () => {
            const result = state.listData.filter((item) => {
                return item.finished == 0;
            })
            console.log('----showPopup--finished', state.listData, result)
            if (result.length > 0) {
                state.tipText = '您还有问答完的测评，无法提交，请返回继续答题';
                popShow.value = true;
            } else {
                router.push({
                    name: 'done'
                });
            }

        };

        const onGoback = () => {
            popShow.value = false;
        }

        onMounted(async () => {
            window.state = store.state;
            const listData = await getIndexList(curType);
            state.listData = listData.data;

            console.log("~~~~~~~index~~~~~~~~", state.listData)

            let titleH = document.querySelector('.van-nav-bar__content').offsetHeight;
            let introductionH = document.querySelector('.introduction').offsetHeight;
            let navH = document.querySelector('.nav').offsetHeight;
            let bottomH = document.querySelector('.submit').offsetHeight;

            if (listContentRef.value) {
                listContentRef.value.style.height = (window.innerHeight - titleH - introductionH - navH - bottomH) + 'px';
            }

            const result = state.listData.filter((item) => {
                return item.finished == 1;
            })

            console.log('result:::::=======================', result)
            if (result.length > 2) {
                router.push({
                    name: 'done'
                })
            }

            ///console.log('listContainerRef:::::', window.innerHeight, titleH, introductionH, navH, (window.innerHeight - titleH - introductionH - navH - bottomH));
        })

        const goToTest = ({ id, process = 1 }) => {
            console.log('goToTest', state.btnData, id, process);
            ////store.commit('addUtid', id);
            if (process == 0) {
                /// goToUserInfo({ id, process });
                console.log('用户资料页');
                store.commit('addCurTestNum', ++process);
                router.push({
                    name: 'test'
                });
            } else {
                store.commit('addCurTestNum', ++process);
                router.push({
                    name: 'test'
                });
            }
        }

        const goToContent = async ({ id, title, rtimes, process, finished }) => {
            if (finished == 1) {
                showToast({
                    message: "评测已完成 \n请勿再次评测",
                    wordBreak: 'break-word',
                });
                return;
            }
            store.commit('addTestId', id);
            store.commit('addTitle', title);
            store.commit('addTimes', rtimes > 0 ? rtimes : 0);
            goToTest({ id, process })
        }

        const goToUserInfo = ({ id, process }) => {
            store.commit('addCurTestNum', ++process);
            router.push({
                name: 'userInfo',
            });
        }


        return {
            ...toRefs(state),
            onClickLeft,
            // switchTag,
            goToContent,
            showMenuHolder: store.state.showMenuHolder,
            listContainerRef,
            listContentRef,
            showPopup,
            onGoback,
            popShow,
            //hh
        }
    },
    mutations: {
        updatedata(state, p) {
            console.log(' beforeUpdate :view或mode1数据更新之前', store.state.showMenuHolder);
        }
    }
}
</script>
<style lang="less">
.van-toast {
    width: 25vw;
}
</style>

<!-- <style scoped>
.index2 {
    height: v-bind(hh.xxHeight + 'px') !important;
}
</style> -->

<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;

    .introduction {
        padding: 30px;
        background-color: white;
    }

    .start-line {
        width: 6px;
        height: 30px;
        background: #23BCBB;
        border-radius: 4px;
    }

    .title_1 {
        // width: 136px;
        // height: 48px;
        font-size: 34px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #000000;
        line-height: 48px;
    }

    .title_2 {
        // width: 682px;
        // height: 240px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 52px;
    }

    .menu-list {
        width: 150px;
        position: fixed;
        top: 0;
        bottom: 0;
        background: #F4F6F9;

        .menu {
            width: 100%;
            height: 96px;
            line-height: 96px;
            text-align: center;
            font-size: 28px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #888888;
        }

        .active {
            color: #222222;
            background: #fff;
            position: relative;
        }

        .active::after {
            content: '';
            position: absolute;
            left: 0;
            width: 8px;
            height: 40px;
            background: #23BCBB;
            border-radius: 6px;
            top: 23px;
        }
    }

    .list-container {
        // flex-grow: 1;
        background: #fff; // padding-left: 150px;
        // position: fixed;
        // left: 0px;
        // top: 0;
        // bottom: 0;
        // right: 0;
        // overflow: scroll;
        display: contents;

        .smClass {
            margin-bottom: 150px
        }

        .nav {
            background: #fff;
            // position: absolute;
            // right: 0;
            // left: 0px;
            height: 96px;
            line-height: 96px;
            border-bottom: 1px #F4F6F9 solid;
            display: flex;
            justify-content: space-between;
            padding: 0 46px 0 26px;
            // top: 50px;
            // margin-top: 50px;

            .text {
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #84888E;
            }

            .type-list {
                display: flex;
                align-items: center;

                .type-btn {
                    width: 80px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 26px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #222222;
                }

                .active {
                    background: #E4FAFA;
                    border-radius: 6px;
                    color: #23BCBB;
                }
            }
        }

        .list-content {
            overflow-y: auto;

            .list-cell {
                height: 200px;
                background: #ffffff;
                padding: 20px;
                // margin-top: 18px;
                display: flex;

                dt {
                    img {
                        width: 164px;
                        height: 164px;
                        border-radius: 12px;
                    }
                }

                dd {
                    margin-left: 15px;
                    flex-grow: 1;

                    .title {
                        height: 45px;
                        font-size: 32px;
                        font-weight: bold;
                        color: #000000;
                        line-height: 45px;
                    }

                    p {
                        min-height: 50px;
                        font-size: 26px; // font-weight: 500;
                        color: #84888E;
                        line-height: 37px;
                    }

                    .aside {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        margin-top: 8px;

                        .lab {
                            // width: 72px;
                            min-width: 42px;
                            padding: 0 14px;
                            height: 32px;
                            border-radius: 17px;
                            border: 1px solid #23BCBB;
                            font-size: 20px;
                            font-weight: 500;
                            color: #23BCBB;
                            display: inline-block;
                            line-height: 32px;
                            text-align: center;
                        }

                        .price-btn {
                            width: 162px;
                            height: 53px;
                            line-height: 53px;
                            text-align: center;
                            border-radius: 10px;
                            border: 2px solid #23BCBB;
                            background-color: #23BCBB;
                            font-size: 28px;
                            font-weight: 500;
                            color: #fff;

                            del {
                                font-size: 20px;
                                padding-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }

    .submit {
        position: fixed;
        bottom: 0;
        //background-color: #23BCBB;
        height: 150px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .van-button {
            width: 600px;
        }
    }

    .tip {
        border-radius: 16px;
        width: 670px;
        padding: 60px 0;

        .box_tip {
            display: flex;
            background-color: rgba(255, 255, 255, 1);
            width: 100%;
            align-self: center;
            justify-content: center;
            flex-direction: column;
            // margin-top: 45px;
            // padding: 80px;
        }

        .image_tip {
            color: #b7b7b7;
            align-self: center;
            font-size: 80px;
            margin-bottom: 20px;
        }

        .text_1_tip {
            overflow-wrap: break-word;
            color: rgba(34, 34, 34, 1);
            font-size: 30px;
            letter-spacing: 0.7px;
            font-family: PingFang-SC-Bold;
            text-align: center;
            // white-space: nowrap;
            padding: 0 50px;
        }

        .text-wrapper_tip {
            background-color: rgba(35, 188, 187, 1);
            border-radius: 10px;
            align-self: center;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            padding: 20px;
        }

        .text_2_tip {
            overflow-wrap: break-word;
            color: rgba(255, 255, 255, 1);
            font-size: 28px;
            letter-spacing: 0.5px;
            font-family: PingFang-SC-Medium;
            text-align: left;
            white-space: nowrap;
            //line-height: 40px;
        }

    }
}
</style>



