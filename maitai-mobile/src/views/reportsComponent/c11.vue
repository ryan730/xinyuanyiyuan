<template>
<div class="zhongdu">
    <div v-for="item in info" class="item">
        {{item.text}}
        <em v-if="!!item.checked"></em>
    </div>
</div>
</template>

<script>
export default {
    name: "c11",
    props: {
        info: {

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
.zhongdu {
    background: url(./img/zhongdu.png) no-repeat;

    height: 65px;
    weight: 100%;
    display: flex;
    margin: 0px 30px 50px;
    border: none;
    background-size: 100%;

}

.item {
    text-align: center;
    position: relative;
    flex: 1;
    color: #fff;
    font-size: 24px;
    font-weight: 300;
    line-height: 60px;
}

em {
    position: absolute;
    bottom: -34px;
    height: 30px;
    width: 30px;
    background: url(./img/angle.png) no-repeat;
    background-size: 100%;
    left: 50%;
    margin-left: -15px;
}
</style>
