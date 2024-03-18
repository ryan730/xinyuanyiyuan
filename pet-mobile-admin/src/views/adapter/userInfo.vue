<template>
    <div class="answer">
		<div class="tips">
			<p>本调查的每一个问题都有一个可供选择的答案，家长读出问题和这两个答案，请孩子选出最适合自己的答案，并完选择。</p>
			<ul>
				<li class="red">答题时需要注意以下事项</li>
				<li>引导孩子按自己平时所想的和所做的，如实地回答。每一个问题都要回答，但只能选择一个答案，如果认为没有合适的答案，可以选出与自已比较接近的答案。</li>
				<li>不要与其他商量。</li>
			</ul>
		</div>
	</div>
	<div class="reportIntr" style="margin-bottom:70px;">
		<div class="cont">
			<div class="bt"><em></em>被测评者基本信息</div>
			<p>基本信息很重要，测评结果的统计和计算与这些信息有关，请认真填写。</p>

            <div 
                class="selSex" 
                v-for="item in listData"
                :key="item.id"
            >
                <ul class="selSex" v-if="item.type == 3">
                    <li><span>孩子的姓名</span><input class="other" type="text" placeholder="" maxlength="20"/></li>
                </ul>
                <div class="selSex" v-else-if="item.type == 1">
                    <div class="sex">孩子的性别</div>
                    <div class="sel selIcon">
                        <a href="javascript:;" class="active">男</a>
                        <a href="javascript:;">女</a>
                    </div>
                </div>
                <ul class="selSex" v-else-if="item.type == 4">
                    <li><span>孩子出生日期</span><input id="beginDate" class="other" type="text" placeholder=""/></li>
                    <li><span>填写人与孩子的关系</span><a href="javascript:;" class="other" id="problemType">&nbsp;</a></li>
                </ul>
            </div>
		</div>
	</div>
	<a href="javascript:;" class="iconStart">开始答题</a>

    <van-picker
        v-if="isShowPicker"
        title=""
        :columns="columns"
        @confirm="pickerConfirm"
        @cancel="pickerCancel"
    />

     <van-datetime-picker
        v-if="isShowDatetimePicker"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="dateTimeConfirm"
        @cancel="dateTimeCancel"
    />
</template>

<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getBasicTest, addTest } from "@/service/test";
import { Toast } from 'vant';
import { formatDate } from '@/utils';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        let testId, utid;

        const state = reactive({
            listData: [],
            columns: [],
            isShowPicker: false,
            isShowDatetimePicker: false,
            classValue: '',
            bothValue: '',
            genderValue: -1,
            isMale: 0,
            isFeMale: 1,
            curNum: 0
        });
        const pickerMap = new Map();

        onMounted(async () => {
            // if (JSON.stringify(route.params) == "{}") {
            //     location.href = '/';
            // }

            testId = route.params.testId;
            utid = route.params.utid;
            console.log('params:::', testId);

            const { data } = await getBasicTest(testId);

            data.topics.forEach((topic) => {
                if (topic.content != "") {
                    if (topic.type == 5) {
                        topic.content.forEach((cell) => {
                            pickerMap.set(cell.text, cell.value);
                            state.columns.push(cell.text);
                        })
                    }
                }
            });
            
            state.listData = data.topics;
        })

        const goToTest = () => {
            // 必填验证
            if (!state.classValue) {
                Toast(
                    {
                    duration: 0, // 持续展示 toast
                    selector: '#custom-selector',
                    }
                )
                Toast('班级信息不能为空~');
                return false;
            }

            if (state.genderValue == -1) {
                Toast('性别不能为空~');
                return false;
            }

            if (!state.bothValue) {
                Toast('出生日期不能为空~');
                return false;
            }
            router.push({ name: 'test', params:{
                testId,
                utid,
                curNum: 1,
                title: route.params.title
            }});
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

        const submitTest = async (num, value, type) => {
            // 修改样式
            if (type == 1) {
                state.genderValue = value;
                state.listData.forEach((topic) => { 
                    if (topic.type == 1) {
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
            submitTest
        }
    },
}
</script>
<style>
    .van-picker{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .van-picker-column__item, 
    .van-picker__cancel, 
    .van-picker__confirm, 
    .van-picker__title,
    .van-toast{
        /* padding: 20px; */
        font-size: 24px;
    }


</style>


