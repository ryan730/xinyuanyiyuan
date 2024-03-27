<template>
  <div class="page flex-col">
    <div class="group_1 flex-col">
      <div class="box_1 flex-col">
        <div class="section_2 flex-row justify-between">
          <img class="image_2" referrerpolicy="no-referrer" style="opacity: 0" :src="require('../assets/images/qrback.png')" @click="onClickLeft" />
          <span class="text_2">提现记录</span>
        </div>
      </div>
      <div class="box_2 flex-col">
        <div class="list_1 flex-col">
          <div class="list-items_1 flex-row" v-for="(item, index) in listData" :key="index">
            <img class="image_3" referrerpolicy="no-referrer" :src="IMG_ICON" />
            <div class="item_box">
              <span class="text_4" v-html="`订单号:${item.id}`"></span>
              <span class="text_6" v-html="`金额:${getPrice(item.number)}`"></span>
              <span class="text_7" v-html="item.updated_at"></span>
            </div>
          </div>
          <span class="text_2" v-if="!listData?.length">你还没有记录!</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, ref, toRefs, getCurrentInstance } from "vue";
import { payoutList } from "@/service/user";
export default {
  setup() {
    const datab = getCurrentInstance();
    let listData = [];
    onMounted(async () => {
      const res = await payoutList();
      console.log("payoutList====", res, datab);
      if (res?.code == 1) {
        listData = res?.data || datab.data.loopData;
      } else {
        alert(res?.msg || "推⼴提现列表失败!");
      }
    });
    return {
      listData,
      IMG_ICON: require("../assets/images/commissionPrice.png"),
    };
  },
  data() {
    return {
      loopData: [
        {
          id: "1",
          number: "50", //提现⾦额 单位分
          updated_at: "2024-03-23 23:30:45",
        },
      ],
      // loopData0: [
      //   {
      //     lanhuimage0:
      //     require("../assets/images/commissionPrice.png"),
      //     lanhutext0: '提现&nbsp;100.00元',
      //     lanhutext1: '成功',
      //     lanhufontColor1: 'rgba(29,194,144,1)',
      //     lanhutext2: '16:38',
      //   },
      //   {
      //     lanhuimage0:
      //     require("../assets/images/commissionPrice.png"),
      //     lanhutext0: '提现&nbsp;100.00元',
      //     lanhutext1: '失败',
      //     lanhufontColor1: 'rgba(221,51,38,1)',
      //     lanhutext2: '16:38',
      //   },
      //   {
      //     lanhuimage0:
      //     require("../assets/images/commissionPrice.png"),
      //     lanhutext0: '提现&nbsp;100.00元',
      //     lanhutext1: '审核中',
      //     lanhufontColor1: 'rgba(34,101,229,1)',
      //     lanhutext2: '16:38',
      //   },
      // ],
      constants: {},
    };
  },
  methods: {
    onClickLeft: () => {
      history.back();
    },
    getPrice(price) {
      return "￥" + (price / 10).toFixed(2);
    },
  },
};
</script>
<style scoped lang="less">
body * {
  box-sizing: border-box;
  //flex-shrink: 0;
}

body {
  font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma, Arial, PingFang SC-Light, Microsoft YaHei;
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

.page {
  position: relative;
  width: 750px;
  height: 1624px;
  overflow: hidden;

  .group_1 {
    background-color: rgba(245, 247, 247, 1);
    height: 1624px;

    .box_1 {
      background-color: rgba(255, 255, 255, 1);
      padding-bottom: 39px;

      .section_1 {
        background-color: rgba(255, 255, 255, 1);
        padding: 27px 28px 25px 40px;

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
      }

      .section_2 {
        width: 399px;
        margin: 26px 303px 0 48px;

        .image_2 {
          width: 20px;
          height: 36px;
          margin: 7px 0 5px 0;
        }

        .text_2 {
          overflow-wrap: break-word;
          color: rgba(34, 34, 34, 1);
          font-size: 34px;
          letter-spacing: 1.806249976158142px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          text-align: left;
          white-space: nowrap;
          line-height: 48px;
        }
      }
    }

    .box_2 {
      padding: 17px 24px 26px 24px;
      .text_2 {
        overflow-wrap: break-word;
        color: gray;
        font-size: 30px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        white-space: nowrap;
        justify-content: center;
        margin-top: 20px;
        display: flex;
      }

      .text_3 {
        overflow-wrap: break-word;
        color: rgba(34, 34, 34, 1);
        font-size: 28px;
        font-family: PingFang-SC-Medium;
        font-weight: normal;
        text-align: right;
        white-space: nowrap;
        line-height: 40px;
        margin: 0 642px 0 4px;
      }

      .list_1 {
        height: 400px;
        margin-top: 14px;

        .list-items_1 {
          box-shadow: 0px 7px 7px 4px rgba(180, 180, 180, 0.06);
          background-color: rgba(255, 255, 255, 1);
          border-radius: 14px;
          width: 702px;
          margin-bottom: 18px;
          padding: 39px 40px 39px 42px;
          display: flex;

          .image_3 {
            width: 60px;
            height: 60px;
            align-self: center;
            margin-right: 10px;
          }

          .item_box {
            flex-wrap: wrap;
            display: flex;
          }

          .text_4 {
            overflow-wrap: break-word;
            color: rgba(34, 34, 34, 1);
            font-size: 30px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            white-space: nowrap;
            line-height: 42px;
            flex-wrap: wrap;
            flex: 100%;
          }

          .text_5 {
            overflow-wrap: break-word;
            font-size: 30px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            white-space: nowrap;
            line-height: 42px;
            text-align: left;
          }

          .text_6 {
            overflow-wrap: break-word;
            color: rgba(144, 144, 144, 1);
            font-size: 28px;
            font-family: PingFang-SC-Medium;
            font-weight: normal;
            text-align: left;
            white-space: nowrap;
            line-height: 40px;
            margin-top: 1px;
            flex: 1;
            text-align: left;
          }

          .text_7 {
            overflow-wrap: break-word;
            color: rgba(144, 144, 144, 1);
            font-size: 28px;
            font-family: PingFang-SC-Medium;
            font-weight: normal;
            text-align: left;
            white-space: nowrap;
            line-height: 40px;
            margin-top: 1px;
            flex: 1;
            text-align: right;
          }
        }
      }

      .box_3 {
        background-color: rgba(59, 59, 59, 1);
        border-radius: 5px;
        width: 262px;
        height: 10px;
        margin: 917px 231px 0 209px;
      }
    }
  }
}
</style>
