<template>
    <div class="btA"><em class="l"></em>{{info}}<em class="r"></em></div>
</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
            type:String,
            default:'标题'
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