<template>
    <van-nav-bar title="登陆" />
    <div>
        <img :src="require('../assets/images/login-pic.png')" alt="" class="bg_img">
    </div>
    <!-- <van-row class="title_1" justify="center">
        <span>心云亦云公司入职测评</span>
    </van-row>
    <van-row class="title_2" justify="center">
        <span>职业在线测评是招聘筛选人才的一个环节，考察的是map性格测验、tpo心理成熟度测验，有些岗位还会考察IQT思维能力测验，tpo心理成熟度测验和IQT思维能力测验刷人率都很高</span>
    </van-row> -->
    <div class="login-container">

        <van-form ref="formRef" @submit="onSubmit">
            <van-cell-group inset>
                <van-field ref="formMobileRef" v-model="result.mobile" name="mobile" label="手机号" placeholder="填写手机号码"
                    maxlength="11" :rules="[{ required: true, message: '请填写正确手机号', validator: validator_mobile }]">

                    <template #button>
                        <van-button size="small" type="primary" color="#23bcba" @click="getSMSHandler" class="vanb"
                            :disabled="disabledsms">
                            <span v-if="!disabledsms">发送验证码</span>
                            <van-count-down ref="countDown" class="vcd" :time="time" format="ss" v-show="disabledsms"
                                @finish="onFinish" />
                            <span v-if="disabledsms">秒后重试</span>
                        </van-button>
                    </template>

                </van-field>
                <van-field v-model="result.code" center clearable name="code" label="验证码" placeholder="输入短信验证码"
                    autocomplete="one-time-code" :rules="[{ required: true, message: '请输入短信验证码' }]">
                </van-field>
            </van-cell-group>
            <div class="regist-text">
                <h5 @click="gotoRegistHandler">注册账号</h5>
            </div>
            <div class="login-submit">
                <van-button type="primary" block native-type="submit" :loading="loading" color="#23bcba">
                    进入答题
                </van-button>
            </div>

        </van-form>
    </div>
</template>
<script>
import { ref, reactive, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { FormInstance, showToast } from 'vant';
import { login, getsms } from '@/service/login';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { debounce, getPxToRem } from "@/utils";

export default {
    setup() {
        const loading = ref(false);
        const disabledsms = ref(false);
        const formRef = ref(null);
        const formMobileRef = ref(null);
        const router = useRouter();
        const store = useStore();
        const time = ref(60 * 1000);
        const countDown = ref(null);

        const onSubmit = debounce(async (values) => {
            console.log('values======', values)
            loading.value = true;
            const { code, mobile } = values;

            const res = await login(code, mobile);
            console.log('submit=====', res);
            if (res?.data) {
                const { uid, token, status } = res?.data || {};
                if (token) {
                    window.localStorage.setItem('token', JSON.stringify({
                        "uid": uid,
                        "token": token,
                        "time": new Date().getTime()
                    }));
                    store.commit('addUtid', uid);
                }
                if (status == 1) {
                    router.push({
                        name: 'index',
                    });
                } else {
                    showToast(res?.msg || "登录失败!");
                }
            } else {
                showToast(res?.msg || "登录失败!");
            }


        }, 500);

        const result = reactive({
            mobile: '',
            code: ''
        })

        const onFinish = () => {
            disabledsms.value = false;
        }


        const validator_mobile = (value) => {
            //手机号校验规则
            const reg = /^1[3456789]\d{9}$/;
            return reg.test(value);
        }

        const getSMSHandler = debounce(async () => {
            try {
                const valiate = await formMobileRef.value.validate();
                console.log('valiate', valiate);
                if (!valiate) {
                    result.code = '';
                    const res = await getsms(result.mobile);
                    disabledsms.value = true;
                    console.log('getSMSHandler', res);
                    const { code, msg, data } = res;
                    if (code == 1 && data == 'ok') {
                        showToast('验证码已发送，请注意查收');
                    }
                }
            } catch (e) {
                console.log('getSMSHandler-err:', e); s
            }
        }, 1000);

        const gotoRegistHandler = () => {
            router.push({
                name: 'register',
            })
        }

        onBeforeUnmount(() => {
            time.value = 0;
        })

        return {
            formRef,
            formMobileRef,
            onSubmit,
            result,
            validator_mobile,
            getSMSHandler,
            gotoRegistHandler,
            disabledsms,
            time,
            onFinish,
            countDown,
        };
    },
};
</script>
<style scoped lang="less">
.title_1 {
    display: flex;
    justify-content: center;
    padding: 69px 125px 0 125px;
    // width: 500px;
    // height: 70px;
    font-size: 50px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 70px;

    span {
        z-index: 1;
    }
}

.title_2 {
    display: flex;
    justify-content: center;
    padding: 23px 55px 65px 55px;
    // width: 640px;
    // height: 198px;
    font-size: 28px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 44px;

    span {
        z-index: 1;
    }
}

.bg_img {
    //position: absolute;
    width: 375px;
    height: 287px;
    margin-top: 56px;
    margin-left: 95px;
    margin-bottom: 118px;
}

.login-container {
    // padding-top: 370px;

    .login-submit {
        padding: 0 100px;
        margin-top: 50px;
    }

    .van-field {
        background-color: #f6f6f6;
        border-radius: 50px;
        margin-bottom: 30px;
    }

    .regist-text {
        display: flex;
        justify-content: center;
        padding: 50px 0 0;

        h5 {
            font-size: 30px;
            text-decoration: underline;
        }
    }

    .vcd {
        color: white;
    }
}
</style>
<style lang="less">
.login-container {
    .van-button {
        border-radius: 30px;
        color: white;
        background: rgb(205 205 205);
        border-color: rgb(205 205 205);
        border-radius: 60px;
    }
    .vanb {
        .van-button__text {
            display: flex;
            align-items: center;
        }
    }

}
</style>