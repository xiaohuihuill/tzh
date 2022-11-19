<template>
	<view class="data-creation">
		<view class="progress">
			<u-line-progress :percentage="30" activeColor="rgba(0, 125, 143, 1)"></u-line-progress>
		</view>
		<view class="title">
			Starting my journey to carbon neutrality
		</view>
		<view class="progress-info">
			<view class="info-list">
				<view class="info-item">
					<u--text size="12" color="#909399" text="Creating my e-ID & carbon account"></u--text>
					<u-icon name="checkmark-circle"></u-icon>
				</view>
				<view class="info-item">
					<u--text size="12" color="#909399" text="Creating my e-ID & carbon account"></u--text>
					<u-icon name="checkmark-circle"></u-icon>
				</view>
			</view>
		</view>
		<view class="authorization-notice">
			Authorization notice
		</view>

		<view class="privacy-introduction">
			<view class="privacy-introduction-content">
				<u--text class="text" color="#909399" size="10"
					text="Carbon account is created based on your legal digital identity.The result is obtained based on the calculation of
				your consumption data including electricity, gasoline,public travel time, purchasing products with carbon
				reduction credits. 
				Your carbon account sends the carbon algorithms to your authorized data sources through zero-copy network ，then obtains your carbon emission and offset results. The platform will not read，copy and save your private data. Your carbon account is asking for authorization of the following data：">
				</u--text>
			</view>

		</view>

		<view class="title">
			<u-checkbox-group size="14" labelSize="12" activeColor="#087180" labelColor="#909399;"  v-model="checked">
				<u-checkbox labelSize="12" style="font-weight: 400;color: #909399;"
				 name="1"
					label="I have read the notice and continue.">
				</u-checkbox>
			</u-checkbox-group>
		</view>

		<view class="in">
			<u-button class="custom-button" type="primary" text="Enter my carbon account" shape="circle" :loading="loading"
				placeholderStyle="padding:0 4px" iconColor="#fff" @click="allIn">
			</u-button>
		</view>

	</view>
</template>

<script>
import { mapMutations } from 'vuex'//引入mapState

export default {
	data () {
		return {
			checked: ['1'],
			loading: false,
		};
	},
	methods: {
		...mapMutations([   //使用es6的拓展运算符
			'IS_CREATED_DATA'
		]),
		allIn () {
			this.loading = true
			this.IS_CREATED_DATA(true)
			uni.redirectTo({
				url: '/pages/index/index'
			})

		}
	}
}
</script>

<style lang="scss" scoped>
.data-creation {
	width: 100%;
	height: 100%;
	padding-top: 72rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.progress {
		width: 550rpx;
		height: 14rpx;
		margin: auto;
		margin-left: 60rpx;
	}

	.title {
		font-size: 28rpx;
		font-weight: bold;
		color: #303133;
		margin-left: 60rpx;
		margin-top: 35rpx;
		margin-bottom: 35rpx;
	}

	.progress-info {
		width: 690rpx;
		max-height: 490rpx;
		min-height: 60rpx;
		background: #F3F4F6;
		border: 1rpx solid #E4E7ED;
		border-radius: 6rpx;
		margin: auto;

		.info-list {
			padding: 35rpx;

			.info-item {
				line-height: 22rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 22rpx;
				font-weight: 400;
				color: #909399;
				line-height: 48rpx;
			}
		}
	}

	.authorization-notice {
		font-size: 20rpx;
		font-weight: 400;
		color: #087180;
		margin-left: 60rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.privacy-introduction {
		display: flex;
		justify-content: center;

		&-content {
			width: 690rpx;
			height: 210rpx;
			background: #FFFFFF;
			border: 1rpx solid #E4E7ED;
			border-radius: 6rpx;
			overflow: auto;
			padding: 10rpx 10rpx;
		}

	}

	.in {
		margin-top: 70rpx;

		.custom-button {
			width: 550rpx;
			height: 80rpx;
		}
	}
}
</style>
