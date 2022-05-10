export default ({$axios},inject)=>{
  // 添加商品到购物车
  inject('createToken',()=>$axios({
    url: '/api/token/createToken',
    method: 'POST'
  }))
};