<template lang="pug">
  .section
    .container.-main
      .cart
        ._heading
          ._title Корзина
        ._row(v-if="products.length > 0")
          CartTable(:products="products")

</template>
<script>
import CartTable from "@vue/components/Cart/CartTable";

export default {
  name: "Cart",
  components: {
    CartTable
  },
  computed: {
    products() {
      return this.$store.getters.getCartProducts;
    }
  },
  created() {
    const cart = this.$store.getters.getCart;
    if (cart.length > 0) {
      this.$store.dispatch("fetchProductsByIds", cart);
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.cart {

  $root: &;

  &__heading {
    margin-bottom: 60px;
    @media(max-width: 1199px) {
      margin-bottom: 40px;
    }
    @media(max-width: 767px) {
      margin-bottom: 30px;
    }
  }

  &__title {
    font-size: 60px;
    color: $dark;
    font-weight: bold;
    @media(max-width: 1199px) {
      font-size: 50px;
    }
    @media(max-width: 767px) {
      font-size: 40px;
    }
    @media(max-width: 575px) {
      font-size: 30px;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>