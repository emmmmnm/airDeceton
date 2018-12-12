// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'small' // set element-ui default size
})
// Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
