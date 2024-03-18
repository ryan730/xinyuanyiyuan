<template>
    <div class="scorebg">
        <p>{{info.value}}</p>
        {{info.text}}
    </div>

</template>
<script>
export default {
    name: "scorebg",
    props: {
        info:{
            type:Object,
            default:{
                "value":40,
                "text":"社会支持总分为200分"
            }
        }
    },
    data() {
        return {};
    },
    computed: {
    },
    mounted() {
    }
};
</script>
<style scoped>
.scorebg{
    padding:15px;
    background: #F0FBFB;
    border-radius: 16px;
    font-size: 26px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #23BCBB;
    line-height: 48px;
    text-align: center;
}
p{
    font-size: 60px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #23BCBB;
    line-height: 84px;
    letter-spacing: 1px;
}
</style>