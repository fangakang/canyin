// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueScroller from 'vue-scroller'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import publicFun from './js/public.js'
Vue.use(VueScroller);
require('./js/rem.js')
require('./css/style.css')
Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {  //配置发送请求的信息
    publicFun.showLoad();
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
    publicFun.hideLoad();
    return response;
}, function (error) {
    return Promise.reject(error);
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$http = axios  //其他页面在使用axios的时候直接  this.$http就可以了

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
