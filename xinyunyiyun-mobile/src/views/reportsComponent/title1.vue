<template>
<div class="bt">
    {{info}}
    <span v-if="subtitle">{{subtitle}}</span>
</div>

</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
            type:String,
            default:'标题'
        },
        subtitle:{
            type:String,
            default:'' 
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