import Vue from 'vue'
import App from './App'
import uView from './uview-ui'

import store from 'store'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
  store,
  ...App
})
app.$mount()
