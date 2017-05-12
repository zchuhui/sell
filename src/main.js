// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router' 
import VueResource from 'vue-resource'
import App from './App'

import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Sellers from './components/seller/Seller.vue'

// 统一引入css样式
import 'common/styles/index.styl'

// 全局注册
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
	{ path: '/goods', component: Goods},
	{ path: '/ratings', component: Ratings},
	{ path: '/sellers', component: Sellers} 
]

const router = new VueRouter({
  linkActiveClass:'active',
  routes
})


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router:router
})

// 直接跳到这个链接
//router.go('/sellers');