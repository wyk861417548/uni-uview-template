
import api from '@/api/api.js';
import store from '@/store/index.js';
      
// 用于记录同时发送请求次数，用于处理
let ajaxTimes = 0;

//错误统一处理
function handle(res){
	// 未登录 
	if(res.code == 10106){
		
		var content = res.code ==10106?'抱歉由于您未登录或者登录状态过期，请重新授权登录':'抱歉由于您未有身份信息，请重新登录申请'
		uni.showModal({
		    title: '提示',
		    content: content,
				showCancel:false,
		    success: function (res) {
					if (res.confirm) {
						uni.reLaunch({url:"/pages/login/login?edit=true"})
					}
		    }
		});
		return;
	}

	
	uni.showToast({title:res.message?res.message:"请稍后再试",icon:"none"})
  
}

/**
 * @param {Object} url  请求的接口地址
 * @param {Object} param 请求参数
 * @param {Object} opt 自定义配置 load是否显示加载动画，back当前接口无论状态是多少，都返回前端 ，不进入统一错误处理
 */

export function post(url,param,opt){
	let opts = opt?opt:{};
	
	ajaxTimes++;
	
	var token = store.getters['token'].token;
	
	let header = {
		"Authorization":token?token:"",
	};
	
	if(opts.load != false || !opts.back){
		uni.showLoading({mask: true,title:"加载中..."});
	}
	
	// 如果不是门店数据统计接口  就用域名一
	
	url= api.baseUrl+url;
	
	if(opts.type){
		header['Content-Type'] ='application/x-www-form-urlencoded'
	}
	
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			header:header,
			data:param,
			method:"POST",
			success:(res)=>{
				if((res.statusCode == 200 && res.data.code == 200) || opts.back){
          // 处理登录过期
					if(res.data.code == 10106){
            handle(res.data)
            return;
          }
          resolve(res.data);
				}else{
					handle(res.data)
				}
			},
			fail:(err)=>{
				console.log("Err",err);
				uni.showToast({title:"请稍后再试",icon:"none"})
			},
			complete:()=>{
				ajaxTimes--;
				if(ajaxTimes == 0 || !opts.back){
					uni.hideLoading()
				}
			}
		})
	})
}


/**
 * @param {Object} url  请求的接口地址
 * @param {Object} param 请求参数
 * @param {Object} opt 自定义配置 load是否显示加载动画，back当前接口无论状态是多少，都返回前端 ，不进入统一错误处理
 */
 
export function	get(url,param,opt){
	let opts = opt?opt:{};
	
	ajaxTimes++;
	
	var token = store.getters['token'].token;
	
	let header = {
		"Authorization":token?token:"",
	};
	
	if(opts.load != false || !opts.back){
		uni.showLoading({mask: true,title:"加载中..."});
	}
	
	// 如果不是门店数据统计接口  就用域名一
	url= api.baseUrl+url;
	

	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			method:"GET",
			data:param,
			header:header,
			success:(res)=>{
				if((res.statusCode == 200 && res.data.code == 200) || opts.back){
          // 处理登录过期
					if(res.data.code == 10106){
            handle(res.data)
            return;
          }
					resolve(res.data);
				}else{
					handle(res.data)
				}
			},
			fail:(err) => {
				console.log("Err",err);
				uni.showToast({title:"请稍后再试",icon:"none"})
			},
			complete:()=>{
				ajaxTimes--;
				if(ajaxTimes == 0 && !opts.back){
					uni.hideLoading()
				}
			}
		})
	})
	
}

/**
 * @param {Object} url  请求的接口地址
 * @param {Object} param 请求参数
 * @param {Object} opt 自定义配置 load是否显示加载动画，back当前接口无论状态是多少，都返回前端 ，不进入统一错误处理
 */
 
// 上传图片
 export function	postmult(url,param,opt){
	let opts = opt?opt:{};
	
	ajaxTimes++;
	
	var token = store.getters['token'].token;
	
	let header = {
		"Authorization":token?token:"",
	};
	
	if(opts.load != false || !opts.back){
		uni.showLoading({mask: true,title:"加载中..."});
	}
	
	// 如果不是门店数据统计接口  就用域名一
	url= api.baseUrl+url;

	return new Promise((resolve)=>{
    uni.uploadFile({
      url: url,
      filePath: param.filePath,
      name: 'file',
      header:header,
      success: (res) => {
        let data = JSON.parse(res.data)
       
        if((res.statusCode == 200 && data.code == 200) || opts.back){
          // 处理登录过期
					if(res.data.code == 10106){
            handle(res.data)
            return;
          }
					resolve(data);
				}else{
					handle(data)
				}
      },
      fail:(err)=>{
        console.log("err",err);
        uni.showToast({title:"请稍后再试",icon:"none"})
      },
      complete:()=>{
				ajaxTimes--;
				if(ajaxTimes == 0 && !opts.back){
					uni.hideLoading()
				}
			}
    });
	})
	
}




