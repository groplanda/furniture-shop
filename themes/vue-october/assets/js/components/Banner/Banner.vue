<template lang="pug">
  .banner
    ._row
      ._slider
        Swiper(ref="BannerSlider" :options="sliderOptions")._swiper
          SwiperSlide(v-for="banner in banners" :key="banner.id")
            ._slider-item
              ._slider-title {{ banner.title }}
              img(:src="'/storage/app/media' + banner.image", :alt="banner.title")._slider-img
              router-link(:to="banner.link")._slider-link
        button._slider-control.-prev(@click="prevBanner")
          icon(name="control-prev" component="banner")._slider-ico
        button._slider-control.-next(@click="nextBanner")
          img(:src="'/storage/app/media' + thumbSrc", alt="alt")._slider-thumb
          icon(name="control-prev" component="banner")._slider-ico.-mobile

      ._blocks
        ._blocks-items(v-for="(ad, index) in ads" :key="index")
          router-link(:to="ad.link" v-if="ad.link")._blocks-link
          img(:src="'/storage/app/media' + ad.image", :alt="ad.title")._blocks-img
          ._blocks-title(v-if="ad.title") {{ ad.title }}
          ._blocks-price(v-if="ad.tag") {{ ad.tag }}



</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import axios from "axios";
export default {
  name: "Banner",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      banners: [],
      thumbSrc: "",
      sliderOptions: {
        loop: true
      }
    }
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.BannerSlider.$swiper
    },
    ads() {
      return this.$store.getters.getSettings.banners;
    }
  },
  methods: {
    prevBanner() {
      this.swiper.slidePrev();
      this.updateThumb();
    },
    nextBanner() {
      this.swiper.slideNext();
      this.updateThumb();
    },
    setNextThumb() {
      this.thumbSrc = this.banners[this.swiper.realIndex + 1].image;
    },
    updateThumb() {
      if (this.swiper.realIndex < this.banners.length - 1) {
        this.setNextThumb();
      } else {
        this.thumbSrc = this.banners[0].image;
      }
    },
    fetchSlides() {
      axios.get("/api/slider")
      .then(response => {
        this.banners = response.data;
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  created() {
    this.fetchSlides();
  },
  mounted() {
    setTimeout(() => {
      this.setNextThumb()
    }, 400)
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.banner {
  margin-bottom: 80px;

  @media(max-width: 991px) {
    margin-bottom: 60px;
  }

  @media(max-width: 767px) {
    margin-bottom: 30px;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 1440px) {
       min-height: 440px;
    }

    @media(max-width: 1199px) {
      min-height: none;
    }
  }

  &__slider {
    width: 100%;
    max-width: calc(100% - 445px);
    max-height: 640px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;

    @media(max-width: 1440px) {
      max-height: 440px;
    }

    @media(max-width: 1199px) {
      max-width: 100%;
      margin-bottom: 40px;
      max-height: 400px;
    }

    @media(max-width: 991px) {
      max-height: 300px;
      margin-bottom: 20px;
    }

    @media(max-width: 575px) {
      min-height: 200px;
    }
  }

  &__swiper {
    height: 100%;
  }

  &__slider-control {
    height: 90px;
    border: 2px solid;
    border-radius: 10px;
    position: absolute;
    cursor: pointer;
    pointer-events: all;
    transition: border 0.3s, background 0.3s;
    bottom: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    @media(max-width: 1440px) {
      bottom: 40px;
    }

    @media(max-width: 991px) {
      bottom: 30px;
      height: 70px;
    }

    @media(max-width: 575px) {
      bottom: 20px;
      height: 45px;
    }

    &--prev {
      width: 70px;
      left: 70px;
      border-color: rgba(255, 255, 255, 0.3);

      @media(max-width: 1440px) {
        left: 40px;
      }

      @media(max-width: 991px) {
        width: 54px;
        left: 30px;
      }

      @media(max-width: 575px) {
        left: 20px;
        width: 45px;
      }
    }

    &--next {
      width: 145px;
      right: 70px;
      border-color: #FFF;

      @media(max-width: 1440px) {
        right: 40px;
      }

      @media(max-width: 991px) {
        width: 100px;
        right: 30px;
      }

      @media(max-width: 575px) {
        width: 45px;
        right: 20px;
        border-color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  &__slider-thumb {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;

    @media(max-width: 575px) {
      display: none;
    }
  }

  &__slider-ico {
    width: 20px;
    height: 20px;
    fill: #FFF;

    &--mobile {
      transform: rotate(180deg);
      display: none;
      @media(max-width: 575px) {
        display: block;
      }
    }

    @media(max-width: 575px) {
      width: 18px;
      height: 18px;
    }
  }

  &__slider-item {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: #000;
      opacity: .1;
    }
  }

  &__slider-img {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &__slider-title {
    width: 100%;
    max-width: 450px;
    font-weight: bold;
    font-size: 70px;
    color: #fff;
    position: absolute;
    top: 70px;
    left: 70px;
    z-index: 3;

    @media(max-width: 1440px) {
      font-size: 50px;
      left: 50px;
      top: 50px;
    }

    @media(max-width: 991px) {
      left: 30px;
      top: 30px;
      font-size: 40px;
    }

    @media(max-width: 575px) {
      left: 20px;
      top: 20px;
      font-size: 30px;
      padding-right: 20px;
    }

    @media(max-width: 349px) {
      font-size: 25px;
    }
  }

  &__slider-link {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  &__blocks {
    margin-left: 40px;
    width: 100%;
    max-width: 405px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;

    @media(max-width: 1440px) {
      max-height: 440px;
    }

    @media(max-width: 1199px) {
      flex-direction: row;
      margin-left: 0;
      max-width: 100%;
      max-height: none;
    }
  }

  &__blocks-items {
    height: calc(50% - 20px);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    max-height: 300px;
    z-index: 3;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: #000;
      opacity: .1;
    }

    @media(max-width: 1199px) {
      height: 100%;
      width: 100%;
      max-width: calc(50% - 20px);
    }

    @media(max-width: 991px) {
      max-width: calc(50% - 10px);
    }

    @media(max-width: 575px) {
      max-width: 100%;
      margin-bottom: 20px;
      max-height: 200px;
    }
  }

  &__blocks-link {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  &__blocks-img {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &__blocks-title {
    z-index: 3;
    font-weight: bold;
    font-size: 40px;
    color: #FFF;
    position: absolute;
    top: 30px;
    left: 30px;

    @media(max-width: 1440px) {
      font-size: 30px;
      top: 20px;
      left: 20px;
    }

    @media(max-width: 991px) {
      font-size: 25px;
    }

    @media(max-width: 575px) {
      font-size: 20px;
    }
  }

  &__blocks-price {
    z-index: 3;
    font-weight: bold;
    font-size: 25px;
    color: #FFF;
    background: $dark;
    border-radius: 10px;
    padding: 12px 20px;
    position: absolute;
    left: 30px;
    bottom: 30px;

    @media(max-width: 1440px) {
      left: 20px;
      bottom: 20px;
      font-size: 20px;
    }

    @media(max-width: 991px) {
      font-size: 18px;
    }

    @media(max-width: 575px) {
      font-size: 16px;
    }
  }
}
</style>