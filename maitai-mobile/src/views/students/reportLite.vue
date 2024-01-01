<template>
    <div class="bj_white ">
        <div class="bj_white" v-if="tabData.length > 0">
            <div class="menuNav three" v-if="tabData.length !== 1" :class="[{ moreItem: tabData.length > 3 }]">
                <a href="javascript:void(0)" :class="{ active: item.isSelecetdTab }" :key="item.id" v-for="item in tabData"
                    @click="switchTab(item.id)">
                    <em></em>
                    {{ item.name }}
                </a>
            </div>
            <div :class="[{ single: tabData.length == 1 }, 'dyznFull', 'slmFullm']">
                <reportBlock :report="currentData" page="full"></reportBlock>
            </div>
        </div>
        <div class="dyznFull slmFull" :style="[{ 'margin-bottom': !!detailShow ? '100px' : '0' }]" v-else>
            <reportBlock :report="content"></reportBlock>
        </div>
        <a href="javascript:;" class="iconYellow" @click="goToFull" v-if="!!detailShow">立即查看完整版报告</a>
        <img src="../../assets/images/home.png" alt="" class="gohome" @click="gohome" v-else>
    </div>
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
    getReportFull
} from "@/service/report";
import {
    useStore
} from 'vuex';
import reportBlock from "@/views/reportsComponent/reportBlock.vue"

import { ASTPxToRem } from '@/utils';

export default {
    components: {
        reportBlock
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            reportData: [],
            solutionData: [],
            content: [],
            tabData: [],
            currentData: [],
            detailShow: '',
            title: ''
        });
        let utid, reportId;

        onMounted(async () => {
            let serial = 1;

            reportId = store.state.reportId;
            utid = store.state.utid;
            state.detail = store.state.detail;

            const {
                data
            } = await getReportFull({
                utid,
                id: reportId,
                detail: 0
            });
            state.content = data.content ? data.content : [];
            state.detailShow = data.detail;
            const tab = [];

            // ast 转换
            const resultHtml = await ASTPxToRem(state.content);

            data.tab && data.tab.map((item, ind) => {

                if (ind == 0) {
                    state.currentData = item.content;
                }
                tab.push({
                    ...item,
                    id: ind + 1,
                    isSelecetdTab: ind === 0,
                })

            })
            state.tabData = tab ? tab : [];

        })

        const goToFull = () => {
            router.push({
                name: 'reportFull',
                params: {
                    // reportId,
                    // utid
                }
            })
        }

        const switchTab = (id) => {
            console.log('点击tab', id)
            state.tabData.forEach((item) => {
                item.isSelecetdTab = false;
                if (item.id == id) {
                    item.isSelecetdTab = true;
                    state.currentData = item.content;
                    // console.log(item.content)
                }
            });
            state.showTab = id;
        }

        const gohome = () => {
            router.push({ name: 'index' });
        }

        return {
            ...toRefs(state),
            goToFull,
            switchTab,
            gohome,
        }
    },
}
</script>

<style lang="less" scoped>
.slmFull {
    padding-top: 25px !important;
    padding-left: 32px !important;
    padding-right: 32px !important;
}

.slmFull {
    margin-bottom: 100px;
}

.menuNav {
    display: flex;
    justify-content: center;
    z-index: 10;
}

.three a {
    flex: 1 !important;
}

.slmFullm {
    padding: 108px 28px 60px;
}

.gohome {
    position: fixed;
    bottom: 100px;
    right: 10px;
    width: 118px;
    height: 118px;
}
</style>
