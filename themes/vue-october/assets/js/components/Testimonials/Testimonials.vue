<template lang="pug">
  section.product-slider
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

export default {
  name: "Testimonials",
  components: {
    Swiper,
    SwiperSlide,
    TestimonialItem
  },
  data() {
    return {
      testimonials: [
        {
          name: "Александра",
          avatar: "http://furniture-salon.oml.ru/thumb/2/yZv17Q6FDeCoM0end_mZpg/120r120/d/fgs16_105.jpg",
          message: "Ребята привезли нашу кухню в срок, аккуратно и оперативно установили. Вдобавок помогли отрегулировать мужу двери нашего шкафа-купе совершенно бесплатно. Порадовало, что рассчитываться можно безналичными. Спасибо большое!",
          date: "09. 06. 2020"
        },
        {
          name: "Светлана",
          avatar: "http://furniture-salon.oml.ru/thumb/2/m0oyYFcDSiYR3u4M4Az9zA/120r120/d/fgs16_104.jpg",
          message: "Спасибо! Культурные и вежливые менеджеры. Быстрая доставка. Буду советовать всем.",
          date: "18. 03. 2020"
        },
        {
          name: "Максим",
          avatar: "http://furniture-salon.oml.ru/thumb/2/suVY0jfjT1_W89GtZoQ7Mg/120r120/d/fgs16_101.jpg",
          message: "Понравилось вежливое обслуживание менеджеров. Быстро отреагировали на заявку, сообщили о времени поставки. Доставка была осуществлена во время. Очень довольны, будем советовать всем своим друзьям и знакомым.",
          date: "18. 05. 2020"
        },
        {
          name: "Михаил",
          avatar: "http://furniture-salon.oml.ru/thumb/2/GQ0VVBhzNx5F4RrRkVQ1JA/120r120/d/fgs16_106.jpg",
          message: "Делал заказ на стол СР-165, менеджер Валентина оперативно подсказала и ответила на все мои вопросы. Помогла с выдачей товара. Доставили в обещанный срок. Остались всем довольны.",
          date: "02. 04. 2020"
        }
      ],
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
  }
}
</script>