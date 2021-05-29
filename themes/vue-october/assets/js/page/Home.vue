<template lang="pug">
  .section
    .container.-main
      Banner
      Folders
      ProductSlider(title="Самое популярное" :products="popular")
      ProductSlider(title="Новинка" :products="news")
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
import Testimonials from '@vue/components/Testimonials/Testimonials.vue';

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
  data() {
    return {
      popular: [
        {
          id: 1,
          img: "http://furniture-salon.oml.ru/thumb/2/K_GtNQEAW7UuJ73AvjbZlQ/450r450/d/545444.jpg",
          url: "#!",
          title: "Офисный стол Грег",
          category: "Khajro",
          code: "109461",
          price: "35000",
          salePrice: "45000"
        },
        {
          id: 2,
          img: "http://furniture-salon.oml.ru/thumb/2/_GlAUyel9UVQKpjn2ARR6A/450r450/d/545465.jpg",
          url: "#!",
          title: "Комплект Классика",
          category: "Digamma",
          code: "109372",
          price: "25000"
        },
        {
          id: 3,
          img: "http://furniture-salon.oml.ru/thumb/2/v8glKXhA6YVU4lOaCi_Q7Q/450r450/d/545463.jpg",
          url: "#!",
          title: "Офисное кресло Нео",
          category: "Khajro",
          code: "109461",
          price: "65000",
          salePrice: "85000"
        },
        {
          id: 4,
          img: "http://furniture-salon.oml.ru/thumb/2/iQ4o0IyaBOz6PsmTXjQvVw/450r450/d/545519.jpg",
          url: "#!",
          title: "Стол Wersal",
          category: "Beta",
          code: "109461",
          price: "15000"
        },
        {
          id: 5,
          img: "http://furniture-salon.oml.ru/thumb/2/K_GtNQEAW7UuJ73AvjbZlQ/450r450/d/545444.jpg",
          url: "#!",
          title: "Офисный стол Грег",
          category: "Khajro",
          code: "109461",
          price: "35000",
          salePrice: "45000"
        }
      ],
      news: [
        {
          id: 6,
          img: "http://furniture-salon.oml.ru/thumb/2/XzfdTmUbyyuHD1ZaiNuytw/450r450/d/1181576.jpg",
          url: "#!",
          title: "Детская кроватка 'Лютик'",
          category: "Khajro",
          code: "109461",
          price: "12000"
        },
        {
          id: 7,
          img: "http://furniture-salon.oml.ru/thumb/2/Bi6FPgg6BZZrR5hmMDxIaw/450r450/d/545569.jpg",
          url: "#!",
          title: "Диван 3-ой Topkapi",
          category: "Omicron",
          code: "109372",
          price: "24000"
        },
        {
          id: 8,
          img: "http://furniture-salon.oml.ru/thumb/2/BZEpV2Jh-mP9olTl5EYROg/450r450/d/545594.jpg",
          url: "#!",
          title: "Кресло Happy",
          category: "Lamed",
          code: "109461",
          price: "15000",
          salePrice: "25000"
        },
        {
          id: 9,
          img: "http://furniture-salon.oml.ru/thumb/2/MehT2SSGYN5B9FRieT9w_w/450r450/d/545589.jpg",
          url: "#!",
          title: "Кресло Pinton",
          category: "Traneus",
          code: "109461",
          price: "12000",
          salePrice: "23000"
        },
        {
          id: 10,
          img: "http://furniture-salon.oml.ru/thumb/2/4JXGKRIDUePhpaopsJoESQ/450r450/d/1848418.jpg",
          url: "#!",
          title: "Кресло-качалка Фурор",
          category: "Epsilon",
          code: "109461",
          price: "9000",
          salePrice: "12000"
        }
      ]
    }
  },

}
</script>
<style lang="scss">

</style>