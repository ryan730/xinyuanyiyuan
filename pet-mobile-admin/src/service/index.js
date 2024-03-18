import axios from '../utils/axios';


// {
//     "id": 13,
//     "title": "趣兴业职德兰霍 SDS ",
//     "sub_title": "步一第场职好走，趣兴业职解了",
//     "extra": '{"topic_desc":null,"basic_desc":"果结评测，要重很息信本基"}',
//     "estimate_time": 35,
//     "topic_num": 192,
//     "rtimes": 2100,
//     "finished": 0
// }



export function getIndexList(type) {
    ////return axios.post(`/index/list?type=${type}`);
    return axios.post(`/user/testlist`);
}