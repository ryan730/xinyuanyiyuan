import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import { queryString } from "@/utils";
import { login } from "@/service/login";
import { config } from "@/config";
import store from "../store/index";
//import wx from 'weixin-js-sdk'
import { getcfg } from "@/service/wxShare";
import { getContent } from "@/service/content";

import AppBusFactory from "@/appBus/appBusFactory";

console.log("start!");

let wx = null;

const router = createRouter({
  history: createWebHistory(), // history 模式
  routes: [
    {
      path: "/",
      name: "index",
      component: defineAsyncComponent(() => import(`../views/index.vue`)),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/done",
      name: "done",
      component: defineAsyncComponent(() => import(`../views/wellDone.vue`)),
      meta: {
        title: "完成评测",
      },
    },
    {
      path: "/login",
      name: "login",
      component: defineAsyncComponent(() => import(`../views/login.vue`)),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/register",
      name: "register",
      component: defineAsyncComponent(() => import(`../views/register.vue`)),
      meta: {
        title: "注册",
      },
    },
    // {
    // 	path: '/recommend',
    // 	name: 'recommend',
    // 	component: defineAsyncComponent(() => import(`../views/recommend.vue`)),
    // 	meta: {
    // 		title: '推荐页',
    // 	},
    // },
    // {
    // 	path: '/content',
    // 	name: 'content',
    // 	component: defineAsyncComponent(() => import(`../views/content.vue`)),
    // 	meta: {
    // 		title: '内容页',
    // 	},
    // },
    {
      path: "/userInfo",
      name: "userInfo",
      component: defineAsyncComponent(() =>
        import(`../views/students/userInfo.vue`)
      ),
      meta: {
        title: "基本信息",
      },
    },
    {
      path: "/test",
      name: "test",
      component: defineAsyncComponent(() =>
        import(`../views/students/test.vue`)
      ),
      meta: {
        title: "答题",
      },
    },
    // {
    // 	path: '/reportLite',
    // 	name: 'reportLite',
    // 	component: defineAsyncComponent(() => import(`../views/students/reportLite.vue`)),
    // 	meta: {
    // 		title: '简版报告',
    // 	},
    // },
    // {
    // 	path: '/reportFull',
    // 	name: 'reportFull',
    // 	component: defineAsyncComponent(() => import(`../views/students/reportFull.vue`)),
    // 	meta: {
    // 		title: '完整报告',
    // 	},
    // },
    // {
    // 	path: '/user',
    // 	name: 'user',
    // 	component: defineAsyncComponent(() => import(`../views/user/index.vue`)),
    // 	meta: {
    // 		title: '我的测试',
    // 	},
    // },
    // {
    // 	path: '/adapter',
    // 	name: 'adapter',
    // 	component: defineAsyncComponent(() => import(`../views/adapter/userInfo.vue`)),
    // 	meta: {
    // 		title: '我的测试',
    // 	},
    // },
    // {
    // 	path: '/*',
    // 	redirect: '/',
    // },
    // {
    // 	path: '/testReport',
    // 	name: 'testReport',
    // 	component: defineAsyncComponent(() => import(`../views/testReport.vue`)),
    // 	meta: {
    // 		title: '测试报告',
    // 	},
    // },
  ],
});

window.___router___ = router;

/**
 * 处理url链接
 */
// function processUrl () {
// 	const url = window.location.href
// 	// 解决多次登录url添加重复的code与state问题
// 	const params = parse(url.split('?')[1])
// 	let redirectUrl = url
// 	if (params.code && params.state) {
// 	  delete params.code
// 	  delete params.state
// 	  const query = stringify(params)
// 	  if (query.length) {
// 		redirectUrl = `${url.split('?')[0]}?${query}`
// 	  } else {
// 		redirectUrl = `${url.split('?')[0]}`
// 	  }
// 	}
// 	return redirectUrl
// }

// function getWXCode() {
// 	const redirectUri = encodeURIComponent(window.location.href);
// 	let newURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ee605c9b206596c&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=aaa#wechat_redirect`;
// 	window.location.replace(newURL);
// }

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

async function entryOtherPlatform(to, from, next) {
  let platform = await AppBusFactory.getOtherPlatform(); // 获取平台类型
  let subPlatform = AppBusFactory.getInstance(platform);
  subPlatform.startProcess(to, from, next);
}

router.beforeEach(async (to, from, next) => {
  const code = queryString("code");

  console.log("code==" + code, to, from, next);
  // if (to.name == 'test' || to.name == 'content' || to.name == 'reportLite' || to.name == 'reportFull') {
  // 	document.title = store.state.title
  // } else {
  // 	document.title = 'maishiti'
  // }

  // if (to.name != "login" && to.name != "register") {
  //   entryOtherPlatform(to, from, next);
  // } else {

  // }
  entryOtherPlatform(to, from, next);
  next();
});

export default router;
