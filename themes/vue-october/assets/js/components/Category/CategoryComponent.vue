<template lang="pug">
  section.category.section
    transition(name="fade")
      .product-slider__success(v-if="productPopup") Товар добавлен в корзину!
    ._container.container.container--main
      ._heading
        ._title {{ category.title }}
      ._row(v-if="category.products && category.products.length > 0")
        ._item(v-for="product in paginatedData" :key="product.id")
          ProductSliderItem(:product="product"  @showPopup="showPopup")
      ._empty(v-else) Товаров пока нет!
      ._pagination(v-if="pageCount > 1")
        ._pagination-list
          button(
            type="button"
            v-for="(page, index) in pageCount"
            @click="changePage(index)"
            :key="index")._pagination-item {{ page }}

</template>
<script>
import ProductSliderItem from '@vue/components/ProductSlider/ProductSliderItem.vue';
export default {
  name: "CategoryComponent",
  components: {
    ProductSliderItem
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      productPopup: false,
      pageNumber: 0,
      size: 8,
    }
  },
  watch: {
    $route (){
      this.pageNumber = 0;
    }
  },
  computed: {
    pageCount() {
      let result = 0;
      if(this.category.products && this.category.products.length) {
        result = Math.ceil(this.category.products.length / this.size);
      }
      return result;
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
            end = start + this.size;
      return this.category.products.slice(start, end);
    }
  },
  methods: {
    changePage(page) {
      this.pageNumber = page;
      this.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },
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
.category {
  padding: 40px 0 100px;

  @media(max-width: 1199px) {
    padding: 30px 0 80px;
  }

  @media(max-width: 767px) {
    padding: 20px 0 40px;
  }

  &__heading {
    padding-bottom: 50px;
    @media(max-width: 1199px) {
      padding-bottom: 40px;
    }
    @media(max-width: 767px) {
      padding-bottom: 30px;
    }
  }

  &__title {
    color: #41445C;
    font-size: 50px;
    font-weight: bold;
    @media(max-width: 1199px) {
      font-size: 40px;
    }
    @media(max-width: 767px) {
      font-size: 30px;
    }
    @media(max-width: 575px) {
      font-size: 25px;
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    @media(max-width: 1199px) {
      margin: 0 -10px;
    }
    @media(max-width: 575px) {
      margin: 0;
      flex-direction: column;
    }
  }

  &__item {
    width: 100%;
    max-width: calc(25% - 40px);
    margin: 20px;

    @media(max-width: 1440px) {
      max-width: calc(33.333% - 40px);
    }

    @media(max-width: 1199px) {
      max-width: calc(33.333% - 20px);
      margin: 10px;
    }

    @media(max-width: 991px) {
      max-width: calc(50% - 20px);
    }

    @media(max-width: 575px) {
      max-width: 100%;
      margin: 10px 0;
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__pagination-list {
    margin-left: auto;
    margin-right: 0;
    background: $dark;
    box-shadow: 7px 7px 30px $shadow-primary;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__pagination-item {
    color: #FFF;
    font-size: 18px;
    font-weight: 500;
    margin: 0 1px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>