import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
//import axios from 'axios'
import request from './axios'
import qs from 'qs'
require("./mock")


Vue.config.productionTip = false
Vue.use(Element)
//Vue.prototype.$axios = axios
Vue.prototype.$axios = request
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
