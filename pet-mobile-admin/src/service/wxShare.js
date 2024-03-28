import axios from '../utils/axios';

export function getcfg(url) {
    return axios.post(`https://api.xinyunyiyun.cn/wechat/getcfg?url=${url}`);
}