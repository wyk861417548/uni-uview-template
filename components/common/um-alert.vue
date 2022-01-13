<template>
  <view v-show="show" class="my-mask">
    <view class="my-dialog" :style="styles">
      <view class="my-dialog-container">
         <slot name="container">
          内容
         </slot>
      </view>
			<slot name="footer">
				<view class="my-dialog-footer" @click="confirm">确定</view>
			</slot>
    </view>
  </view>
</template>

<script>
export default {
  props:['styles','value'],
  data () {
    return {
      show:false,
      
      boolen:true
    };
  },

  methods: {
    // 确认
    confirm(){
      this.show = false;
      this.$emit("confirm",this.boolen);
    },
    //取消
    cancel(){
      this.show = false;
    }
  },
  watch:{
    // value: {
    //     handler(newVal, oldVal) {
    //         console.info('value changed 2', newVal)
    //     },
    //     deep: true
    // }
  }
}
</script>
<style lang="scss" scoped>
  .my-mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(55,55,55,.6);
    font-size:32rpx;
    z-index:1444;
    .my-dialog{
      position: absolute;
      top: 40%;
      left: 50%;
      width: 70%;
      transform: translateX(-50%);
      border-radius: 10rpx;
      box-shadow: 0 8rpx 24rpx rgba(0,0,0,.15);
      background:#fff;
      z-index:1444;
      .my-dialog-container{
        border-bottom:1rpx solid #e8eaec;
      }
      .my-dialog-footer{
				text-align: center;
      }
      & > view{
        padding:14px 16px;
      }
    }
  }
 
  
 
</style>