export default {
  // 保存openid
  SAVE_OPENID (state, openid) {
    state.openid = openid
  },
  // 保存unionid
  SAVE_UNIONID (state, unionid) {
    state.unionid = unionid
  },
  // 设备版本
  SAVE_DEVICE_INFO (state, payload) {
    state.device = payload
  },
  // 功能版本信息
  SAVE_FUNC_VERSION (state, payload) {
    state.mv_version = payload.mv || ''
    state.emoji_version = payload.emoji || ''
    state.zhuzai_version = payload.zhuzai || ''
    state.atm_version = payload.qifen || ''
    state.gm_version = payload.guanming || ''
    state.vod_type = payload.liushuiying || ''
    state.ba = payload.ba || ''
  }
}
