<template lang="pug">
  section.category.section
    ._container.container.container--main
      ._heading
        ._title {{ category.title }}
      ._row(v-if="category.products && category.products.length > 0")
        ._item(v-for="product in category.products" :key="product.id")
          ProductSliderItem(:product="product")
      ._empty(v-else) Товаров пока нет!


</template>
<script>
import axios from "axios";
import ProductSliderItem from '@vue/components/ProductSlider/ProductSliderItem.vue';

export default {
  name: "Category",
  components: {
    ProductSliderItem
  },
  data() {
    return {
      category: {},
      slug: ""
    }
  },
  watch: {
    $route (to){
      this.slug = to.params.slug;
      this.fetchCategory(this.slug);
    }
  },
  methods: {
    fetchCategory(slug) {
      axios.get("/api/category/" + slug)
      .then(response => {
        this.category = response.data
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  created() {
    this.slug = this.$route.params.slug;
    this.fetchCategory(this.slug);
  }
}
</script>
<style lang="scss">
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
}
</style>