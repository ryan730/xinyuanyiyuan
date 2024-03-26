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
export function commissionList () {
    return axios.post(`user/commissionList`);
}

export function payouts () {
    return axios.post(`user/payouts`);
}
export function commissionAmount () {
    return axios.post(`user/commissionAmount`);
}
export function payoutList () {
    return axios.post(`user/payoutList`);
}