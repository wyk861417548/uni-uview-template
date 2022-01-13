<template>
	<div class="index j-full-curbox">
    <header class="logo">
      <!-- <img src="@/static/images/backdrop/login.png" alt=""> -->
      <p>xxxx</p>
    </header>
    <u-button v-show="show"  type="primary" :class="{'active':!check}" :disabled="!check" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="button">微信一键登录</u-button>
    <u-button v-show="!show"  type="primary" :class="{'active':!check}" :disabled="!check" @click="getUserInfo" class="button">请继续授权完成登录</u-button>
    
    <div class="agreement u-flex">

      <u-checkbox v-model="check" ></u-checkbox>

      <div class="text">
        <span>我已阅读并同意</span>
        <span class="attention" @tap="$skip" data-url='/pages/login/agreement'>《用户协议》</span>
        <span>和</span>
        <span class="attention">《隐私政策》</span>
      </div>
    </div>

    <um-alert ref="alert">
    	<template slot="container">
    		<div class="mb-10" style="text-align: center;font-weight: bold;">提示</div>
    		<div class="col5A5" style="text-align: center;">需要通过授权才能继续，请重新点击并授权!</div>
    	</template>
    </um-alert>

	</div>
</template>

<script>
	export default {
    onShow() {
      uni.login({
        provider: 'weixin',
        scopes: 'auth_user',
        success: res => {
          this.data.code = res.code
        }
      })
    },
    onLoad(option) {
      if (option.edit) return
    },
		data() {
			return {
        // 三方用户注册对象
        data: {
          // 微信小程序用户头像
          avatar: '',

          // 用户昵称
          nickName: '',

          // 临时登录凭证
          code: '',

          // 性别
          sex: '',

          // iv加密算法的初始向量
          iv: '',

          // 加密字符串
          encryptedData: ''
        },
        // 授权登陆button显示状态
        show: true,

        // 是否勾选协议
        check: false,
			};
		},
		methods:{
      // 微信授权登陆
      getUserInfo(){
				uni.getUserProfile({
					desc:'Wexin',     // 这个参数是必须的
					success:info=>{
						console.log("info",info);
						let user = info.userInfo;
						this.data.avatar=user.avatarUrl,
						this.data.nickName=user.nickName,
						this.data.sex=user.gender
						
						this.login();
					},
					fail:(err)=>{
						console.log("nihao",err);
						this.$refs.alert.show = true;
					}
				})
			},

      // 选中底部用户协议
			isSel(){
				if(!this.check){
					uni.showToast({title:"请阅读并勾选底部协议",icon:"none"})
				}
			},

      getPhoneNumber(e){
				console.log('getPhoneNumber',e);
				// 拒接获取手机号
				if(!e.detail.encryptedData){
					this.$refs.alert.show = true;
					return;
				}
				
				this.data.iv = e.detail.iv,
				this.data.encryptedData = e.detail.encryptedData,
				this.show = false;
			},	

      // 微信授权登录
      login() {
        this.$post(this.$api.common.login + '?code=' + this.data.code, this.data).then(res => {
          const data = res.data
          // 设置token
          this.$store.commit('setToken', {token: data.token, expiresTime: data.expiresTime})
          // 设置用户信息
          this.$store.commit('userLogin', data.user)
          
          uni.switchTab({
            url: '/pages/index/index'
          })
        }).catch(() => {
          this.$refs.alert.show = true;
        })
      },

		}
	}
</script>

<style lang="scss">
  .index {
    padding-top: 100rpx;
		background-color: #fff;
    .logo {
      text-align: center;
      color: #666;
      font-size: 46rpx;
      img{
        width: 530rpx;
        height: 544rpx;
        margin-bottom: 90rpx;
      }
    }
    /deep/button{
      margin-top: 100rpx;
      width: 480rpx;
      height: 66rpx;
      border-radius: 10rpx;
      color: #fff;
    }
    .agreement {
      position: absolute;
      bottom: 62rpx;
      width: 100%;
      justify-content: center;
      align-items: flex-end;
      .text {
        font-size: 11px;
        .attention {
          color: #6AA0F7;
        }
      }
    }
  }
</style>
