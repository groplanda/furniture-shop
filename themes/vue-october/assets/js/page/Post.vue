<template lang="pug">
  section.post.section
    ._container.container.container--main
      ._heading
        ._title
      ._body
</template>
<script>
export default {
  name: "Post",
  watch: {
    $route (to){
      const slug = to.params.slug;
      console.log(slug);
      // this.$store.dispatch("fetchProductById", slug);
    }
  },
  computed: {
    post() {
      return this.$store.getters.getPost;
    }
  },
  methods: {
    fetchPost(slug) {
      this.$store.dispatch("fetchPost", slug);
    }
  },
  created() {
    const slug = this.$route.params.slug
    this.fetchPost(slug);
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.post {
  padding: 50px 0 100px;

  @media(max-width: 767px) {
    padding: 40px 0 60px;
  }

  &__heading {
    padding-bottom: 50px;
    @media(max-width: 767px) {
      padding-bottom: 25px;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 50px;
    color: $primary;
    margin-bottom: 45px;

    @media(max-width: 1440px) {
      font-size: 45px;
    }

    @media(max-width: 1199px) {
      font-size: 40px;
      margin-bottom: 30px;
    }

    @media(max-width: 991px) {
      font-size: 35px;
    }

    @media(max-width: 767px) {
      font-size: 25px;
    }

    @media(max-width: 350px) {
      font-size: 20px;
    }
  }

  &__body {
    color: $dark;
    font-size: 16px;
    line-height: 21px;

    @media(max-width: 767px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>