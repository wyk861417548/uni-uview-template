import store from '@/store/index.js';
import {domain} from './api'

const ERROR = {
  // 登录失效状态
  CODE:'10106',
  // 同一错误提示字段
  MSG:'msg'
}

// 用于记录同时发送请求次数，用于处理
let ajaxTimes = 0;
const token =store.state.token;

/**
 * @param {Object} url  请求的接口地址
 * @param {Object} data 请求参数
 * @param {Object} method 请求方法 get post
 * 
 * @param {Object} opts 
 * @param {Object} opts.load 是否显示加载动画
 * @param {Object} opts.back 无论接口状态是多少都返回，不进入统一错误处理
 * @param {Object} opts.domain 当前接口的请求地址 默认使用统一接口配置
 * @param {Object} opts.uploadFile 是否是上传文件
 * 
*/
export function request({url,data,method,opts={}}){
	ajaxTimes++;

	if(opts.load != false || !opts.back){
		uni.showLoading({mask: true,title:"加载中..."});
	}

  // 如果不是上传图片
  if(!opts.uploadFile){
    return new Promise((resolve)=>{
      uni.request({
        data,
        method,
        ...EVENT({url,resolve,opts})
      })
    })
  }else{
    return new Promise((resolve)=>{
      uni.uploadFile({
        filePath: data.filePath,
        name: 'file',
        ...EVENT({url,resolve,opts})
      });
    })
  }
}

// 请求事件
let EVENT = ({url,resolve,opts})=>{
  return {
    url:(opts.domain || domain) + url,
    header:{
      "Authorization":token || "",
      ...(opts.header || {})
    },
    success:(res)=>{requestHandle(res,resolve,opts)},
    fail:()=>{uni.showToast({title:"请稍后再试",icon:"none"})},
    complete:()=>{
      ajaxTimes--;
      if(ajaxTimes == 0 || !opts.back){
        uni.hideLoading()
      }
    }
  }
}

// 请求成功事件处理
function requestHandle(res,resolve,opts){
  let data = res.data;
  if(opts.uploadFile) data = JSON.parse(res.data);
  if((res.statusCode == 200 && data.code == 200) || opts.back){
    resolve(data);
  }else{
    handle(data)
  }
}

//错误统一处理
function handle(res){
	// 未登录 
	if(res.code == ERROR.CODE){
		var content = res.code ==ERROR.CODE?'抱歉由于您未登录或者登录状态过期，请重新授权登录':'抱歉由于您未有身份信息，请重新登录申请'
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
	uni.showToast({title:res[ERROR.MSG]?res[ERROR.MSG]:"请稍后再试",icon:"none"})
}



