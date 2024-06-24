import{d as U,q as k,s as G,g as v,A as B,r as u,c as I,m as t,h as o,w as b,l as i,o as N,n as x,t as g,B as d,C as D,D as E,E as j,a as q}from"./index-79f9e569.js";const c=f=>(E("data-v-acf6e3c4"),f=f(),j(),f),z={class:"layout-settings h-full select-none"},A={class:"w-full"},H={class:"item w-full item flex items-center"},$=c(()=>t("span",{class:"label flex-1"},"primary",-1)),F={class:"item w-full item flex items-center"},J=c(()=>t("span",{class:"label flex-1"},"success",-1)),K={class:"item w-full item flex items-center"},M=c(()=>t("span",{class:"label flex-1"},"danger",-1)),O={class:"item w-full item flex items-center"},P=c(()=>t("span",{class:"label flex-1"},"warning",-1)),Q={class:"item w-full item flex items-center"},R=c(()=>t("span",{class:"label flex-1"},"info",-1)),W={class:"item w-full item flex items-center"},X={class:"label flex-1"},Y={class:"item w-full item flex items-center"},Z={class:"label flex-1"},ee={class:"item w-full item flex items-center"},se={class:"label flex-1"},te={name:"LayoutSettings"},le=U({...te,setup(f){const p=k(!1),a=G(),S=v(()=>a.themesState),_=v(()=>a.config),l=B({...S.value,hasTagsView:_.value.hasTagsView,hasSidebarLogo:_.value.hasSidebarLogo,hasGlobalSettings:_.value.hasGlobalSettings}),r=(n,e)=>{a.setThemes({[e]:n}),D(n,e)},V=(n,e)=>{switch(e){case"tagsView":a.setConfig({hasTagsView:n});break;case"sidebarLogo":a.setConfig({hasSidebarLogo:n});break;case"globalSettings":a.setConfig({hasGlobalSettings:n});break}},C=()=>{p.value=!0},y=()=>{p.value=!1};return(n,e)=>{const L=u("svg-icon"),h=u("el-divider"),m=u("el-color-picker"),w=u("el-switch"),T=u("el-drawer");return N(),I("div",z,[t("div",{class:"icon-wrapper text-$color-text-primary pl-2.5 pr-2.5 h-full flex justify-center items-center cursor-pointer",onClick:C},[o(L,{name:"theme",class:"w-full pointer-events-none"})]),o(T,{modelValue:p.value,"onUpdate:modelValue":e[16]||(e[16]=s=>p.value=s),title:i(d)("setting"),direction:"rtl",size:"300px","before-close":y},{default:b(()=>[t("div",A,[o(h,{"content-position":"left",class:"font-bold"},{default:b(()=>[x(g(i(d)("themeSettings")),1)]),_:1}),t("div",H,[$,o(m,{modelValue:l.primary,"onUpdate:modelValue":e[0]||(e[0]=s=>l.primary=s),onChange:e[1]||(e[1]=s=>r(s,"primary"))},null,8,["modelValue"])]),t("div",F,[J,o(m,{modelValue:l.success,"onUpdate:modelValue":e[2]||(e[2]=s=>l.success=s),onChange:e[3]||(e[3]=s=>r(s,"success"))},null,8,["modelValue"])]),t("div",K,[M,o(m,{modelValue:l.danger,"onUpdate:modelValue":e[4]||(e[4]=s=>l.danger=s),onChange:e[5]||(e[5]=s=>r(s,"danger"))},null,8,["modelValue"])]),t("div",O,[P,o(m,{modelValue:l.warning,"onUpdate:modelValue":e[6]||(e[6]=s=>l.warning=s),onChange:e[7]||(e[7]=s=>r(s,"warning"))},null,8,["modelValue"])]),t("div",Q,[R,o(m,{modelValue:l.info,"onUpdate:modelValue":e[8]||(e[8]=s=>l.info=s),onChange:e[9]||(e[9]=s=>r(s,"info"))},null,8,["modelValue"])]),o(h,{"content-position":"left",class:"font-bold"},{default:b(()=>[x(g(i(d)("globalSettings")),1)]),_:1}),t("div",W,[t("span",X,g(i(d)("switchTagsView")),1),o(w,{modelValue:l.hasTagsView,"onUpdate:modelValue":e[10]||(e[10]=s=>l.hasTagsView=s),onChange:e[11]||(e[11]=s=>V(s,"tagsView"))},null,8,["modelValue"])]),t("div",Y,[t("span",Z,g(i(d)("switchSidebarLogo")),1),o(w,{modelValue:l.hasSidebarLogo,"onUpdate:modelValue":e[12]||(e[12]=s=>l.hasSidebarLogo=s),onChange:e[13]||(e[13]=s=>V(s,"sidebarLogo"))},null,8,["modelValue"])]),t("div",ee,[t("span",se,g(i(d)("switchGlobalSettings")),1),o(w,{modelValue:l.hasGlobalSettings,"onUpdate:modelValue":e[14]||(e[14]=s=>l.hasGlobalSettings=s),onChange:e[15]||(e[15]=s=>V(s,"globalSettings"))},null,8,["modelValue"])])])]),_:1},8,["modelValue","title"])])}}});const ne=q(le,[["__scopeId","data-v-acf6e3c4"]]);export{ne as default};