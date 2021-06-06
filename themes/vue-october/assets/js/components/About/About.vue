<template lang="pug">
  section.about
    ._content
      ._content-title О компании
      ._content-body(v-html="about.aboutText")
      router-link(:to="about.aboutLink" v-if="about.aboutLink")._content-link Читать дальше
    ._gallery
      ._gallery-inner
        VueGallery(:images="images" :index="index" @close="index = null")
        ._gallery-list
          ._gallery-item(
            v-for="(image, imageIndex) in images"
            :key="imageIndex"
            @click="index = imageIndex")
              img(:src="image")._gallery-thumb

</template>
<script>
import axios from "axios";
import VueGallery from "vue-gallery";

export default {
  name: "About",
  components: {
    VueGallery
  },
  data() {
    return {
      index: null,
      images: []
    }
  },
  computed: {
    about() {
      return this.$store.getters.getSettings;
    }
  },
  methods: {
    fetchHomeGallery() {
      axios.get("/api/gallery/home/")
      .then(response => {
        if(response.data.images && response.data.images.length) {
          const images = response.data.images.map(image => image.path);
          this.images = images;
        }
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  created() {
    this.fetchHomeGallery();
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.about {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 80px;

  @media(max-width: 767px) {
    margin-bottom: 40px;
  }

  &__content {
    width: 100%;
    max-width: calc(50% - 40px);
    border-radius: 20px;
    padding: 50px 60px 60px;

    @media(max-width: 1440px) {
      padding: 40px;
    }

    @media(max-width: 1199px) {
      padding: 30px 20px 20px;
    }

    @media(max-width: 991px) {
      max-width: 100%;
      padding: 20px 0;
    }
  }

  &__content-title {
    font-weight: bold;
    font-size: 50px;
    color: $primary;
    margin-bottom: 45px;

    @media(max-width: 1440px) {
      font-size: 45px;
    }

    @media(max-width: 1199px) {
      font-size: 40px;
      margin-bottom: 30px;
    }

    @media(max-width: 991px) {
      font-size: 35px;
    }

    @media(max-width: 767px) {
      font-size: 25px;
    }

    @media(max-width: 350px) {
      font-size: 20px;
    }
  }

  &__content-body, &__content-body p {
    font-size: 16px;
    color: $primary;
    line-height: 1.7;

    @media(max-width: 767px) {
      font-size: 14px;
      line-height: 1.5;
    }

    p {
      margin-bottom: 15px;
    }
  }

  &__content-link {
    margin-top: 60px;
    color: $dark;
    padding: 11px 20px;
    font-size: 15px;
    line-height: 1.2;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(65, 68, 92, 0.2);
    border-radius: 10px;

    @media(max-width: 1199px) {
       margin-top: 30px;
    }

    @media(max-width: 767px) {
      margin-top: 20px;
      font-size: 14px;
      padding: 10px 20px;
    }
  }

  &__gallery {
    border-radius: 20px;
    width: 100%;
    max-width: calc(50% - 40px);
    margin-left: 40px;
    background: linear-gradient(-45deg, #ff9b4a, #c837ab), linear-gradient(45deg, #df437e, #c837ab);

    @media(max-width: 1740px) {
      align-self: flex-start;
    }

    @media(max-width: 991px) {
      max-width: 100%;
      margin: 30px 0 0 0;
    }
  }

  &__gallery-inner {
    background: #FFF;
    margin: 2px;
    border-radius: 18px;
    padding: 48px 58px 58px;
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    display: flex;
    flex-direction: column;

    @media(max-width: 1740px) {
      padding: 25px;
    }

    @media(max-width: 767px) {
      padding: 20px;
    }

    @media(max-width: 575px) {
      padding: 10px;
    }
  }

  &__gallery-list {
    display: flex;
    flex-wrap: wrap;
    margin: auto -10px;
    align-self: center;
    align-content: center;
    width: 100%;
  }

  &__gallery-item {
    width: 100%;
    max-width: calc(33.333% - 20px);
    margin: 0 10px 20px 10px;
    position: relative;
    cursor: pointer;
    border-radius: 7px;
    overflow: hidden;

    @media(min-width: 1441px) {
      &:nth-last-child(-n+3) {
        margin-bottom: 0;
      }
    }

    @media(max-width: 1440px) {
      max-width: calc(50% - 20px);
      &:nth-last-child(-n+2) {
        margin-bottom: 0;
      }
    }

    @media(max-width: 991px) {
      max-width: calc(33.333% - 20px);
      &:nth-last-child(-n+3) {
        margin-bottom: 0;
      }
    }

    @media(max-width: 575px) {
      max-width: calc(50% - 20px);
      &:nth-last-child(-n+2) {
        margin-bottom: 0;
      }
    }

    &::after {
      content: "";
      display: block;
      padding-top: 100%;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $shadow-primary;
      opacity: 0;
      transition: opacity .3s ease;
      z-index: 1;
    }

    &:hover {
      &::before {
        opacity: 1;
      }
    }
  }

  &__gallery-thumb {
    position: absolute;
    top: 0;
    left: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
}
</style>