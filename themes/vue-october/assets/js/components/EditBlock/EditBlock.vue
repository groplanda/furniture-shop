<template lang="pug">
  .edit-block
    ._row
      ._item(v-for="(block, index) in blocks" :key="index")
        ._item-image
          img(:src="block.img", alt="alt")._item-thumb
        ._item-title {{ block.title }}
        ._item-row
          router-link(:to="block.url")._item-link В каталог
            icon(name="control-prev" component="banner")._item-ico
          ._item-label(v-if="block.label") {{ block.label }}

</template>
<script>
export default {
  name: "EditBlock",
  data() {
    return {
      blocks: [
        { img: "http://furniture-salon.oml.ru/thumb/2/kHIvAklQEe9oktbkbMb8zQ/900r/d/b_1.png", title: "Мебель для дома!", url: "#!", label: "до - 20%" },
        { img: "http://furniture-salon.oml.ru/thumb/2/GF2Na4Xhy5-k3uEEuvD21Q/900r/d/b_2.png", title: "Все для офиса!", url: "#!", label: false }
      ]
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.edit-block {
  margin-bottom: 100px;

  @media(max-width: 1199px) {
    margin-bottom: 60px;
  }

  @media(max-width: 991px) {
    margin-bottom: 20px;
  }

  $root: &;

  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    @media(max-width: 1199px) {
      margin: 0 -10px;
    }
  }

  &__item {
    width: 100%;
    max-width: calc(50% - 40px);
    margin: 0 20px;
    border-radius: 20px;
    overflow: hidden;
    padding: 40px 40px;
    background: $dark;
    position: relative;
    font-size: 0;
    display: flex;
    flex-direction: column;
    box-shadow: 7px 7px 30px $shadow-primary;
    min-height: 200px;

    @media(max-width: 1199px) {
      padding: 30px;
      max-width: calc(50% - 20px);
      margin: 0 10px;
    }

    @media(max-width: 991px) {
      max-width: calc(100% - 20px);
      margin: 0 10px 20px 10px;
    }

    @media(max-width: 767px) {
      padding: 20px;
    }

    @media(max-width: 350px) {
      min-height: 160px;
    }

    &:nth-child(2n) {
      #{$root} {
        &__item-image {
          background: #cbcbd0;
        }
      }
    }
  }

  &__item-image {
    background: $dark;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
    font-size: 47px;
    color: #fff;
    margin-bottom: 43px;
    position: relative;

    @media(max-width: 1440px) {
      font-size: 40px;
      margin-bottom: 30px;
    }

    @media(max-width: 1199px) {
      font-size: 30px;
    }

    @media(max-width: 575px) {
      font-size: 25px;
    }
  }

  &__item-row {
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  &__item-link {
    background: rgba(255, 255, 255, 0.07);
    padding: 11px 52px 11px 20px;
    margin-right: 20px;
    position: relative;
    color: #FFF;
    font-weight: 600;
    font-size: 15px;

    @media(max-width: 1199px) {
      padding: 10px 50px 10px 20px;
    }

    @media(max-width: 575px) {
      font-size: 14px;
      padding: 10px 30px 10px 15px;
    }
  }

  &__item-ico {
    position: absolute;
    top: calc(50% - 6px);
    width: 12px;
    height: 12px;
    right: 20px;
    fill: #fff;
    transform: rotate(180deg);

    @media(max-width: 575px) {
      right: 10px;
    }
  }

  &__item-label {
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    background: #FF7A5C;
    border-radius: 7px;
    padding: 9px 20px;

    @media(max-width: 575px) {
      padding: 8px 15px;
      font-size: 14px;
    }
  }
}
</style>