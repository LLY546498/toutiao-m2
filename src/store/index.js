import Vue from 'vue'
import Vuex from 'vuex'
import { getItem } from '@/utils/storge'

Vue.use(Vuex)
const USER_KEY = 'toutiao2-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      window.localStorage.setItem(USER_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
