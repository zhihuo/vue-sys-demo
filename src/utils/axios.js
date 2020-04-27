import axios from 'axios'
axios.defaults.timeout = 5000;

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const Axios = axios.create({
  baseURL: BASEURL, // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/json'
  }
});


//请求拦截
Axios.interceptors.request.use((config) => {

  return config;
}, (err) => {
  return Promise.reject(err);
});
//响应拦截//
Axios.interceptors.response.use((res) => {
  return res

}, (err) => {
  return Promise.reject(err);
});

export default Axios