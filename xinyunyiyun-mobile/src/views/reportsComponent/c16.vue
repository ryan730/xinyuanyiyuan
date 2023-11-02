<template>
    <div class="title">{{info.title}}</div>
    <div class="c16">
        <div class="bg">
            <div v-for="(i,index) in info.max" class="block">
                <span>{{index}}</span>
            </div>
            <span class="maxnum">{{info.max}}</span>
        </div>
        <div class="score"  :style="{'width':styleWidth + 'px',}">
            <span>{{info.score}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
           
        }
    },
    data() {
        return {};
    },
    computed: {
        styleWidth(){
            return this.info.score * 62
        }
    },
    mounted() {
        this.info.score = parseInt(this.info.score*10)/10
    }
};
</script>
<style lang="less" scoped>
.c16{
    position: relative;
    margin:26px;
    height: 92px
}
.title{
    text-align:center;
    font-size: 26px;
    font-weight: bold;
    color: #222222;
    line-height: 37px;
    margin:55px 0 15px 0;
}
.bg{
    position: absolute;
    top: 1px;
    .block{
        position: relative;
        box-sizing: border-box;
        display: inline-block;
        width: 62px;
        height: 61px;
        background: rgba(35,188,187,0.1);
        border-top:1px solid #23BCBB;
        border-bottom:1px solid #23BCBB;
        border-right:1px dashed #23BCBB;
        span{
            line-height: 28px;
            position: absolute;
            left:0;
            top:60px;
            font-size: 20px;
            font-family: PingFang-SC-Medium, PingFang-SC;
        }
    }
    .maxnum{
        position: absolute;
        right:-12px;
        top:60px;
        font-size: 20px;
        line-height: 28px;
    }
}
.bg .block:first-child{
    border-left:1px solid #23BCBB;
}
.bg .block:last-child{
    border-right:1px solid #23BCBB;
}
.score{
    position: absolute;
    top:0;
    color:#fff;
    text-align: right;
    height: 26px;
    line-height: 26px;
    background-image:linear-gradient(to right,rgba(255, 160, 0, 0.2900),rgba(255, 160, 0, 1)) ;
    span{
        margin-right:6px;
    }
}
</style>