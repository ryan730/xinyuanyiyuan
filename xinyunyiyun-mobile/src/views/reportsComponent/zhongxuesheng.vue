<template>
    <div class="borB dyznSimple slmMap">

        <!-- <div class="name"><em class="l"></em>你的报告如下<em class="r"></em></div> -->
        <!-- 宽度：得分*4 -->
        <!-- 宽度：得分*4 -->
        <div class="zxyyPmt">
            <dl :key="item.id" v-for="item in info">
                <dt>{{ item.dim }}</dt>
                <dd :style="{ 'width': item.scoreStyle }"><span>{{ item.score }}</span></dd>
            </dl>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
import { getPxToRem } from "@/utils";
export default {
    name: "zhongxuesheng",
    props: {
        info: {
            type: Array,
            default: [{}]
        }
    },
    data() {
        return {

        };
    },
    computed: {

    },
    mounted() {
        let serial = 1;
        this.info.forEach((item) => {
            item.score = parseInt(item.val);
            //hack
            item.score = item.score >= 100 ? 100 : item.score;
            //item.scoreStyle = window.getPx2Rem ? window.getPx2Rem(item.score * 4) : item.score * 4 + 'px';
            item.scoreStyle = getPxToRem(item.score * 4);
            item.id = serial++;
        });

    }
};
</script>

<style lang="less" scoped>
.slmMap .name {
    margin-top: -50px;
}

.slmMap {
    margin-right: 0;
    margin-left: 0;
    width: 100%;
}
</style>
