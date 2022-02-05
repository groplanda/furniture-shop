<template lang="pug">
  .categories
    ._container
      ._row
        ._item(v-for="cat in categories" :key="cat.id")
          ._item-image
            img(:src="cat.image ? '/storage/app/media' + cat.image : noImage", :alt="cat.title")._item-thumb
          ._item-title {{ cat.title }}
          ._item-count(v-if="+cat.products_count !== 0") {{ cat.products_count }}
          ._item-link(v-if="+cat.is_quiz" data-js="quiz")
          router-link(v-else :to="{ name: 'category', params: { slug: cat.slug }}")._item-link

</template>
<script>
export default {
  name: "Categories",
  data() {
    return {
      noImage: "/themes/vue-october/assets/images/no-image.jpg"
    }
  },
  computed: {
    categories() {
      const cats = this.$store.getters.getCategories
      return cats.slice(0, 8);
    }
  },
  updated() {
    const quizLinks = this.$el.querySelectorAll('[data-js="quiz"]');

    (function(w, d, s, o){
      var j = d.createElement(s); j.async = true; j.src = '//script.marquiz.ru/v2.js';j.onload = function() {
        // eslint-disable-next-line no-undef
        if (document.readyState !== 'loading') Marquiz.init(o);
        else document.addEventListener("DOMContentLoaded", function() {
          // eslint-disable-next-line no-undef
          Marquiz.init(o);
        });
      };
      d.head.insertBefore(j, d.head.firstElementChild);
    })(window, document, 'script', {
        host: '//quiz.marquiz.ru',
        region: 'eu',
        id: '60408b5fd967520046fe1811',
        autoOpen: false,
        autoOpenFreq: 'once',
        openOnExit: false,
        disableOnMobile: false
      }
    );

    if(quizLinks && quizLinks.length) {
      for(let i = 0; i < quizLinks.length; i++) {
        quizLinks[i].addEventListener("click", () => {
          // eslint-disable-next-line no-undef
          Marquiz.showModal('60408b5fd967520046fe1811');
        })
      }
    }

  }
}
</script>
<style lang="scss">
.categories {
  width: 100%;
  margin: 0 20px;

  @media(max-width: 1740px) {
    margin: 0 10px;
  }

  $root: &;

  &__container {
    width: 100%;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;

    @media(max-width: 1740px) {
       margin: 0 -10px;
    }
  }

  &__item {
    width: 100%;
    max-width: calc(25% - 40px);
    margin: 0 20px 40px 20px;
    position: relative;
    background: #f6f6f6;
    border-radius: 20px;
    overflow: hidden;

    @media(max-width: 1740px) {
      max-width: calc(33.333% - 20px);
      margin: 0 10px 20px 10px;
    }

    @media(max-width: 991px) {
      max-width: calc(50% - 20px);
    }

    @media(max-width: 575px) {
      max-width: calc(100% - 20px);
    }

    &::after {
      content: "";
      display: block;
      padding-top: 75%;
    }

    // &:nth-child(4),
    // &:nth-child(5),
    // &:last-child {
    //   margin-bottom: 0;
    // }

    @media(max-width: 991px) {
      &:nth-child(4) {
        margin-bottom: 20px;
      }
    }

    @media(max-width: 991px) {
      &:nth-child(5) {
        margin-bottom: 20px;
      }
    }

    &:hover {
      #{$root} {
        &__item-image {
          transform: scale3d(1.05, 1.05, 1) rotate(0.0001deg);
        }
      }
    }
  }

  &__item-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s;

    &::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      pointer-events: none;
      opacity: .1;
    }
  }

  &__item-thumb {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &__item-title {
    font-weight: bold;
    font-size: 28px;
    color: #fff;
    position: absolute;
    bottom: 40px;
    left: 40px;
    right: 40px;

    @media(max-width: 1740px) {
      left: 30px;
      right: 30px;
      font-size: 24px;
    }

    @media(max-width: 767px) {
      left: 20px;
      right: 20px;
      font-size: 18px;
      padding-right: 20px;
    }
  }

  &__item-count {
    position: absolute;
    top: 40px;
    left: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
    height: 28px;
    min-width: 28px;
    color: #fff;
    border: 2px solid #FFF;
    border-radius: 7px;
    padding: 4px;
    text-align: center;

    @media(max-width: 1740px) {
      top: 30px;
      left: 30px;
    }

    @media(max-width: 767px) {
      left: 25px;
      top: 25px;
    }
  }

  &__item-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    text-decoration: none;
    z-index: 1;
    cursor: pointer;
  }
}
</style>
