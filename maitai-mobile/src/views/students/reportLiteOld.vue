<template>
    <div class="bj_white">
        <div class="dyznFull slmJb" style="padding-bottom:20px;padding-top:0px;">
            <div class="dyznSimple slmMap">
                <div class="name"><em class="l"></em>你的{{title}}如下<em class="r"></em></div>
                <!-- 宽度：得分*4 -->
                <div class="zxyyPmt">
                    <dl
                        :key="item.id"
                        v-for="item in reportData">
                        <dt>{{item.dimension}}</dt>
                        <dd :style="{'width': item.scoreStyle}"><span>{{item.score}}</span></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="reportIntr" style="margin-bottom:100px;">
            <div class="cont">
                <p><b>亟待提升的学习策略为：</b></p>
                <div class="zcfg">
                    <div class="lab">
                        <span
                            :key="item.id"
                            v-for="item in solutionData"
                        >
                        {{item.dimension}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <a href="javascript:;" class="iconYellow" @click="goToFull">立即查看完整版报告</a>
    </div>
</template>
<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getReport } from "@/service/report";
import { useStore } from 'vuex';
import { getPxToRem } from "@/utils";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            reportData: [],
            solutionData: [],
            title: ''
        });
        let utid, reportId;
        
        onMounted(async () => {
            let serial = 1;

            reportId = store.state.reportId;
            utid = store.state.utid;
            state.title = store.state.title;

            const { data } = await getReport({
                utid,
                id: reportId,
                detail: 0
            });

            let solution = [];
            data.report.forEach((item) => {
                item.score = parseInt(item.score);
                //hack
                item.score = item.score >= 100 ? 100 : item.score;
                // item.scoreStyle = window.getPx2Rem ? window.getPx2Rem(item.score * 4) : item.score * 4 + 'px';
                item.scoreStyle = getPxToRem(item.score * 4);
                item.id = serial++;
                if (item.score < 50) {
                    solution.push(item);
                }
            });
            state.reportData = data.report;
            state.solutionData = solution;
        })

        const goToFull = () => {
            router.push({ name: 'reportFull', params: {
                // reportId,
                // utid
            }})
        }

        return {
            ...toRefs(state),
            goToFull
        }
    },
}
</script>