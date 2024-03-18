<template>
		<div class="map">
			<canvas id="fivePoint" width="614" height="454"></canvas>
            <p>文字</p>
		</div>
</template>
<script>
import pop from "@/H5/js/canvas_zc.js";
export default {
    name: "ertongChart",
    props: {},
    data() {
        return {};
    },
    computed: {

    },
    mounted() {
		pop.canvasM([0,1,2,3]);//param:[目标导向,精确服从,耐心合作,影响感召]
		
		//-- 0 对应 75~100%
		//-- 1 对应 50~75%
		//-- 2 对应 25~50%
		//-- 3 对应 0~25%
    }
};
</script>