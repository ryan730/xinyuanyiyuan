<template>
<div class="chart-wrap">
    <canvas id="cCxTCsPBGKFNHvkdLrmSldxhfZPCxUjt" class="charts" width="800" height="600" />
    <div class="btn_img"></div>

</div>
</template>

<script>
import uCharts from '@/assets/u-charts.js';
var uChartsInstance = {};
export default {
    name: "uchartRadar",
    props: {
        info: {}
    },
    data() {
        return {
            cWidth: 800,
            cHeight: 600
        };
    },
    mounted() {
        this.getServerData();
    },
    methods: {
        getServerData() {
            //模拟从服务器获取数据时的延时
            setTimeout(() => {
                const {
                    count,
                    avg,
                    categories,
                    chart
                } = this.info;
                const avglist = [];
                for (var i = 0; i < chart.length; i++) {
                    avglist.push(avg)
                }
                //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
                let res = {
                    categories: categories,
                    series: [{
                            name: "平均值",
                            data: avglist
                        },
                        {
                            name: "成交量2",
                            data: chart
                        }
                    ]
                };
                this.drawCharts('cCxTCsPBGKFNHvkdLrmSldxhfZPCxUjt', res);
            }, 100);
        },
        drawCharts(id, data) {
            const ctx = document.getElementById('cCxTCsPBGKFNHvkdLrmSldxhfZPCxUjt').getContext("2d");
            const {
                count,
                max,
                categories,
                chart
            } = this.info;
            uChartsInstance[id] = new uCharts({
                type: "radar",
                fontSize: 24,
                fontColor: '#000000',
                context: ctx,
                width: this.cWidth,
                height: this.cHeight,
                categories: data.categories,
                series: data.series,
                animation: true,
                background: "#FFFFFF",
                color: ["#23BCBB", "#FFA000", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
                padding: [5, 5, 5, 5, 5, 5],
                dataLabel: false, // 显示数据
                animation: false,
                legend: {
                    show: false,
                    position: "bottom",
                    lineHeight: 25
                },
                extra: {
                    radar: {
                        gridType: "radar",
                        gridColor: "#DEDEDE",
                        gridCount: count, // 蜘蛛网圈数

                        opacity: 0.4,
                        borderWidth: 2,
                        max: max, // 蜘蛛网刻度最大值
                        // opacity: 0,
                        axisLabel: true,
                        axisLabels: [0, 0, 1, 2, 3, 4, 5],
                        labelPointShow: false,
                        border: true,
                    }
                }
            });
        },
        tap(e) {
            uChartsInstance[e.target.id].touchLegend(e);
            uChartsInstance[e.target.id].showToolTip(e);
        }
    }
};
</script>

<style lang="less" scoped>
.charts {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 510px;
}

.chart-wrap {
    // margin: 50px 0 30px;
}
</style>
