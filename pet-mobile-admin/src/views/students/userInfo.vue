<template>
<div class="answer" v-if="extra.topic_desc">
    <div class="tips">
        <p>{{extra.topic_desc}}</p>
        <ul v-if="extra.cautions && extra.cautions.length>0">
            <li class="red">答题时需要注意以下事项</li>

            <li v-for="cell in extra.cautions">{{cell}}</li>
        </ul>
    </div>
</div>
<div class="reportIntr">
    <div class="cont">
        <div class="bt"><em></em>{{!!extra.basic_title ? extra.basic_title: '被测评者基本信息'}}</div>
        <p>{{extra.basic_desc}}</p>
        <div class="selSex" v-for="(item,index) in listData" :key="item.id">
            <div v-if="item.type == 1" class="sex-wrap">
                <div class="sex">{{item.title}}</div>
                <div class="sel selIcon" >
                    <a href="javascript:;" :class="{ active: cell.isSelected ,selIcon0: ind==0}" @click="submitTest(item.number, cell.value, item.type,item.id)" :key="cell.value" v-for="(cell,ind) in item.content">
                        {{cell.text}}
                    </a>
                </div>
            </div>

            <div v-else-if="item.type == 4">
                <li>
                    <span>{{item.title}}</span>
                    <!-- <input id="beginDate" class="other" type="text" placeholder=""/> -->
                    <a href="javascript:;" class="other" id="problemType" @click="showDatePiker(item.number, item.type)">
                        {{bothValue}}
                        &nbsp;
                    </a>
                </li>
            </div>

            <div v-else-if="item.type == 3">
                <li><span>{{item.title}}</span><input class="input" type="text" maxlength="20" v-bind:placeholder="item.content.default" v-model.lazy="item.content.answer" @change="inputValue(item)" /></li>
            </div>

            <div v-else-if="item.type == 5">
                <li>
                    <span>{{item.title}}</span>
                    <a href="javascript:;" class="other" id="problemType" @click="showPicker(item.number, item.type)">
                        {{classValue}}
                        &nbsp;
                    </a>
                </li>
            </div>
        </div>
    </div>
</div>

<a href="javascript:;" class="iconStart" @click="goToTest">开始答题</a>

<van-picker v-if="isShowPicker" title="" :columns="columns" @confirm="pickerConfirm" @cancel="pickerCancel" />

<van-datetime-picker v-if="isShowDatetimePicker" v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="dateTimeConfirm" @cancel="dateTimeCancel" />
</template>

<script>
import {
    reactive,
    onMounted,
    ref,
    toRefs
} from 'vue';
import {
    useRouter,
    useRoute
} from 'vue-router';
import {
    getBasicTest,
    addTest
} from "@/service/test";
import {
    Toast
} from 'vant';
import {
    formatDate
} from '@/utils';
import {
    useStore
} from 'vuex';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        let testId, utid;

        const state = reactive({
            listData: [],
            extra: {},
            columns: [],
            isShowPicker: false,
            isShowDatetimePicker: false,
            isClass: false,
            classValue: '',
            bothValue: '',
            genderValue: -1,
            isMale: 0,
            isFeMale: 1,
            curNum: 0
        });
        const pickerMap = new Map();

        onMounted(async () => {
            testId = store.state.testId;
            utid = store.state.utid;
            console.log('params:::', testId);

            const {
                data
            } = await getBasicTest(testId);

            data.topics.forEach((topic) => {
                if (topic.content != "") {
                    if (topic.type == 1) {
                        // topic.content.forEach((cell) => {
                        //     cell.isSelected = false;
                        //     if (cell.value == 1) {
                        //         cell.isSelected = true;
                        //     }
                        // })
                    } else if (topic.type == 5) {
                        state.isClass = true;
                        topic.content.forEach((cell) => {
                            pickerMap.set(cell.text, cell.value);
                            state.columns.push(cell.text);
                        })
                    }
                }
            });

            state.listData = data.topics;
            state.extra = data.extra;
        })

        const goToTest = () => {
            // 必填验证
            let checkStatus = true;
            state.listData.forEach((topic) => {
                if (!checkStatus) return;
                if (topic.type == 1) {
                    if (state.genderValue == -1) {
                        Toast('性别不能为空~');
                        checkStatus = false;
                        return false;
                    }

                }
                if (topic.type == 5) {
                    if (!state.classValue && state.isClass) {
                        Toast({
                            duration: 0, // 持续展示 toast
                            selector: '#custom-selector',
                        })
                        Toast(topic.title + '信息不能为空~');
                        checkStatus = false;
                        return false;
                    }

                }
                if (topic.type == 3) {
                    if (!topic.content.answer) {
                        Toast(topic.title + '不能为空~');
                        checkStatus = false;
                        return false;
                    }

                }

                if (topic.type == 4) {
                    if (!state.bothValue) {
                        Toast('出生日期不能为空~');
                        checkStatus = false;
                        return false;
                    }

                }
            });
            if (!checkStatus) return false;

            router.push({
                name: 'test',
                params: {
                    testId,
                    utid,
                    curNum: 1,
                    title: route.params.title
                }
            });
        }
        // picker
        const showPicker = (num, type) => {
            state.isShowPicker = true;
            state.curNum = num;
            console.log('click');
        }

        const pickerConfirm = (value, index) => {
            state.isShowPicker = false;
            state.classValue = value;
            submitTest(state.curNum, pickerMap.get(value), 5);
            console.log('pickerValue', pickerMap.get(value));
        };

        const pickerCancel = () => {
            state.isShowPicker = false;
            console.log('取消');
        };
        const inputValue = (item) => {
            submitTest(item.number, item.content.answer, 3)
        }

        // dataTimePicker
        const currentDate = ref(new Date(2021, 0, 17));
        const showDatePiker = (num) => {
            state.curNum = num;
            state.isShowDatetimePicker = true;
        }
        const dateTimeConfirm = (value) => {
            state.bothValue = formatDate(value);
            state.isShowDatetimePicker = false;
            submitTest(state.curNum, state.bothValue, 4)
        }
        const dateTimeCancel = () => {
            state.isShowDatetimePicker = false;
        }

        const submitTest = async (num, value, type, indexid) => {
            // 修改样式
            if (type == 1) {
                state.genderValue = value;
                state.listData.forEach((topic) => {
                    if (topic.type == 1 && indexid == topic.id) {
                        console.log('submitTest', topic);
                        topic.content.forEach((cell) => {
                            cell.isSelected = false;
                            if (cell.value == value) {
                                cell.isSelected = true;
                            }
                        })
                    }
                });
            }

            console.log('submit:::', num, value);
            const res = await addTest({
                utid,
                id: testId,
                num: num,
                answer: value,
                last: 0
            });
        }

        return {
            ...toRefs(state),
            goToTest,
            minDate: new Date(1919, 0, 1),
            maxDate: new Date(),
            currentDate,
            showDatePiker,
            dateTimeConfirm,
            dateTimeCancel,
            pickerConfirm,
            pickerCancel,
            showPicker,
            inputValue,
            submitTest
        }
    },
}
</script>

<style>
.van-picker {
    position: absolute;
    bottom: 0;
    width: 100%;
}
.sex-wrap{
    display:flex;
    justify-content: space-between;
}
.reportIntr .selSex .sel .selIcon0{
    padding-right:20px!important;
    margin-right:20px;
    min-width: 80px!important;
    text-align:left!important;
}
.reportIntr .selSex .sel a{
    padding-right: 20px!important;
    margin-right:10px;
    text-align:left!important;
    min-width: 54px!important;
    white-space: nowrap;
    padding-left: 45px;
}
</style>
