// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueScroll from 'vue-scroll'
import Http from './utils/request'
import utils from './utils/utils'
import Loading from './directive/loading'

Vue.use(BootstrapVue)
Vue.use(ElementUI)
Vue.use(Loading)

Vue.use(VueScroll, {
  throttle: 100
})
Vue.prototype.Http = Http
Vue.prototype.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
// Disable context menu
// document.addEventListener('contextmenu', event => {
//   event.preventDefault()
//   event.stopPropagation()
// })
// Disable double click selection
// document.addEventListener('mousedown', e => {
//   e.preventDefault()
//   console.log('双击啦')
// })
