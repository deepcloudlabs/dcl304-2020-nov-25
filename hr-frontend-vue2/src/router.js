import Vue from 'vue'
import Router from 'vue-router'
import Employee from './components/Employee'
import Employees from './components/Employees'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Employee
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees
    }
  ]
})
