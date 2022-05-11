import { Decrypt } from '@/utils/aes'
export default ({ $axios }, inject) => {
  // /order/getByMemberId
  // 查询订单
  inject('settlement', (params) => $axios({
    url: '/api/order/settlement',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': Decrypt(this.$cookies.get('token'))
    }
  }))


  //微信结算
  inject('wxpay', (params) => $axios({
    url: '/api/pay/wxpay/createOrder',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': Decrypt(this.$cookies.get('token'))
    }
  }))

  //支付宝结算
  inject('zfbpay', (params) => $axios({
    url: '/api/pay/alipay/createOrder',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': Decrypt(this.$cookies.get('token'))
    }
  }))
  //支付宝
  inject('queryOrderWithAli', (orderNumber) => $axios({
    url: '/api/pay/alipay/queryOrder',
    method: 'GET',
    params: orderNumber,
    headers: {
      'Authorization': Decrypt(this.$cookies.get('token'))
    }
  }))


  inject('queryOrderWithWX', (orderNumber) => $axios({
    url: '/api/pay/wxpay/queryOrder',
    method: 'GET',
    params: orderNumber,
    headers: {
      'Authorization': Decrypt(this.$cookies.get('token'))
    }
  }))



}


