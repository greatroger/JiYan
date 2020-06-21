import Vue from 'vue'
import Router from 'vue-router'
import CourseInfo from '../page/courseInfo'
import tongji from '../page/tongji'
import login from '../page/login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/courseInfo',
      name: 'courseInfo',
      component: CourseInfo
    },
    {
      path:'/tongji',
      name:'tongji',
      component: tongji
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ]
})
