<template>
  <div class="page flex-col">
    <div class="group_1 flex-col">
      <div class="group_2 flex-col">
        <div class="block_2 flex-row justify-between">
          <img class="label_3" style="opacity: 0" referrerpolicy="no-referrer" :src="require('../assets/images/promt-1.png')" @click="onClickRight" />
          <span class="text_2">我的推广</span>
        </div>
      </div>
      <div class="group_3 flex-col">
        <div class="box_1 flex-row justify-between">
          <div class="text-group_1 flex-col">
            <span class="text_3">当前佣金</span>
            <span class="text_4">{{ getPrice(amount) }}</span>
          </div>
          <div class="box_2 flex-row">
            <div class="image-text_1 flex-row justify-between" @click="handleCashouut">
              <span class="text-group_2">提现记录</span>
              <img class="thumbnail_1" referrerpolicy="no-referrer" :src="require('../assets/images/promt-2.png')" />
            </div>
          </div>
        </div>
        <div class="box_3 flex-row">
          <div class="text-wrapper_1 flex-col" @click="handlePageout">
            <span class="text_5">立即提现</span>
          </div>
        </div>
      </div>
      <div class="group_5 flex-col">
        <span class="text_6">常用功能</span>
        <div class="grid_1 flex-row">
          <div class="image-text_2 flex-col" v-for="(item, index) in loopData" :key="index" @click="item.click">
            <img class="image_2" referrerpolicy="no-referrer" :src="item.lanhuimage" />
            <span class="text-group_3" v-html="item.lanhutext0"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { FormInstance, showToast } from "vant";
import { getRegister, getsms } from "@/service/login";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { debounce, getPxToRem } from "@/utils";
import { payouts, commissionAmount } from "@/service/user";
export default {
  setup() {
    const router = useRouter();
    let amount = ref("");
    onMounted(async () => {
      let storageData = localStorage.getItem("token");
      const { token, time } = JSON.parse(storageData) || {};
      if (!token) {
        return;
      }
      const res = await commissionAmount();
      if (res?.code == 1) {
        amount.value = res?.data?.amount;
      } else {
        alert(res?.msg || "获取失败!");
      }
    });
    return {
      amount,
      loopData: [
        {
          lanhuimage: require("../assets/images/promt-3.png"),
          lanhutext0: "生成推广二维码",
          click: () => {
            router.push({
              name: "QRcode",
            });
          },
        },
        {
          lanhuimage: require("../assets/images/promt-4.png"),
          lanhutext0: "佣金明细",
          click: () => {
            router.push({
              name: "commissionList",
            });
          },
        },
        {
          lanhuimage: require("../assets/images/promt-5.png"),
          lanhutext0: "推广订单",
          click: () => {
            router.push({
              name: "promotionList",
            });
          },
        },
        {
          lanhuimage: require("../assets/images/promt-6.png"),
          lanhutext0: "设置",
          click: () => {
            // router.push({
            //     name: 'setting',
            // })
            alert("暂未开放，敬请期待");
          },
        },
      ],
    };
  },
  methods: {
    getPrice(price) {
      return "￥" + (price / 100).toFixed(2);
    },
    onClickLeft() {
      history.back();
    },
    handleCashouut() {
      this.$router.push({
        name: "cashList",
      });
    },
    async handlePageout() {
      const res = await payouts();
      if (res?.code == 1) {
        const res2 = await commissionAmount();
        if (res2?.code == 1) {
          this.amount = res2?.data?.amount;
          alert("提现成功,余额更新!");
        } else {
          alert(res2?.msg || "获取失败!");
        }
      } else {
        alert(res?.msg || "提现失败!");
      }
    },
  },
};
</script>
<style scoped lang="less">
.page {
  position: relative;
  width: 100%;
  height: 1624px;
  overflow: hidden;
}

.group_1 {
  background-color: rgba(245, 247, 247, 1);
  position: relative;
  height: 1624px;
}

.group_2 {
  background-color: rgba(29, 195, 145, 1);
  padding: 27px 28px 39px 40px;
}

.block_1 {
}

.text_1 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 30px;
  letter-spacing: -0.6000000238418579px;
  font-family: SFProText-Semibold;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  line-height: 36px;
}

.label_1 {
  width: 34px;
  height: 21px;
  margin: 8px 0 7px 440px;
}

.label_2 {
  width: 31px;
  height: 22px;
  margin: 8px 0 6px 10px;
}

.image_1 {
  width: 50px;
  height: 24px;
  margin: 7px 0 5px 9px;
}

.block_2 {
  width: 391px;
  margin: 51px 275px 0 16px;
}

.label_3 {
  width: 28px;
  height: 28px;
  margin: 11px 0 9px 0;
}

.text_2 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 34px;
  letter-spacing: 1.806249976158142px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
}

.group_3 {
  background: url(../assets/images/promt-bg.png) 100% no-repeat;
  background-size: 100% 100%;
  padding: 27px 0 178px 237px;
}

.box_1 {
  width: 481px;
  margin-left: 32px;
}

.text-group_1 {
}

.text_3 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  font-family: PingFang-SC-Medium;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 33px;
  align-self: center;
}

.text_4 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 80px;
  font-family: DINAlternate-Bold;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  line-height: 93px;
  margin-top: 6px;
}

.box_2 {
  background-color: rgba(27, 166, 124, 1);
  border-radius: 23px 0px 0px 23px;
  margin: 63px 0 23px 0;
  padding: 7px 14px 6px 22px;
}

.image-text_1 {
  width: 114px;
}

.text-group_2 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  font-family: PingFang-SC-Medium;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 33px;
}

.thumbnail_1 {
  width: 11px;
  height: 19px;
  margin: 7px 0 7px 0;
}

.box_3 {
  margin: 36px 237px 0 0;
}

.text-wrapper_1 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  padding: 18px 74px 17px 74px;
}

.text_5 {
  overflow-wrap: break-word;
  color: rgba(24, 166, 123, 1);
  font-size: 32px;
  font-family: PingFang-SC-Medium;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 45px;
}

.group_4 {
  padding: 934px 255px 27px 233px;
}

.box_4 {
  background-color: rgba(59, 59, 59, 1);
  border-radius: 5px;
  width: 262px;
  height: 10px;
}

.group_5 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 14px;
  position: absolute;
  left: 23px;
  top: 525px;
  width: 702px;
  height: 588px;
  padding: 32px 135px 82px 39px;
}

.text_6 {
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 34px;
  font-family: PingFang-SC-Medium;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 48px;
  margin-right: 392px;
}

.grid_1 {
  width: 570px;
  height: 390px;
  flex-wrap: wrap;
  margin: 36px 0 0 40px;
}

.image-text_2 {
  width: 192px;
  height: 161px;
  margin: 0 186px 68px 0;
}

.image-text_2:nth-child(2n) {
  margin-right: 0;
}

.image-text_2:nth-last-child(-n + 2) {
  margin-bottom: 0;
}

.image_2 {
  width: 110px;
  height: 110px;
  align-self: center;
}

.text-group_3 {
  width: 192px;
  overflow-wrap: break-word;
  color: rgba(34, 34, 34, 1);
  font-size: 26px;
  letter-spacing: 1.381250023841858px;
  font-family: PingFang-SC-Bold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 37px;
  margin-top: 14px;
}
</style>
<style>
body * {
  box-sizing: border-box;
  //flex-shrink: 0;
}

/*
body {
    font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
        Arial, PingFang SC-Light, Microsoft YaHei;
}

input {
    background-color: transparent;
    border: 0;
}

button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
}

button:active {
    opacity: 0.6;
}
*/
.van-nav-bar__left:active,
.van-nav-bar__right:active {
  opacity: 1;
}

[class*="van-"]::after {
  border-bottom: 0;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.align-start {
  display: flex;
  align-items: flex-start;
}

.align-center {
  display: flex;
  align-items: center;
}

.align-end {
  display: flex;
  align-items: flex-end;
}
</style>
