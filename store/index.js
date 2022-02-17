import Vue from 'vue'
import Vuex from 'vuex'

// uni-app没有cookie  所以使用vuex和本地缓存的方式实现 保持cookie

Vue.use(Vuex)

//数据存储键值
const localKey = 'USER';

let state = {
	// 用户信息（登录之后获取）
	userinfo:false,
	
	// 跳转地址
	jumpUrl:"",

  token:"",

  applyInfo:null

}

//存储状态数据
let saveState = function(state,boolen){
	uni.setStorage({
		key: localKey,
		data: JSON.stringify(state),
		success: function () {
			// 退出
			if(boolen){
				uni.reLaunch({
				   url:"/pages/login/login"
				});
			}
		}
	});
}


//初始化状态数据
let initState = function(){
	
	let localData = uni.getStorageSync(localKey);
		
	let tempData = localData ? JSON.parse(localData) : {};
	
	for(var i in tempData){
		state[i] = tempData[i];
	}
	
	
	return state;
}

const store = new Vuex.Store({
	state:initState(),
	
	mutations:{
		// 用户登录
		userLogin(state,userinfo){
			state.userinfo = userinfo;
			saveState(state);
		},
		
		// 用户退出登录
		userRegister(state){
			state.token = {};
			saveState(state,true);
		},
		
		// 设置token
		setToken(state,token){
      state.userinfo = false;
			state.token = token;
			saveState(state);
		},
		
		// 设置跳转地址
		setLoginJumpUrl(state,url){
			state.jumpUrl = url;
			saveState(state);
		},


    setApplyInfo(state,data){
			state.applyInfo = data;
			saveState(state);
		},

	},
	
	getters:{
		// 获取token
		token:(state)=>{
			return state.token;
		}
	}
})

export default store