<template lang="pug">
  transition(name="fade")
    .product-popup
      router-link(:to="{name: 'cart'}")._link Товар добавлен в корзину!
</template>
<script>
export default {

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
.product-popup {
  width: 100%;
  max-width: 480px;
  padding: 28px 40px;
  text-align: center;
  background: $dark;
  box-shadow: 0px 4px 40px rgb(0, 0, 0, 0.1);
  border-radius: 20px;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 30;
  transform: translate(-50%, -50%);

  @media(max-width: 767px) {
    padding: 20px 30px;
  }

  @media(max-width: 500px) {
    max-width: calc(100% - 40px);
    padding: 20px;
  }

  &__link {
    color: #FFF;
    font-weight: 500;
    font-size: 19px;
    line-height: 32px;

    @media(max-width: 767px) {
      font-size: 18px;
      line-height: 30px;
    }

    @media(max-width: 500px) {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>