<template>
<div class="column">
    <div class="xx56">
        <!-- 高度计算方法：( 得分 - 20 ) * 8 ; 例 50分的高度 (50-20)*6 = 180 -->
        <div class="num">
            <svg version="1.1" style="width: 610px; height: 423px" width="610" height="423">
                <line x1="0" y1="423" x2="28" y2="382" style="stroke: #FFA000;stroke-width:3" />
            </svg>
            <div class="a" style="height:42px">28</div>
            <div class="b" style="height:180px">50</div>
            <div class="c" style="height:240px">60</div>
            <div class="d" style="height:90px">35</div>
            <div class="e" style="height:330px">75</div>
            <div class="f" style="height:420px">90</div>
            <div class="g" style="height:330px">75</div>
            <div class="h" style="height:420px">90</div>
            <div class="i" style="height:330px">75</div>
            <div class="j" style="height:420px">90</div>
        </div>
    </div>
    <div class="info">
        <img src="images/column_info.png" alt="" />
    </div>
</div>
</template>

<script>
export default {
    name: "xuexiTable",
    props: {},
    data() {
        return {};
    },
    computed: {

    },
    mounted() {

    }
};
</script>
