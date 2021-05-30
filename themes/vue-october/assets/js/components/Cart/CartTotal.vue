<template lang="pug">
  .cart-total
    ._title Расчет
    icon(name="calc" component="cart")._title-ico
    ._item
      ._item-label Сумма:
      ._item-val
        ._item-price {{ sum.toLocaleString('ru') }}
        ._item-curency руб.
    ._item(v-if="sale > 0")
      ._item-label Скидка:
      ._item-val
        ._item-price {{ sale }}
        ._item-curency руб.
    ._item
      ._item-label.-total Итого:
      ._item-val.-total
        ._item-price {{ (sum - sale).toLocaleString('ru') }}
        ._item-curency руб.

    button(type="button")._order Сделать заказ


</template>
<script>
export default {
  name: "CartTotal",
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  computed: {
    sum() {
      return this.calcSum();
    },
    sale() {
      return this.calcSaleSum();
    }
  },
  methods: {
    calcSum() {
      let result = 0;
      this.products.forEach(product => {
        result += Number(product.amount) * Number(product.price);
      })
      return result;
    },
    calcSaleSum() {
      let result = 0;
      this.products.forEach(product => {
        if (product.sale_price !== 0) {
          result += (Number(product.price) - Number(product.sale_price)) * Number(product.amount);
        }
      })
      return result;
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.cart-total {
  width: 100%;
  max-width: 405px;
  margin-left: 40px;
  border-radius: 20px;
  padding: 40px;
  background: $dark;
  box-shadow: $shadow-dark2;
  position: relative;

  $root: &;

  @media(max-width: 1740px) {
    padding: 30px;
  }

  @media(max-width: 1440px) {
    max-width: 100%;
    padding: 20px;
    margin: 30px 0 0 0;
  }

  @media(max-width: 767px) {
    padding: 15px;
  }

  &__title {
    font-weight: bold;
    font-size: 40px;
    color: #fff;
    padding-bottom: 20px;

    @media(max-width: 1199px) {
      font-size: 35px;
    }
    @media(max-width: 767px) {
      font-size: 30px;
    }
    @media(max-width: 575px) {
      font-size: 25px;
    }
  }

  &__title-ico {
    width: 26px;
    height: 26px;
    fill: #FFF;
    position: absolute;
    right: 40px;
    top: 55px;
    @media(max-width: 1440px) {
      right: 20px;
      top: 30px;
    }
    @media(max-width: 767px) {
      top: 20px;
      width: 20px;
      height: 20px;
    }
  }

  &__item {
    padding: 20px 0;
    display: flex;
    flex: wrap;
    align-items: center;

    @media(max-width: 767px) {
      padding: 15px 0;
    }
  }

  &__item-label {
    width: 50%;
    font-size: 17px;
    font-weight: 500;
    color: #fff;
    padding-right: 10px;

    @media(max-width: 767px) {
      font-size: 14px;
    }

    &--total {
      width: 40%;
    }
  }

  &__item-val {
    width: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    &--total {
      width: 60%;

      #{$root} {
        &__item-price {
          font-size: 25px;
          @media(max-width: 1740px) {
            font-size: 23px;
          }
          @media(max-width: 767px) {
            font-size: 20px;
          }
        }
      }
    }
  }

  &__item-price {
    font-size: 22px;
    font-weight: 700;
    text-align: right;
    color: #fff;
    margin-right: 5px;

    @media(max-width: 1740px) {
      font-size: 20px;
    }
    @media(max-width: 767px) {
      font-size: 18px;
    }
  }

  &__item-curency {
    color: #fff;
    font-weight: 400;
    font-size: 18px;
    @media(max-width: 1740px) {
      font-size: 16px;
    }
    @media(max-width: 767px) {
      font-size: 14px;
    }
  }

  &__order {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    padding: 20px 30px;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 7px;
    transition: background .2s ease;

    &:hover, &:focus {
      background: $shadow-dark2;
    }

    @media(max-width: 1740px) {
      padding: 15px 30px;
      margin-top: 20px;
    }
    @media(max-width: 767px) {
      font-size: 14px;
    }
    @media(max-width: 575px) {
      width: 100%;
    }
  }
}
</style>