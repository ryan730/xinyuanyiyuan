<template>
<div class="cont" v-if="!!info">
    <!-- 信息加工 -->
    <div class="slmFg">
        <dl>
            <dt class="l">{{ this.info[0].dim}}</dt>
            <dd>
                <div :style="{
                        'width':styleWidth + '%',
                    }"></div>
            </dd>
            <dt class="r">{{ this.info[1].dim}}</dt>
        </dl>
    </div>
</div>
</template>

<script>
export default {
    name: "suoluomenItem",
    props: {
        info: []
    },
    data() {
        return {};
    },
    computed: {
        styleWidth() {
            return this.info[0].val / (this.info[0].val + this.info[1].val) * 100
        }
    },
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.slmFg {
   margin-bottom: 0;
}
</style>
