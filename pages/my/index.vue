<template>
  <view class="my-page">
    <view>
      <lang-select></lang-select>
    </view>
    <view>
      <u--text size="16" color="#000000" text="我的碳惠码"></u--text>
    </view>
    <view>
      <canvas canvas-id="qrcode" v-show="qrShow" style="width: 300rpx;margin: 0 auto;" />
    </view>
    <view>
      <u--text size="16" color="#000000" text="OCANZ介绍"></u--text>
    </view>
    <view>
      <u--text size="12"
        text="Carbon account is created based on your legal digital identity.The result is obtained based on the calculation of your consumption data including electricity, gasoline,public travel time, purchasing products with carbon reduction credits. 
				Your carbon account sends the carbon algorithms to your authorized data sources through zero-copy network ，then obtains your carbon emission and offset results. The platform will not read，copy and save your private data. Your carbon account is asking for authorization of the following data：">
      </u--text>
    </view>
    <view>
      <u--text size="16" color="#000000" text="重新开启我的碳中和之旅"></u--text>
    </view>
    <view>
      <u-button text="重新开启" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="reStart">
      </u-button>
    </view>
    <u-notify ref="uNotify"></u-notify>
    <u-tabbar :value="currentTabbar" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item text="碳中和" name="home" icon="home" @click="toHomePage"></u-tabbar-item>
      <u-tabbar-item text="碳排放" name="photo" icon="photo" @click="toCarbonEmissionPage"></u-tabbar-item>
      <u-tabbar-item text="碳抵消" name="play-right" icon="play-right" @click="toCarbonOffsetPage"></u-tabbar-item>
      <u-tabbar-item text="我的" name="my" icon="account"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>

import uQRCode from './../../utils/uqrcode.js' //引入uqrcode.js
import { mapState, mapMutations } from 'vuex'//引入mapState
import LangSelect from './../../component/langSelect'
export default {
  components: {
    LangSelect
  },
  computed: {
    ...mapState(['isCreatedData', 'userInfo'])
  },
  data () {
    return {
      // 这里初始化一个null，待会儿用来充当echarts实例
      myChart: null,
      currentTabbar: 'my',
      show: false,
      current: 1,
    }
  },
  async onLoad () {
    this.qrFun(this.currentTabbar) //调用二维码方法
  },
  onShow () {

  },
  methods: {
    ...mapMutations([   //使用es6的拓展运算符
      'INIT_DATA',
      'IS_CREATED_DATA'
    ]),
    reStart () {
      this.IS_CREATED_DATA(false)
      uni.redirectTo({
        url: '/pages/startUp/index'
      })
      // this.$refs.uNotify.success('重置成功')
    },
    langSelect (e) {
      console.log(e)
    },
    toHomePage () {
      uni.redirectTo({
        url: '/pages/index/index'
      })
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
    //**生成二维码**//
    qrFun: function (text) {
      this.qrShow = true
      uQRCode.make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: text,
        size: 150,
        margin: 0,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        errorCorrectLevel: uQRCode.errorCorrectLevel.H,
        success: res => { }
      })
    }
  },
  beforeDestroy () {

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
</style>
