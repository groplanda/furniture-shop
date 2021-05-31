import Vue from 'vue'
import Router from 'vue-router'

import Home from '@vue/page/Home'
import About from '@vue/page/About'
import Cart from '@vue/page/Cart'
import Checkout from '@vue/page/Checkout'

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
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: Checkout
        }
    ]
});

export default router