<template>
  <div class="course">
    <indexHeader></indexHeader>
    <Layout></Layout>
    <foot
      :userServiceAgreement="userServiceAgreement"
      :privateAgreement="privateAgreement"
    ></foot>
  </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue'
import Layout from '@/components/cart/layout.vue'
import foot from '@/components/foot/foot.vue'
// import {webConfig} from '@/common/api/webConfig.js'
w
export default {
  middleware:['each'],
  components: {
    indexHeader,
    Layout,
    foot
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
};
</script>
<style scoped>
</style>
