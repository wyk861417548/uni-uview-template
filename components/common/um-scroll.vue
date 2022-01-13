<template>
  <view class="j-full-curbox" id="scroll">
    <scroll-view
    	:scroll-top="0"
    	scroll-y="true"
    	style="width: 100%; height: 100%;"
    	@scrolltolower="F_scrollLoad()"
    >
      <slot></slot>

      <div v-show="status == 3" class="j-full-curbox">
        <div class="j-full-center" style="top:40%;text-align:center;">
          <image src="@/static/images/nodata.png"></image>
          <div style="color:#5A5B5C;">暂无数据</div>
        </div>
      </div>

      <div v-show="status != 3">
        <u-loadmore :status="type[status]" />
      </div>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    //上拉加载默认状态 0：可加载 1：无数据 2已结束
    props:{
      status: {
        type:Number,
        default:0
      },

      delay: {
        type: Number,
        default: 2000
      }
    },
    data () {
      return {

        type:{
          0:"loadmore",
          1:"loading",
          2:"nomore"
        }
      };
    },
    methods:{
      // 监听滚动  上拉加载默认状态 status 0：可加载 1：无数据 2已结束
      F_scrollLoad(){
      	if(this.status != 0) return;
        this.$emit('hasMore')
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>
