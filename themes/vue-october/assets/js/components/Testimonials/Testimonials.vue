<template lang="pug">
  section.product-slider(v-if="testimonials && testimonials.length")
    ._heading
      ._title Отзывы о магазине
      ._controls
        button._controls-btn.-prev(@click="swiper.slidePrev()")
          icon(name="control-prev" component="banner")._controls-ico
        button._controls-btn.-next(@click="swiper.slideNext()")
          icon(name="control-prev" component="banner")._controls-ico
    ._main
      Swiper(ref="testimonialSlider" :options="sliderOptions")._swiper
        SwiperSlide(v-for="(testimonial, idx) in testimonials" :key="idx")._item
          TestimonialItem(:testimonial="testimonial")

</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import TestimonialItem from './TestimonialItem.vue';
import axios from "axios";

export default {
  name: "Testimonials",
  components: {
    Swiper,
    SwiperSlide,
    TestimonialItem
  },
  data() {
    return {
      testimonials: [],
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
          767: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      }
    }
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.testimonialSlider.$swiper
    }
  },
  methods: {
    fetchTestimonial() {
      axios.get("/api/testimonials")
      .then(response => {
        this.testimonials = response.data
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  created() {
    this.fetchTestimonial();
  }
}
</script>