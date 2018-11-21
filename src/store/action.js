import {
  chttp,
  apis
} from '@/libs/interfaces'
import Vue from 'vue'
export default {
  // 设备信息
  getDeviceInfo ({
    commit,
    state
  }) {
    let openid = state.openid || 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd'
    let unionid = state.unionid || 'o6qE3t8QKr3uYqrgbknYUSE72RiM'
    chttp.post(apis.deviceUrl, {
      openid: openid,
      unionid: unionid
    }, 'other')
      .then(res => {
        let device = res.device
        console.log(res)
        commit('SAVE_DEVICE_INFO', device)
      })
      .catch(function (err) {
        Vue.$toast(err)
      })
  },
  // 功能版本信息
  getFuncVersion ({
    commit,
    state
  }) {
    let openid = state.openid || 'o3JAqt0Jr9vtoVncMW7ZBnHFvUd'
    let unionid = state.unionid || 'o6qE3t8QKr3uYqrgbknYUSE72RiM'
    chttp.get(apis.funcUrl, {
      openid: openid,
      unionid: unionid
    }, 'other')
      .then(res => {
        commit('SAVE_FUNC_VERSION', res || {})
      }).catch(err => {
        Vue.$toast(err)
      })
  }
}
