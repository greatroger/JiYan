// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
