import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import api from "./api/api.js"
import validator from "./api/validator.js"
import {post,get,postmult} from './api/request.js'
import config from './api/config.js';

Vue.config.productionTip = false

// main.js，注意要在use方法之后执行
import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

App.mpType = 'app'

Vue.prototype.$api = api;
Vue.prototype.$validator = validator;
Vue.prototype.$post = post;
Vue.prototype.$postmult = postmult;
Vue.prototype.$get = get;
Vue.prototype.$config = config;
Vue.prototype.$store = store;
/** 
 * 页面跳转  
 *    如果设置data-url 使用路由地址跳转 （onload(param)接受参数，地址栏上可见参数）
 * */
 Vue.prototype.$skip = (e)=>{

	var url = e.currentTarget.dataset.url;
	if(!url)return;
	uni.navigateTo({url:url})
}

const app = new Vue({
  ...App
})
app.$mount()
