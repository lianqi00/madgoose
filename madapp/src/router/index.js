// import { createRouter, createWebHistory } from 'vue-router'
import vue from 'vue'
import VueRouter from 'vue-router'
vue.use(VueRouter)
import Wkpage from '../views/Wkpage.vue'
import Login from '../views/Login.vue'
import Teacher from '../views/Teacher.vue'
import Student from '../views/Student.vue'
import Courseman from '../views/Courseman.vue'
import Howkman from '../views/Howkman.vue'
import Studentman from '../views/Studentman.vue'
import Home from '../views/Home.vue'
import Feedback from '../views/Feedbackman.vue'
import notfount from '../views/notfount.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/wkpage/:id/:cid',
    name: 'Wkpage',
    component: Wkpage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher,
    redirect: '/teacher/courseman',
    children: [
      { path: 'courseman', component: Courseman },
      { path: 'howkman', component: Howkman },
      { path: 'studentman', component: Studentman },
      { path: 'feedbackman', component: Feedback },

    ]
  },
  {
    path: '/student/:id',
    name: 'Student',
    component: Student
  },
  {
    path: '*',
    name: 'notfount',
    component: notfount
  }

]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})


export default router
