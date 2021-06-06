<template lang="pug">
  <CategoryComponent :category="category" />
</template>
<script>
import axios from "axios";
import CategoryComponent from '@vue/components/Category/CategoryComponent';
import setTitle from '@vue/helpers/setTitle.js';

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
  },
  updated() {
    setTitle(this.category);
  }
}
</script>