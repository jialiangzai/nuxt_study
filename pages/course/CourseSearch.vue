<template>
  <div class="agreement">
    <indexHeader></indexHeader>
    <!-- <courseDirection></courseDirection> -->
    <coursemain
      :firstArr="resFirstCategorys"
      :arrcourse="arrcourse"
      :secondArr="secondArr"
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
      title: this.title
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
    //id
    let id = app.route.params.id
    let type = app.route.query.type
    let arr = []
    let title = ''
    let resSecondArr = {}
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
    // 服务协议
    let resagreementByCode = await app.$getAgreementByCode('6HG6326I')
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ')
    //获取一级分类
    let resFirstCategorys = await app.$getFirstCategorys()
    // console.log('打印一下一级分类数组data.list', resFirstCategorys)
    if (type == 'fcategory') {
      arr = resFirstCategorys.data.list.filter(item => item.id == id)
      title = arr[0].categoryName
      queryParams.entity.firstCategory = id
      // 二级是需要一级的id的需要存一下防止页面刷新就没有
      app.$cookies.set('firstCategory', id)
      // //获取二级分类
      resSecondArr = await app.$getSecondCategorys(id)
    }
    if (type == 'scategory') {
      let firstCategoryId = app.$cookies.get('firstCategory')
      queryParams.entity.firstCategory = firstCategoryId
      queryParams.entity.secondCategory = id
      app.$cookies.set('scategory', id)
      // //获取二级分类
      resSecondArr = await app.$getSecondCategorys(firstCategoryId)
      arr = resSecondArr.data.list.filter(item => item.id == id)
      title = arr[0].categoryName
    }
    // 课程难度
    if (type == 'clevel') {
      let firstCategoryId = app.$cookies.get('firstCategory')
      let scategory = app.$cookies.get('scategory')
      queryParams.entity.firstCategory = firstCategoryId || ''
      queryParams.entity.secondCategory = scategory || ''
      queryParams.entity.courseLevel = id
      resSecondArr = await app.$getSecondCategorys(firstCategoryId || -1)
    }
    //获取课程

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
    //  resSecondArr = await app.$getSecondCategorys('-1')

    if (resSecondArr.meta.code = '200') {
      secondArr = resSecondArr.data.list
    }

    //返回数据
    return {
      userServiceAgreement: resagreementByCode.data.data,
      privateAgreement: resPrivateAgreement.data.data,
      resFirstCategorys: resFirstCategorys.data.list,
      arrcourse,
      secondArr,
      title
    }
  }
};
</script>

<style scoped>
</style>
