import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import api from "./utils/api.js"
import validator from "./utils/validator.js"
import config from './utils/config.js';

Vue.config.productionTip = false

// main.js，注意要在use方法之后执行
import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

App.mpType = 'app'

Vue.prototype.$api = api;
Vue.prototype.$validator = validator;
Vue.prototype.$config = config;
Vue.prototype.$store = store;
/** 
 * 页面跳转  
 *    如果设置data-url 使用路由地址跳转 （onload(param)接受参数，地址栏上可见参数）
 * */
Vue.prototype.$skip = (url,params)=>{
	if(!url)return;
	uni.navigateTo({url:url+config.querycode(params)})
}

const app = new Vue({
  ...App
})
app.$mount()
