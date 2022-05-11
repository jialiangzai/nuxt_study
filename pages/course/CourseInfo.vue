<template>
  <div class="courseinfo">
    <indexHeader></indexHeader>
    <courseInfoContainer
      :courseInfoArr="courseInfoArr"
      :courseDetail="courseDetail"
      :courseChapters="courseChapters"
      :downsource="downsource"
      :courseTeacher="courseTeacher"
    ></courseInfoContainer>
    <foot
      :userServiceAgreement="userServiceAgreement"
      :privateAgreement="privateAgreement"
    ></foot>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue'
import foot from '@/components/foot/foot.vue'
import courseInfoContainer from '@/components/course/courseInfoContainer.vue'
// import {webConfig} from '@/common/api/webConfig.js'
export default {
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
  },
  components: {
    indexHeader,
    courseInfoContainer,
    foot
  },
  async asyncData (app) {
    let res = await app.$getcourseInfo(app.route.params.courseId)
    let courseInfoArr = res.data.data
    // console.log('res', courseInfoArr, app.route.params.courseId)
    let courseDetail = res.data.data.bizCourseDetail
    let courseChapters = res.data.data.bizCourseChapters
    let downsource = res.data.data.bizCourseAttachments
    let courseTeacher = res.data.data.bizCourseTeacher
    switch (courseInfoArr.courseLevel) {
      case 1:
        courseInfoArr.courseLevel = '初级'
        break
      case 2:
        courseInfoArr.courseLevel = '中级'
        break
      case 3:
        courseInfoArr.courseLevel = '高级'
        break
      default:
        courseInfoArr.courseLevel = '零基础'
    }

    // 服务协议
    let resagreementByCode = await app.$getAgreementByCode('6HG6326I')
    //获取隐私协议
    let resPrivateAgreement = await app.$getAgreementByCode('6GFL2QGQ')
    return {
      userServiceAgreement: resagreementByCode.data.data,
      privateAgreement: resPrivateAgreement.data.data,
      courseInfoArr,
      courseDetail,
      courseChapters,
      downsource,
      courseTeacher,
    }
  },
};
</script>
