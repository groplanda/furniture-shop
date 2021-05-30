import Vue from 'vue'
import Router from 'vue-router'

import Home from '@vue/page/Home'
import About from '@vue/page/About'
import Cart from '@vue/page/Cart'

Vue.use(Router);
let router = new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart
        }
    ]
});

export default router