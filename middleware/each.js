export default (app) => {
  // console.log('中间件路由守卫上下文', app)
  if (!token) {
    app.redirect('/login')
  } else {
    let token = app.$cookies.get('token')
    app.store.commit('setToken', token)
  }
}