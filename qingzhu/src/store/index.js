import Vue from "vue"
import vuex from "vuex"
Vue.use(vuex)

import obj from "./mutations"
import actions from "./actions"
import getters from "./getters"

const store = new vuex.Store({
     state:obj.state,
     mutations: obj.mutations,
     actions: actions,
     getters: getters
})

export default store