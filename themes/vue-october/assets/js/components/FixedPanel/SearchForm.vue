<template lang="pug">
  .fixed-search(:class="classObj")
    ._title Поиск
    form(@submit.prevent="onSearch")._form
      input(type="text" autocomplete="off" v-model="search" placeholder="Поиск по каталогу...")._input
      button._btn(type="submit") Поиск
        icon(name="search" component="fixed-panel" v-if="isMobile")._btn-ico

</template>
<script>
export default {
  name: "SearchForm",
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFilterOpen: false,
      search: ""
    }
  },
  computed: {
    classObj() {
      return {
        "fixed-search--mobile": this.isMobile
      }
    }
  },
  methods: {
    onSearch() {
      if (this.search.length > 2) {
        this.$router.push({ name: 'search', query: { val: this.search } })
        this.search = "";
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.fixed-search {
  padding-bottom: 60px;

  &--mobile {
    display: none;

    @media(max-width: 767px) {
      display: block;
      padding: 0 10px;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 26px;
    color: #fff;
    padding: 45px 40px 40px 40px;

    @media(max-width: 767px) {
      font-size: 20px;
      padding: 20px;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    @media(max-width: 767px) {
      flex-direction: row;
    }
  }

  &__input {
    font-size: 16px;
    color: #fff;
    border: 2px solid $shadow-dark2;
    background: transparent;
    box-shadow: none;
    border-radius: 10px;
    padding: 12px 28px;
    width: 100%;
    height: auto;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    transition: all .18s linear;
    margin-bottom: 20px;
    text-align: center;

    @media(max-width: 767px) {
      max-width: 50%;
      margin-bottom: 0;
      border-width: 1px;
      padding: 10px 20px;
      font-size: 14px;
    }

    @media(max-width: 575px) {
      max-width: calc(100% - 60px);
    }
  }
  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 600;
    font-size: 15px;
    padding: 15px 25px;
    transition: background .3s,color .3s;
    color: #fff;
    background: $shadow-dark2;
    border-radius: 10px;

    @media(max-width: 767px) {
      margin-left: 20px;
      max-width: calc(50% - 20px);
      padding: 10px 20px;
      font-size: 14px;
    }

    @media(max-width: 575px) {
      margin-left: 10px;
      max-width: 50px;
      font-size: 0;
      padding: 0;
    }
  }

  &__btn-ico {
    display: none;
    @media(max-width: 575px) {
      display: flex;
      width: 16px;
      height: 16px;
      fill: #FFF;
    }
  }
}
</style>