<template lang="pug">
  section.product-slider

    transition(name="fade")
      ._success(v-if="productPopup") Товар добавлен в корзину!

    ._heading
      ._title {{ title }}
      ._controls(v-if="products.length >= 4")
        button._controls-btn.-prev(@click="swiper.slidePrev()")
          icon(name="control-prev" component="banner")._controls-ico
        button._controls-btn.-next(@click="swiper.slideNext()")
          icon(name="control-prev" component="banner")._controls-ico
    ._main
      Swiper(ref="productSlider" :options="sliderOptions")._swiper
        SwiperSlide(v-for="(product, idx) in products" :key="idx")._item
          ProductSliderItem(:product="product" @showPopup="showPopup")


</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import ProductSliderItem from './ProductSliderItem.vue';

export default {
  name: "ProductSlider",
  components: {
    Swiper,
    SwiperSlide,
    ProductSliderItem
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      productPopup: false,
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
          575: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1199: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1440: {
            slidesPerView: 4,
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
      return this.$refs.productSlider.$swiper
    }
  },
  methods: {
    showPopup(event) {
      this.productPopup = event;

      setTimeout(() => {
        this.productPopup = false;
      }, 2000)
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.product-slider {
  padding-bottom: 100px;

  @media(max-width: 1740px) {
    padding-bottom: 70px;
  }

  @media(max-width: 767px) {
    padding-bottom: 40px;
  }

  $root: &;

  &__success {
    width: 100%;
    max-width: 480px;
    padding: 28px 40px;
    text-align: center;
    font-weight: 500;
    font-size: 19px;
    line-height: 32px;
    color: #fff;
    background: $dark;
    box-shadow: 0px 4px 40px rgb(0, 0, 0, 0.1);
    border-radius: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%, -50%);

    @media(max-width: 767px) {
      font-size: 18px;
      line-height: 30px;
      padding: 20px 30px;
    }

    @media(max-width: 500px) {
      max-width: calc(100% - 40px);
      font-size: 16px;
      line-height: 24px;
      padding: 20px;
    }
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;

    @media(max-width: 767px) {
      margin-bottom: 30px;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 55px;
    color: $primary;

    @media(max-width: 1740px) {
      font-size: 45px;
    }

    @media(max-width: 1440px) {
      font-size: 40px;
    }

    @media(max-width: 1199px) {
      font-size: 35px;
    }

    @media(max-width: 767px) {
      font-size: 30px;
    }

    @media(max-width: 575px) {
      font-size: 25px;
    }

    @media(max-width: 480px) {
      font-size: 20px;
      padding-right: 20px;
    }
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $dark;
    box-shadow: 7px 7px 30px $shadow-primary;
    border-radius: 15px;
    margin-left: auto;
    padding: 10px;
  }

  &__controls-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border-radius: 7px;

    &--next {
      #{$root} {
        &__controls-ico {
          transform: rotate(180deg);
        }
      }
    }

    @media(max-width: 575px) {
      width: 35px;
      height: 35px;
    }
  }

  &__controls-ico {
    width: 20px;
    height: 20px;
    fill: #FFF;

    @media(max-width: 575px) {
      width: 18px;
      height: 18px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>