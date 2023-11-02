<template>
	<router-view>
	</router-view>
	<!-- <Menu /> -->
</template>

<script>
// import { reactive, onMounted, ref, toRefs } from 'vue';
// import { login } from './utils';
import Menu from "@/views/Menus"
import VConsole from 'vconsole';

//alert('3');
export default {
	name: 'App',
	components: {
		Menu
	},
	setup() {
		//const vConsole = new VConsole();
	}
}
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
	/* background-color: white; */
	width: 100%;
	height: 100%;
	overflow: hidden;
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
</style>
