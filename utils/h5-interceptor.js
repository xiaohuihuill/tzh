import store from '../store'

export const isAuth = () => {
  if (!store.state.isCreatedData) {
    uni.navigateTo({
      url: '/pages/loading/index'
    })
  }
}
