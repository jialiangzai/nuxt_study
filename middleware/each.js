export default (app) => {
  // console.log('中间件路由守卫上下文', app)

  let token = app.$cookies.get('token')
  console.log('token', token)

  app.store.commit('setToken', token)
  if (!token) {
    app.redirect('/login')
  }
}