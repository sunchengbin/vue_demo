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
  },
  // 绑定状态
  SAVE_BIND_STATUS (state, payload) {
    state.bind_status = payload.bind_status
  },
  // 用户信息/判断是否是vip
  SAVE_USER_INFO (state, payload) {
    state.user_img = payload.headimgurl
    state.user_name = payload.nickname || '小鱼'
    state.rights_desc = payload.rights_desc
    state.balance = payload.balance
    state.is_vip = payload.is_vip
    state.vip_end_time = payload.vip_end_time
  }
}
