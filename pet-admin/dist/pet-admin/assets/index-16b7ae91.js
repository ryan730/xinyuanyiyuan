import{d as x,q as l,A as S,I as N,r,J as y,c as g,K as z,m as p,t as C,l as k,h as o,w as B,v as D,o as m,z as T,a as I}from"./index-79f9e569.js";import{s as R}from"./index-d71be140.js";const L={class:"user-page w-full flex h-full"},P={class:"user-table w-[calc(100%-15rem)] ml-5"},U={class:"p-2 bg-white"},V={class:"table-header flex"},q={class:"table-header-title w-40 text-left"},A={name:"systemUser"},E=x({...A,setup(F){l();const f=l(),v=l([]);l([new Date,new Date]);const _=l(!1),e=S({name:"",account:"",deptId:1,pageNum:1,pageSize:20,total:0,loading:!0});l([]);const d=l([]),u=async(a={})=>{e.loading=!0;let c={},{time_start:t,time_end:n}=a;t&&n&&(c={time_start:t,time_end:n});const i=await R.test({page:e.pageNum,...c});console.log("statisticsService-----",e.pageNum,i);const{data:s,cur_page:J}=i;d.value=s,e.total=s==null?void 0:s.total,e.pageNum=Number(e.pageNum),e.pageSize=e.pageSize||20,e.loading=!1,D(()=>{_.value=!1})},w=a=>{v.value=a},h=a=>!0,b=a=>{_.value||(e.pageNum=a.page,u())};return N(()=>{u()}),(a,c)=>{const t=r("el-table-column"),n=r("el-table"),i=r("pagination"),s=y("loading");return m(),g("div",L,[z((m(),g("div",P,[p("div",U,[p("div",V,[p("div",q,C(k(T)("distributionTestList")),1)]),o(n,{data:d.value,ref_key:"multipleTableRef",ref:f,border:"",onSelectionChange:w},{default:B(()=>[o(t,{type:"selection",width:"55",selectable:h}),o(t,{width:"100","show-overflow-tooltip":"",label:"⽤⼾id",prop:"user_id"}),o(t,{"show-overflow-tooltip":"",label:"⽤⼾名称",prop:"nick_name"}),o(t,{"show-overflow-tooltip":"",label:"猫测试的订单总数",prop:"cat_order_total"}),o(t,{"show-overflow-tooltip":"",label:"猫测试的⽀付订单总数",prop:"cat_order_paid"}),o(t,{"show-overflow-tooltip":"",label:"猫测试的订单收⼊",prop:"cat_order_income"}),o(t,{"show-overflow-tooltip":"",label:"狗测试的订单总数",prop:"dog_order_total"}),o(t,{"show-overflow-tooltip":"",label:"狗测试的⽀付订单总数",prop:"dog_order_paid"}),o(t,{"show-overflow-tooltip":"",label:"狗测试的订单收⼊",prop:"dog_order_income"}),o(t,{"class-name":"colum-elm","show-overflow-tooltip":"",label:"时间",prop:"created_at"})]),_:1},8,["data"]),o(i,{total:e.total,page:e.pageNum,size:e.pageSize,onPagination:b},null,8,["total","page","size"])])])),[[s,e.loading]])])}}});const j=I(E,[["__scopeId","data-v-75bcafcf"]]);export{j as default};
