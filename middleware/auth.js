
export default (app) => {
  // console.log('middleware',store.state.user.token);
  let token = app.$cookies.get('token')
  // console.log('token',token);
  app.store.commit('setToken',token)
}