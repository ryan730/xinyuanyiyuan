
<template>
	<!-- 菜单 -->

	<div class="menuContainer" v-bind:style="{ display: stat }">
		<div class="menu-list">
			<ul>
				<li :class="['menu', { 'active': item.isSelected }]" :key="item.name" v-for="item in meunsData"
					@click="switchTag(item.path)">
					<div class="meun-img" v-bind:style="{ display: item.isSelected ? 'none' : 'block' }"><img
							:src="item.src_normal + sizeliz" alt="">
					</div>
					<div class="meun-img" v-bind:style="{ display: item.isSelected ? 'block' : 'none' }"><img
							:src="item.src_active + sizeliz" alt="">
					</div>
					<p>{{ item.name }}</p>
				</li>
			</ul>
		</div>
	</div>
	<div v-bind:style="{ display: stat }" class="menuPlaceHolder"></div>
</template>
<script>
import router from '@/router'
import { getRealSize } from './utils'

import { reactive, onMounted, ref, toRaw, toRefs, onUpdated, watch, getCurrentInstance } from 'vue';
import { getIndexList } from "@/service/index";
import { getType } from "@/service/user";
import { useRouter } from 'vue-router';
import { type } from "@/config/type";
import { useStore } from 'vuex';

export default {
	setup() {
		// const getMenu = () => {
		// 	// 通过 getRoutes() 函数，获取所有的路由信息
		// 	const routes = router.getRoutes()
		// 	const links = []
		// 	// 循环路由信息，将数据整理并 push 到 links 数组
		// 	routes.forEach((route, index) => {
		// 		links.push({
		// 			name: route.meta.title || `未命名${index}`,
		// 			link: route.path
		// 		})
		// 	})
		// 	// 将 links 数组返回
		// 	return links
		// }
		// // 获取菜单数据并返回
		// const menus = getMenu();

		const sizeliz = getRealSize() + '.png';

		const router = useRouter();
		let curType = 0;
		const store = useStore();
		const state = reactive({
			stat: 'none',
		})

		const routes = router.getRoutes()
		console.log('routes:', toRaw(router).currentRoute.value.fullPath, routes)

		const datab = getCurrentInstance();

		watch(() => router.currentRoute.value.path, (toPath) => {
			let pathname = location.pathname;
			//console.log("~~~~~~~~2222~~~~~~~", toPath,pathname);
			let bol = datab.data.meunsData.filter((item) => {
				return item.path == pathname
			})?.length;
			datab.data.meunsData.forEach(item => {
				if (item.path == pathname) {
					item.isSelected = true;
				} else {
					item.isSelected = false;
				}

			});
			state.stat = bol ? 'block' : 'none';
			store.commit('addShowMenuHolder', bol);
		})

		onMounted(async (...arg) => {
			let curtype = '首页';
			let pathname = location.pathname;
			console.log('pathname:', pathname);
			datab.data.meunsData.forEach(item => {
				if (item.path == pathname) {
					item.isSelected = true;
				} else {
					item.isSelected = false;
				}

			});
			//console.log("~~~~~~~~~~~~~~~", pathname)
			let bol = datab.data.meunsData.filter((item) => {
				return item.path == pathname
			})?.length;
			state.stat = bol ? 'block' : 'none';
			store.commit('addShowMenuHolder', bol);
		})

		const switchTag = async (path) => {
			curType = path;
			datab.data.meunsData.forEach(item => {
				item.isSelected = false;
				if (item.path == path) {
					item.isSelected = true;
					console.log('name::', item.path)
					router.push(item.path);
				}
			});
		}

		return {
			...toRefs(state),
			switchTag,
			//menus,
			sizeliz
		}
	},
	data() {
		return {
			///Users/ryan/work/waibao/meta-psy-front/src/assets/menuImg/fenlei-1@1x.png
			meunsData: [
				{
					name: "首页",
					src_normal: "http://img.xinyunyiyun.cn/img/menuImg/shouye-1",
					src_active: "http://img.xinyunyiyun.cn/img/menuImg/shouye-2",
					path: "/recommend",
					isSelected: true
				},
				{
					name: "全部评测",
					src_normal: "http://img.xinyunyiyun.cn/img/menuImg/fenlei-1",
					src_active: "http://img.xinyunyiyun.cn/img/menuImg/fenlei-2",
					path: "/",
					isSelected: false
				},
				{
					name: "我的 ",
					src_normal: "http://img.xinyunyiyun.cn/img/menuImg/wode-1",
					src_active: "http://img.xinyunyiyun.cn/img/menuImg/wode-2",
					path: "/user",
					isSelected: false
				}
			]
		}
	},
	computed: {

	},
	methods: {

	}
}
</script>
<style lang="less" scoped>
.menuPlaceHolder {
	height: 150px
}

.menuContainer {
	width: 100%;
	height: 100%;
	display: flex;
	// position: fixed;

	.menu-list {
		width: 100%;
		height: 154px;
		position: fixed;
		bottom: 0;
		background: #F4F6F9;

		ul {
			flex-direction: row;
			display: flex;
			padding: 0 77px;
			justify-content: space-between;
		}

		.menu {
			width: 105px;
			height: 105px;
			// line-height: 105px;

			text-align: center;
			font-size: 28px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #888888;
			white-space: nowrap;

			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.active {
			color: #23BCBB;
			//background: #fff;
			position: relative;
		}

		// .active::after {
		// 	content: '';
		// 	position: absolute;
		// 	bottom: -20px;
		// 	width: 100%;
		// 	height: 8px;
		// 	background: #23BCBB;
		// 	border-radius: 6px;
		// }

		.meun-img {
			width: 44px;
			height: 44px;
			margin-top: 20px;
			margin-bottom: 15px;

			img {
				width: 44px;
				height: 44px;
			}
		}
	}
}
</style >