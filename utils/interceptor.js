import store from '../store'
const whiteList = [
  "/pages/loading/index",
]
//白名单 不需要登录的页面路径组成的数组

function hasPermission(url) {
  // 在白名单中或有token，直接跳转
  if (whiteList.indexOf(url) !== -1 || store.state.user.token) {
    return true
  }
  return false
}

uni.addInterceptor('navigateTo', {
  // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
  invoke(e) {
    if (!hasPermission(e.url)) {
      uni.reLaunch({
        url: '/pages/loading/index'
      })
      return false
    }
    return true
  },
  success(e) {
    // console.log(e)
  }
})

uni.addInterceptor('switchTab', {
  // tabbar页面跳转前进行拦截
  invoke(e) {
    if (!hasPermission(e.url)) {
      uni.reLaunch({
        url: '/pages/loading/index'
      })
      return false
    }
    return true
  },
  success(e) {
    // console.log(e)
  }
})
