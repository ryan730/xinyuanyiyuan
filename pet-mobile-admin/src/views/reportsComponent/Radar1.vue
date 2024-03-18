<template>
<div class="bj_violet">
	<div class="zqrtSimple">
		<div class="mapZqrt">
			<canvas id="fivePoint" width="662" height="540"></canvas>
		</div>
	</div>
</div>
</template>
<script>
import pop from "@/H5/js/canvas_zqrt.js";
export default {
    name: "ertongChart",
    props: {
        info:{
            type:Array,
            default:[
                {
                    dim: "学习态度",
                    val: 4
                },
                {
                    dim: "作息规律性",
                    val: 1
                },
                {
                    dim: "变化接受度",
                    val: 2
                },
                                {
                    dim: "环境适应性",
                    val: 3
                },
                                {
                    dim: "反应激烈度",
                    val: 4
                },
                                {
                    dim: "情绪情悦度",
                    val: 3
                },
                {
                    dim: "内在坚持度",
                    val: 2
                },
                {
                    dim: "注意分散度",
                    val: 2
                },
                {
                    dim: "外部敏感度",
                    val: 1
                },

            ]
        }
    },
    data() {
        return {};
    },
    computed: {

    },
    mounted() {

        this.init()
    // pop.canvasM(valArr)
    // pop.canvasM([1,1,2,3,4,3,2,1,1])
    	//-- 0 对应 7
		//-- 1 对应 5
		//-- 2 对应 3
		//-- 3 对应 1
		//-- 4 对应 -1
    },
    methods:{
        init(){
            let valArr = [];
            this.info.forEach(e => {
                //返回得分
                // switch(e.val){
                //     case -1:
                //         valArr.push(4)
                //         break
                //     case 1:
                //         valArr.push(3)
                //         break
                //     case 3:
                //         valArr.push(2)
                //         break
                //     case 5:
                //         valArr.push(1)
                //         break
                //     case 7:
                //         valArr.push(0)
                //         break
                //     case 'default':
                //         break

                // }

                valArr.push(e.val)//直接返回环数
            });
            pop.canvasM(valArr)
        }
    }
};
</script>