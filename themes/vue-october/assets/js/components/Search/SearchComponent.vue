<template lang="pug">
  section.category.section
    transition(name="fade")
      .product-slider__success(v-if="productPopup") Товар добавлен в корзину!
    ._container.container.container--main
      ._heading.-space
        ._title Поиск по:
          span._search-val {{ search }}

        .filter
          input(type="text" v-model="searchInput" @input="onSearch" placeholder="Поиск по каталогу...")._input
          button(type="button" @click="onSearch")._btn
            icon(name="search" component="fixed-panel")._btn-ico
      ._total(v-if="+total > 0") Найдено: {{ total }} позиций


      Loading(v-if="showLoading")
      template(v-else)
        ._row(v-if="products && products.length > 0")
          ._item(v-for="product in products" :key="product.id")
            ProductSliderItem(:product="product"  @showPopup="showPopup")
        ._empty(v-else) Ничего не удалось найти!

</template>
<script>
import ProductSliderItem from '@vue/components/ProductSlider/ProductSliderItem';
import Loading from '@vue/components/Preloader/Loading.vue';

export default {
  name: "SearchComponent",
  components: {
    ProductSliderItem,
    Loading
  },
  props: {
    products: {
      type: Array,
      required: true
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      productPopup: false,
      searchInput: "",
    }
  },
  computed: {
    total() {
      return this.products.length;
    }
  },
  methods: {
    showPopup(event) {
      this.productPopup = event;
      setTimeout(() => {
        this.productPopup = false;
      }, 2000)
    },
    onSearch() {
      if (this.searchInput.length > 3) {
        this.$emit("inputSearch", this.searchInput);
      }
    }
  }
}
</script>
<style lang="scss">
.filter {
  @import '@/scss/vars.scss';
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 40px;

  @media(max-width: 1199px) {
    max-width: 320px;
    margin-left: 20px;
  }

  @media(max-width: 991px) {
    max-width: 100%;
    margin: 15px 0 0 0;
  }

  &__input {
    font-size: 16px;
    color: $dark;
    border: 2px solid $dark;
    background: #F8F8F8;
    box-shadow: none;
    border-radius: 10px;
    padding: 12px 28px;
    width: 100%;
    height: auto;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    transition: all .18s linear;

    @media(max-width: 1199px) {
      font-size: 15px;
    }

    @media(max-width: 991px) {
      padding: 12px 20px;
    }

    @media(max-width: 767px) {
      border-width: 1px;
    }

    @media(max-width: 575px) {
      font-size: 14px;
    }
  }

  &__btn {
    display: none;

    @media(max-width: 767px) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 32px;
      height: 32px;
      right: 7px;
      top: calc(50% - 16px);
      background: $dark;
      border-radius: 5px;
    }
  }

  &__btn-ico {
    display: flex;
    width: 14px;
    height: 14px;
    fill: #FFF;
  }
}
</style>