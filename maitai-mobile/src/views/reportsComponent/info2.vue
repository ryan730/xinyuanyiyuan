<template>
<div class="full">
			<div class="info">
				<div class="txt">
					<strong>{{info.title}}</strong><br />
					{{info.subtitle}}
				</div>
				<dl>
					<dt>
						<div class="t">
							<span>低</span>
							<span>中</span>
							<span>高</span>
						</div>
						<div class="state">
							<span>{{info.left.text}}</span>
							<div class="gray">
								<em class="lineA"></em>
								<em class="lineB"></em>
								<div class="blue" :style="{'right':levelWidth(info.left.level) + 'px',}"></div>
							</div>
						</div>
					</dt>
					<dd>
						<div class="t">
							<span>低</span>
							<span>中</span>
							<span>高</span>
						</div>
						<div class="state">
							<div class="gray">
								<em class="lineA"></em>
								<em class="lineB"></em>
								<div class="yellow" :style="{'left':levelWidth(info.right.level) + 'px',}"></div>
							</div>
							<span>{{info.right.text}}</span>
						</div>
					</dd>
				</dl>
			</div>
</div>

</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
            type:Object,
            default:{
                title:'职场步调节奏',
                subtitle:'评价你在职场中工作节奏快还是慢',
                left:{
                    text:'快节奏',
                    level:1,//1低2中3高
                },
                right:{
                    text:'慢节奏',
                    level:3,//1低2中3高
                }
            }
        }
    },
    data() {
        return {};
    },
    computed: {

    },
    methods:{
        levelWidth(level){
            return (level - 1 ) * 60
        }
    },
    mounted() {
    }
};
</script>