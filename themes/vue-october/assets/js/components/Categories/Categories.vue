<template lang="pug">
  .categories
    ._container
      ._row
        ._item(v-for="(cat, index) in categories")
          ._item-image
            img(:src="cat.img", :alt="cat.title")._item-thumb
          ._item-title {{ cat.title }}
          ._item-count {{ cat.count }}
          router-link(:to="cat.link")._item-link

</template>
<script>
export default {
  name: "Categories",
  data() {
    return {
      categories: [
        { title: "Мебель для дома", count: 32, img: "http://furniture-salon.oml.ru/thumb/2/yM_HSxTmZCu4BeT57hsz_Q/550r550/d/215141131.png", link: "#!" },
        { title: "Мебель для спален", count: 20, img: "http://furniture-salon.oml.ru/thumb/2/9qN_XvWJCoAubc3I2g0SeA/1100r550/d/215141132.png", link: "#!" },
        { title: "Мебель для кухни", count: 14, img: "http://furniture-salon.oml.ru/thumb/2/2JgBSgS211nCj5VKT3UmCw/550r550/d/215141120.png", link: "#!" },
        { title: "Мебель для офиса", count: 18, img: "http://furniture-salon.oml.ru/thumb/2/XwxlCepg1CZw6Z1H6Iz3kQ/550r550/d/215141122.png", link: "#!" },
        { title: "Мебель для ресторана", count: 44, img: "http://furniture-salon.oml.ru/thumb/2/9naj_OZIdVywB2ucRXSDGQ/550r550/d/215141125.png", link: "#!" },
        { title: "Детская мебель", count: 68, img: "http://furniture-salon.oml.ru/thumb/2/mcREoJzj6UpA_heIhRoyEQ/550r550/d/215141127.png", link: "#!" },
      ]
    }
  }
}
</script>
<style lang="scss">
.categories {
  max-width: calc(100% - 485px);
  width: 100%;
  margin: 0 20px;

  @media(max-width: 1740px) {
    max-width: calc(100% - 420px);
    margin: 0 10px;
  }

   @media(max-width: 1440px) {
     max-width: 100%;
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
    max-width: calc(33.333% - 40px);
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

    &:nth-child(4),
    &:nth-child(5),
    &:last-child {
      margin-bottom: 0;
    }

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
    font-size: 35px;
    color: #fff;
    position: absolute;
    bottom: 40px;
    left: 40px;
    right: 40px;

    @media(max-width: 1740px) {
      left: 30px;
      right: 30px;
      font-size: 30px;
    }

    @media(max-width: 767px) {
      left: 20px;
      right: 20px;
      font-size: 25px;
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
  }
}
</style>