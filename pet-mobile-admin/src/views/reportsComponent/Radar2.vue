<template>
	<div class="mapZypg">
		<canvas id="fivePoint" width="662" height="540"></canvas>
	</div>
</template>
<script>
import pop from "@/H5/js/canvas_zypg.js";
export default {
    name: "ertongChart",
    props: {},
    data() {
        return {};
    },
    computed: {

    },
    mounted() {
		pop.canvasM([5,1,5,3,2,0,1,3]);//param:[生活型、自主/独立型、挑战/成就型、创新/创造型、技术/专业型、管理/领导型、安全/稳定型、服务/助人型]
		//-- 0 对应 6  参数0对应最大分值
		//-- 1 对应 5
		//-- 2 对应 4
		//-- 3 对应 3
		//-- 4 对应 2
        //-- 5 对应 1
    }
};
</script>