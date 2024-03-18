<template>
    			<dl class="score">
				<dt><span>{{info.dim}}</span></dt>
				<dd>
					<!-- 长度规则：（得分 - 20）* 7 -->
					<div 
                    :style="{
                        'width':styleWidth + 'px',
                    }">
                        <span>{{info.val}}</span>
                    </div>
				</dd>
			</dl>

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
        styleWidth(){
            return (this.info.val -20 ) * 7
        }
    },
    mounted() {
    }
};
</script>