<template>
    <div class="cont" v-if="info.chart && !!info.chart[0].dt">
        <div class="slmPmt">
            <!-- 高度计算方法：得分 * 30 ; 例 4分的高度 4*30 = 120 -->

            <div class="t-title">
                <div style="text-align: center">{{ info.title }}</div>
            </div>
            <div class="num">

                <div name='111a' v-for="item in listdata" :class="item.classNa" :style="{
                    'height': item.valWidth,
                }"><span>{{ item.val }}</span></div>

            </div>
            <div class="labels-wrap">
                <div class="labels" v-for="item in info.chart">
                    <div class="item"><span>{{ item.dt[0].dim }}</span><span>{{ item.dt[1].dim }}</span></div>
                    <div class="title">{{ item.tp }}</div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { getPxToRem } from "@/utils";
export default {
    name: "suoluomenTable",
    props: {
        info: {

        }
    },
    data() {
        return {};
    },
    computed: {
        listdata() {
            const list = [];
            const classMap = ['a', 'b', 'c', 'd']
            this.info.chart.map((itemB, index) => {
                itemB.dt && itemB.dt.map(item => {
                    list.push({
                        ...item,
                        //valWidth: window.getPx2Rem ? window.getPx2Rem(item.val * 30) : item.val * 30 + 'px',
                        valWidth: getPxToRem(item.val * 30),
                        classNa: classMap[index]
                    })
                })

            })
            return list;
        }
    },
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.slmPmt {
    background: url(./img/suoluomen.png) no-repeat;
    position: relative;
    border: none;
    background-size: 100%;
}

.labels-wrap {
    position: absolute;
    left: 70px;
    right: 28px;
    height: 83px;
    bottom: 0;
    display: flex;

    .labels {
        // flex: 1;
        width: 25%;
    }

    .item {
        display: flex;
        font-size: 18px;
        color: #63676E;
        line-height: 42px;
        justify-content: space-around;
    }

    .title {
        font-size: 20px;
        text-align: center;
        line-height: 28px;
        color: #000;
    }
}

.t-title {
    position: absolute;
    width: 100%;
    top: 48px;

    div {
        font-size: 30px;
        font-weight: bold;
        color: #000000;
        line-height: 42px;
    }
}
</style>
