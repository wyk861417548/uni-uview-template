<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	page{
		font-size: 32rpx !important;
	}
	@import "uview-ui/index.scss";
	.page-bg{
		background-color: #f2f3f5;
	}
	/*每个页面公共css */
	@import url("@/static/css/common.css");
	
	// 自定义公共scss
	@import "@/static/scss/common.scss";
</style>
