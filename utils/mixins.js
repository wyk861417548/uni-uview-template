var mixins = {
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
			console.log(res.target)
		}
		return {
			title: '',
			path: '/pages/index/index'
		}
	},
	
	//分享到朋友圈
	onShareTimeline(res) {
		let distSource = uni.getStorageSync('distSource');
		if (distSource) {
			return {
				title: '',
				type: 0,
				query: '',
				summary: "",
				imageUrl: ""
			}
		}
	}
}

export default mixins;