import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import category from './modules/category.js'
import note from './modules/note.js'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: { category, note },
  state: {},
  plugins: [vuexLocal.plugin]
})
