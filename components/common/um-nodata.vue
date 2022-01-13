<template>
	<view class="j-full-curbox" style="background-color: #fff;"  v-if="show" >
		<view class="j-full-center" style="text-align: center;">
			<image class="mb-10" src="@/static/images/nodata.png" mode="widthFix" style="width: 200rpx;"></image>
			<view style="color:#bfbfbf;">
				<slot>暂无数据</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			};
		}
	}
</script>

<style lang="scss">

</style>
