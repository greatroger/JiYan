import Vue from 'vue'
import Router from 'vue-router'
import CourseInfo from '../page/courseInfo'
import Comment from '../page/comment'
import forumMain from '../page/forum_main'
import forumDetail from '../page/forum_detail'
import login from '../page/login'
import personInfo from '../page/personInfo'
import uploadDemo from '../components/uploadDemo'
import editor from '../components/editor'
import courseDetail from '../page/course_detail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/courseInfo',
      name: 'courseInfo',
      component: CourseInfo
    },
    {
      path: '/comment/:courseId',
      name: 'comment',
      component: Comment,
      props: true
    },
    {
      path: '/forum/main',
      name: 'forumMain',
      component: forumMain
    },
    {
      path: '/forum/detail/:id/:ownerId',
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
    },
    {
      path:'/personInfo/:userId/:offset',
      name:'personInfo',
      component:personInfo
    },
    {
      path:'/uploadDemo',
      name:'uploadDemo',
      component:uploadDemo
    },
    {
      path:'/editor',
      name:'editor',
      component:editor
    },
    {
      path:'/course_detail/:id',
      name:'course_detail',
      component:courseDetail,

    }
  ]
})
