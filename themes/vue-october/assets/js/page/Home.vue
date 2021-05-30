<template lang="pug">
  .section
    .container.-main
      Banner
      Folders
      ProductSlider(title="Самое популярное" :products="popularProducts")
      ProductSlider(title="Новинка" :products="newProducts")
      EditBlock
      QuestionForm
      About
      Testimonials

</template>
<script>
import Banner from '@vue/components/Banner/Banner';
import Folders from '@vue/components/Folders/Folders';
import ProductSlider from '@vue/components/ProductSlider/ProductSlider';
import EditBlock from '@vue/components/EditBlock/EditBlock';
import QuestionForm from '@vue/components/QuestionForm/QuestionForm';
import About from '@vue/components/About/About';
import Testimonials from '@vue/components/Testimonials/Testimonials';

export default {
  name: "Home",
  components: {
    Banner,
    Folders,
    ProductSlider,
    EditBlock,
    QuestionForm,
    About,
    Testimonials
  },
  computed: {
    popularProducts() {
      return this.$store.getters.getNewProducts;
    },
    newProducts() {
      return this.$store.getters.getPopularProducts;
    }
  },
  created() {
    this.$store.dispatch('fetchPopularProducts');
    this.$store.dispatch('fetchNewProducts');
  }
}
</script>