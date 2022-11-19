import Vue from 'vue'
import App from './App'
import uView from './uview-ui'

import store from 'store'
Vue.config.productionTip = false
// import './utils/h5-interceptor.js'
// import './utils/interceptor.js'

App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
  store,
  ...App
})
app.$mount()
