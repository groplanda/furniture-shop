import Vue from 'vue'
import Router from 'vue-router'

import Home from '@vue/page/Home'
import About from '@vue/page/About'
import Cart from '@vue/page/Cart'
import Checkout from '@vue/page/Checkout'
import Post from '@vue/page/Post'
import Category from '@vue/page/Category'
import Product from '@vue/page/Product'

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
        },
        {
          path: '/post/:slug',
          name: 'post',
          component: Post
        },
        {
          path: '/category/:slug',
          name: 'category',
          component: Category
        },
        {
          path: '/product/:id',
          name: 'product',
          component: Product
        }
    ]
});

export default router