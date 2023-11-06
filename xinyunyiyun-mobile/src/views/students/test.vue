<template>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- <van-nav-bar :title="title" /> -->
    <div class="text-wrapper flex-col">
        <!-- <span class="text_timer">倒计时：30分钟</span> -->
        <span class="text_timer">倒计时:</span><van-count-down class="text_timer" :time="time" @finish="onFinish"
            @change="onChange" />
    </div>
    <div class="bj_violet">
        <div class="slmTitle " v-if="sectionList.length > 1 && testData.num <= testData.total">
            <span @click="changeSection(ind)" v-for="(   item, ind   ) in    sectionList   "
                :class="[{ active: ind == showObj.section - 1 }]">{{ sectionListlabels[ind] }}</span>
        </div>
        <div class="answer">
            <div class="tips">
                <p v-if="!extra">下面是一些关于{{ title }}情况的描述，请你根据自己的实际情况选择适合的选项。答案没有好坏之分，请诚实回答。</p>
                <p v-if="extra">{{ extra.topic_desc }}</p>
                <ul v-if="extra && extra.cautions">
                    <li class="red">答题时需要注意以下事项</li>
                    <li v-for="   cell    in    extra.cautions   ">{{ cell }}</li>
                </ul>
                <div class="info" v-if="testData.num <= testData.total">点击选择，1秒后自动进入下一题。</div>
            </div>

            <div class="dyznAnswer">

                <div class="over" v-if="testData.num > testData.total">
                    <div class="txtA">恭喜您完成测试</div>
                    <!-- <a href="javascript:;" @click="goToLite">查看我的测评结果</a>
                    <p>您今后可以在【我的测评】中找到您测试过的报告</p> -->
                    <a href="javascript:;" @click="onClickLeft">回到评测列表</a>
                </div>

                <div v-else>
                    <div class="num">{{ showObj.showNum }}<span>/</span>{{ showObj.total }}</div>
                    <div :key="item.id" v-for="   item    in    testData.topics   ">

                        <div class="subject" v-if="item.type == 12">
                            <!--左右选择，学习适应性-->
                            <p class="h1">{{ item.title }}</p>
                            <div class="iconTwo">
                                <a :key="cell.value" v-for="   cell    in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }]" @click="selectFun(cell.value)">
                                    {{ cell.text }}
                                </a>
                            </div>
                        </div>
                        <div class="subject" v-if="item.type == 11">

                            <!--中学生,多元智能-->
                            <p class="h1">{{ item.title }}</p>
                            <div class="icon">
                                <a :key="cell.value" v-for="   cell    in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + fourstyleHeng(item.type, cell.value)]"
                                    @click="selectFun(cell.value)">
                                    <em></em>
                                    {{ cell.text }}
                                </a>
                            </div>
                        </div>
                        <div :class="['image-wrap', { 'tree-wrap': item.content.length == 3 }, { 'two-wrap': item.content.length !== 3 }]"
                            v-if="item.type == 21 || item.type == 22">
                            <!--图片题-->
                            <div class="icon">
                                <a :key="cell.value" v-for="   cell    in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }]" @click="selectFun(cell.value)">
                                    <em></em>
                                    <span :style="{
                                        'background': 'url(' + cell.text + ') no-repeat',
                                    }
                                        "></span>
                                </a>
                            </div>
                        </div>
                        <div class="subjectSlm" v-if="item.type == 17">
                            <!--横长多选梯子 7 霍兰德-->
                            <p class="h1">{{ item.title }}</p>
                            <div class="slmNum">
                                <a :key="cell.value" v-for="(   cell, ind   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'slm' + mapAB[ind]]" @click="selectFun(cell.value)">
                                    <em></em>
                                    {{ cell.text }}
                                </a>

                            </div>
                        </div>
                        <div class="subjectA" v-if="item.type == 16">
                            <!--竖多 单选btn 7-->
                            <!--霍兰德-->
                            <div class="txt">
                                <p>{{ item.title }}</p>
                            </div>
                            <div class="iconSlm">
                                <a :key="cell.value" v-for="(   cell, index   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + mapAB[index + modifyIndex]]"
                                    @click="selectFun(cell.value)">
                                    {{ cell.text }}
                                </a>

                            </div>
                        </div>

                        <div class="subjectA" v-if="item.type == 15">
                            <!--竖多选梯子 7-->
                            <!--儿童气质-->
                            <div class="txt">
                                <p>{{ item.title }}</p>
                            </div>
                            <div class="icon">
                                <a :key="cell.value" v-for="(   cell, index   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + mapAB[index + modifyIndex]]"
                                    @click="selectFun(cell.value)">
                                    <em></em>
                                    {{ cell.text }}
                                </a>

                            </div>
                        </div>

                        <div class="subject suoluomen" v-if="item.type == 13">
                            <!--竖单选，常规 7-->
                            <!--所罗门 7-->
                            <p class="h1">{{ item.title }}</p>
                            <div class="iconSlm">
                                <a :key="cell.value" v-for="   cell    in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }]" @click="selectFun(cell.value)">
                                    <span>{{ cell.text }}</span>
                                </a>
                            </div>
                        </div>
                        <div class="subject" v-if="item.type == 14">
                            <!-- 横着 4个，多元智能6-9岁 -->
                            <p class="h1">{{ item.title }}</p>
                            <div class="icon icon_1">
                                <a :key="cell.value" v-for="(   cell, index   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + mapAB[index]]"
                                    @click="selectFun(cell.value)">
                                    <em></em>{{ cell.text }}
                                </a>

                            </div>
                        </div>

                        <div class="subject subjectxljk typePosition" v-if="item.type == 18">
                            <!--横着 5个，心理健康症状自评量表 -->
                            <p class="h1">{{ item.title }}</p>
                            <div class="icon icon_1">
                                <a :key="cell.value" v-for="(   cell, index   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + mapAB[index]]"
                                    @click="selectFun(cell.value)">
                                    <em></em>{{ cell.text }}
                                </a>

                            </div>
                        </div>
                        <div class="subject subjectxljk subjectxljk19" v-if="item.type == 19">
                            <!--横着 5个，心理健康症状自评量表 -->
                            <p class="h1">{{ item.title }}</p>
                            <div class="icon icon_1">
                                <a :key="cell.value" v-for="(   cell, index   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + mapAB[index]]"
                                    @click="selectFun(cell.value)">
                                    <em></em>{{ cell.text }}
                                </a>

                            </div>
                        </div>

                        <div class="subject subjectxljk20" v-if="item.type == 20">
                            <!--横着 5个，圆圈圈 -->
                            <p class="h1">{{ item.title }}</p>
                            <div class="icon icon_1">
                                <a :key="cell.value" v-for="(   cell, index   ) in    item.content   " href="javascript:;"
                                    :class="[{ active: cell.checked }, 'sel' + mapAB[index]]"
                                    @click="selectFun(cell.value)">
                                    <em></em>{{ cell.text }}
                                </a>

                            </div>
                        </div>

                        <div class="subject" v-if="item.type == 151">
                            <!--霍兰德 输入框 -->
                            <p class="h2" style="text-align:center;">请写上三个你最喜欢的职业</p>
                            <div class="slmZy">
                                <input name="" type="text" placeholder="你最喜欢的职业">
                                <input name="" type="text" placeholder="你最喜欢的职业">
                                <input name="" type="text" placeholder="你最喜欢的职业">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="iconA" v-if="testData.num <= testData.total">
                    <a href="javascript:;" class="L" @click="goToLastTest" v-if="testData.num != 1">上一题</a>
                    <a href="javascript:;" class="R" @click="goToNextTest" v-if="isClickLastFlag">下一题</a>
                </div>
                <!-- <a href="javascript:;" class="iconQuit">保存并退出</a> -->
            </div>

        </div>
    </div>
    <van-popup class="tip" v-model:show="show" duration="0" forbidClick="true" @click-overlay="onClickOverlay"
        close-on-click-overlay="false">
        <div class="box_tip flex-col">
            <van-icon class="image_tip" name="warning" />
            <span class="text_1_tip">{{ tipText }}</span>
            <!-- <div class="text-wrapper_tip flex-col" @click="onGoBackIndex">
                <span class="text_2_tip">回到测评列表</span> -->
            <div class="text-wrapper_tip flex-col" @click="onContinueHandle">
                <span class="text_2_tip">继续答题</span>
            </div>
        </div>
    </van-popup>
</template>

<script>
import {
    reactive,
    onMounted,
    ref,
    toRefs,
    watch
} from 'vue';
import {
    getTest,
    addTest
} from "@/service/test";
import {
    useRouter,
    useRoute
} from 'vue-router';
import {
    useStore
} from 'vuex';
import {
    datatest
} from './test.js';
import { showToast } from 'vant';

export default {

    computed: {

    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const time = ref(store.state.times * 1000);
        //const time = ref(3 * 1000);
        const onClickLeft = () => {
            router.push({ name: 'index' });
            //history.back() 
        };
        const show = ref(false);
        const showPopup = (bol = true) => {
            show.value = bol;
        };
        const onClickOverlay = (e) => {
            e.preventDefault();
            e.stopPropagation();
        }
        const onGoBackIndex = (e) => {
            router.push({ name: 'index' });
        }

        const onFinish = (n, o) => {
            ///showPopup();
            showPopup();
        }

        const onContinueHandle = () => {
            showPopup(false);
        }

        const onChange = (n) => {
            //console.log('timer--->', n);
            // store.commit('addTestCount', {
            //     hour: n.hours,
            //     minute: n.minutes,
            //     second: n.seconds,
            // });
            const { minutes, seconds } = n;
            store.commit('addTimes', minutes * 60 + seconds);
        }

        let curNum, testId, utid, totalNum;

        const state = reactive({
            testData: [],
            extra: {},
            curValue: '',
            firstSectin: null,
            lastNum: null,
            processNum: 0,
            sectionList: [],
            sectionListlabels: ['第一部分', '第二部分', '第三部分', '第四部分', '第五部分', '第六部分'],
            modifyIndex: 0,
            showObj: {
                section: 1
            },
            isClickLastFlag: false,
            title: '',
            mapAB: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            mapBA: ['G', 'F', 'E', 'D', 'C', 'B', 'A'],
            // tipText: '答题超时，强制结束!',
            tipText: '答题超时!',
        })

        const getQuestion = async (params) => {
            const {
                data
            } = await getTest({
                utid: params.utid,
                id: params.id,
                num: params.num
            });
            totalNum = data.total;
            data.num = curNum;
            // 设置当前curValue
            state.curValue = '';
            let curValue = '';
            data.topics.forEach((topic) => {
                if (typeof topic.content == 'string') {
                    topic.content = JSON.parse(topic.content);
                }
                topic.content.forEach((cell) => {
                    if (cell.checked == 1) {
                        state.curValue = cell.value;
                        curValue = cell.value + '';
                    }
                })
                if (topic.type == 15) {
                    state.modifyIndex = 7 - topic.content.length;
                }
            });
            state.sectionList = data.sections || [];
            if (curValue == '') {
                state.isClickLastFlag = false;
            }

            return data;
        }

        onMounted(async () => {
            utid = store.state.utid;
            testId = store.state.testId;
            curNum = store.state.curTestNum;
            state.title = store.state.title;

            const data = await getQuestion({
                utid,
                id: testId,
                num: curNum
            });

            console.log('testData:::', data);
            state.testData = data;
            state.extra = data.extra;
            culSection(data.num, data.total)

            let titleH = document.querySelector('.van-nav-bar__content').offsetHeight;
            document.querySelector('.bj_violet').style.height = window.innerHeight - titleH + 'px';
        });

        let timeout;
        const selectFun = (value) => {
            state.curValue = value;
            // 更改选项样式
            state.testData.topics.forEach((topic, key) => {
                topic.content.forEach((cell) => {
                    cell.checked = 0;
                    if (state.curValue == cell.value) {
                        cell.checked = 1;
                    }
                })
            });

            // 获取下一个题
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                // 提交结果
                submitTest(state.curValue);
                goToNextTest();
            }, 1000);

            console.log('选项value:', state.curValue);
        }

        const goToLastTest = async () => {
            state.isClickLastFlag = true;
            if (curNum == 1) {
                return false;
            }
            const data = await getQuestion({
                utid,
                id: testId,
                num: --curNum
            });
            state.testData = data;
            state.extra = data.extra;
            culSection(data.num, data.total)
        }

        const goToNextTest = async () => {

            if (totalNum < curNum || state.curValue === '') {
                state.isClickLastFlag = false;
                return false;
            }

            const data = await getQuestion({
                utid,
                id: testId,
                num: ++curNum
            });
            state.testData = data;
            state.extra = data.extra;
            culSection(data.num, data.total)
        }

        const submitTest = async (curValue) => {
            const res = await addTest({
                utid,
                id: testId,
                num: curNum,
                answer: curValue,
                last: curNum == state.testData.total ? 1 : 0
            })
        }

        const goToLite = () => {
            router.push({
                name: 'reportLite',
                params: {
                    testId,
                    utid,
                    title: state.title
                }
            })
        }
        const fourstyleHeng = (typeNa, num) => {
            let list;
            if (typeNa == 11) {
                list = {
                    num1: 1,
                    num2: 2,
                    num3: 3,
                    num4: 4
                }

            } else if (typeNa == 2) {
                list = {
                    num0: "A",
                    num2: "B",
                    num4: "C",
                    num6: "D",
                }
            }
            return list['num' + num]
        }
        const culSection = (num, totalNum) => {
            let section = 0
            let firtin = true;
            let showNum = num;
            let total;
            if (num >= totalNum) {
                // 倒计时结束
                //showPopup();
                // store.commit('addTestCount', {
                //     hour: 0,
                //     minute: 0,
                //     second: 0
                // });
                // router.push({ name: 'done' });
            }

            if (+num > state.processNum) {
                state.processNum = num;
                store.commit('addCurTestNum', num);
            }

            const {
                sectionList
            } = state;
            if (sectionList.length <= 1 || !sectionList) {
                state.showObj = {
                    showNum: num,
                    total: totalNum,
                }
                return {
                    showNum: num,
                    total: totalNum,
                }
            }
            sectionList.reduce((last, cur, indx) => {
                if (num <= last + cur && firtin) {
                    section = indx;
                    showNum = num - last;
                    firtin = false;
                    total = cur;
                }
                return last + cur;
            }, 0);
            state.showObj = {
                showNum,
                section: section + 1,
                total
            }
            return state.showObj;
        }
        const judgeJump = (indSection) => {
            let isJump = false;
            state.sectionList.reduce((last, cur, indx) => {
                // 跳转到第几部分判断
                if (indx == indSection) {
                    // 如果 小于答题的进度才跳转，
                    if (last < state.processNum) {
                        isJump = true;

                        // 跳到 答题 的最后一题
                        if (state.processNum - last < cur) {
                            isJump = false;
                            curNum = state.processNum - 1;
                            goToNextTest();
                            // culSection(state.processNum);
                        }
                    }
                }
                return last + cur;
            }, 0);
            return isJump;
        }
        const changeSection = (ind) => {
            if (!judgeJump(ind) || ind == state.showObj.section - 1) return;

            // 跳转到 跳转部分的第一题；
            state.sectionList.reduce((last, cur, indx) => {
                if (ind == indx) {
                    curNum = last + 2;
                    goToLastTest();
                }
                return last + cur;
            }, 0);
        }

        // 测试点击
        // setInterval(() => {
        //     document.querySelector('.iconTwo a').click();
        // }, 2000)

        return {
            ...toRefs(state),
            selectFun,
            goToLite,
            changeSection,
            goToLastTest,
            fourstyleHeng,
            goToNextTest,
            onClickLeft,
            time,
            show,
            onClickOverlay,
            onGoBackIndex,
            onContinueHandle,
            onFinish,
            onChange,
        }
    }
}
</script>

<style lang="less" scoped>
html,
body,
#app {
    height: 100% !important;
}

.dyznAnswer {
    padding: 50px 0;
}

.bj_violet {
    overflow-y: auto;
}

.dyznAnswer .suoluomen .iconSlm a {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90px;
    height: auto;

    span {
        padding: 15px 0;
    }
}

.dyznAnswer .subjectA .icon {
    float: left;
    width: 280px;
    padding-top: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: hidden;
}

.dyznAnswer .subjectA .iconSlm a {
    padding: 3px 10px;
    width: 230px;
    text-align: center;
    margin: 2px auto;
    border-radius: 3px;
}

.dyznAnswer .subjectA .iconSlm {
    padding-left: 0;
    padding-top: 30px;

}

.dyznAnswer .subjectA .iconSlm a.active {
    color: #fff;
}

.slmTitle .disable {
    color: #ddd;
}

.slmTitle {
    display: flex;
}

.slmTitle span {
    flex: 1;
}

.dyznAnswer .subject em {
    background-size: cover;
}

.dyznAnswer .subjectA em {
    background-size: cover;
}

.dyznAnswer .subject .icon {
    display: flex;
}

.dyznAnswer .subject .icon_1 {
    margin: 58px auto 43px;
}

.text-wrapper {
    display: flex;
    background-color: rgba(239, 98, 98, 1);
    margin-right: 1px;
    padding: 8px 277px 8px 280px;
}

.text_timer {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 26px;
    letter-spacing: 0.5;
    font-family: PingFang-SC-Medium;
    font-weight: bold;
    text-align: left;
    white-space: nowrap;
    line-height: 42px;
    text-align: center;
}

.van-overlay {
    pointer-events: none;
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
        color: #ffb400;
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
        // width: 326px;
        // padding: 21px 77px 21px 77px;
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
        // font-weight: NaN;
        text-align: left;
        white-space: nowrap;
        //     line-height: 40px;
    }

}
</style>
