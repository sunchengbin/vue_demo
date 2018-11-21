import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)
const state = {
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
export default new Vuex.Store({
  state,
  actions,
  mutations
})
