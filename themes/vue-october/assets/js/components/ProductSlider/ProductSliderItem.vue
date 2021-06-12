<template lang="pug">
  form.product-item(@submit.prevent="addToCart")
    input(type="hidden" v-model="product.id")
    ._top
      ._tags
        ._tag.-new(v-if="+product.is_new") New
        ._tag.-sale(v-if="+product.sale_price") Sale
      ._image
        router-link(:to="{ name: 'product', params: { id: product.id }}")._link
          img(:src="product.image ? '/storage/app/media' + product.image : noImage", :alt="product.title")._image-thumb
      ._order(v-if="product.price > 0")
        button(type="submit")._order-btn
          icon(name="cart" component="header")._order-ico

    ._bottom
      router-link(:to="{ name: 'product', params: { id: product.id }}")._title {{ product.title }}
      router-link(:to="{ name: 'category', params: { slug: product.categories[0].slug }}" v-if="product.categories")._category  {{ product.categories[0].title}}
      ._code Артикул: {{ product.code }}

      ._cart(v-if="product.price > 0")
        ._amount
        ProductAmount(@changeAmount="changeAmount" :amount="amount")
        ._price
          ._current-price
            strong._price-val {{ productPrice }}
            span._price-label руб.
          ._old-price(v-if="+product.sale_price !== 0")
            strong._price-val {{ (product.price).toLocaleString('ru') }}
            span._price-label руб.
      ._cart(v-else)
        ._price
          ._current-price
            strong._price-val Цена не указана



</template>
<script>
import ProductAmount from './ProductAmount'
export default {
  name: "ProductSliderItem",
  components: {
    ProductAmount
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      amount: 1,
      noImage: "/themes/vue-october/assets/images/no-image.jpg"
    }
  },
  computed: {
    productPrice() {
      if (+this.product.sale_price !== 0) {
        return (this.product.sale_price).toLocaleString('ru')
      }
      return (this.product.price).toLocaleString('ru')
    }
  },
  methods: {
    changeAmount(val) {
      this.amount = val;
    },
    addToCart() {
      if( this.amount > 0 && this.product?.id) {
        this.$store.dispatch("addToCart", { id: this.product.id, amount: this.amount })
        this.amount = 1;
        this.$emit("showPopup", true);
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.product-item {
  width: 100%;
  max-width: 500px;
  position: relative;

  $root: &;

  &:hover {
    #{$root} {
      &__link::after {
        opacity: .8;
      }
      &__order {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &__top {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: #fbfbfb;
      border-radius: 20px 20px 0 0;
      z-index: 1;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    top: 30px;
    left: 25.5px;
    right: 25.5px;
    z-index: 1;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-size: 13px;
    font-weight: 500;
    padding: 7px 15px;
    border-radius: 7px;
    text-align: center;
    margin-right: 9px;

    &--new {
      background: #26c582;
    }

    &--sale {
      background: #f94183;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__image {
    position: relative;
    padding-top: 100%;
    margin: 0;
    overflow: hidden;
    border-radius: 20px 20px 0 0;
  }

  &__link {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background: $dark;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s;
    }
  }

  &__image-thumb {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &__order {
    width: 100%;
    position: absolute;
    top: calc(50% - 30px);
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
    transition: opacity 0.3s;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__order-btn {
    padding: 0;
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background: #FFF;
    margin: 0 5px;
    pointer-events: all;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__order-ico {
    width: 30px;
    height: 30px;
    fill: $primary;
  }

  &__bottom {
    background: #fbfbfb;
    padding: 10px 30px 30px;
    border-radius: 0 0 20px 20px;

    @media(max-width: 575px) {
      padding: 10px 20px 20px;
    }
  }

  &__title {
    display: block;
    font-weight: 500;
    font-size: 17px;
    color: $primary;
    margin: 0px 0 10px;
    transition: color 0.3s;
  }

  &__category {
    font-weight: 500;
    font-size: 14px;
    color: $primary;
    opacity: 0.4;
    margin: 0 0 10px;
  }

  &__code {
    font-weight: 400;
    font-size: 13px;
    color: $primary;
    margin: 0 0 10px;
  }

  &__cart {
    margin-top: 20px;
  }

  &__price {
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    margin: 20px 0 15px;

    @media(max-width: 575px) {
      margin: 15px 0;
    }
  }

  &__current-price {
    font-size: 20px;
    color: $primary;
    margin-right: 20px;

    #{$root} {
      &__price-label {
        font-size: 18px;
      }
    }

    @media(max-width: 575px) {
      font-size: 18px;
      margin-right: 15px;
    }
  }

  &__price-val {
    font-weight: bold;
    margin-right: 5px;
  }

  &__old-price {
    font-size: 16px;
    color: $primary;
    opacity: .2;
    text-decoration: line-through;
    #{$root} {
      &__price-label {
        font-size: 15px;

        @media(max-width: 575px) {
          font-size: 14px;
        }
      }
    }

    @media(max-width: 575px) {
      font-size: 15px;
    }
  }
}
</style>