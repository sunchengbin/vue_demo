export default {
  state: {
    homeInfo: {
      name: 'home'
    }
  },
  getters: {
    homeName (state) {
      return 'home is ' + state.homeInfo.name
    }
  },
  mutations: {
    getHomeName (state) {
      state.homeInfo.name = 'home is ' + state.homeInfo.name
    }
  },
  actions: {
    getActionHomeName ({ commit }) {
      setTimeout(() => {
        commit('getHomeName')
      }, 100)
    }
  }
}
