<template lang="pug">
  section.post.section(v-if="post")
    ._container.container.container--main
      ._heading
        ._title {{ post.title }}
      ._body(v-html="post.content" v-if="post.content")
</template>
<script>
import setTitle from '@vue/helpers/setTitle.js';
export default {
  name: "Post",
  watch: {
    $route (to){
      const slug = to.params.slug;
      this.$store.dispatch("fetchPost", slug);
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
  },
  updated() {
    setTitle(this.post);
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

  &__container {
    &--center {
      text-align: center;
    }
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

    @media(max-width: 1440px) {
      font-size: 45px;
    }

    @media(max-width: 1199px) {
      font-size: 40px;
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

    p {
      margin-bottom: 15px;
    }

    @media(max-width: 767px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>