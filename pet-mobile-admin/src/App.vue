<template>
  <my-dynamic-component />
  <router-view> </router-view>
  <!-- <Menu1 /> -->
</template>

<script>
// import { reactive, onMounted, ref, toRefs } from 'vue';
// import { login } from './utils';
import Menu from "@/views/Menus";
import VConsole from "vconsole";
import { queryString } from "./utils";
import { defineComponent, toRaw, watch, ref } from "vue";

import { useRouter } from "vue-router";


// 定义新组件
const MyDynamicComponent = defineComponent({
  name: "MyDynamicComponent",
  props: {
    // 定义接收的属性
    title: String,
  },
  setup(props) {
    const router = useRouter();
    const show = ref(false);
    ///console.log("setup----", toRaw(router).currentRoute.value,  router);
    const handler = () => {
      router.push({
        name: "promotion",
      });
    };

    // 监听路由变化
    watch(
      () => router.currentRoute.value,
      (newPath, oldPath) => {
        console.log("路由变化：", oldPath, " -> ", newPath);
        // 在这里执行路由变化后的相关操作
		show.value = !(newPath.name === 'promotion' || newPath.path === '/promotion');
      },
      { immediate: true }
    );

    const conditionToShow = (someCondition) => someCondition; // 实际条件判断逻辑

    // setup函数用于组件的响应式数据和逻辑
    return () => (
      <>
        {/* 类似于 v-if 的条件渲染 */}
        {conditionToShow(show.value) && (
          <div class="goback" onClick={handler}>
            <span class="icon">
              <van-icon class="van-icon1" name="revoke" />
            </span>
            <span class="text-icon">回到首页</span>
          </div>
        )}
      </>
    );
  },
});

//alert('3');
export default {
  name: "App",
  components: {
    //Menu
    MyDynamicComponent,
  },
  setup() {
    if (queryString("debug")) {
      const vConsole = new VConsole();
    }
  },
};
</script>

<style>
@import "./assets/css/rest.css";
@import "./assets/css/css.css";

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  background-color: white;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: visible;
}

.answer .tips .red {
  color: blue !important;
  background-position-x: 0 !important;
  background-position-y: 2px !important;
  background-size: 36px 36px !important;
}

.answer .over .txtA {
  background-size: 68px 64px !important;
}

.goback {
  position: fixed;
  z-index: 999;
  width: 150px;
  height: 80px;
  background-color: #1dc391;
  border-radius: 40px 0 0 40px;
  right: 0;
  bottom: 100px;
  display: flex;
}

.goback .icon {
  display: inline-block;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
  align-self: center;
  margin-left: 5px;
  display: flex;
}

.van-icon1 {
  font-size: 50px !important;
  align-self: center;
  justify-self: center;
  margin-left: 10px;
  margin-top: -2px;
}

.text-icon {
  font-size: 25px;
  align-self: center;
  color: white;
  margin-left: 10px;
  width: 50px;
}
</style>
