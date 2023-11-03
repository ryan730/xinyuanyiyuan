<template>
    <van-nav-bar title="入职测评" />
    <div>
        <img :src="require('../assets/images/bz@1x.png')" alt="" class="bg_img">
    </div>
    <van-row class="title_1" justify="center">
        <span>心云亦云公司入职测评</span>
    </van-row>
    <van-row class="title_2" justify="center">
        <span>职业在线测评是招聘筛选人才的一个环节，考察的是map性格测验、tpo心理成熟度测验，有些岗位还会考察IQT思维能力测验，tpo心理成熟度测验和IQT思维能力测验刷人率都很高</span>
    </van-row>
    <div class="regis-container">

        <van-form ref="formRef" @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="result.name" name="name" label="姓名" placeholder="姓名"
                    :rules="[{ required: true, message: '请填写姓名' }]" />
                <van-field v-model="result.birthday" is-link readonly name="birthday" label="出生日期" placeholder="点击选择出生日期"
                    @click="showPicker.birthday = true" :rules="[{ required: true, message: '请选择出生日期' }]" />
                <!-- <van-field v-model="result.position" is-link readonly name="应聘职位" label="应聘职位" placeholder="点击选择应聘职位"
                    @click="showPicker.position = true" :rules="[{ required: true, message: '请选择应聘职位' }]" /> -->
                <van-field name="gender" label="性别">
                    <template #input>
                        <van-radio-group v-model="result.gender" direction="horizontal">
                            <van-radio name="1">男</van-radio>
                            <van-radio name="2">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="result.position" name="position" label="应聘职位" placeholder="请填写应聘职位"
                    :rules="[{ required: true, message: '请填写应聘职位' }]" />
                <van-field ref="formMobileRef" v-model="result.mobile" name="mobile" label="手机号" placeholder="填写手机号码"
                    maxlength="11" type="number"
                    :rules="[{ required: true, message: '请填写正确手机号', validator: validator_mobile }]" />
                <van-field v-model="result.code" center clearable name="code" label="验证码" placeholder="输入短信验证码"
                    :rules="[{ required: true, message: '请输入短信验证码' }]">
                    <template #button>
                        <van-button size="small" type="primary" color="#FFA000" @click="getSMSHandler" class="vanb"
                            :disabled="disabledsms">
                            <span v-if="!disabledsms">发送验证码</span>
                            <van-count-down ref="countDown" class="vcd" :time="time" format="ss" v-if="disabledsms"
                                @finish="onFinish" />
                            <span v-if="disabledsms">秒后重试</span>
                        </van-button>
                    </template>
                </van-field>
            </van-cell-group>
            <div class="regist-text">
                <h5 @click="gotoLoginHandler">登录账号</h5>
            </div>
            <div class="regis-submit">
                <van-button type="primary" block native-type="submit" :loading="loading" color="#FFA000">
                    注 册
                </van-button>
            </div>



            <van-popup v-model:show="showPicker.birthday" position="bottom">
                <van-date-picker v-model="currentDate" title="出生日期" @confirm="onConfirm_date"
                    @cancel="showPicker.birthday = false" />
            </van-popup>
            <van-popup v-model:show="showPicker.position" position="bottom">
                <van-picker :columns="columns" @confirm="onConfirm_role" @cancel="showPicker.role = false" />
            </van-popup>

        </van-form>
    </div>
</template>
<script>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { FormInstance, showToast } from 'vant';
import { getRegister, getsms } from '@/service/login';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { debounce, getPxToRem } from "@/utils";

export default {
    setup() {
        const disabledsms = ref(false);
        const loading = ref(false);
        const formRef = ref(null);
        const formMobileRef = ref(null);
        const store = useStore();
        const router = useRouter();
        const time = ref(60 * 1000);
        const countDown = ref(null);

        const onSubmit = debounce(async (values) => {
            console.log('onSubmit-values======', values)
            loading.value = true;
            const { code, mobile, birthday, gender, name, position } = values;

            const res = await getRegister(mobile, name, birthday, position, code, gender);
            const { data, msg } = res;
            console.log('Register', res);
            if (data) {
                const { uid, token, status, name } = data;
                if (token) {
                    window.localStorage.setItem('token', JSON.stringify({
                        "uid": uid,
                        "token": token,
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
            name: '',
            birthday: '',
            position: '',
            mobile: '',
            code: '',
            gender: '1',
        })

        const showPicker = reactive({
            birthday: false,
            position: false,
        })

        const columns = [
            { text: '杭州', value: 'Hangzhou' },
            { text: '宁波', value: 'Ningbo' },
            { text: '温州', value: 'Wenzhou' },
            { text: '绍兴', value: 'Shaoxing' },
            { text: '湖州', value: 'Huzhou' },
        ];

        const onConfirm_date = ({ selectedValues }) => {
            result.birthday = selectedValues.join('/');
            showPicker.birthday = false;
        }

        const onConfirm_role = ({ selectedOptions }) => {
            result.position = selectedOptions[0]?.text;
            showPicker.position = false;
        };

        const onFinish = () => {
            disabledsms.value = false;
        }

        onMounted(() => {

        })

        onBeforeUnmount(() => {
            time.value = 0;
        })


        const currentDate = ref(['2023', '01', '01']);

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
                    disabledsms.value = true;
                    const res = await getsms(result.mobile);
                    console.log('getSMSHandler', res);
                    const { code, msg, data } = res;
                    if (code == 1 && data == 'ok') {
                        showToast('验证码已发送，请注意查收');
                    } else {
                        showToast('验证码获取失败!');
                    }
                }

            } catch (e) {
                console.log('getSMSHandler-err:', e);
            }
        }, 1000);

        const gotoLoginHandler = () => {
            router.push({
                name: 'login',
            })
        }

        return {
            formMobileRef,
            onSubmit,
            onConfirm_date,
            onConfirm_role,
            showPicker,

            currentDate,
            columns,
            result,
            validator_mobile,
            getSMSHandler,
            gotoLoginHandler,
            onFinish,
            disabledsms,
            time,
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
    position: absolute;
    width: 100%;
}

.regis-container {
    // padding-top: 370px;

    .regis-submit {
        padding: 0 100px;
        margin-top: 60px;
    }

    .van-button {
        // margin-top: 20px;
    }
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
</style>
<style lang="less">
.regis-container {
    .vanb {
        .van-button__text {
            display: flex;
            align-items: center;

        }
    }

    .vcd {
        color: white;
    }

}
</style>