import {request} from './request'
// 编译打包环境
// const env = 'test'
const env = 'production'

// 本地测试地址
export const domain = env ==='production'?'xxx':'http://xxx';

export default{
  common:{
    // 上传文件图片 (uploadFile:true  上传文件设置)
    upload(data){return request({url:'file/comm/upload',data,opts:{back:true,uploadFile:true}})},
  },

  // 
  test(data){return request({url:'xxx',data,method:'post'})},

  get(data){return request({url:'xxx',data,method:'get'})},


	
}