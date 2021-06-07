<template lang="pug">
  <CategoryComponent :category="category" @sortedProducts="sortedProducts" />
</template>
<script>
import axios from "axios";
import CategoryComponent from '@vue/components/Category/CategoryComponent';

export default {
  name: "Category",
  components: {
    CategoryComponent
  },
  data() {
    return {
      category: {},
      slug: "",
    }
  },
  watch: {
    $route (to){
      this.slug = to.params.slug;
      this.fetchTags(this.slug);
    }
  },
  methods: {
    fetchTags(slug) {
      axios.get("/api/tag/" + slug)
      .then(response => {
        this.category = response.data
      })
      .catch(e => {
        console.log(e);
      })
    },
    sortedProducts(key) {
      let result = [];
      if (key === "prive_low") result = this.category.products.sort((a, b) => b.price - a.price);
      if (key === "prive_up") result = this.category.products.sort((a, b) => a.price - b.price);
      if (key === "fist_new") result = this.category.products.sort((a, b) => b.sort_order - a.sort_order);
      if (key === "fist_old") result = this.category.products.sort((a, b) => a.sort_order - b.sort_order);
      if (key === "a-z") result = this.category.products.sort((a, b) => a.title.localeCompare(b.title));
      if (key === "z-a") result = this.category.products.sort((a, b) => b.title.localeCompare(a.title));

      this.category.products = result;
    }
  },
  created() {
    this.slug = this.$route.params.slug;
    this.fetchTags(this.slug);
  }
}
</script>