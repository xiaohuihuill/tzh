<template>
	<view class="content">
		<view class="dataTable-canvas">
			<view class="dataTable-canvas-title">
				<text>
					近七日学生上报统计
				</text>
			</view>
			<canvas id="myEcharts"></canvas>
		</view>

		<u-tabbar :value="currentTabbar" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="碳中和" name="home" icon="home"></u-tabbar-item>
			<u-tabbar-item text="碳排放" name="carbonEmission" icon="photo" @click="toCarbonEmissionPage"></u-tabbar-item>
			<u-tabbar-item text="碳抵消" name="carbonOffset" icon="play-right" @click="toCarbonOffsetPage"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="account" @click="toMyPage"></u-tabbar-item>
		</u-tabbar>

	</view>
</template>

<script>

import * as echarts from 'echarts';
import { mapState, mapMutations } from 'vuex'//引入mapState
import { isAuth } from './../../utils/h5-interceptor.js'
export default {
	components: {},
	computed: {
		...mapState(['isCreatedData', 'userInfo'])
	},
	data () {
		return {
			myChart: null,
			// 这里初始化一个null，待会儿用来充当echarts实例
			currentTabbar: 'home',
			storageSize: '',
		}
	},
	async onLoad () {
		try {
			await isAuth() // 判断权限  是否跳转创建数据页面
		} catch (err) {
			console.log(err)
		}
	},
	onShow () {
		let that = this;
		this.$nextTick(() => {
			that.drawLines();
		})
	},
	methods: {
		...mapMutations([   //使用es6的拓展运算符
			'INIT_DATA',
			'IS_CREATED_DATA'
		]),
		getStorageSize () {
			let that = this;
			uni.getStorageInfo({
				success (res) {
					console.log(res)
					console.log(res.keys);
					console.log(res.limitSize);
					let size = res.currentSize;
					if (size < 1024) {
						that.storageSize = size + ' B';
					} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
						that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
					} else if (size / 1024 / 1024 >= 1) {
						that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
					}
				}
			})
		},
		create () {
			this.IS_CREATED_DATA(true)
		},
		open () {
			this.show = true;
		},
		toCarbonEmissionPage () {
			uni.redirectTo({
				url: '/pages/carbonEmission/index'
			})
		},
		toCarbonOffsetPage () {
			uni.redirectTo({
				url: '/pages/carbonOffset/index'
			})
		},
		toMyPage () {
			uni.redirectTo({
				url: '/pages/my/index'
			})
		},
		// 删除图片
		deletePic (event) {
			this[`fileList${event.name}`].splice(event.index, 1)
		},
		// 新增图片
		async afterRead (event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file)
			let fileListLen = this[`fileList${event.name}`].length
			lists.map((item) => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				})
			})
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url)
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result
				}))
				fileListLen++
			}
		},
		uploadFilePromise (filePath) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: 'http://127.0.0.1:7001/upload', // 仅为示例，非真实的接口地址
					filePath,
					name: 'file',
					formData: {
						user: 'test'
					},
					success: (res) => {
						resolve(res.data.data)
					}
				});
			})
		},
		async drawLines () {
			let myEchartsEle = null
			console.log('document--------------', document)
			if (!document) return
			console.log('document.getElementById()', document.getElementById('myEcharts'))
			myEchartsEle = document.getElementById('myEcharts')
			if (!myEchartsEle) return
			// 这里是初始化的方式，通过id查询找到你的canvas标签
			this.myChart = echarts.init(myEchartsEle);
			console.log('this.myChart ', this.myChart)
			// 这里我初始化了4个数组用来存放 后端接口给我的数据
			let data = [];
			let tian = [];
			let reportLine = [];
			let notReportLine = [];
			try {
				data = [
					{
						type: 1,
						sbNum: 1,
						notSbNum: 1
					},
					{
						type: 2,
						sbNum: 2,
						notSbNum: 2
					},
					{
						type: 3,
						sbNum: 3,
						notSbNum: 4
					},
					{
						type: 4,
						sbNum: 7,
						notSbNum: 6
					}
				];
				data.forEach((item) => {
					// 从接口中提取自己想要的数据
					tian.push(item.type);
					reportLine.push(item.sbNum);
					notReportLine.push(item.notSbNum);
				})
			} catch (e) {
				console.log(e);
			}

			// 这里开始就是echarts的配置项了
			let option = {
				// x轴数据
				xAxis: {
					type: 'category',
					data: tian,
				},
				// y轴数据
				yAxis: {
					type: 'value',
				},
				// 这里写2个对象是2条线条，3个则是3条
				series: [
					{
						// data使用刚才定义的数组，数据从后端接口中取得
						data: reportLine,
						type: 'line',
						smooth: true,
					},
					{
						data: notReportLine,
						type: 'line',
						smooth: true,
					},
				],
				grid: {
					// 这里可以防止Y轴显示不全
					containLabel: true
				}
			}

			// 这里不要忘记把option设置给echarts实例
			this.myChart.setOption(option);

			// 这里是用于窗口变化时的自适应，利用的是echarts自带的resize方法
			// 如果你打印出来这个echarts实例，可以在函数里面找到这个方法
			window.addEventListener('resize', () => {
				this.myChart.resize()
			});
		},
	},
	beforeDestroy () {
		// 页面关闭时销毁echarts实例
		this && this.myChart && this.myChart.clear();
		this && this.myChart && this.myChart.dispose();
	},
}
</script>

<style lang="scss">
.dataTable {
	width: 100%;
	height: 100%;
	padding: 10rpx;

	&-canvas {
		&-title {
			padding: 20rpx 0rpx;

			>text {
				padding-left: 20rpx;
				width: 100%;
				height: 100%;
				font-size: 32rpx;
				font-weight: 550;
				line-height: 32rpx;
				border-left: 10rpx solid #28b5b1;
			}
		}

		#myEcharts {
			width: 100%;
			height: 600rpx;
		}
	}
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

.u-percentage-slot {
	padding: 1px 5px;
	background-color: $u-warning;
	color: #fff;
	border-radius: 100px;
	font-size: 10px;
	margin-right: -5px;
}

.u-progress-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.u-progress-dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background-color: #fb9126;
}

.u-progress-info {
	font-size: 28rpx;
	padding-left: 16rpx;
	letter-spacing: 2rpx
}
</style>
