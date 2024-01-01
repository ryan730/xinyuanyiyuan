import axios from '../utils/axios';

export function getContent(id) {
    return axios.post(`/test/testInfo?test_id=${id}`);
}

export function getUtid(params) {
    const { orderId, testId } = params
    return axios.post(`/user/getUtid?order_id=${orderId}&test_id=${testId}`);
}

export function userOrder(productId) {
    return axios.post(`/user/order?product_id=${productId}`);
}