import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import payPanel from './modules/pay_panel'
import thumb from './modules/thumb'
import statistics from './modules/statistics'

Vue.use(Vuex)
const state = {
  openid: process.env.NODE_ENV === 'development' ? 'o14xfwKLuC5TdvXUZ1I3tMFRELHw' : '',
  unionid: process.env.NODE_ENV === 'development' ? 'o6qE3t_HiGWR-A-Pxi4aA84XpGp4' : '',
  device: '',
  mv_version: '',
  emoji_version: '',
  zhuzai_version: '',
  gm_version: '',
  atm_version: '',
  vod_type: '',
  ba: '',
  bind_status: '',
  user_img: null,
  user_name: '未登录',
  rights_desc: '',
  balance: 0,
  is_vip: false,
  vip_end_time: '',
  vip_packages: []
}
const Store = new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    thumb,
    payPanel,
    statistics
  }
})
export default Store
