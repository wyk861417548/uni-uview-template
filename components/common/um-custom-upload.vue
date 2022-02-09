<template>
  <view class="my-upload flex-align">
    
    <!-- 已上传图片展示区域 -->
    <view class="uploadList upBox" :style="{width:width,height:height}"  @click.stop="" v-for='(item,index) in uploadList' :key='index'>
      <slot name="container">
        <p :style="{background:'url('+item.path+') no-repeat center/cover'}" style="width:100%;height:100%;" alt="图片" @click="handleView(item.path)"></p>
        <u-icon class="_del"  name="close-circle" color="#2979ff" size="40" @click="handleRemove(index)"></u-icon>
      </slot>
    </view>

    <!-- 选择图片区域 -->
    <view v-if="max > uploadList.length" @click="chooseImage">
      <slot>
        <view class="upload upBox" :style="{width:width,height:height}">
          <text class="j-full-center">+</text>
        </view>
      </slot>
    </view>

    <!-- 预览图片区域 -->
    <view v-show="preview" @click="closeView" class="preview j-full-curbox ban-child">
      <view class="j-full-center">
        <image :src="previewImg" :style="{width:previewWidth}" mode="widthFix" alt="图片">
      </view>
    </view>
  </view>

</template>

<script>
	export default {

		props: {
			// 最大上传数
			max: {
				type: Number,
				default: 2
			},
			
			width:{
			  type:String,
			  default:'476rpx'
			},
			
			height:{
			  type:String,
			  default:"260rpx"
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

			// 用于父组件接受已上传的图片名称
			name: {
				typeof: String,
				default: "name"
			},

      // 预览图片宽度
      previewWidth:{
        typeof: String,
				default: "90vw"
      }
		},
		data() {
			return {

				// 预览图片
				preview: false,

				// 预览图片地址
				previewImg: '',

				// 已上传图片
				uploadList: [],
			};
		},

		created() {},

		methods: {
			chooseImage(){
				uni.chooseImage({
					count: 1,
					success: res => {
						const path = res.tempFilePaths[0]

            if(this.limitType.indexOf(path.split('.')[1]) == -1){
              uni.showToast({title:`只支持${this.limitType.join(',')}格式图片`,icon:"none"})
              return;
            }

            if(this.maxSize < res.tempFiles[0].size){
              uni.showToast({title:"超出文件允许大小",icon:"none"})
              return;
            }
						
						uni.getImageInfo({
							src: path,
							success:(info)=>{

								const options = {
									filePath: path,
									cloudPath: Date.now() + '.' + info.type.toLowerCase()
								}
								this.upload(options);
							},
							fail(err) {
								uni.showToast({title:err.errMsg || '未能获取图片类型',icon:"none"})
							}
						})
						
					}
				})
			},
			
      // 上传图片
      upload(options){
        console.log("upload",options);
        this.$postmult(this.$api.common.upload,options,{back:true}).then((res) => {
          if(res.code == 200){
            this.uploadList.push({path:options.filePath,id:res.data.id})
            uni.showToast({title:"上传成功",icon:"none"})
            
            return;
          }
          uni.showToast({title:"上传失败，请重新选取照片上传",icon:"none"})
        });
      },

			// 预览大图
			handleView(item) {
				if (item) {
					this.previewImg = item;
					this.preview = true;
				}
			},

			// 关闭大图
			closeView() {
				this.preview = false;
			},

			// 移除图片
			handleRemove(index) {
				this.uploadList.splice(index, 1)
			}
		},

		watch: {
			uploadList(newVal) {
				var data = {
					name: this.name,
					value: newVal
				}
				this.$emit("change", data)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.my-upload {
		.upBox {
			position: relative;
			display: inline-block;
			width: 100%;
			height: 100%;
			margin: 0 20rpx;
			border: 2rpx dashed #ddd;
			border-radius: 10rpx;
		}
		.upload {
			text{
				color: #ddd;
			}
			&:hover {
				border-color: #108ee9;
        color: #108ee9;
        text{
          color: #108ee9;
        }
			}
		}
		.uploadList {
			position: relative;
			border: none;
			._del{
				position: absolute;
				right: 0;
				top: 0;
				width: 40rpx;
				height: 40rpx;
				 transform: translate(-10%,10%);
			}
		}

		.preview {
			position: fixed;
			z-index: 999;
			background: rgba(0, 0, 0, 0.6);
		}
	}
</style>
