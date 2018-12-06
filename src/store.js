import Vue from 'vue'
import Vuex from 'vuex'
import Home from '@/store/modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      firstName: ' cheng bin',
      name: 'sun',
      logo: 'logo'
    }
  },
  getters: {
    allName (state) {
      return state.userInfo.name + state.userInfo.firstName
    }
  },
  mutations: {
    changeName (state, payload) {
      state.userInfo.name = payload.name
    }
  },
  actions: {
    changeNameAction (context, payload) {
      setTimeout(() => {
        context.commit('changeName', payload)
      }, 100)
    }
  },
  modules: {
    home: Home
  }
})
