<template>
  <u-upload
    action="" 
    :auto-upload="false"
    name="6"
    :maxCount="max"
		:max-size="maxSize"
    :limitType='limitType'
    :custom-btn="customType"
    ref="uUpload"
    :width="width"
    :height="height"
		size-type="['compressed']"
    @on-remove="onRemove"
    @on-choose-complete="beforeUpload"
    > 
      <slot>
        <view slot="addBtn" class="custom" style="position:relative;" v-if="customType"   :style="{background:'url('+require(`@/static/images/card/${img}.png`)+') no-repeat 0 0/100% 100%',width:width,height:height}">
          <view class="" style="position:absolute;left:50%;top:65%;transform:translateX(-50%);width:90%;text-align:center;">{{customName}}</view>
        </view>
      </slot>
      
  </u-upload>
</template>

<script>
	export default {
    props:{
      // 最大上传数量
      max:{
        type:Number,
        default:1,
      },

       // 通过name辨别来源
      name:{
        type:String,
        default:"name"
      },

      // 图片大小限制
      maxSize:{
        type:Number,
        default:30 * 1024 * 1024
      },

      // 上传图片限制
      limitType:{
        type:Array,
        default:()=>{
          return ['jpeg', 'jpg', 'png']
        },
      },

      // 是否自定义上传样式 通过传递名为addBtn的slot，同时配置custom-btn为true，可以自定义想要的上传按钮。
      customType:{
        type:Boolean,
        default:false
      },

      img:{
        type:String,
        default:'card_cons'
      },

      width:{
        type:String,
        default:'476rpx'
      },

      height:{
        type:String,
        default:"260rpx"
      },
			
			// 自定义显示名称
			customName:{
				type:String,
				default:""
			}
    },

		data() {
			return {
         // 已上传图片
        uploadList:[],
			}
		},
		methods:{
      beforeUpload(file){
        if(file.length < 1) return;
        var curfile = file[file.length-1].file;
        this.upload(curfile)
      },

      // 上传图片
      upload(file){
        console.log("file",file);
        this.$api.common.upload({filePath: file.path}).then((res) => {
          this.uploadList.push(res.data.id)
          uni.showToast({title:"上传成功",icon:"none"})
        }).catch(()=>uni.showToast({title:"上传失败，请重新选取照片上传",icon:"none"}));
       
      },

      // 移除图片
      onRemove(index, lists) {
				this.uploadList.splice(index,1)
			},
		},

    watch:{
      uploadList(newVal){
        this.$emit('input',newVal)
        this.$emit("change",{name:this.name,value:newVal})
      }
    }

	}
</script>

<style lang="scss" scoped>
</style>