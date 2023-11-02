<template>
<div class="dyznSimple chart-wrap">
    <div class="name">{{info.title}}</div>
    <!-- <div class="name"><em class="l"></em>防御机制综合评估<em class="r"></em></div> -->
    <div class="chart-wrap-col">
        <canvas id="fYKOgmJQeEIyLfyUvuQgqjvZBbFTYewW" class="charts" width="620" height="450" />
    </div>
</div>
</template>

<script>
import uCharts from '@/assets/u-charts.js';
var uChartsInstance = {};
export default {
    name: "uchartcol",
    props: {
        info: {

        }
    },
    data() {
        return {
            cWidth: 550,
            cHeight: 470
        };
    },
    mounted() {
        this.info.chart
        this.getServerData();
    },
    methods: {
        getServerData() {
            const {
                info
            } = this;
            const {
                label,
                chart,
                max,
                min,
                step
            } = info;
            let categories = [];
            let datas = [];

            chart.map(item => {
                categories.push(item.dim)
                datas.push(parseInt(item.val * 10) / 10)
            })

            datas.push(max) //数组最后一个设置 最大刻度max
            // 自定义数据
            let res = {
                categories: categories,
                yAxis: {
                    gridType: 'dash',
                    gridColor: '#DADADA',
                    splitNumber: (max - min) / step, // 总共多少 个横线 (max-min)/step
                    dashLength: 8,
                    // splitNumber:10,
                    min: 10,
                    max: 180,
                    data: [{
                        min: min // 最小刻度 min
                    }]
                },
                padding: !!label ? [25, 15, 0, 20] : [25, 15, 0, 8],
                series: [{
                    name: "drawLegend",
                    chhlabels: !!label ? label : '', // 数字后面显示文本，如 90%
                    data: datas // 数组最后一个设置 最大刻度max
                }, ]
            };
            this.drawCharts('fYKOgmJQeEIyLfyUvuQgqjvZBbFTYewW', res);
        },
        drawCharts(id, data) {
            const ctx = document.getElementById(id).getContext("2d");
            uChartsInstance[id] = new uCharts({
                type: "column",
                context: ctx,
                width: this.cWidth,
                fontSize: 20,
                height: this.cHeight,
                animation: true,
                background: "#FFFFFF",
                color: ["#23BCBB"],
                legend: {},
                xAxis: {
                    disableGrid: true,
                },
                extra: {
                    column: {
                        type: "group",
                        width: 28,
                        activeBgColor: "#000000",
                        activeBgOpacity: 0.08
                    }
                },
                ...data
            });
        }
    }
};
</script>

<style scoped>
.charts {
    height: 500px;

}

.chart-wrap {
    padding: 0 30px 35px 25px;
    border: 2px solid #E0E7E7;
    border-radius: 20px;
    box-sizing: border-box;
    margin-bottom: 25px;
}

.chart-wrap-col {
    display: flex;

}

.dyznSimple .name {
    height: 115px;
    font-size: 30px;
    line-height: 130px;
}
</style>
