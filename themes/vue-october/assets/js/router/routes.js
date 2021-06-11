import Vue from 'vue'
import Router from 'vue-router'

import Home from '@vue/page/Home'
import Cart from '@vue/page/Cart'
import Checkout from '@vue/page/Checkout'
import Post from '@vue/page/Post'
import Category from '@vue/page/Category'
import Product from '@vue/page/Product'
import Tag from '@vue/page/Tag'
import SearchPage from '@vue/page/SearchPage'
import Notfound from '@vue/page/Notfound'

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
          path: '/post/:slug',
          name: 'post',
          component: Post
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
          path: '/category/:slug',
          name: 'category',
          component: Category
        },
        {
          path: '/product/:id',
          name: 'product',
          component: Product
        },
        {
          path: '/tag/:slug',
          name: 'tag',
          component: Tag
        },
        {
          path: '/search',
          name: 'search',
          component: SearchPage
        },
        {
          path: '/404',
          name: 'notfound',
          component: Notfound
        }
    ]
});

export default router