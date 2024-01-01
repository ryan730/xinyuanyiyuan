<template>
	<div class="gray borA mt1">
        <div v-for="item in info">
			<div class="bt" style="text-align:center;" v-if="item.sub_type == 'center_b'">{{item.text}}</div>
            <div class="jyx" v-if="item.sub_type == 'center_g'">{{item.text}}</div>
            <p v-else-if="item.sub_type == 'normal'">{{item.text}}</p>
            <div v-else-if="item.sub_type == 'rich_text'" v-html="item.text"></div>
            <ul  v-else-if="item.sub_type == 'array'" class="jbxxInfo">
                <li v-for="list in item.text">{{list}}</li> 
            </ul>
            <ul  v-else-if="item.sub_type == 'array_new'" class="rzx">
                <li v-for="list in item.text">
                    <span>{{list.lab}}</span>
                    {{list.cont}}
                </li> 
            </ul>            
        </div>
	</div>
</template>
<script>
export default {
    name: "table1",
    props: {
        info:{
            type:Array,
            default:            [
                        {
                            "text":"阅读说明",
                            "sub_type":"center_b"  //子样式 居中、黑体
                        },
                        {
                            "text":"听觉型",
                            "sub_type":"center_g"  //子样式 居中、绿底
                        },
                        {
                            "text":"感谢您的参与,阅读本报告时,请注意以下事项：",
                            "sub_type":"normal" //子样式  普通文本
                        },
                        {
                            "sub_type":"array", //子样式 数组文本
                            "text":[
                                "阅读时可以先查看图表快速掌握报告内容然 后有针对性地阅读对应文字；",
                                "如报告与你自己或他人的感知有出入，可回 忆测试时，是否有事情影响了你的判断；",
                                "本报告不可作为临床诊断的依据，也不赞成 把报告结果作为你生活和工作中重大决策的 唯一依据；",
                                "如对报告内容有不理解的地方，建议向有专 业资质的人员进行咨询；",
                                "本报告为专业测评结果，建议你在分享时务 必谨慎。"
                            ]
                        },
                        {
                            "sub_type":'arrry_new',//子样式，数组带标签文本
                            "text":[
                                {
                                    "lab":'冲动型',
                                    "cont":'反应敏捷、迅速，但往往考虑不周'
                                },
                                   {
                                    "lab":'熟虑型',
                                    "cont":'反解决学习中的问题倾向于深思熟虑'
                                },
                            ]
                        }
                    ]
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
<style lang="less" scoped>
.mt1{
    margin-top: 25px;
}
</style>