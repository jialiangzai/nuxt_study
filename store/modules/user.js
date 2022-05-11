
export default {
	state:{
		userInfo: {
			avatar: '/image/common/avator.png',
			nickname: '小鹿线-默认',
			gender: 1,
			city: '北京',
			id:1,
		},
		token:'',
		isLogin:false,
		// isLogin: JSON.parse(localStorage.getItem('isLogin'))  || false,
    cartNum: 0,
    loginDialog:false
	},
	getters:{
		avatar:state => state.userInfo.avatar
	},
	mutations:{
		setToken(state,token){
			if (token) {
				state.token = token
				state.isLogin=true
				this.$cookies.set('token',token);
				this.$cookies.set('isLogin',true)
			}

		},
		removeToken(state){
			state.token = '',
			state.isLogin=false,
			state.userInfo = {
				avatar: '/image/common/avator.png',
				nickname: '小鹿线-默认',
				gender: 1,
				city: '北京',
				id:1,
			},
			this.$cookies.remove('token')
			this.$cookies.remove('isLogin')
		},
		saveUserInfo(state,payload){
			state.userInfo = payload
		},
		saveLogin(state,payload) {
			state.isLogin = payload
		},
		saveAvator(state,payload){
			state.userInfo.avatar = payload
		},
        saveCartNum(state,payload){
            state.cartNum = payload
        },
        saveLoginDialog(state,payload){
            state.loginDialog = payload
        }
	},
	actions:{
		saveUserInfoAction({commit},payload){
			commit('saveUserInfo',payload)
		},
		saveLoginAction({commit},payload){
			commit('saveLogin',payload)
		},
		saveAvatorAction({commit},payload){
			commit('saveAvator',payload)
		},
        saveCartNumAction({commit},payload){
            commit('saveCartNum',payload)
        }
	}
}
