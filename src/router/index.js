import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Member from '@/components/Member'
import Login from '@/components/Login'
import addMember from '@/components/addMember'
import editMember from '@/components/editMember'
import News from '@/components/News'

Vue.use(Router)

var routers = new Router({
  routes: [
    {
        name:"Main",
        path: '/back',
        component: Main,
        children:[
            {path:"/member",component:Member},
            {path:"/addMember",component:addMember},
            {path:"/editMember",component:editMember},
            {path:"/news",component:News},
        ]
    },
      {
          name:"Main",
          path: '/back/login',
          component: Login,
      }
  ]
})
routers.beforeEach((to, from, next) => {
    if(to.path == "/back/login"){
        next();
    }else {
      if(sessionStorage.getItem("login")){
          next();
      }else {
          next("/back/login");
      }
    }
})
export default routers;