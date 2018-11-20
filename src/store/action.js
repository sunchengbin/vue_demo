import {
  http,
  apis
} from '@/libs/interfaces'
import Vue from 'vue'
export default {
  // 设备信息
  getDeviceInfo ({
    commit,
    state
  }) {
    let openid = state.openid || '12222'
    let unionid = state.unionid || '12222'
    http.post(apis.deviceUrl, {
      openid: openid,
      unionid: unionid
    }, 'other')
      .then(res => {
        let device = res.device
        commit('SAVE_DEVICE_INFO', device)
      })
      .catch(function (err) {
        Vue.$toast(err.errmsg)
      })
  },
  // 功能版本信息
  getFuncVersion ({
    commit,
    state
  }) {
    let openid = state.openid
    let unionid = state.unionid
    http.get('https://coupon.ktvsky.com/stb/func', {
      openid: openid,
      unionid: unionid
    }, 'other')
      .then(res => {
        commit('SAVE_FUNC_VERSION', res || {})
      }).catch(err => {
        Vue.$toast(err.errmsg)
      })
  }
}
