<template>
  <div class="agreement">
    <indexHeader></indexHeader>
    <!-- <courseDirection></courseDirection> -->
    <coursemain
      :firstArr="resFirstCategorys"
      :arrcourse="arrcourse"
      :secondArr = "secondArr"
    ></coursemain>
    <foot
      :webconfig="webconfig"
      :userServiceAgreement="userServiceAgreement"
      :privateAgreement="privateAgreement"
    ></foot>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue'
import coursemain from '@/components/course/coursemain.vue'
import foot from '@/components/foot/foot.vue'
// import {webConfig} from '@/common/api/webConfig.js'

export default {
  head () {
    return {
      title: '前端课程'
    }
  },
  data () {
    return {
      webconfig: {}
    }
  },
  metaInfo () {
    return {
      title: this.webconfig.title, // set a title
      meta: [{ // set meta
        name: this.webconfig.keywords,
        content: this.webconfig.description
      }]
    }
  },

  methods: {

  },
  components: {
    indexHeader,
    coursemain,
    foot
  },
  async asyncData (app) {
    let arrcourse = []
    let secondArr = []
    // 服务协议
    let resagreementByCode = await app.$getAgreementByCode('6HG6326I')
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ')
    //获取一级分类
    let resFirstCategorys = await app.$getFirstCategorys()
    //获取课程
    //  参数
    let queryParams = {
      pageNum: 1,
      pageSize: 12,
      total: 0,
      entity: {
        courseName: '',
        status: '',
        firstCategory: '',
        courseLevel: '',
        secondCategory: '',
        sortBy: '',
        isMember: '',
        isFree: '',
        tags: ''
      }
    }
    let resArrcourse = await app.$queryCourse(queryParams)

    if (resArrcourse.meta.code = '200') {
      queryParams.total = resArrcourse.data.pageInfo.total
      arrcourse = resArrcourse.data.pageInfo.list
      arrcourse.forEach(item => {
        switch (item.courseLevel) {
          case 1:
            item.courseLevel = '初级'
            break
          case 2:
            item.courseLevel = '中级'
            break
          case 3:
            item.courseLevel = '高级'
            break
          default:
            item.courseLevel = ''
        }
      })
    }
    // 二级分类
    let resSecondArr = await app.$getSecondCategorys('-1')

    if (resSecondArr.meta.code = '200') {
      secondArr = resSecondArr.data.list
    }

    //返回数据
    return {
      userServiceAgreement: resagreementByCode.data.data,
      privateAgreement: resPrivateAgreement.data.data,
      resFirstCategorys: resFirstCategorys.data.list,
      arrcourse,
      secondArr
    }
  }
};
</script>

<style scoped>
</style>
