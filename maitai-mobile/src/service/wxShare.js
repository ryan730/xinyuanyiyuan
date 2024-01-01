import axios from '../utils/axios';

export function getcfg(url) {
    return axios.post(`http://api.xinyunyiyun.cn/wechat/getcfg?url=${url}`);
}