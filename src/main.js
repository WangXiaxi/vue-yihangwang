// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import 'lib-flexible/flexible.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import { Lazyload, Indicator, Toast, InfiniteScroll, Popup } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(InfiniteScroll)
Vue.component(Popup.name, Popup)
Vue.prototype.loading = Indicator
Vue.prototype.toast = Toast
Vue.use(Lazyload)

// 引入swiper
require('swiper/dist/css/swiper.min.css')
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
