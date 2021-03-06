/* eslint-disable no-unexpected-multiline */
import Vue from 'vue';
import App from './App.vue';
import router from './router/routes.js';
import store from './store/index.js';
import Icon from '@vue/components/app/icon.vue';
import 'swiper/swiper-bundle.css';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
import VueMask from 'v-mask';

Vue.component('icon', Icon);
Vue.use(VueMask);

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("[data-post]").remove();
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App }
})