<template>
<div class="c15">
    <div class="title">
        <div v-if="info.dimensions"  class="dimensions">维度名称</div>
        <div class="featuresL">
            <div>低分特征</div>
        </div>
        <div  class="scorewrap">
            <div v-for="(item,j) in info.columns" class="scores"  :class="level(j + 1)">{{j+1}}</div>
        </div>
        <div class="featuresH">高分特征</div>
    </div>
    <div class="content">
        <div v-if="info.dimensions" class="dimensions">
            <div v-for="item in info.dimensions" >{{item}}</div>
        </div>
        <div class="featuresL">
            <div v-for="item in info.featuresL" >{{item}}</div>
        </div>
        <div  class="scorewrap">
            <div v-for="(item,j) in info.scores"  class="scores">
                <div v-for="i in info.columns" class="scoreblock" :class="level(i)">
                    <span  v-if="ismyscore(i,j)" class="myscore"></span>
                </div>
            </div>
        </div>
        <div class="featuresH">
            <div v-for="item in info.featuresH">{{item}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "c15",
    props: {
        info: {
            type:Object,
            default: {
                "dimensions":["独立性", "紧张性", "焦虑性"],  //维度可以为空，没有则不显示
                "featuresL":["自信", "心平气和", "思想保守"],
                "featuresH":["紧张", "思想开放", "自立"],
                "columns":10,   //分值表格列数
                "lows":[1,2,3],   //低分表格区域
                "highs":[8,9,10],  //高分表格区域
                "scores":[3,6,8],
            }  
        }
    },
    data() {
        return {
            // info:{
            //     // "dimensions":["独立性", "紧张性", "焦虑性"],  //维度可以为空，没有则不显示
            //     "featuresL":["自信", "心平气和", "思想保守"],
            //     "featuresH":["紧张", "思想开放", "自立"],
            //     "columns":10,   //分值表格列数
            //     "lows":[1,2,3],   //低分表格区域
            //     "highs":[8,9,10],  //高分表格区域
            //     "scores":[3,6,8],
            // }
        };
    },
    computed: {

    },
    methods:{
        level(i){
            if(this.info.lows.indexOf(i) > -1){
                return 'islow'
            }else if(this.info.highs.indexOf(i) > -1){
                return 'isheigh'
            }else{
                return 'nolmal'
            }
                    
        },
        ismyscore(i,j){
            return (i === this.info.scores[j])
        }
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.c15{
    margin:26px;
}
.title{
    display: flex;
    height: 68px;
    line-height: 68px;
    text-align: center;
    color: #222222;
    font-family: PingFang-SC-Medium, PingFang-SC;
    .scorewrap{
        flex:1;
        display: flex;
        .scores{
            flex:1;
            border: 1px solid #979797;
            border-width: 1px 1px 0 0;
            &.islow{
                background: #E8F5FF;
            }
            &.isheigh{
                background: #FFEFEC;
            }
            &.nolmal{
                background: #fff;
            }
        }
    }
    .featuresL div{
        border-right: 1px solid #979797;
        box-sizing: border-box;
    }
    .featuresL div,.featuresH{
        width: 114px;
    }
    .dimensions{
        width: 100px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
    }
}
.content{
    display: flex;
    color: #222222;
    font-family: PingFang-SC-Medium, PingFang-SC;
    .dimensions{
        width: 100px;
        text-align: center;
        div{
            height: 68px;
            line-height: 68px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
        }
    }
    .featuresL{
        width:114px;
        div{
            border: 1px solid #979797;
            border-width: 1px 1px 0 1px;
            height: 68px;
            line-height: 68px;
            text-align: center;
            background: #F5F5F5;
        }
    }
    .scorewrap{
        flex:1;
        .scores{
            display: flex;
            .scoreblock{
                flex:1;
                border: 1px solid #979797;
                border-width: 1px 1px 0 0;
                height: 68px;
                line-height: 68px;
                background-color: #fff;
                position: relative;
                &.islow{
                    background: #E8F5FF;
                }
                &.isheigh{
                    background: #FFEFEC;
                }
                &.nolmal{
                    background: #fff;
                }
                .myscore{
                    position: absolute;
                    top:50%;
                    left:50%;
                    width: 12px;
                    height: 12px;
                    margin-left: -6px;
                    margin-top:-6px;
                    background: #FFA000;
                    border-radius: 12px;
                }
            }
        }
    }

    .featuresH{
        width:114px;
        div{
            border: 1px solid #979797;
            border-width: 1px 1px 0 0;
            height: 68px;
            line-height: 68px;
            text-align: center;
            background: #F5F5F5;
        }
    }
}
.content .featuresL div:last-child,
.content .featuresH div:last-child,
.content .scores:last-child .scoreblock{
    border-bottom: 1px solid #979797;
}
</style>
