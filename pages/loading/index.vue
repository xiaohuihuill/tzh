<template>
	<view class="start-up-page">
		<view class="logo">
			<u--image class="logo-image" :showLoading="true" :src="src" width="148.5px" height="56px"></u--image>
		</view>
		<view class="title">
			My journey to carbon neutrality
		</view>
		<view class="user-name">
			<view class="user-name-input">
				<u--input class="input-box" v-model="userName" border="none" :placeholder="'Please input your name'"
					placeholderStyle="color: #999999;" color="#666" ></u--input>
				<u--text v-if="showPleaseError" class="text" color="#C0C4CC" size="10" text="Please input your name"></u--text>
			</view>
		</view>


		<view class="in">
			<u-button class="custom-button" type="primary" text="Start my journey" shape="circle" :loading="loading"
				placeholderStyle="padding:0 4px" iconColor="#fff" @click="allIn">
			</u-button>
		</view>
		<view class="info">
			<u--text class="text" color="#C0C4CC" size="10" text="© 2022 OCANZ ALL RIGHTS RESERVED"></u--text>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			src: '/static/logo.png',
			userName: '',
			loading: false,
			showPleaseError:false
		};
	},
	methods: {
		allIn () {
			this.loading = true
			if(!this.userName) {
				this.showPleaseError = true
				this.loading = false
				return
			}
			uni.redirectTo({
				url: '/pages/dataCreation/index'
			})
		}
	}
}
</script>
<style>
uni-page-body {
	height: 100%;
}
</style>
<style lang="scss" scoped>
.start-up-page {
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

	.user-name {
		width: 100%;

		display: flex;
		justify-content: center;

		.user-name-input {
			margin-top: 120rpx;
			width: 550rpx;
			height: 80rpx;

			.input-box {
				width: 550rpx;
				height: 80rpx;
				background: #F3F4F6;
				border: 1rpx solid #E4E7ED;
				border-radius: 40rpx;
				padding: 0 20rpx !important;
				box-sizing: border-box;

			}
		}
	}


	.in {
		margin-top: 120rpx;

		.custom-button {
			width: 550rpx;
			height: 80rpx;
		}
	}

	.info {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 80rpx;
		margin: auto;

		.text {
			justify-content: center !important;
			font-size: 20rpx !important;
			font-family: PingFang SC;
			font-weight: 500;
		}
	}
}
</style>
