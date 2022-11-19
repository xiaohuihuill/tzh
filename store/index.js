import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex) //vue的插件机制
const vuexPersisted = new createPersistedState({
    storage: {
        getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: key => uni.removeStorageSync(key)
    }
})
const store= new Vuex.Store({
	plugins: [vuexPersisted],
	// store 相当于组件中的data,专门用来存放全局的数据
	state:{
		isCreatedData: false, // 是否初始化了数据
		userInfo: {}, // 存储个人信息
		initData: {}, // 初始化模拟的个人数据
	},
	getters:{
		userInfo:()=>state.userInfo,
		isCreatedData:()=>state.isCreatedData,
		initData:()=>state.initData,
	},
	mutations:{
		INIT_DATA(state,data){
			state.initData = data
		},
		INIT_USER_INFO(state,data){
			state.userInfo = data
		},
		IS_CREATED_DATA(state,value){
			state.isCreatedData = value
		}
	},
	actions:{},
	modules:{
		
	}
})

export default store

