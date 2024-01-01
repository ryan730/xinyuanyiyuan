import axios from "../utils/axios";

export function getTest(params) {
  const { id, num, utid } = params;
  return axios.post(`/user/show?test_id=${id}&cur=${num}&utid=${utid}`);
}

export function getBasicTest(id) {
  return axios.post(`/test/basic?test_id=${id}`);
}

export function addTest(params) {
  const { utid, id, num, answer, last } = params;
  return axios.post(
    `/user/topic?utid=${utid}&test_id=${id}&number=${num}&answer=${answer}&last=${last}`
  );
}
