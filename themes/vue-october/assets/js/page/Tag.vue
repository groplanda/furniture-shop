<template lang="pug">
  <CategoryComponent :category="category" />
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
    }
  },
  created() {
    this.slug = this.$route.params.slug;
    this.fetchTags(this.slug);
  }
}
</script>