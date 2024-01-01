<template>
    <div class="page flex-col">
        <div class="section_1 flex-row">
            <div class="box_3 flex-col">
                <span class="text_2">入职测评</span>
                <img class="image_2" referrerpolicy="no-referrer" :src="require('../assets/images/star.png')" />
                <span class="paragraph_1">恭喜您完成所有测评项目，<br />请保持所留联系方式的畅通。如有后续<br />进展，工作人员将联系您。</span>
                <div class="text-wrapper_1 flex-col" @click="closeHandler">
                    <span class="text_3">关闭</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            constants: {},
            closeHandler: () => {
                window.close();
            }
        };
    },
    methods: {},
};
</script>

<style lang="less" scoped>
// body * {
//     box-sizing: border-box;
//     flex-shrink: 0;
// }

// body {
//     font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
//         Arial, PingFang SC-Light, Microsoft YaHei;
// }

// input {
//     background-color: transparent;
//     border: 0;
// }

// button {
//     margin: 0;
//     padding: 0;
//     border: 1px solid transparent;
//     outline: none;
//     background-color: transparent;
// }

// button:active {
//     opacity: 0.6;
// }

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
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.section_1 {}

.box_1 {
    margin-bottom: 1552px;
    padding: 27px 28px 26px 40px;
}

.box_2 {}

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

.box_3 {
    background-color: rgba(255, 255, 255, 1);
    margin: 0;
    padding: 24px 88px 722px 89px;
}

.text_2 {
    overflow-wrap: break-word;
    color: rgba(0, 0, 0, 1);
    font-size: 34px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 48px;
    align-self: center;
}

.image_2 {
    width: 160px;
    height: 154px;
    align-self: center;
    margin-top: 303px;
}

.paragraph_1 {
    width: 573px;
    height: 153px;
    overflow-wrap: break-word;
    color: rgba(34, 34, 34, 1);
    font-size: 32px;
    letter-spacing: 1.7000000476837158px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    line-height: 51px;
    margin-top: 24px;
}

.text-wrapper_1 {
    background-color: rgba(35, 188, 187, 1);
    border-radius: 12px;
    align-self: center;
    margin-top: 45px;
    padding: 20px 90px 20px 91px;
}

.text_3 {
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 28px;
    letter-spacing: 1.4874999523162842px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    line-height: 40px;
}
</style>