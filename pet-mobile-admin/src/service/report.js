import axios from '../utils/axios';

export function getReport(params) {
    const { utid, id, detail } = params;
    return axios.post(`/user/report?utid=${utid}&report_id=${id}&detail=${detail}`);
}

export function getReportFull(params) {
    const { utid, id, detail } = params;
    return axios.post(`/user/testReport?utid=${utid}&report_id=${id}&detail=${detail}`);
}

export function getBasicReport(utid) {
    return axios.post(`/user/testBasic?utid=${utid}`);
}



