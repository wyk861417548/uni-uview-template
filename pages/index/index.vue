<template>
  <div class="j-full-curbox j-flex-col">
    <div class="flex-adapt container">
      1
    </div>
    
    <!-- 自定义tabBar组件 -->
	  <um-tabs></um-tabs>
  </div>

</template>

<script>
export default {
  data () {
    return {};
  },

  onShow(){
		console.log(uni.$u.config.v);
	},

  methods: {
  }
}
</script>
<style lang='scss' scoped>
  .container{
    header{
      position: relative;
      height: 300rpx;
      background: url("~@/static/images/header.png") no-repeat 0 0/100% 100%;
      section.box{
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translate(-50%,-70%);
        width: 85vw;
        height: 344rpx;
        margin-bottom: -40rpx;
        border-radius: 8rpx;
        margin:auto;
        box-shadow: 0 0 5rpx rgba(100,100,100,.1);
        image{
          width: 100%;
          height: 100%;
        }
      
      }
    }

    main{
      padding: 200rpx 0 120rpx;
      background-color:#fff ;
      section{
        position: relative;
        display: flex;
        width: 85vw;
        height: 128rpx;
        align-items: center;
        border-radius: 8rpx;
        margin:0 auto;
        padding: 40rpx;
        &.allowance{
          background-color: #EFF5FD;
          color: #598FD6;
          .icon{
            background-color: #B8D5FC;
          }
        }

        &.progress{
          margin-top: 60rpx;
          background-color: #FCF6EC;
          color: #BF8626;
          .icon{
            background-color: #FCDCA6;
          }
        }

        .icon{
          position: absolute;
          right: -10rpx;
          top: 100%;
          transform: translateY(-50%);
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
        }
      }
    }

    footer{
      padding: 40rpx 0;
      section{
        width: 90vw;
        margin:0 auto;
        height: 280rpx;
        border-radius: 4rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  

</style>