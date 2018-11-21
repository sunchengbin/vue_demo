import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)
const state = {
  openid: '',
  unionid: '',
  device: '',
  mv_version: '',
  emoji_version: '',
  zhuzai_version: '',
  gm_version: '',
  atm_version: '',
  vod_type: '',
  ba: ''
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
