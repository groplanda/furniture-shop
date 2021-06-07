<template lang="pug">
  section.product.section
    transition(name="fade")
      .product-slider__success(v-if="productPopup") Товар добавлен в корзину!
    ._container.container.container--main
      ._row(data-sticky-container)
        ._body
          ._slider
            ._tags
              ._tag.-new(v-if="+product.is_new") New
              ._tag.-sale(v-if="+product.sale_price") Sale
            ._slider-current
              img(:src="currentImage ? currentImage : noImage", :alt="product.title")._slider-image
            ._slider-additional(v-if="product.gallery && product.gallery.length")
              ._slider-thumb(
                  :class="{'product__slider-thumb--active': currentImage === '/storage/app/media' + product.image}"
                  @click="changeImage('/storage/app/media' + product.image)")
                img(:src="'/storage/app/media' + product.image", :alt="product.title")._slider-thumb-image
              ._slider-thumb(
                  :class="{'product__slider-thumb--active': currentImage === image.path}"
                  v-for="image in product.gallery"
                  :key="image.file_name"
                  @click="changeImage(image.path)")
                img(:src="image.path", :alt="image.title")._slider-thumb-image
          ._content
            ._title {{ product.title }}
            ._categories-list
              router-link(
                :to="{ name: 'category', params: { slug: category.slug }}"
                v-for="category in product.categories"
                :key="category.slug")._categories-link {{ category.title }}
            ._code(v-if="product.code") Артикул {{ product.code }}

            ._props.-full(v-if="product.props && product.props.length")
              ._props-row(v-for="(prop, index) in product.props" :key="index")
                ._props-label {{ prop.props_option }}
                ._props-val  {{ prop.props_value }}

            ._entry.-desktop(v-if="product.description")
              ._entry-title Описание
              ._entry-descr(v-html="product.description")

          ._bottom
            ._order
              ._order-row
                ._price(v-if="product.price")
                  ._current-price
                    strong._price-val {{ productPrice }}
                    span._price-label руб.
                  ._old-price(v-if="+product.sale_price !== 0")
                    strong._price-val {{ (product.price).toLocaleString('ru') }}
                    span._price-label руб.
                .product-item__amount
                  button(
                    type="button"
                    @click="changeAmount"
                    data-js-action="minus"
                    :disabled="amount === 1"
                    :class="{ 'product-item__amount-btn--disabled': amount === 1 }").product-item__amount-btn
                    icon(name="minus" component="product").product-item__amount-ico
                  input(type="number" v-model="amount" readonly).product-item__amount-val
                  button(
                    @click="changeAmount"
                    data-js-action="plus"
                    type="button").product-item__amount-btn
                    icon(name="plus" component="product").product-item__amount-ico
              button(type="button" @click="addToCart")._add
                | В корзину
                icon(name="cart" component="header")._add-ico

            ._props.-mobile(v-if="product.props && product.props.length")
              ._props-row(v-for="(prop, index) in product.props" :key="index")
                ._props-label {{ prop.props_option }}
                ._props-val  {{ prop.props_value }}

            ._entry.-mobile(v-if="product.description")
              ._entry-title Описание
              ._entry-descr(v-html="product.description")
            ._folders
              ._folders-title Теги
              ._folders-list
                router-link(
                  :to="{ name: 'tag', params: { slug: tag.slug }}"
                  v-for="tag in product.tags"
                  :key="tag.slug")._folders-link {{ tag.title }}
            ._folders
              ._folders-title Находится в разделах
              ._folders-list
                router-link(
                  :to="{ name: 'category', params: { slug: category.slug }}"
                  v-for="category in product.categories"
                  :key="category.slug")._folders-link {{ category.title }}


        ._form(data-sticky-for="991" data-margin-top="20" data-sticky-class="product__form--sticky" data-js="sticky")
          ._form-title Сделать заказ
          ._form-tag
            | В наличие
            icon(name="check" component="product")._form-tag-ico
          ._price(v-if="product.price")
            ._current-price
              strong._price-val {{ productPrice }}
              span._price-label руб.
            ._old-price(v-if="+product.sale_price !== 0")
              strong._price-val {{ (product.price).toLocaleString('ru') }}
              span._price-label руб.
          .product-item__amount
            button(
              type="button"
              @click="changeAmount"
              data-js-action="minus"
              :disabled="amount === 1"
              :class="{ 'product-item__amount-btn--disabled': amount === 1 }").product-item__amount-btn
              icon(name="minus" component="product").product-item__amount-ico
            input(type="number" v-model="amount" readonly).product-item__amount-val
            button(
              @click="changeAmount"
              data-js-action="plus"
              type="button").product-item__amount-btn
              icon(name="plus" component="product").product-item__amount-ico
          button(type="button" @click="addToCart")._add
            | В корзину
            icon(name="cart" component="header")._add-ico

</template>
<script>
const Sticky = require('sticky-js');
import setTitle from '@vue/helpers/setTitle.js';

export default {
  name: "Product",
  data() {
    return {
      currentImage: "",
      amount: 1,
      productPopup: false,
      noImage: "/themes/vue-october/assets/images/no-image.jpg"
    }
  },
  watch: {
    $route (to){
      this.id = to.params.id;
      this.$store.dispatch("fetchProductById", this.id);
    },
    product() {
      if (this.product && this.product.image) {
        this.changeImage('/storage/app/media' +  this.product.image);
      }
    }
  },
  computed: {
    product() {
      return this.$store.getters.getProduct;
    },
    productPrice() {
      if (this.product && +this.product.sale_price !== 0) {
        return (this.product.sale_price).toLocaleString('ru')
      }
      return (this.product.price).toLocaleString('ru')
    },
  },
  methods: {
    fetchProduct(id) {
      this.$store.dispatch("fetchProductById", id);
    },
    changeImage(imgSrc) {
      this.currentImage = imgSrc;
    },
    changeAmount(e) {
      if (e.target.dataset.jsAction === "plus" && this.amount < 100) {
        this.amount = this.amount + 1;
      } else if (e.target.dataset.jsAction === "minus" && this.amount > 1) {
        this.amount = this.amount - 1;
      }
    },
    addToCart() {
      if( this.amount > 0 && this.product?.id) {
        this.$store.dispatch("addToCart", { id: this.product.id, amount: this.amount })
        this.amount = 1;
        this.productPopup = true;

        setTimeout(() => {
          this.productPopup = false;
        }, 2000)
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchProduct(this.id);
  },
  mounted() {
    const sticky = new Sticky('[data-js="sticky"]');
    sticky.update();
  },
  updated() {
    setTitle(this.product);
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.product {
  padding: 50px 0 100px;

  @media(max-width: 767px) {
    padding: 40px 0;
  }

  $root: &;

  &__row {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  &__body {
    width: 100%;
    max-width: calc(100% - 455px);
    display: flex;
    flex-wrap: wrap;
    margin-right: 50px;

    @media(max-width: 1740px) {
      max-width: calc(100% - 430px);
      margin-right: 25px;
    }

    @media(max-width: 1440px) {
      max-width: calc(100% - 455px);
      margin-right: 50px;
    }

    @media(max-width: 1199px) {
      max-width: calc(100% - 375px);
      margin-right: 25px;
    }

    @media(max-width: 991px) {
      max-width: 100%;
      margin-right: 0;
    }
  }

  &__slider {
    width: 100%;
    max-width: 550px;
    margin-right: 50px;
    position: relative;

    @media(max-width: 1740px) {
      max-width: 450px;
      margin-right: 25px;
    }

    @media(max-width: 1440px) {
      max-width: 100%;
      margin-right: 0;
      order: 1;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    top: 30px;
    left: 20px;
    z-index: 1;
    @media(max-width: 767px) {
      top: 15px;
      left: 15px;
    }
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

  &__slider-current {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 10px;

    &::after {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  &__slider-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__slider-additional {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
  }

  &__slider-thumb {
    width: 100%;
    max-width: calc(25% - 20px);
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $dark;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
    }

    &--active::after {
      opacity: .3;
    }
  }

  &__slider-thumb-image {
    position: absolute;
    left: 0;
    top: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &__content {
    width: 100%;
    max-width: calc(100% - 600px);

    @media(max-width: 1740px) {
      max-width: calc(100% - 475px);
    }

    @media(max-width: 1440px) {
      max-width: 100%;
      order: 0;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 40px;
    color: $primary;
    margin-bottom: 8px;

    @media(max-width: 1740px) {
      font-size: 35px;
    }

    @media(max-width: 767px) {
      font-size: 30px;
    }

    @media(max-width: 575px) {
      font-size: 25px;
      margin-bottom: 5px;
    }
  }

  &__categories-list {
    display: flex;
    flex-wrap: wrap;
  }

  &__categories-link {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: $primary;
    opacity: 0.5;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }

    @media(max-width: 767px) {
      font-size: 14px;
      margin-right: 5px;
    }
  }

  &__code {
    font-weight: 400;
    font-size: 13px;
    color: $dark;
    margin: 20px 0;

    @media(max-width: 767px) {
      margin: 15px 0;
    }
  }

  &__props {

    &--full {
      @media(max-width: 1440px) {
        display: none;
      }
    }

    &--mobile {
      display: none;
      @media(max-width: 1440px) {
        margin-top: 30px;
        display: block;
      }
    }
  }

  &__props-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
    @media(max-width: 767px) {
      margin-bottom: 20px;
    }
  }

  &__props-label {
    font-size: 15px;
    color: $primary;
    opacity: 0.6;
    padding-right: 25px;
    min-width: 100px;
  }

  &__props-val {
    font-weight: 500;
    font-size: 15px;
    color: $primary;
  }

  &__entry {
    width: 100%;
    max-width: 100%;

    &--desktop {
      @media(max-width: 1740px) {
        display: none;
      }
    }

    &--mobile {
      display: none;
      @media(max-width: 1740px) {
        display: block;
      }
    }
  }

  &__entry-title {
    color: $dark;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 30px;

    @media(max-width: 767px) {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  &__entry-descr , &__entry-descr p {
    font-weight: normal;
    font-size: 16px;
    color: $dark2;
    line-height: 1.7;

    p {
      margin-bottom: 15px;
    }

    @media(max-width: 767px) {
      font-size: 14px;
    }
  }

  &__bottom {
    width: 100%;
    max-width: 100%;
    @media(max-width: 1440px) {
      order: 3;
    }
  }

  &__order {
    display: none;
    margin: 30px 0;

    @media(max-width: 991px) {
      display: block;
    }
  }

  &__order-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__folders {
    margin-bottom: 30px;

    @media(max-width: 767px) {
      margin-bottom: 20px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__folders-title {
    color: $dark;
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 20px;

    @media(max-width: 767px) {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }

  &__folders-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__folders-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: #fff;
    background: $dark;
    box-shadow: 7px 7px 30px $shadow-primary;
    margin: 0 10px 10px 0;
    padding: 10px 20px 9px;
    border-radius: 10px;

    @media(max-width: 767px) {
      padding: 5px 10px;
      border-radius: 5px;
      margin: 0 5px 5px 0;
      font-size: 13px;
    }
  }

  &__form {
    width: 100%;
    max-width: 405px;
    padding: 50px 50px 50px;
    box-shadow: 7px 7px 30px $shadow-primary;
    background: #FFF;
    width: 100%;
    border-radius: 20px;

    @media(max-width: 1199px) {
      max-width: 350px;
      padding: 40px 30px 30px;
    }

    @media(max-width: 991px) {
      display: none;
    }
  }

  &__form-title {
    color: $dark;
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 20px;

    @media(max-width: 1199px) {
      font-size: 25px;
      margin-bottom: 15px;
    }
  }

  &__form-tag {
    background: rgba(41, 194, 158, 0.15);
    border-radius: 7px;
    font-weight: 500;
    font-size: 13px;
    color: #29c29e;
    padding: 7px 14px 7px 37px;
    display: inline-flex;
    position: relative;
    margin-bottom: 30px;
    @media(max-width: 1199px) {
      margin-bottom: 20px;
    }
  }

  &__form-tag-ico {
    color: #29C29E;
    width: 12px;
    height: 12px;
    position: absolute;
    left: 14px;
    top: calc(50% - 6px);
  }

  &__price {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px 0;

    @media(max-width: 991px) {
      margin: 0;
      height: 36px;
    }

    @media(max-width: 410px) {
      height: auto;
    }
  }

  &__current-price {
    font-size: 24px;
    color: $primary;
    margin-right: 20px;

    #{$root} {
      &__price-label {
        font-size: 20px;
      }
    }

    @media(max-width: 1199px) {
      font-size: 22px;
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
    font-size: 20px;
    color: $primary;
    opacity: .2;
    text-decoration: line-through;
    #{$root} {
      &__price-val {
        font-weight: 500;
      }
      &__price-label {
        font-size: 18px;

        @media(max-width: 575px) {
          font-size: 14px;
        }
      }
    }

    @media(max-width: 1199px) {
      font-size: 18px;
    }

    @media(max-width: 575px) {
      font-size: 16px;
    }
  }

  &__add {
    margin-top: 30px;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.2;
    padding: 20px 30px;
    color: #fff;
    border: none;
    background: $dark;
    box-shadow: 7px 7px 30px $shadow-primary;
    transition: all 0.18s linear;
    border-radius: 10px;

    &:hover, &:focus {
      background: $dark2;
    }

    @media(max-width: 991px) {
      max-width: 300px;
    }
  }

  &__add-ico {
    fill: #FFF;
    width: 21px;
    height: 21px;
  }
}
</style>