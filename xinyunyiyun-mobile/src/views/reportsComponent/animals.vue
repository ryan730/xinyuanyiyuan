<template>
<div class="boxA">
    <div class="txt">{{info.title}}</div>
    <ul class="selfIntr">
        <li  v-for="item in info.list">
            <div class="pic"><em class="tiger"></em></div>
            <p><strong>{{item.name}}</strong>{{item.label}}{{levelWidth(item.score)}}</p>
            <div class="bor">
                <em></em>
                <span>{{item.score}}%</span>
                <div class="gray" :style="{
                        'width':levelWidth(item.score) + '%',
                    }"></div>
                <div class="blue" :style="{
                        'width':styleWidth(item.score) + '%',
                    }"></div>
            </div>
            <div class="num">{{item.score}}%</div>
            <div class="ratio">
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "animals",
    props: {
        info: {
            type: Object,
            default:{
                title:'分别是动物世界里的哪一种？',
                list:[
                    {
                        img:'',
                        name:'老虎',
                        label:'目标导向',
                        score:75
                    },
                    {
                        img:'',
                        name:'孔雀',
                        label:'影响感召',
                        score:100
                    }
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
        styleWidth(val){
            return val
        },
        levelWidth(val){
            if(val <= 25){
                return 25
            }else if( 25 < val <=50){
                return 50
            }else if(50 < val <= 75){
                return 75
            }else if(75< val <=100){
                return 100
            }
        },
    },
    mounted() {}
};
</script>



<style lang="less" scoped>
.dyznFull .bor{
    margin-top: 0px;
}
.boxA{
    margin-top: 0;
}

</style>
