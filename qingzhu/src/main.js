// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//axios
import axios from "axios"
axios.interceptors.response.use(res=>{
  console.log(res)
  return res;
})
Vue.prototype.$axios=axios;
//css
import "./assets/css/reset.css"
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//font
import "./assets/font/iconfont.css"
//全局组件
import commonComponents from "./common"
for (var i in commonComponents){
  Vue.component(i,commonComponents[i])
}
//全局过滤器
import commonFilter from "./filter"
for(var i in commonFilter){
   Vue.filter(i,commonFilter[i])
}

//仓库
import store from "./store/index"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
