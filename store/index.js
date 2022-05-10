import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import caseInfomation from './modules/caseInfomation.js'

Vue.use(Vuex)
const store = () => new Vuex.Store({

  modules: {
    user,
    caseInfomation
  }
})
export default store