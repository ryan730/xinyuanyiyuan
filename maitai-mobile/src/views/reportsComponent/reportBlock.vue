<template>
            <!-- <uc :info="testData.data"></uc> -->
           <!-- <uchartRadar /> -->
        <div v-for="item in report">
            <duoyuanTable :info="item.data" v-if="item.type == 'c9'"  :style="{'padding-top': page == 'full' ? '45px':'0'}"/>

        
            <tableOne :info="item.data" v-if="item.type == 't10'"></tableOne>
            <info :info="item.data" v-if="item.type == 't3'"></info>
            <histogram :info="item.data" v-if="item.type == 'c1'"></histogram>
            <contentTitleOne :info="item.data"  :subtitle="item.subtitle" v-if="item.type == 't1'"></contentTitleOne>
            <contentTitleFive :info="item.data" v-if="item.type == 't5'"></contentTitleFive>
            <score  :info="item.data" v-if="item.type == 'c2'"></score>
            <p class="html-wrap" v-if="item.type == 't2'" v-html="item.data"></p>
            <zhongxuesheng :info="item.data"  v-if="item.type == 'c3'" />
            <zhongxuesheng1 :info="item.data"  v-if="item.type == 'c4'"/>
            <labels :info="item.data"  v-if="item.type == 't6'" />
            
            
            <uchartRadarItem :info="item.data" v-if="item.type == 'c8'" />
            <uchartRadar :info="item.data" v-if="item.type == 'c7'" :style="{'margin-top': page == 'full' ? '10x':'-20px'}"/>

            <suoluomenTable :info="item.data" v-if="item.type == 'c5'" />
            <suoluomenItem  :info="item.data" v-if="item.type == 'c6'" />

            <scorebg :info="item.data" v-if="item.type == 'c12'"/>
            <c11 :info="item.data" v-if="item.type == 'c11'"/>

            <c15 :info="item.data" v-if="item.type == 'c15'"/>
            <c16 :info="item.data" v-if="item.type == 'c16'"/>

        </div>
        
</template>
<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { getIndexList } from "@/service/index";
import { getType } from "@/service/user";
import { useRouter } from 'vue-router';
import { type } from "@/config/type";
import { useStore } from 'vuex';
import tableOne from "@/views/reportsComponent/table1.vue"
import info from "@/views/reportsComponent/info1.vue"
import histogram from "@/views/reportsComponent/histogram1.vue"
import contentTitleOne from "@/views/reportsComponent/title1.vue"
import contentTitleFive from "@/views/reportsComponent/title5.vue"
import zhongxuesheng from "@/views/reportsComponent/zhongxuesheng.vue"
import score from "@/views/reportsComponent/score.vue"
import labels from "@/views/reportsComponent/labels.vue"
import zhongxuesheng1 from "@/views/reportsComponent/zhongxuesheng1.vue"
import radarOne from "@/views/reportsComponent/Radar1.vue"//9维雷达图
import radarTwo from "@/views/reportsComponent/Radar2.vue"//8维雷达图
import radarThr from "@/views/reportsComponent/Radar3.vue"//4维雷达图
import animals from "@/views/reportsComponent/animals.vue"//职场个性自评西游记
import infoTwo from "@/views/reportsComponent/info2.vue"//职场个性
import box from "@/views/reportsComponent/box.vue"//气泡图
import uchartRadar from "@/views/reportsComponent/uchartRadar.vue"//9维雷达图
import suoluomenTable from "@/views/reportsComponent/suoluomenTable.vue"
import suoluomenItem from "@/views/reportsComponent/suoluomenItem.vue"
import duoyuanTable from "@/views/reportsComponent/duoyuanTable.vue"
import uchartRadarItem from "@/views/reportsComponent/uchartRadarItem.vue"
import scorebg from "@/views/reportsComponent/scorebg.vue"//带底色分数
import c11 from "@/views/reportsComponent/c11.vue"//带底色分数

import uc from "@/views/reportsComponent/uchartcol.vue"
import c16 from "@/views/reportsComponent/c16.vue"
import c15 from "@/views/reportsComponent/c15.vue"
export default {
    name:'testreport',
    components: {
        tableOne,
        info,
        zhongxuesheng1,
        uchartRadarItem,
        animals,
        suoluomenTable,
        suoluomenItem,
        duoyuanTable,
        histogram,
        c11,
        c15,
        c16,
        contentTitleOne,
        zhongxuesheng,
        contentTitleFive,
        uchartRadar,
        labels,
        score,
        uc,
        radarOne,
        radarTwo,
        radarThr,
        scorebg
    },
    props: {
        report:{
            type:Array,
            default:[]
        },
        page:{
            type: String
        }
    },
    data() {
        return {}
    },
    computed: {
        testData() {
            return {
                type: {},
                data: {
                    "title": "防御机制综合评估",
                    "min": 0,
                    "max": 100,
                    "label": "%",
                    "step": 10,
                    "line": 75,
                    "chart": [{
                            "dim": "不成熟防御机制",
                            "val": 99
                        },
                        {
                            "dim": "成熟防御机制",
                            "val":48
                        },
                        {
                            "dim": "中间型防御机制",
                            "val": 56
                        }
                    ]
                }
            }
        }
    },
    mounted() {
    }
};


</script>
<style lang="less" scoped>
</style>
