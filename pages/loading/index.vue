<template>
	<view class="loding-page">
		<view class="logo">
			<u--image class="logo-image" :showLoading="true" :src="src" width="148.5px" height="56px"></u--image>
		</view>
		<view class="title">
			My journey to carbon neutrality
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			src: '/static/logo.png',
		};
	},
	onLoad () {
		// 此页面做一个广告页
		uni.redirectTo({
			url: '/pages/startUp/index'
		})
	},
	methods: {
	}
}
</script>
<style>
uni-page-body {
	height: 100%;
}
</style>
<style lang="scss" scoped>
.loding-page {
	width: 100%;
	height: 100%;
	padding-top: 120rpx;
	box-sizing: border-box;
	position: relative;
	text-align: center;

	.logo {
		display: flex;
		justify-content: center;

		.logo-image {}
	}

	.title {
		margin-top: 100rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #303133;
	}
}
</style>
