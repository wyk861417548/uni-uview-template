<template>
  <u-popup v-model="show" border-radius="10" :mode="mode" closeable='true'>
    <view style="padding:60rpx 40rpx;">
      <slot>弹窗信息</slot>
    </view>
  </u-popup>

</template>

<script>
export default {
  props:{
    mode:{
      type:String,
      default:"center"
    }
  },
  data () {
    return {
      show:false
    };
  },

  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>