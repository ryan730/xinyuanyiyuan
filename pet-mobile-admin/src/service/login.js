import axios from "../utils/axios";

// {
//   "code": 1,
//   "msg": "",
//   "data": {
//       "uid": 363,
//       "token": "Bearer MzczNGViNWMyMjNjYWMxZDIzODMxYTE0N2JmOWM0YTJ8fDM2M3x8YWE2Nzk1NjFlN2EzMDM5NzRjOTc0YjFlMTg3ZmQ5YWY="
//   }
// }

export function login(code, mobile) {
  return axios.post(`/user/login?code=${code}&mobile=${mobile}`);
}

export function getsms(mobile) {
  return axios.post(`/user/sms?mobile=${mobile}`);
}

export function getRegister(mobile, name, birthday, position, code, gender) {
  return axios.post(
    `/user/reg?mobile=${mobile}&name=${name}&birthday=${birthday}&position=${position}&code=${code}&gender=${gender}`
  );
}

export function userLogin(code) {
  return axios.post(`/user/userLogin?code=${code}`);
}
