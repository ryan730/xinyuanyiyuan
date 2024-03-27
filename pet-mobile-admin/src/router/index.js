import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import { queryString } from "@/utils";
import { userLogin } from "@/service/login";
import { config } from "@/config";
import store from "../store/index";
//import wx from 'weixin-js-sdk'
// import { getcfg } from "@/service/wxShare";
// import { getContent } from "@/service/content";

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
  ]
});

window.___router___ = router;

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

async function entryWeixin(code) {
  let storageData = localStorage.getItem("token") || "";
  if (storageData) { // 是否有缓存
    const { token, time } = JSON.parse(storageData);
    const curTime = new Date().getTime();
    // 超期
    if (curTime - time >= config.OVERTIME) {
      localStorage.removeItem("token");
      getWXCode();
    }
  } else {// 第一次进入
    if (!code) {
      getWXCode();
    } else {
      const res = await userLogin(code);
      console.log('res===',res);
    // todo: 登陆失败是否提醒
      if (res?.code != 1) {
        alert(res?.msg);
        ///document.write('<div style="width:100%;height:100%;display: flex;justify-content: center;align-items: center;"><h5>微信登陆失败!</h5></div>');
        ///return;
      }
      // 将token存储到localstorge
      window.localStorage.setItem('token', JSON.stringify({
        token: res?.data?.token, //|| 'Bearer bzJZMXk2UGQ1bHhyOEJRZkZUYjN4WGJ2Nkd6d3x8MzY1fHxiOWVjYjBkMDMwYTFlMjg5NzdjZDdjNmQwMTQ2M2FkZQ==',
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
  //const redirectUri = encodeURIComponent('https://pets.xinyunyiyun.cn' || window.location.href);//'https://pets.xinyunyiyun.cn' || 
  const redirectUri = encodeURIComponent(window.location.href);//'https://pets.xinyunyiyun.cn' || 
  //let newURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ee605c9b206596c&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=aaa#wechat_redirect`;
  let newURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ee605c9b206596c&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=aaa&connect_redirect=1#wechat_redirect`;
  //let newURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9ee605c9b206596c&redirect_uri=${redirectUri}&response_type=code&scope=SCOPE&state=STATE&connect_redirect=1#wechat_redirect`;
  window.location.replace(newURL);
}


router.beforeEach(async (to, from, next) => {
  // ryan+
  //http://h5.xinyunyiyun.cn/?code=041Oee0w3zxs223khQ3w3A4NoA0Oee01&state=aaa
  const code = queryString("code") //|| '0615pNFa1WLW6H0gyrGa1iLkcR25pNFn'; //测试code


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
  // return;
});

export default router;
