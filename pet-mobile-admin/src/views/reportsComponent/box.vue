<template>
	<div class="boxB Simplified">
		<h1 class="btA">{{info.title}}</h1>
		<div class="keyWork">
			<!-- 2-4个字 -->
			<!-- <div class="lab01"><p>胆大</p></div>
			<div class="lab02"><p>坚定</p></div>
			<div class="lab03"><p>直接了当</p></div> -->
            <!-- 五个字 -->
			<!-- <div class="lab04"><p>对现状失望</p></div>
			<div class="lab05"><p>勇敢</p></div>
			<div class="lab06"><p>自然</p></div> -->
			
            <div v-for="(item,index) in info.list" :class="itemClass(index)"><p>{{item}}</p></div>
		</div>
	</div>
</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
            type:Object,
            default: {
                title:'你的职场个性关键词',
                list:[//2-4个字
                    '直接了当',
                    '勇敢',
                    '自然',
                    '对现状失望',//五个字
                    '坚定',
                    '胆大'
                ]
            }
        }
    },
    data() {
        return {};
    },
    computed: {

    },
    methods:{
        itemClass(val){
            return 'lab0' + (val + 1)
        }
    },
    mounted() {
    }
};
</script>