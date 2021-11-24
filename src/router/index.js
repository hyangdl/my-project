import Vue from 'vue'
import Router from 'vue-router'
import HelloCats from '@/components/HelloCats'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloCats',
      component: HelloCats
    }
  ]
})
