import {
  SAVE_FROM_WAY
} from '../type'

export default {
  state: {
    fromWay: 'default'
  },
  mutations: {
    [SAVE_FROM_WAY] (state, payload) {
      state.fromWay = payload.fromWay || 'default'
    }
  }
}
