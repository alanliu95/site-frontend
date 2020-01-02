const state = {
  site: ''
}
const mutations = {
  SET_SITE: (state, site) => {
    state.site = site
  }
}
const actions = {
  setSite({ commit }, site) {
    return new Promise((resolve, reject) => {
      commit('SET_SITE', site)
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
