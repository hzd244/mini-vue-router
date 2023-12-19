import Vue from 'vue'
import VueRouter from './plugins/vue-router'
import Home from './view/homePage.vue'
import About from './view/aboutPage.vue'
import aboutA from '@/components/aboutA'
import aboutB from '@/components/aboutB'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home',
    },
    {
      path: '/about',
      component: About,
      name: 'about',
      children: [
        {
          path: 'a',
          name: 'a',
          component: aboutA,
        },
        {
          path: 'b',
          name: 'b',
          component: aboutB,
        },
      ],
    },
  ],
})
