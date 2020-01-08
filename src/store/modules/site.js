const state = {
  name: '',
  id: 0
}
const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
}
const actions = {
  setSite({ commit }, {name,id}) {
    return new Promise((resolve, reject) => {
      commit('SET_NAME', name)
      commit('SET_ID', id)
      sessionStorage.setItem('siteName',name)
      sessionStorage.setItem('siteId',id)
      resolve()
    })
  },
}

const getters={
  id: state => state.id,
  name: state => state.name,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
