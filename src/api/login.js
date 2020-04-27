import fetch from '../utils/request';
// 获取验证码
export const GetSms = params => fetch('/getSms/', params, 'POST')