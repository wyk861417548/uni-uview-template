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
    @on-remove="onRemove"
    @on-choose-complete="beforeUpload"
    >
      <view  slot="addBtn" class="custom" v-if="customType" :style="{background:'url('+require(`@/static/images/card/${img}.png`)+') no-repeat 0 0/100% 100%',width:width,height:height}"></view>
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
        default:10 * 1024 * 1024
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
        console.log("1",file);
        if(file.length < 1) return;

        var curfile = file[file.length-1].file;

        this.upload(curfile)

      },

      // 上传图片
      upload(file){
        this.$postmult(this.$api.common.upload,{filePath: file.path},{back:true}).then((res) => {
          if(res.code == 200){
            this.uploadList.push(res.data.id)
            uni.showToast({title:"上传成功",icon:"none"})
            
            return;
          }
          uni.showToast({title:"上传失败，请重新选取照片上传",icon:"none"})
        });
       
      },

      // 移除图片
      onRemove(index, lists) {
				this.uploadList.splice(index,1)
			},
		},

    watch:{
      uploadList(newVal){
        var data = {
          name:this.name,
          value:newVal
        }
        this.$emit("change",data)
      }
    }

	}
</script>

<style lang="scss" scoped>
</style>