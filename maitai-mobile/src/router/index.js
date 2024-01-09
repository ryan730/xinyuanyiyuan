import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import { queryString } from "@/utils";
import { userLogin } from "@/service/login";
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
      redirect: "/promotion"
    },
    // {
    //   path: "/",
    //   name: "index",
    //   component: defineAsyncComponent(() => import(`../views/index.vue`)),
    //   meta: {
    //     title: "首页",
    //   },
    // },
    // {
    //   path: "/done",
    //   name: "done",
    //   component: defineAsyncComponent(() => import(`../views/wellDone.vue`)),
    //   meta: {
    //     title: "完成评测",
    //   },
    // },
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
    {
      path: "/promotion",
      name: "promotion",
      component: defineAsyncComponent(() =>
        import(`../views/promotion.vue`)
      ),
      meta: {
        title: "我的推广",
      },
    },
    {
      path: "/QRcode",
      name: "QRcode",
      component: defineAsyncComponent(() =>
        import(`../views/QRcode.vue`)
      ),
      meta: {
        title: "生成推广二维码",
      },
    },
    {
      path: "/setting",
      name: "setting",
      component: defineAsyncComponent(() =>
        import(`../views/setting.vue`)
      ),
      meta: {
        title: "设置",
      },
    },
    {
      path: "/commissionList",
      name: "commissionList",
      component: defineAsyncComponent(() =>
        import(`../views/commissionList.vue`)
      ),
      meta: {
        title: "佣金明细",
      },
    },
    {
      path: "/promotionList",
      name: "promotionList",
      component: defineAsyncComponent(() =>
        import(`../views/promotionList.vue`)
      ),
      meta: {
        title: "推广订单",
      },
    },
    {
      path: "/cashList",
      name: "cashList",
      component: defineAsyncComponent(() =>
        import(`../views/cashList.vue`)
      ),
      meta: {
        title: "提现记录",
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

async function entryWeixin(code) {
  let storageData = localStorage.getItem("token") || "";
  if (storageData) { // 是否有缓存
    const { token, time } = JSON.parse(storageData);
    const curTime = new Date().getTime();
    if (curTime - time >= config.OVERTIME) {
      // loginHelper(url);
      localStorage.removeItem("token");
      getWXCode();
    }
  } else {// 第一次进入
    if (!code) {
      getWXCode();
    } else {
      const res = await userLogin(code);
      console.log('res===',res)
      // if (res?.code != 1) {
      //   alert(res?.msg);
      //   document.write('<div style="width:100%;height:100%;display: flex;justify-content: center;align-items: center;"><h5>微信登陆失败!</h5></div>');
      //   return;
      // }
      // 将token存储到localstorge
      window.localStorage.setItem('token', JSON.stringify({
        token: res?.data?.token,
        time: new Date().getTime()
      }));
    }
  }
}

async function getLazyWeixin() {
  if (!wx || !wx.default) {
    wx = await import(/* webpackChunkName: 'weixinJsSdk' */ `weixin-js-sdk`)
  }
  return wx;
}

function getWXCode() {
  const redirectUri = encodeURIComponent(window.location.href);
  let newURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ee605c9b206596c&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=aaa#wechat_redirect`;
  window.location.replace(newURL);
}


router.beforeEach(async (to, from, next) => {
  //http://h5.xinyunyiyun.cn/?code=041Oee0w3zxs223khQ3w3A4NoA0Oee01&state=aaa
  const code = queryString("code") || '0218nDFa1B6SHG0QuzIa1gCplo18nDFc';


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

  wx = await getLazyWeixin();
  entryWeixin(code);
  next();
  return;



  // entryOtherPlatform(to, from, next);
  // next();
});

export default router;
