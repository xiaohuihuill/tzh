<template>
  <view>
    <view class="lang-select-components">
      <u--text size="16" class="title-text" color="#000000" :text="title"></u--text>
      <u-button class="lang-button" @click="show = true">{{ currentLang }}</u-button>
    </view>
    <view>
      <u-action-sheet :actions="list" :title="langTitle" :show="show" @select="langSelect" @close="show = false">
      </u-action-sheet>
      <u-notify ref="uNotify"></u-notify>
    </view>
  </view>
</template>
<script>

import { mapState, mapMutations } from 'vuex'//引入mapState
export default {
  components: {},
  data () {
    return {
      show: false,
      langTitle: 'language',
      list: [
        {
          name: 'China'
        },
        {
          name: 'Britain'
        }
      ],
    }
  },
  async onLoad () {
  },
  onShow () { },
  computed: {
    ...mapState(['userInfo', 'currentLang']),
    title () {
      console.log(this.userInfo)
      let day = this.getDaysBetween(this.userInfo.startTime, new Date().getTime())
      return `${this.userInfo.userName},您好！您的中和之旅第${day}天`
    }
  },
  methods: {
    ...mapMutations([   //使用es6的拓展运算符
      'SET_CURRENT_LANG'
    ]),
    getDaysBetween (startDate, enDate) {
      const sDate = Date.parse(new Date(startDate))
      const eDate = Date.parse(new Date(enDate))
      if (sDate === eDate) {
        return 1
      }
      const days = (eDate - sDate) / (1 * 24 * 60 * 60 * 1000)
      return Math.ceil(days)
    },
    langSelect (item) {
      if (this.currentLang == item.name) return
      this.SET_CURRENT_LANG(item.name)
      this.$refs.uNotify.success('切换成功')
    },
  },

}
</script>

<style lang="scss">
.lang-select-components {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  padding-top: 20rpx;

  .title-text {
    flex: 1;
  }

  .lang-button {
    width: 100rpx;
    height: 60rpx;
  }
}
</style>
