<template lang="pug">
  .tags
    ._title Подборки /
    ._body
      ._list
        router-link(:to="'/tag/' + tag.slug" v-for="tag in tags" :key="tag.slug")._item {{ tag.title }}

</template>
<script>
import axios from "axios";

export default {
  name: "Tags",
  data() {
    return {
      tags: []
    }
  },
  created() {
    axios.get("/api/tags")
      .then(response => {
        this.tags = response.data
      })
      .catch(e => {
        console.log(e);
      })
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';

.tags {
  width: 100%;
  max-width: 405px;
  margin: 0 20px;
  padding: 40px;
  background: $dark;
  box-shadow: 7px 7px 30px rgba(65, 68, 92, 0.3);
  border-radius: 20px;

  @media(max-width: 1740px) {
    padding: 30px;
    max-width: 380px;
    margin: 0 10px;
  }

  @media(max-width: 1440px) {
    max-width: 100%;
    margin: 0 10px 20px;
  }

  @media(max-width: 575px) {
    padding: 20px;
  }

  &__title {
    font-size: 30px;
    color: #fff;
    padding-bottom: 35px;

    @media(max-width: 575px) {
      font-size: 25px;
      padding-bottom: 25px;
    }
  }

  &__body {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 0 -5px 0;
    overflow: hidden;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  &__item {
    color: #fff;
    font-size: 14px;
    padding: 8px 10px;
    margin: 5px;
    font-weight: 600;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.07);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s;

    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.2);
    }

    @media(max-width: 1740px) {
      font-size: 13px;
    }

    @media(max-width: 575px) {
      font-style: 12px;
      padding: 7px 10px;
      margin: 3px;
      border-radius: 5px;
    }
  }
}

</style>