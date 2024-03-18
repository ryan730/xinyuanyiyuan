<template>
    <div class="reportIntr">
        <div class="cont">
            <div class="zcfg" v-if="!!info.length">
                <div class="lab">
                    <span :key="item.id" v-for="item in info">
                    {{item}}
                </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "labels",
    props: {
        info: {
            type: String,
            default: ['']
        }
    },
    data() {
        return {};
    },
    computed: {

    },
    mounted() {}
};
</script>
<style lang="less" scoped>
.zcfg {
    padding:0 !important;
}
</style>