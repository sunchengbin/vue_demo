// 封装http请求
import axios from 'axios'
import qs from 'qs'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 50000
})

http.interceptors.request.use(config => {
  // 请求头里面加入各种判断
  if (config.method === 'post' && config.data && config.data.constructor !== FormData) {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  //
  config.baseURL = 'baseUrl'
  console.log('baseUrl is ' + config.baseURL)
  return config
}, error => {
  // 拦截请求错误
  Promise.reject(error)
})

http.interceptors.response.use(response => {
  const res = response.data
  return res
  // if (res.errcode === 200) {
  //   return res
  // } else {
  //   if (res.code === 200) {
  //     return res
  //   } else {
  //     // 根据不同错误码进行提示
  //     return Promise.reject(res.message)
  //   }
  // }
}, error => {
  // 调用一个错误提醒dialog
  return Promise.reject(error)
})

export default http
