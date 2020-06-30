import Vue from 'vue'
import Router from 'vue-router'
import CourseInfo from '../page/courseInfo'
import Comment from '../page/comment'
import forumMain from '../page/forum_main'
import forumDetail from '../page/forum_detail'
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
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/forum/main',
      name: 'forumMain',
      component: forumMain
    },
    {
      path: '/forum/detail/:id',
      name: 'forumDetail',
      component: forumDetail,
      props: true,
      meta: {
        title: 'forumDetail',
        icon: '',
        noCache: true
      }
    },
    {
      path:'/',
      name:'login',
      component:login
    }
  ]
})
