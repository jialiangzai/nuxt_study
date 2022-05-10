<template>
  <div class="home">
    <indexHeader></indexHeader>
    <navSwiper :categorys="categorys"></navSwiper>
    <newGoodCourse
      :newCourses="newCourses"
      :hotCourse="hotCourse"
    ></newGoodCourse>
    <foot
      :userServiceAgreement="userServiceAgreement"
      :privateAgreement="privateAgreement"
    ></foot>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue'
import navSwiper from '@/components/index/navSwiper.vue'
import newGoodCourse from '@/components/index/newGoodCourse.vue'
import foot from '@/components/foot/foot.vue'

export default {
  components: {
    indexHeader,
    navSwiper,
    newGoodCourse,
    foot
  },
  async asyncData (app) {
    let newCourses = []
    let hotCourse = []
    // 获取新课程
    console.log('app', app.$getNewCourse)
    let resNewCourses = await app.$getNewCourse(
      {
        pageNum: 1,
        pageSize: 8
      }
    )
    if (resNewCourses.meta.code = '200') {
      newCourses = resNewCourses.data.pageInfo.list
      newCourses.forEach(item => {
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
    let resHotCourse = await app.$getHotCourse({
      pageNum: 1,
      pageSize: 6
    })
    if (resHotCourse.meta.code = '200') {
      hotCourse = resHotCourse.data.pageInfo.list
      hotCourse.forEach(item => {
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
    // 服务协议
    let resagreementByCode = await app.$getAgreementByCode('6HG6326I')
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ')
    // 获取课程一级分类
    let resFirstCategory = await app.$axios({
      url: '/api/course/category/getFirstCategorys',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        // "Content-Type":"application/x-www-form-urlencoded"
      },
    })
  //返回数据
  return {
    newCourses,
    hotCourse,
    userServiceAgreement: resagreementByCode.data.data,
    privateAgreement: resPrivateAgreement.data.data,
    categorys : resFirstCategory.data.list
  }
}
  //   async asyncData( app ){
  //     console.log('app',app);
  //   let res = await app.$getFirstCategorys();
  //   console.log( res );
  // }
  // async asyncData(app) {
  //   let res = await app.getFirstCategorys()
  //   console.log('====================================');
  //   console.log('res',res);
  //   return {
  //     list:res.data.list
  //   }
  //   console.log('====================================');
  // },
};
</script>

<style scoped>
</style>
