<template>
<!-- 高度计算方法：( 得分 - 20 ) * 8 ; 例 50分的高度 (50-20)*6 = 180 -->
<div class="hist-wrap">
    <div class="charts">
        <div class="hist">
            <img src="./img/y.png" alt="" class="y">
            <div class="num" v-for="score in info">
                <div :style="{'height':styleHeight(score.val) + 'px'}">{{score.val}}</div>
            </div>
        </div>
        <div class="dim-wrap">
            <p  v-for="score in info">
                <span class="text">{{score.dim}}</span>
            </p>
        </div>
    </div>
    <div class="info">
        <img src="./img/tips.png" alt="">
    </div>
</div>
</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {};
    },
    computed: {
        styleHeight(){
            return val =>{
                return (val -20 ) * 6
            }
        }
    },
    mounted() {
    }
};
</script>
<style>
    .hist-wrap{
        border: 2px solid #d1d1d1;
    }
    .hist-wrap .charts{
        padding:30px;
    }
    .hist-wrap .info{
        text-align: center;
        border-top: 2px solid #d1d1d1;
        overflow: hidden;
        padding:20px;
    }
    .hist-wrap .info img{
        width: 100%;
    }
    .hist{
        display: flex;
    }
    .hist img.y{
        margin:-6px 10px 0;
        width: 21px;
        height: 432px;
    }
    .hist .num{
        width: 62px;
        height: 420px;
        flex:1;
        background-image: url('./img/bg.png');
        background-size: 100% 100%;
        position: relative;
    }
    .hist .num div{
        height: 272px;
        position: absolute;
        background-color: #FFA000;
        left: 50%;
        width: 28px;
        margin-left: -14px;
        bottom: 0;
        text-align: center;
        font: 18px/24px Arial;
        color: #fff;
    }
    .dim-wrap{
        display: flex;
        margin-left:41px;
    }
    .dim-wrap p{
        flex: 1;
        display: flex;
        justify-content: center;
        
    }
    .dim-wrap .text{
        width: 40px;
        margin-left: -20px;
        writing-mode:vertical-lr;
    }
</style>