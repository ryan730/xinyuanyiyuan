import axios from '../utils/axios';

// export function getType() {
//     return axios.post(`/index/type`);
// }
// export function getUserList(params) {
//     const { type, status } = params;
//     return axios.post(`/user/testList?type=${type}&status=${status}`);
// }
export function getPetShareUrl () {
    return axios.post(`/user/getPetShareUrl`);
}
export function shareOrderList () {
    return axios.post(`/user/shareOrderList`);
}