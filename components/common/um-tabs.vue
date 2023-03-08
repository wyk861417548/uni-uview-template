<template>
	<view class="tabbar j-flex">
		<view :class="[{active:isCurrent(item.url)},item.class?'left':'right']" class="flex-adapt list j-flex-a" v-for="(item,index) in list" :key="index" @click="skip(item.url)">
      <view>
        <img :src="require(`@/static/images/tabBar/${isCurrent(item.url)?item.imgActive:item.img}.png`)" alt="" style="width:50rpx;height:50rpx;">
        <view class="font12">{{item.name}}</view>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:'',
				
				list:[],
				
				tabBar: {
					list:[
						{name:"首页",img:"home",imgActive:"home_active",url:"/pages/index/index",class:true},
						{name:"我的",img:"my",imgActive:"my_active",url:"/pages/my/index",clasee:false}
					]
				}
			};
		},
		beforeCreate() {
			uni.hideTabBar();
		},

    computed: {
      isCurrent(){
        return (url)=>{
          let boolen = url == '/'+this.current?true:false;
          return boolen;
        }
      }
    },
		
		created() {
			// 获取当前url地址
			this.current = this.$config.getRouter();
			this.list = this.tabBar.list;

      // 不同身份不同权限
			// var state =  this.$store.state;

			// if(state.userstatus){
			// 	if(state.userstatus.type==1){
			// 		this.list = this.tabBar.store;
			// 		return;
			// 	}
			// 	this.list = this.tabBar.agent;
			// }
		},
		activated() {
			// 获取当前url地址
			this.current = this.$config.getRouter();
		},
		methods:{
			changeTab(index){
				this.$emit("change",index)
			},

      skip(url){
        uni.switchTab({
          url: url
        });
      }
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		color:#fff;
    background: #4E92FF;
   
    &.left{
      border-radius: 0 100rpx 100rpx 0;
    }
    &.right{
      border-radius: 100rpx 0 0 100rpx;
    }
	}
	.tabbar{
		position: fixed;
		bottom:0;
		left: 0;
		width: 100%;
		height: 100rpx;
		text-align: center;
		color: #999;
		z-index: 668;
		box-shadow: 0 -5rpx 10rpx rgba(221,221,221,.8);
		background-color: #fff;
    .list{
      justify-content: center;
      height: 100%;
    }
	}
</style>
