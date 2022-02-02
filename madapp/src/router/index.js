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

const routes = [
  {
    path: '/wkpage/:id',
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
    children: [
      { path: 'courseman', component: Courseman },
      { path: 'howkman', component: Howkman },
      { path: 'studentman', component: Studentman },

    ]
  },
  {
    path: '/student',
    name: 'Student',
    component: Student
  }

]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})


export default router
