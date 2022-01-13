<template>
  <div>

    <header></header>

    <main></main>

    <u-modal v-model="show" :show-title="false" :content="content" @confirm="handleQuit" :show-cancel-button="true"></u-modal>

    <footer class="mt-30 mb-20">
      <u-button :hair-line='false' type="error" @click="this.show = true;">退出</u-button>
    </footer>

  </div>

</template>

<script>
export default {
  data () {
    return {
      show:false,

      title:"",

      content:"是否确定退出登录"
    };
  },

  onShow(){},

  methods: {
    // 退出登录
    handleQuit(){
      // this.$get(this.$api.sign.quit).then(res=>{
        this.$store.commit("userRegister");
      // })
    }
  }
}
</script>
<style lang='scss' scoped>
  header{}

  main{}

  footer{
    /deep/button{
      width: 480rpx;
      height: 66rpx;
      border-radius: 100rpx;
      color: #fff;
      border: none;
      background-color: #FC8C8C;
    }
  }

</style>