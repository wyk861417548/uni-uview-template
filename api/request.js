
import api from '@/api/api.js';
import store from '@/store/index.js';
      
// 用于记录同时发送请求次数，用于处理
let ajaxTimes = 0;

/**
 * @param {Object} url  请求的接口地址
 * @param {Object} data 请求参数
 * @param {Object} method 请求方法
 * @param {Object} opts 自定义配置 load是否显示加载动画，back当前接口无论状态是多少，都返回前端 ，不进入统一错误处理
*/

export function request({url,data,method,opts={},uploadFile=false}){
	ajaxTimes++;
  let token =store.getters['token'].token;

	if(opts.load != false || !opts.back){
		uni.showLoading({mask: true,title:"加载中..."});
	}

  // 如果不是上传图片
  if(!uploadFile){
    return new Promise((resolve)=>{
      uni.request({
        url,
        header:{
          "Authorization":token || "",
          ...(opts.header || {})
        },
        data,
        method,
        ...EVENT
      })
    })
  }else{
    return new Promise((resolve)=>{
      uni.uploadFile({
        url,
        filePath: data.filePath,
        name: 'file',
        header:{
          "Authorization":token || "",
          ...(opts.header || {})
        },
        ...EVENT
      });
    })
  }
}

// 请求事件
let EVENT = {
  success:(res)=>{requestHandle(res,resolve,opts)},
  fail:()=>{uni.showToast({title:"请稍后再试",icon:"none"})},
  complete:()=>{
    ajaxTimes--;
    if(ajaxTimes == 0 || !opts.back){
      uni.hideLoading()
    }
  }
}

// 请求成功事件处理
function requestHandle(res,resolve,opts){
  if((res.statusCode == 200 && res.data.code == 200) || opts.back){
    resolve(res.data);
  }else{
    handle(res.data)
  }
}

//错误统一处理
function handle(res){
	// 未登录 
	if(res.code == 10106){
		var content = res.code ==10106?'抱歉由于您未登录或者登录状态过期，请重新授权登录':'抱歉由于您未有身份信息，请重新登录申请'
		uni.showModal({
      title:'提示',
      content,
      showCancel:false,
      success: function (res) {
        if(res.confirm)uni.reLaunch({url:"/pages/login/login?edit=true"})
      }
		});
		return;
	}
	uni.showToast({title:res.message?res.message:"请稍后再试",icon:"none"})
}



