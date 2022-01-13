<template>
  <div class="page-bg j-full-curbox j-flex-col">
    <div class="flex-adapt">
      <header class="flex" @click="Jump">
        <section class="mr-10">
          <u-avatar v-if="!isLogin" :src="require('@/static/images/avatar.png')" size="140"></u-avatar>
          <u-avatar v-if="isLogin" :src="info.img" size="140"></u-avatar>
        </section>
        <section class="title flex-adapt flex-align mb-10">
          <p class="u-font-18 u-tips-color">{{info.name}}</p>
          <image  :src="require('@/static/images/icon/'+sexImg[info.sex]+'.png')" alt="">
        </section>
        <section class=" mb-10">
          <image  :src="require('@/static/images/icon/modify.png')" alt=""  style=" width: 40rpx;height: 40rpx;">
        </section>
      </header>

      <main>
        <!-- <image src="@/static/images/backdrop/my_more.png" style="margin: 30rpx 0 40rpx;width:100%;height: 120rpx;"></image> -->
        <!-- <section class="box info"></section> -->

        <section class="menu">
          <figure class="j-flex" v-for="(item,index) in menuList" :key="index" @click="$skip" :data-url="item.url">
            <figcaption class="flex-align">
              <image :src="require(`@/static/images/menu/${item.img}.png`)" alt="">
              <span>{{item.name}}</span>
            </figcaption>
            <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
          </figure>
        </section>

        <section class="menu mt-30"  @click="$skip" data-url="/pages/my/info">
          <figure class="j-flex" >
            <figcaption class="flex-align">
              <image :src="require(`@/static/images/menu/set.png`)" alt="">
              <span>登陆设置</span>
            </figcaption>
            <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
          </figure>
        </section>
      </main>

      <footer>

      </footer>
    </div>

    <!-- 自定义tabBar组件 -->
		<um-tabs></um-tabs>
  </div>

</template>

<script>
export default {
  data () {
    return {
      // 用户是否登录
      isLogin:false,
      
      // 用户信息
      info:{
        sex:1
      },

      // 菜单列表
      menuList:[
        {name:"xxxx",img:"allowance",url:"/pages/index/guide"},
        {name:"xxxx",img:"progress",url:"/pages/index/progress/index"},
      ],

      sexImg:{
        1:'male',
        2:'female'
      },
    };
  },

  onShow(){
    this.info?"":this.getUserInfo();
  },

  methods: {
    // 获取用户信息
    getUserInfo(){
      this.$get(this.$api.user.info).then((res)=>{
        this.info = res.data;
        this.isLogin = true;
      })
    },

    // 跳转
    Jump(){
      if(this.isLogin){
        uni.navigateTo({
          url:"/pages/my/info"
        })
        return;
      }

      uni.navigateTo({
        url:"/pages/login/login"
      })
    },

    // 功能列表跳转
    skip(url){
      uni.navigateTo({url})
    },
  }
}
</script>
<style lang='scss' scoped>
  header{
    background-color: #fff;
    align-items: flex-end;
    padding:30rpx 40rpx;
    .title{
      image{
        width: 26rpx;
        height: 26rpx;
        margin-left:10rpx;
        vertical-align: middle;
      }
    }
  }

  main{
    padding: 20rpx;
    section.info{
      margin: 40rpx 0;
      height: 120rpx;
      // background: url("~@/static/images/backdrop/my_more.png") no-repeat 0 0/100% 100%;
    }
    section.menu{
      background: #fff;
      figure{
        margin:0 30rpx;
        padding: 30rpx 0;
        & + figure{
          border-top: 1rpx solid #eee;
        }
      }
      image{
        width: 44rpx;
        height: 44rpx;
        margin-right: 20rpx;
      }
    }
  }

  footer{}

</style>