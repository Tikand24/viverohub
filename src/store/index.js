import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './snackbar'
import plants from './plants'
import complements from './complements'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    snackbar,
    plants,
    complements
  }
})
