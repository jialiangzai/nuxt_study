<template>
  <div class="course">
    <indexHeader></indexHeader>
    <confirmOrder></confirmOrder>
    <foot
      :userServiceAgreement="userServiceAgreement"
      :privateAgreement="privateAgreement"
    ></foot>
  </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue'
import confirmOrder from '@/components/cart/confirmOrder.vue'
import foot from '@/components/foot/foot.vue'

export default {
  data () {
    return {

    }
  },
  component: {
    indexHeader,
    confirmOrder,
    foot,
  },
  async asyncData (app) {
    // 服务协议
    let resagreementByCode = await app.$getAgreementByCode('6HG6326I')
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ')
    return {
      userServiceAgreement: resagreementByCode.data.data,
      privateAgreement: resPrivateAgreement.data.data,
    }
  },
}
</script>
