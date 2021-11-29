import Vue from 'vue'
import Router from 'vue-router'
import HelloCats from '@/components/HelloCats'
import RealtimeWeather from '@/components/RealtimeWeather'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloCats',
      component: HelloCats
    },
    {
      path: '/weather',
      name: 'RealtimeWeather',
      component: RealtimeWeather
    }
  ]
})
