<template>
<ul class="qzNum"  v-if="!!info">
    <li v-for="item in [1,2,3,4,5,6,7,8,9]" :class="[{active: info == item}]">{{item}}</li>
</ul>

</template>

<script>
export default {
    name: "uchartRadarItem",
    props: {
        info: {}
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

<style lang="less" scoped>
.qzNum{
    margin: 46px auto 44px;
}
</style>
