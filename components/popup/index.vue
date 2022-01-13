<template>
  <u-popup v-model="show" border-radius="10" :mode="mode" closeable='true'>
    <view style="padding:60rpx 40rpx;">
      <section style="width:70vw;text-align:center;">
        <img :src="require(`@/static/images/status/${status[type]}`+'.png')" alt=""  style="width:116rpx;height:116rpx">

        <p class="mt-30 mb-30">{{title}}</p>
      </section>
    </view>
  </u-popup>

</template>

<script>
export default {
  props:{
    mode:{
      type:String,
      default:"center"
    },

    type:{
      type:String,
      default:1
    },

    title:{
      type:String,

      default:"提示"
    }
  },
  data () {
    return {
      show:false,

      status:{
        1:"success_",

        2:"wait_",

        3:"error_"
      }
    };
  },

  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>