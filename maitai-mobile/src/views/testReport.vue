<template>
                <scorebg></scorebg>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { getIndexList } from "@/service/index";
import { getType } from "@/service/user";
import { useRouter } from 'vue-router';
import { type } from "@/config/type";
import { useStore } from 'vuex';
import tableOne from "@/views/reportsComponent/table1.vue"
import info from "@/views/reportsComponent/info2.vue"
import histogram from "@/views/reportsComponent/histogram1.vue"
import contentTitleOne from "@/views/reportsComponent/title1.vue"
import contentTitleFive from "@/views/reportsComponent/title5.vue"
import score from "@/views/reportsComponent/score.vue"
import animals from "@/views/reportsComponent/animals.vue"//职场个性自评西游记
import infoTwo from "@/views/reportsComponent/info2.vue"//职场个性
import box from "@/views/reportsComponent/box.vue"//气泡图
import uc from "@/views/reportsComponent/uchartcol.vue"
import scorebg from "@/views/reportsComponent/info1.vue"//带底色分数
export default {
    name:'testreport',
    components: {
        tableOne,
        info,
        histogram,
        contentTitleOne,
        contentTitleFive,
        score,
        animals,
        box,
        uc,
        scorebg
    },
    data(){
        return {
            item:{
                    "type":"t3",  //带框文本
                    "data":[
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
                            "sub_type":'array_new',
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
            },
            report:[
            {
            "name":"基本信息",
            "content":[
                {
                    "type":"t10",  //表格，分表头和数据行
                    "data":{
                        "head":[
                            "基本信息"
                        ],
                        "rows":[
                            [
                                "孩子年龄：8岁"
                            ],
                            [
                                "性别： 女"
                            ],
                            [
                                "问卷填写人关系： 母女"
                            ],
                            [
                                "问卷填写日期： 2022\/08\/11"
                            ]
                        ]
                    }
                },
                {
                    "type":"t3",  //带框文本
                    "data":[
                        {
                            "text":"阅读说明",
                            "sub_type":"center_b"  //子样式 居中、黑体
                        },
                        {
                            "text":"感谢您的参与,阅读本报告时,请注意以下事项：",
                            "sub_type":"normal" //子样式  普通文本
                        },
                        {
                            "sub_type":'arrry_new',
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
            ]
        },
        {
            "name":"剖面分析",
            "content":[
                {
                    "type":"t1",
                    "data":[
                        "【各类指标得分】"
                    ]
                },
                {
                    "type":"c1",
                    "data":[
                        {
                            "dim":"学习热情",
                            "val":"28"
                        },
                        {
                            "dim":"学习计划",
                            "val":"70"
                        },
                        {
                            "dim":"听课方法",
                            "val":"54"
                        },
                        {
                            "dim":"学习技术",
                            "val":"58"
                        },
                        {
                            "dim":"家庭环境",
                            "val":"40"
                        },
                        {
                            "dim":"学校环境",
                            "val":"32"
                        },
                        {
                            "dim":"独立性",
                            "val":"83"
                        },
                        {
                            "dim":"毅力",
                            "val":"55"
                        },
                        {
                            "dim":"心身健康",
                            "val":"68"
                        },
                        {
                            "dim":"总分",
                            "val":"43"
                        }
                    ]
                },
                {
                    "type":"t1",
                    "data":[
                        "【总分分析】"
                    ]
                },
                {
                    "type":"c2", //单行进度条样式
                    "data":{
                        "dim":"综合得分",
                        "val":"36"
                    }
                },
                {
                    "type":"t1",
                    "data":[
                        "【总评】"
                    ]
                },
                {
                    "type":"t2",
                    "data":[
                        "测试显示，被试的学习适应情况比较差。被试的学习态度不够端正，对学习缺乏热情，很少自己主动学习；听课方法不够科学，听讲时容易分心，课后很少及时复习；家庭环境对学习不太有利，家里的干扰比较多，家人也不大支持被试学习；被试不太适应学校的环境，和老师、同学的关系不够融洽；被试的独立性和毅力比较差，很少自己准备学习用品和生活用品，学习或做其他事情难以坚持到底。被试更具体的表现请参看各个分量表的结果解释。建议被试努力改善做得不好的地方，提高学习的积极性，掌握科学的学习方法，培养独立性和毅力，让家人协助改善家里的学习环境，在学校要尊敬老师、团结同学，进一步提高学习适应性。",
                        "学习适应性测验（Academic Adjustment Inventory,简称AAT）是用来测量学生克服内在和外在种种困难取得较好学习效果的一种学习适应能力"
                    ]
                },
                {
                    "type":"t3",
                    "data":[
                        {
                            "text":"小学1—2年级的学习适应性测验测评五个方面：",
                            "sub_type":"normal"
                        },
                        {
                            "sub_type":"array",
                            "text":[
                                "学习态度：是否自己有积极性，主动性，有计划地进行学习。",
                                "听课方法：是否积极听课，有效地利用了听课时间。",
                                "家庭环境：是否有效地发挥了家庭物质条件的作用，家庭气氛是否有利于学习。",
                                "学校环境：是否积极利用了学校环境，同学关系是否有利于学习。",
                                "独立性和毅力：自己的事是否积极地去做不安倾向大不大，做事能否坚持到最后完成。"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "name":"单项解读",
            "content":[
                {
                    "type":"t5", //特殊标题
                    "data":[
                        "学习态度"
                    ]
                },
                {
                    "type":"t3",
                    "data":[
                        {
                            "text":"学习态度是指是否自己有积极性，主动性，有计划地进行学习。",
                            "sub_type":"normal"
                        }
                    ]
                },
                {
                    "type":"c2",
                    "data":{
                        "dim":"学习态度",
                        "val":"89"
                    }
                },
                {
                    "type":"t3",
                    "data":[
                        {
                            "sub_type":"array",
                            "text":[
                                "您的孩子在该特质上的综合得分为：很高",
                                "被试的学习态度比较好。被试在课余时间能主动安排学习，争取学会自己还没有掌握的知识，不需要别人督促；学习时比较投入，能坚持较长的时间而不觉得厌烦。希望被试继续保持这种良好的学习态度。"
                            ]
                        }
                    ]
                },
                {
                    "type":"t5",
                    "data":[
                        "听课方法"
                    ]
                },
                {
                    "type":"t3",
                    "data":[
                        {
                            "text":"听课方法是指是否积极听课，有效地利用了听课时间。",
                            "sub_type":"normal"
                        }
                    ]
                },
                {
                    "type":"c2",
                    "data":{
                        "dim":"听课方法",
                        "val":"55"
                    }
                },
                {
                    "type":"t3",
                    "data":[
                        {
                            "sub_type":"array",
                            "text":[
                                "您的孩子在该特质上的综合得分为：中等",
                                "测试显示，被试的听课方法一般。被试在上课听讲方面有一些做得比较好的地方，但可能也存在一些缺点，可能没有及时为上课做好准备，可能听讲不够专心，可能没能积极回答老师的提问，或者课后没有及时复习。建议被试找到自己做得不足的地方，积极加以改善，进一步提高听课的效果"
                            ]
                        }
                    ]
                }
            ]
        }
            ]
        }
    },
    created(){

    },
    methods:{

    },

}
</script>
<style lang="less" scoped>
</style>



