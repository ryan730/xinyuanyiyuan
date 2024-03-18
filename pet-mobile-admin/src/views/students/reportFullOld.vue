<template>
    <div class="bj_white">
        <div class="menuNav three">
            <a 
                href="javascript:void(0)" 
                :class = "{ active: item.isSelecetdTab }"
                :key="item.id"
                v-for="item in tabData"
                 @click="switchTab(item.id)"
            >
            <em></em>
            {{item.name}}
            </a>
        </div>
        <div class="dyznFull slmFull">
            <!-- 总体评估 -->
            <div class="cont m24" style="display:block;" v-if="showTab == 1">
                <div class="gray borA qzlx" >
                    {{reportLiteData.conclusion}}
                </div>
                
                <div class="borB">
                    <!-- 宽度：得分*4 -->
                    <div class="zxyyPmt">
                        <dl
                            :key="item.id"
                            v-for="item in reportLiteData.report">
                            <dt>{{item.dimension}}</dt>
                            <dd :style="{'width': item.scoreStyle}"><span>{{item.score}}</span></dd>
                        </dl>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="bt">你的学习策略分布如下：</div>
                <div class="zxyyTab">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <th>水平</th>
                        <th>项目</th>
                    </tr>
                    <tr >
                        <td>高</td>
                        <td class="l">{{levelData.high}}</td>
                    </tr>
                    <tr>
                        <td>中</td>
                        <td class="l">{{levelData.medium}}</td>
                    </tr>
                    <tr>
                        <td>低</td>
                        <td class="l">{{levelData.low}}</td>
                    </tr>
                </table>
                </div>

                <div class="bt">报告可信度</div>
                <div class=" qzlx">
                    <p>在本次测试中，被试的回答比较诚实。</p>
                </div>
            </div>
            
            <!-- 分项解读 -->
            <div class="cont" v-if="showTab == 2">
                <div
                    :key="item.id"
                    v-for="item in reportFullData.report"
                >
                    <div class="zxyyFl">
                        <p>{{item.dimension}}</p>
                        <div class="fl"><div class="load" :style="{width: item.score+'%'}"><span>{{item.score}}</span></div></div>
                    </div>
                    <div class="qzlx">
                        {{item.desc}}
                    </div>
                </div>
            </div>
            
            <!-- 基本信息 -->
            <div class="cont" v-if="showTab == 3">
                <dl class="jbxx">
                    <dt>基本信息</dt>
                    <dd
                        :key="item.id"
                        v-for="item in baseInfoData"
                    >
                    {{item.title}}：{{item.value}}
                    </dd>
                    <!-- <dd>性别：女</dd>
                    <dd>回答问卷日期：2019-01-29</dd> -->
                </dl>
                <div class="gray borA">
                <div class="bt" style="text-align:center;">阅读说明</div>
                <p>感谢您的参与,阅读本报告时,请注意以下事项：</p>
                <ul class="jbxxInfo">
                    <li>阅读时可以先查看图表快速掌握报告内容然后有针对性地阅读对应文字；</li> 
                    <li>如报告与你自己或他人的感知有出入，可回忆测试时，是否有事情影响了你的判断；</li>
                    <li>本报告不可作为临床诊断的依据，也不赞成把报告结果作为你生活和工作中重大决策的唯一依据；</li>
                    <li>如对报告内容有不理解的地方，建议向有专业资质的人员进行咨询；</li>
                    <li>本报告为专业测评结果，建议你在分享时务必谨慎。</li>
                </ul>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getReport, getBasicReport } from "@/service/report";
import { useStore } from 'vuex';
import { getPxToRem } from "@/utils";

export default {
    setup() {
        const tabData = [{
            id: 1,
            isSelecetdTab: true,
            name: '总体评估'
        },
        {
            id: 2,
            isSelecetdTab: false,
            name: '分项解读'
        }, {
            id: 3,
            isSelecetdTab: false,
            name: '基本信息'
        }];

        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        let reportId, utid;
        const state = reactive({
            reportLiteData: [],
            reportFullData: [],
            baseInfoData: [],
            levelData: {
                high: '',
                medium: '',
                low: ''
            },
            tabData,
            showTab: 1
        });

        // const params = {
        //     id: 0,
        //     num: 0  // 查询个人的缓存数据，定位目前的题目号
        // }
        
        onMounted(async () => {
            utid = store.state.utid;
            reportId = store.state.reportId;
            
            const liteData = await getReport({
                utid,
                id: reportId,
                detail: 0
            });
            state.reportLiteData = liteData.data;

            const fullData = await getReport({
                utid,
                id: reportId,
                detail: 1
            });
            state.reportFullData = fullData.data;

            const baseInfoData = await getBasicReport(utid);
            handleBasicInfo(baseInfoData.data)

            let serial = 1;

            state.reportLiteData.report.forEach((item) => {
                item.score = parseInt(item.score);
                //hack
                item.score = item.score >= 100 ? 100 : item.score;
                //item.scoreStyle = window.getPx2Rem ? window.getPx2Rem(item.score * 4) : item.score * 4 + 'px';
                item.scoreStyle = getPxToRem(item.score * 4);
                item.id = serial++;
            });

            state.reportFullData.report.forEach((item) => {
                item.score = parseInt(item.score);
                if (item.score <= 50) {
                    state.levelData.low += item.dimension + ' ';
                } else if (item.score >= 75) {
                    state.levelData.high += item.dimension + ' ';
                } else {
                    state.levelData.medium += item.dimension + ' ';
                }
                item.id = serial++;
            });
        })

        const handleBasicInfo = (data) => {
            data.topics.forEach((item) => {
                if (item.type == 5 || item.type == 1) {
                    let answerText;
                    const con = JSON.parse(item.content);
                    con.forEach((v) => {
                        if (item.answer == v.value) {
                            answerText = v.text;
                        }
                    })
                    state.baseInfoData.push({
                        id: item.id,
                        title: item.title,
                        value: answerText
                    })
                } else {
                    state.baseInfoData.push({
                        id: item.id,
                        title: item.title,
                        value: item.answer
                    })
                }
            })
        }

        const switchTab = (id) => {
            tabData.forEach((item) => {
                item.isSelecetdTab = false;
                if (item.id == id) {
                    item.isSelecetdTab = true;
                }
            });
            state.showTab = id;
        }

        return {
            ...toRefs(state),
            switchTab
        }
    },
}
</script>