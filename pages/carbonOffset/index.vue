<template>
  <view class="carbon-emission-page">
    <view>
      <lang-select></lang-select>
    </view>
    <view>
      <u--text size="16" color="#000000" text="我的碳抵消"></u--text>
    </view>
    <view>
    </view>
    <view>

    </view>
    <view>
      <u--text size="16" color="#000000" text="登记碳抵消"></u--text>
    </view>
    <view>

    </view>
    <view>

    </view>
    <u-notify ref="uNotify"></u-notify>
    <u-tabbar :value="currentTabbar" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item text="碳中和" name="home" icon="home" @click="toHomePage"></u-tabbar-item>
      <u-tabbar-item text="碳排放" name="carbonEmission" icon="photo" @click="toCarbonEmissionPage"></u-tabbar-item>
      <u-tabbar-item text="碳抵消" name="carbonOffset" icon="play-right"></u-tabbar-item>
      <u-tabbar-item text="我的" name="my" @click="toMyPage" icon="account"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>

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
      currentTabbar: 'carbonOffset',
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
      this.$refs.uNotify.success('重置成功')
    },
    langSelect (e) {
      console.log(e)
    },
    toHomePage () {
      uni.redirectTo({
        url: '/pages/index/index'
      })
    },
    toCarbonEmissionPage (e) {
      uni.redirectTo({
        url: '/pages/carbonEmission/index'
      })
    },
    toMyPage () {
      uni.redirectTo({
        url: '/pages/my/index'
      })
    },
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
