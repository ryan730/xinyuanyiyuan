<template>
<div class="pm" :class="[{jbxx: info.head.length==1 },{zxyyTab: info.head.length!==1}]" style="margin:50px 0" v-if="!!info">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr v-if="info.head.length > 1">
            <th :width="head.length >=3? 100 : 80" v-for="head in info.head">

                {{head}}
            </th>
        </tr>
        <tr v-else>
            <th v-for="head in info.head" >

                {{head}}
            </th>
        </tr>
        <tr v-for="rows in info.rows">
            <td v-for="(item,index) in rows">{{item}}</td>
        </tr>

    </table>

</div>
</template>

<script>
export default {
    name: "table1",
    props: {
        info: {
            type: Object,
            default: {
                "head": [
                    "基本信息"
                ],
                "rows": [
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
        }
    },
    data() {
        return {};
    },
    computed: {

    },
    mounted() {}
};
</script>
<style lang="less" scoped>

.jbxx{
    margin-right: 0;
    margin-left: 0;
    width: 100%;
}
.zxyyTab td{
    padding: 19px 0;
    min-width: 110px;
}
.zxyyTab tr td:nth-child(2) {
    line-height: 36px;
    padding-left: 30px;
    padding-right: 30px;
}
.background{
    background-color:#F5F9F9;
    margin-top: 0 !important;
}
.background td:first-child{
    font-weight: 500;
}
</style>