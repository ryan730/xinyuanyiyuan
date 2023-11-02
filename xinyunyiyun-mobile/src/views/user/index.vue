<template>
    <div class="user">
        <div class="banner-wrap"><banner /></div>
    
        <div class="top">
            
            <ul class="tags-list">
                <li 
                :class="['tag-cell', {'active': item.isSelected}]"
                :key="item.value"
                v-for="item in typeData"
                @click="selectType(item.value)"
                >
                    {{item.text}}
                </li>
            </ul>
            <ul class="nav">
                <li 
                :class="['nav-cell', {'active': item.isSelected}]" 
                :key="item.status"
                v-for="item in menuData"
                @click="selectMenu(item.status)"
                >
                {{item.text}}
                </li>
            </ul>
        </div>
        <div class="bottom">
            <div class="list">
                <dl 
                class="list-cell"
                :key="item.utid"
                v-for="item in listData"
                >
                    <dt><img :src="item.image" alt=""></dt>
                    <dd>
                        <strong class="title">{{item.title}}</strong>
                        <p class="sub-title">{{item.sub_title}}</p>
                        
                        <div class="aside">
                            <span class="lab" style="background: #fff"></span>
                            <a class="btn" href="javascript:void(0)" @click="goToTestOrReport(item.utid, item.process, item.test_id, item.product_id,item.report_id, item.title)">{{curStatus == 2 ? '继续测试' : '查看报告'}}</a>
                        </div>
                    </dd>
                </dl>
            </div>
            <h5 class="recommend-title" >推荐你测</h5>
            <div class="list">
                <dl 
                class="list-cell"
                v-for="item in recommendData"
                :key="item.id"
                >
                    <dt><img :src="item.image" alt=""></dt>
                    <dd>
                        <strong class="title">{{item.title}}</strong>
                        <p class="sub-title">{{item.sub_title}}</p>
                        
                        <div class="aside">
                            <span class="lab">{{item.type_text}}</span>
                            <a class="btn" href="javascript:void(0)" @click="goToContent(item.id, item.product_id,item.title)">立即测试</a>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { getType, getUserList } from "@/service/user";
import { getRecommend } from "@/service/recommend";
import { useRouter, useRoute } from 'vue-router';
import { type } from "@/config/type";
import { useStore } from 'vuex';
import banner from "@/views/reportsComponent/banner.vue"

export default {
    components:{
        banner
    },

    setup() {
        const menuData = [
            {
                text: "未完成",
                status: 2,
                isSelected: true
            },
            {
                text: "已完成",
                status: 3,
                isSelected: false
            }
        ]
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        let curType;
        
        const state = reactive({
            menuData,
            listData: [],
            typeData: [],
            recommendData: [],
            curStatus: 2
        })

        let params = {
            id: 0
        };
        
        onMounted(async () => {
            const typeData = await getType();
            curType = store.state.userType;
            typeData.data.forEach((value) => {
                if(curType == value.value){
                  value.isSelected = true;  
                }else{
                    value.isSelected = false;
                }
                
            });
            state.typeData = typeData.data;

            typeData.data.unshift({
                text: '全部',
                value: 0
            })

            if(!curType){
                typeData.data[0].isSelected = true;
            }
            let recommendData = await getRecommend();
            if(!recommendData || !recommendData.data){
                recommendData = {data: []};
            }
            recommendData.data.forEach((value, key) => {
                value.type = type[value.type];
            });
            state.recommendData = recommendData.data;

            const listData = await getUserList({
                type: curType,
                status: state.curStatus
            });

            state.listData = listData.data;
        })

        const selectType = async (type) => {
            curType = type;

            state.typeData.forEach((item) => {
                item.isSelected = false;
                if (curType == item.value) {
                    item.isSelected = true;
                }
            })
            const listData = await getUserList({
                type: curType,
                status: state.curStatus
            });

            state.listData = listData.data;
        }

        const selectMenu = async (status) => {
            state.curStatus = status;
            const listData = await getUserList({
                type: curType,
                status
            });
            
            state.menuData.forEach((item) => {
                item.isSelected = false;
                if (item.status == status) {
                    item.isSelected = true;
                }
            })

            state.listData = listData.data;
        }

        const goToTestOrReport = (utid, curNum, testId, pid,reportId, title) => {
            store.commit('addUtid', utid);
            store.commit('addTestId', testId);
            store.commit('addProductId', pid);
            store.commit('addReportId', reportId);
            store.commit('addTitle', title);
            store.commit('adduserType',curType);

            if (state.curStatus == 2) {
                if (curNum == 0) {
                    store.commit('addCurTestNum', 1);
                    router.push({ name: 'userInfo', 
                    // params: { 
                    //     utid,
                    //     testId,
                    //     title
                    // }
                    });
                } 

                if (curNum > 0) {
                    store.commit('addCurTestNum', ++curNum);
                    router.push({ name: 'test', 
                    // params: { 
                    //     utid,
                    //     curNum:  ++curNum,
                    //     testId,
                    //     title
                    // }
                    });
                }
            } else {
                router.push({ name: 'reportLite', 
                // params: { 
                //     utid,
                //     reportId,
                //     title
                // }
                });
            }
        }

        const goToContent = (id, pid,title) => {
            store.commit('addTestId', id);
            store.commit('addProductId', pid);
            store.commit('addTitle', title);
            store.commit('adduserType',curType);
            router.push({ name: 'content'});
        }

        return {
            ...toRefs(state),
            selectType,
            selectMenu,
            goToTestOrReport,
            goToContent
        }
    },
}
</script>
<style lang="less">
.user{
    background: #F4F6F9;
    margin-bottom: 30px;
    .banner-wrap{
        background-color: #fff;
        padding: 23px 0px 29px;
    }
    .top{
        background: #FFFFFF;
        padding: 0 32px;
        .banner{
           
        }
        .tags-list{
            border-bottom: 1px solid #E5E5E5;
            display: flex;
            flex-wrap: wrap;
            .tag-cell{
                width: 120px;
                height: 56px;
                line-height: 56px;
                text-align: center;
                font-size: 26px;
                border-radius: 28px;
                border: 2px solid #EEEEEE;
                color: #222222;
                margin: 0 5px 22px;
                box-sizing: border-box;
            }
            .active{
                background: #23BCBB;
                color: #ffffff;
                border-color:#23BCBB;
            }
        }
        .nav{
            display: flex;
            .nav-cell{
                width: 160px;
                height: 90px;
                font-size: 32px;
                font-family: PingFang-SC-Bold, PingFang-SC;
                font-weight: bold;
                color: #222222;
                line-height: 90px;
                text-align: center;
            }
            .active{
                position: relative;
            }
            .active::after{
                content: '';
                position: absolute;
                bottom: 0;
                width: 58px;
                height: 6px;
                background: #23BCBB;
                border-radius: 6px;
                left: 50px;
            }
        }
    }
    .bottom{
        margin: 0 20px;
        .list{
            margin-top: 23px;
            .list-cell{
                height: 200px;
                background: #ffffff;
                padding: 20px;
                border-radius: 14px;
                margin-top: 18px;
                display: flex;
                dt{
                    img{
                        width: 164px;
                        height: 164px;
                        border-radius: 12px;
                    }
                }
                dd{
                    margin-left: 15px;
                    flex-grow: 1;
                    .title{
                        height: 45px;
                        font-size: 32px;
                        font-weight: bold;
                        color: #000000;
                        line-height: 45px;
                    }
                    p{
                        height: 37px;
                        font-size: 26px;
                        // font-weight: 500;
                        color: #84888E;
                        line-height: 37px;
                    }
                    .aside{
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        margin-top: 18px;
                        .lab{
                            // width: 72px;
                            height: 32px;
                            background: #EFEFEF;
                            border-radius: 17px;
                            font-size: 20px;
                            font-weight: 500;
                            color: #888888;
                            display: inline-block;
                            line-height: 32px;
                            text-align: center;
                            padding: 5px 15px;
                        }
                        .btn{
                            width: 152px;
                            height: 56px;
                            border-radius: 10px;
                            border: 2px solid #23BCBB;
                            font-size: 22px;
                            font-weight: 500;
                            color: #23BCBB;
                            display: inline-block;
                            line-height: 56px;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .recommend-title{
            width: 120px;
            height: 42px;
            font-size: 30px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #222222;
            line-height: 42px;
            margin: 37px 0 15px;
        }
    }
}

</style>
