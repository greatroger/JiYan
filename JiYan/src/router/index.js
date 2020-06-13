import Vue from 'vue'
import Router from 'vue-router'
import CourseInfo from '../page/courseInfo'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/courseInfo',
      name: 'courseInfo',
      component: CourseInfo
    }
  ]
})
