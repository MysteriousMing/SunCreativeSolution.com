// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueScroll from 'vue-scroll'

Vue.use(BootstrapVue)
Vue.use(VueScroll, {
  throttle: 100
})
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
