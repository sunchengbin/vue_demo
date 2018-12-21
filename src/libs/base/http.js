// 封装http请求
import axios from 'axios'
import Toast from '@/components/toast/index.js'
import qs from 'qs'
import {
  util
} from '@/libs/utils'

const http = axios.create({
  baseURL: process.env.VUE_APP_KTV_BASEURL,
  timeout: 50000
})
http.interceptors.request.use(config => {
  // 请求头里面加入各种判断
  if (config.method === 'post' && config.data && config.data.constructor !== FormData) {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  // 接口url中添加BaseUrlType查询字段。如：/login?BaseUrlType=coupon
  // 自动切换http请求的BaseUrl为coupon域名
  if (util.getUrlPrem('BaseUrlType', config.url) === 'coupon') {
    config.baseURL = process.env.VUE_APP_COUPON_BASEURL
  }
  // 上传图片的域名
  console.log(config.url, 'config.url', util.getUrlPrem('BaseUrlType', config.url))
  if (util.getUrlPrem('BaseUrlType', config.url) === 'upyun') {
    console.log(44, process.env.VUE_APP_UPYUN_BASEURL)
    config.baseURL = process.env.VUE_APP_UPYUN_BASEURL
    console.log(config.baseURL)
  }
  return config
}, error => {
  Toast(error)
  // 拦截请求错误
  Promise.reject(error)
})

http.interceptors.response.use(response => {
  const res = response.data
  // return res
  if (res.errcode === 200 || res.errcode === 21001) {
    return res
  } else {
    if (res.code === 200) {
      return res
    } else {
      // 根据不同错误码进行提示
      return Promise.reject(res.errmsg)
    }
  }
}, error => {
  Toast(error)
  // 调用一个错误提醒dialog
  return Promise.reject(error)
})

export default http
