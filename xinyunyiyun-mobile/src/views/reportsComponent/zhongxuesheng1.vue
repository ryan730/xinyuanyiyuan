<template>
<div class="cont">
    <div class="zxyyFl">
        <p v-if="!!info.dim">{{info.dim}}</p>
        <div class="fl">
            <div class="load" :style="{width: info.score+'%'}"><span>{{info.score}}</span></div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: "zhongxuesheng1",
    props: {
        info: {
            type: String,
            default: {
                dim: "听课",
                val: 81.25
            }
        }
    },
    data() {
        return {};
    },
    computed: {

    },
    mounted() {
        this.info.score = parseInt(this.info.val);
        //hack
        this.info.score = this.info.score >= 100 ? 100 : this.info.score;
    }
};
</script>

<style lang="less" scoped>
.zcfg {
    padding: 0 !important;
}
.zxyyFl{
    padding-bottom: 20px;
}
</style>
