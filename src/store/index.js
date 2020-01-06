import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import warning from './modules/warning'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    warning
  },
  getters,
  strict:debug
})

export default store
