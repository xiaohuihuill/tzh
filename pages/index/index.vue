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
		<view>用户名：{{ userInfo.name }}</view>
		<view>年龄：{{ userInfo.age }}</view>
		<view @click="create">登录</view>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<u-button text="月落"></u-button>
		<u-button type="primary" shape="circle" text="按钮形状"></u-button>
		<u-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
		<u-cell-group style="width: 100%;">
			<u-cell size="large" title="单元格" value="内容" isLink></u-cell>
			<u-cell size="large" title="单元格" value="内容" label="描述信息"></u-cell>
		</u-cell-group>
		<u-line-progress :percentage="50" style="width: 100%;">
			<text class="u-percentage-slot">{{ 30 }}%</text>
		</u-line-progress>
		<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="10">
		</u-upload>
		<u-count-to :start-val="30" :end-val="500"></u-count-to>
		<u-circle-progress active-color="#2979ff" :percent="80" round="true">
			<view class="u-progress-content">
				<view class="u-progress-dot"></view>
				<text class='u-progress-info'>查找中</text>
			</view>
		</u-circle-progress>

		<u-line-progress style="width: 100%;" :percent="70" :round="false" active-color="#ff9900"></u-line-progress>

		<view>
			<u-modal :show="show" :title="title" :content='content'></u-modal>
			<u-button @click="show = true">打开</u-button>
		</view>
		<u-calendar :show="show2"></u-calendar>
		<u-button @click="show2 = true">打开</u-button>

		<u-number-box v-model="value" @change="valChange"></u-number-box>
		<!-- <u-count-to :startVal="30" :endVal="500"></u-count-to> -->

		<u-tooltip text="下方显示" direction="bottom"></u-tooltip>
		<u-tabbar :value="value1" @change="name => value6 = name" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="碳中和" name="home" icon="home" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="碳排放" name="photo" icon="photo" @click="click2"></u-tabbar-item>
			<u-tabbar-item text="碳抵消" name="play-right" icon="play-right" @click="click3"></u-tabbar-item>
			<u-tabbar-item text="我的" name="account" icon="account" @click="click4"></u-tabbar-item>
		</u-tabbar>

	</view>
</template>

<script>

import * as echarts from 'echarts';
import { mapState, mapMutations } from 'vuex'//引入mapState
export default {
	components: {},
	computed: {
		...mapState(['isCreatedData', 'userInfo'])
	},
	data () {
		return {
			// 这里初始化一个null，待会儿用来充当echarts实例
			myChart: null,
			show: false,
			show1: false,
			show2: false,
			content: '东临碣石，以观沧海',
			title: 'Hello',
			value1: 0,
			value: 0,
			list: [{
				text: '点赞',
				color: 'blue',
				fontSize: 28
			}, {
				text: '分享'
			}, {
				text: '评论'
			}],
			fileList1: [],
		}
	},
	onLoad () {
		// 是否跳转创建数据页面
		if (!this.isCreatedData) {
			// this.INIT_DATA({
			// 	age:'18',
			// 	name:'名称',
			// })
			uni.redirectTo({
				url: '/pages/loading/index'
			})
		}
		let that = this;
		// 通过nextTick异步画图
		this.$nextTick(() => {
			that.drawLines();
		});
		console.log('已创建数据')
	},
	methods: {
		...mapMutations([   //使用es6的拓展运算符
			'INIT_DATA',
			'IS_CREATED_DATA'
		]),
		create () {
			this.IS_CREATED_DATA(true)
		},
		open () {
			this.show = true;
		},
		click1 (e) {
			console.log('click1', e);
			this.value1 = e
		},
		change (e) {
			console.log('change1', e);
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
			// 这里是初始化的方式，通过id查询找到你的canvas标签
			this.myChart = echarts.init(document.getElementById('myEcharts'));
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
		this.myChart.clear();
		this.myChart.dispose();
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
