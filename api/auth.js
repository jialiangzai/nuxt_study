export default ({ $axios }, inject) => {
  // 添加商品到购物车
  inject('getShopCarCounter', () => $axios({
    url: '/api/shopcar/getShopCarCounter',
    method: 'GET',
    // headers: {
    //   'Authorization': Decrypt(localStorage.getItem('token'))
    // }
  }))
  // 手机 加 密码登陆
  inject('loginByJson', (params) => $axios({
    url: '/api/u/loginByJson',
    method: 'POST',
    data: params
  }))

  // 手机 加 密码登陆
  inject('register', (params) => $axios({
    url: '/api/member/register',
    method: 'POST',
    data: params
  }))
  // 手机验证码登陆
  inject('loginByMobile', (params) => $axios({
    url: '/api/u/loginByMobile',
    method: 'POST',
    data: params
  }))

  // 退出登陆
  inject('logout', () => $axios({
    url: '/api/u/logout',
    method: 'GET'
  }))
  // 获取个人信息
  inject('getInfo', ({ token }) => $axios({
    url: '/api/member/getInfo?token=' + token,
    method: 'GET',
    // headers: {
    //   'Authorization': Decrypt(localStorage.getItem('token'))
    // }
  }))
  // 获取购物车数据
  inject('getShopCarCounter', () => $axios({
    url: '/api/shopcar/getShopCarCounter',
    method: 'GET',
    // headers: {
    //   'Authorization': Decrypt(localStorage.getItem('token'))
    // }
  }))
  // 获取 token /token/createToken
  inject('loginByMobile', () => $axios({
    url: '/api/token/createToken',
    method: 'POST'
  }))
  // 三方登录
  // oauth/getAccessToken
  inject('getAccessToken', ({ code }) => $axios({
    url: '/api/oauth/getAccessToken?code=' + code,
    method: 'GET'
  }))
}