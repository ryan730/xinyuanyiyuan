import axios from '../utils/axios';

export function getType() {
    return axios.post(`/index/type`);
}
export function getUserList(params) {
    const { type, status } = params;
    return axios.post(`/user/testList?type=${type}&status=${status}`);
}