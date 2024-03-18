import axios from '../utils/axios';

export function getRecommend() {
    return axios.post('/index/recommend');
}

export function focusList() {
    return axios.post('/test/focusList');
}