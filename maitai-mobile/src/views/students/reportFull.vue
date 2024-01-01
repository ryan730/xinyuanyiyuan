<template>
    <div class="bj_white" v-if="tabData.length > 0">
        <div class="menuNav three" v-if="tabData.length !== 1" :class="[{ moreItem: tabData.length > 3 }]">
            <a href="javascript:void(0)" :class="{ active: item.isSelecetdTab }" :key="item.id" v-for="item in tabData"
                @click="switchTab(item.id)">
                <em></em>
                {{ item.name }}
            </a>
        </div>
        <div :class="[{ single: tabData.length == 1 }, 'dyznFull', 'slmFull']">
            <reportBlock :report="currentData" page="full"></reportBlock>
        </div>
        <img src="../../assets/images/home.png" alt="" class="gohome" @click="gohome">
    </div>
</template>
<script>
import { reactive, computed, onMounted, ref, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getReport, getBasicReport, getReportFull } from "@/service/report";
import { useStore } from 'vuex';
import reportBlock from "@/views/reportsComponent/reportBlock.vue";

import { ASTPxToRem } from '@/utils';
export default {
    components: {
        reportBlock
    },
    setup() {

        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        let reportId, utid;
        const state = reactive({
            reportLiteData: [],
            reportFullData: [],
            baseInfoData: [],
            currentData: [],
            levelData: {
                high: '',
                medium: '',
                low: ''
            },
            tabData: [],
            showTab: 1
        });

        // const params = {
        //     id: 0,
        //     num: 0  // 查询个人的缓存数据，定位目前的题目号
        // }

        onMounted(async () => {
            utid = store.state.utid;
            reportId = store.state.reportId;



            const fullData = await getReportFull({
                utid,
                id: reportId,
                detail: 1
            });
            state.reportFullData = fullData.data;
            // ast 转换
            //const resultHtml = await ASTPxToRem(fullData.data.tab);

            fullData.data.tab.map(async (item, ind) => {

                if (ind == 0) {
                    // ast 转换
                    await ASTPxToRem(item.content);
                    state.currentData = item.content;
                }
                state.tabData.push({
                    ...item,
                    id: ind + 1,
                    isSelecetdTab: ind === 0,
                })

            })
            // console.log(state.tabData,fullData.data.tab)

        })

        const switchTab = (id) => {
            state.tabData.forEach(async (item) => {
                item.isSelecetdTab = false;
                if (item.id == id) {
                    item.isSelecetdTab = true;
                    // ast 转换
                    await ASTPxToRem(item.content);
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
            switchTab,
            gohome,
        }
    },

}
</script>

<style lang="less" scoped>
.menuNav {
    display: flex;
    justify-content: center;
    z-index: 10;
}

.three a {
    flex: 1 !important;
}

.single {
    padding-top: 1px !important;
}

.slmFull {
    padding: 108px 28px 60px;
}

.moreItem a {
    font-size: 26px !important;
}

.gohome {
    position: fixed;
    bottom: 100px;
    right: 10px;
    width: 118px;
    height: 118px;
}
</style>