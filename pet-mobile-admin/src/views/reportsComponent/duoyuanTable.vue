<template>
    <!-- 多元智能剖面 -->
    <div class="cont" style="display:block; ">
        <div class="dyznSimple">
            <div class="name" v-if="info.title"><em class="l"></em>{{ info.title }}<em class="r"></em></div>
            <div class="answer mt">
                <dl v-for="item in info.chart">
                    <dt name='11111' :style="{
                        'width': `${getPaddingleft(200, -1)}`,
                    }">{{ item.dim }}</dt>
                    <dd :style="{
                        'width': `${getPaddingleft(380, 1)}`,
                    }">
                        <div :style="{
                            'width': item.len + '%',
                        }"><span :style="{ 'right': item.spanRight }">{{ item.val }}</span></div>
                    </dd>
                </dl>

                <ul class="num" :style="{
                    'margin-left': `${getPaddingleft(226, -1)}`,
                }">
                    <li :class="item.class" v-for="item in kedu">
                        <em name='2222' class="line" :style="{
                            'height': heightLine, 'top': heightLineTop
                        }"></em> {{ item.val }}
                    </li>
                    <em name='3333' class="goodLine" v-if="info.line" :style="{
                        'left': info.linePosition, 'height': heightLine, 'top': heightLineTop
                    }"></em>
                </ul>
                <div class="info">
                    <em class="s01"></em><span :class="[{ oneItem: !info.line }]">你的得分</span><em class="s02"
                        v-if="!!info.line"></em><span v-if="!!info.line" style="padding:0">优秀线</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getPxToRem } from "@/utils";
export default {
    setup() {
        onMounted(() => {

        })
    },
    name: "duoyuanTable",
    props: {
        info: {

        }
    },
    data() {
        return {};
    },
    computed: {
        kedu() {
            const list = [];
            const {
                info
            } = this;
            const val = info.step;
            const stepNum = parseInt((info.max - info.min) / info.step);
            for (var i = 0; i < stepNum + 1; i++) {
                list.push({
                    val: i == stepNum ? info.max : parseInt(val * 10) / 10 * i + info.min,
                    class: i == stepNum ? 'last' : 'li'
                })
            }

            console.log(list)
            return list;
        },
        heightLineTop() {
            const len = this.info.chart.length;
            let val = -(len * (53 + 25));
            return getPxToRem(val);
        },
        heightLine() {
            const len = this.info.chart.length;
            let val = len * (53 + 25);
            return getPxToRem(val);
        }

    },
    mounted() {
        let max = 1;
        const {
            info
        } = this;

        this.info.chart = this.info.chart.map(item => {
            max = max > item.dim.length ? max : item.dim.length;
            const val = parseInt(item.val * 10) / 10 + '';
            let sr = val.length > 3 ? -52 : -40;
            sr = getPxToRem(sr);
            return {
                ...item,
                val,
                spanRight: sr,
                len: parseInt((item.val - info.min) / (info.max - info.min) * 10000) / 100
            }
        })
        console.log(this.info.chart)
        if (max >= 6) {
            this.info.paddingleft = 15;
        } else if (max >= 4) {
            this.info.paddingleft = 40;
        } else {
            this.info.paddingleft = 60;
        }
        this.info.linePosition = ((info.line - info.min) / (info.max - info.min)) * (415 - this.info.paddingleft);
        this.info.linePosition = getPxToRem(this.info.linePosition);
    },
    methods: {
        getPaddingleft(offset, flag = 1) {
            return getPxToRem(offset + flag * this.info.paddingleft);
        }
    }
};
</script>

<style lang="less" scoped>
.mt {
    background-image: none;
    margin-top: 55px
}

.dyznSimple {
    margin-top: 0;
}

.goodLine {
    position: absolute;
    border-left: 2px solid #FFA000;
    z-index: 0;
}

.dyznSimple .name {
    height: 125px;
}

.dyznSimple .answer dl {
    margin-bottom: 25px;
}

.dyznSimple .answer dl dd {
    width: 419px;
}

.dyznSimple .answer dl dd div {
    z-index: 1;
    ;
    position: relative;
    width: 92%;
    height: 26px;
    margin-top: 14px;
    background: #23BCBB;
}

.dyznSimple .answer dl dd div span {
    position: absolute;
    top: 0px;
    right: -40px;
    line-height: 26px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #23BCBB;
}

.dyznSimple .num {
    position: relative;
    display: flex;
    height: 55px !important;
    padding-left: 0;
    font: 20px/48px Arial, Helvetica, sans-serif;
    background: #fff;
}

.dyznSimple .num .li {
    flex: 1;
    position: relative;
    line-height: 50px;
}

.dyznSimple .num .li .line {
    z-index: 0;
    ;
    flex: 1;
    position: absolute;
    border-left: 2px dashed #dddddd;
    height: 500px;
    top: -500px;
    left: 3px;
}

.dyznSimple .num .last .line {
    z-index: 0;
    ;
    flex: 1;
    position: absolute;
    border-left: 2px dashed #dddddd;
    height: 500px;
    top: -500px;
    left: 3px;
}

.dyznSimple .num .last {
    z-index: 0;
    position: relative;
    line-height: 50px;
    width: 59px !important;
}

.dyznSimple .num li:nth-last-child(1) {
    width: 40px;
}

.dyznSimple .info .oneItem {
    padding-right: 0;
}
</style>
