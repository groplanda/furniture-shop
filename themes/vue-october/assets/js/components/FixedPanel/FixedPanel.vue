<template lang="pug">
  .fixed-panel(:class="{ 'fixed-panel--active': showPanel }")
    ._nav
      button._nav-item(@click="togglePanel" data-panel="nav")
        icon(name="burg" component="header")._nav-ico

      button._nav-item(@click="togglePanel" data-panel="search")
        icon(name="search" component="fixed-panel")._nav-ico

      ._nav-item.-cart
        router-link(:to="{ name: 'cart' }" v-if="cart")._cart-link
        ._cart-amount(v-if="!showPanel") {{ cart }}
        icon(name="cart" component="header")._cart-ico
    ._menu
      button._menu-close(@click="togglePanel" :class="{ 'fixed-panel__menu-close--filter': isFilterOpen }" data-panel="close")
        icon(name="cross" component="fixed-panel")._nav-ico
        ._nav-radius
        ._nav-radius.-reverse
      ._menu-container
        ._menu-inner
          ._menu-scroll
            ._menu-panel
              ._search(v-if="isFilterOpen")
                ._menu-title Поиск
                form(@submit.prevent="onSearch")._search-form
                  input(type="text" autocomplete="off" v-model="search" placeholder="Поиск по каталогу...")._search-input
                  button._search-btn(type="submit") Поиск
              template(v-else)
                ._search.-mobile
                  ._menu-title Поиск
                  form(@submit.prevent="onSearch")._search-form
                    input(type="text" autocomplete="off" v-model="search" placeholder="Поиск по каталогу...")._search-input
                    button._search-btn(type="submit") Поиск
                      icon(name="search" component="fixed-panel")._search-ico
                ._menu-title Каталог
                ._menu-list
                  ._menu-item(v-for="category in categories" :key="category.id")
                    router-link(:to="{ name: 'category', params: { slug: category.slug }}" @click="togglePanel")._menu-link {{ category.title }}
                    icon(name="arrow" component="fixed-panel")._menu-ico
                ._menu-title.-mobile Меню
                ._menu-list.-mobile
                  ._menu-item
                    router-link(:to="{name: 'home'}" @click="togglePanel")._menu-link Главная
                    icon(name="arrow" component="fixed-panel")._menu-ico
                  ._menu-item(v-for="(nav, index) in navbar" :key="index")
                    router-link(:to="nav.url" @click="togglePanel")._menu-link {{ nav.title }}
                    icon(name="arrow" component="fixed-panel")._menu-ico



</template>
<script>
export default {
  name: "FixedPanel",
  props: {
    navbar: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isFilterOpen: false,
      search: ""
    }
  },
  watch: {
    $route (){
      if(this.showPanel) this.togglePanel();
    }
  },
  computed: {
    cart() {
      const cart = this.$store.getters.getCart;

      if (cart.length > 0) {
        return cart.reduce((sum, el) => sum + el.amount, 0);
      }

      return 0;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    showPanel() {
      return this.$store.getters.getPanelStatus;
    }
  },
  methods: {
    togglePanel(e) {

      let type;

      if(e && e.target) {
        type = e.target.dataset.panel;
      }

      if (type && type === "search") {
        this.isFilterOpen = true;
      } else {
        this.isFilterOpen = false;
      }

      const status = this.showPanel;
      this.$store.dispatch("setFixedPanelStatus", !status);
      const offset = this.pageYOffset || document.documentElement.scrollTop;

      if (offset > 130) {
        this.$el.style.top = offset + 20 + "px";
      }

      if (!this.showPanel) {
        this.$el.style.top = null;
        if (offset > 130) {
          setTimeout(() => this.$el.classList.add("fixed-panel--fixed"), 100);
        }
      }
    },
    onSearch() {
      if (this.search.length > 2) {
        this.$router.push({ name: 'search', query: { val: this.search } })
        this.search = "";
      }
    }
  },
  mounted() {
    const nav = this.$el;
    window.addEventListener("scroll", function() {
      const offset = this.pageYOffset || document.documentElement.scrollTop;
      if (offset > 130) {
        nav.classList.add("fixed-panel--fixed");
      } else {
        nav.classList.remove("fixed-panel--fixed");
      }
    })
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.fixed-panel {
  position: absolute;
  left: 0;
  top: 130px;
  bottom: 0;
  z-index: 900;
  transition: all .3s ease;

  &--fixed {
    position: fixed;
    top: 0;
  }

  @media(max-width: 767px) {
    top: 0;
  }

  $root: &;

  &--active {
    @media(max-width: 767px) {
      width: 100%;
    }
    #{$root} {
      &__nav {
        transform: translate(430px, 0);
      }
      &__menu {
        transform: translate(0, 0);
        opacity: 1;
        pointer-events: all;
      }
      &__nav-item {
        pointer-events: none;
      }
      &__nav-radius {
        opacity: 1;
      }
    }
  }

  &__nav {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 130px;
    min-height: calc(100vh - 130px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 300;
    transition: transform 0.2s;

    @media(max-width: 767px) {
      display: none;
    }
  }

  &__nav-item {
    width: 90px;
    height: 90px;
    position: relative;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__nav-radius {
    position: absolute;
    bottom: -19px;
    left: 0;
    width: 19px;
    height: 19px;
    display: block;
    opacity: 0;
    transition: opacity .2s ease;

    &::before {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      background: $dark;
    }

    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      background: #FFF;
      width: 100%;
      height: 100%;
      border-radius: 19px 0 0 0;
    }

    &--reverse {
      transform: rotate(-90deg);
      top: -19px;
      display: none;
    }

    @media(max-width: 767px) {
      display: none;
    }
  }

  &__cart-link {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
  }

  &__cart-amount {
    color: $dark;
    padding: 0 12px;
    font-weight: 600;
    font-size: 12px;
  }

  &__cart-ico {
    fill: $primary;
    width: 26px;
    height: 26px;
  }

  &__nav-ico {
    fill: $primary;
    width: 26px;
    height: 26px;
    pointer-events: none;
  }

  &__menu {
    position: absolute;
    top: 0;
    left: 50px;
    bottom: 0;
    transform: translate(-100%, 0);
    opacity: 0;
    pointer-events: none;
    width: 400px;
    transition: transform 0.2s, opacity 0.3s;
    z-index: 300;

    @media(max-width: 767px) {
      background: $dark;
      width: 100%;
      left: 0;
    }
  }

  &__menu-close {
    position: absolute;
    top: 0;
    right: -90px;
    width: 90px;
    height: 90px;
    background: $dark;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    #{$root} {
      &__nav-ico {
        fill: #FFF;
      }
    }

    @media(max-width: 767px) {
      top: 20px;
      right: 20px;
      width: 26px;
      height: 26px;
      z-index: 1;
    }

    &--filter {
      top: 90px;
      #{$root} {
        &__nav-radius--reverse {
          display: block;
        }
      }
    }
  }

  &__menu-container {
    top: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
  }

  &__menu-inner {
    background: $dark;
    border-radius: 20px 0 20px 20px;
    box-shadow: 7px 7px 30px $shadow-primary;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__menu-scroll {
    width: calc(100% - 30px);
    max-height: calc(100vh - 130px);
    position: relative;
    overflow: hidden;
    overflow-y: auto;

    @media(max-width: 767px) {
      max-height: calc(100vh - 40px);
    }

    &::-webkit-scrollbar-track {
      background-color:$dark;
    }

    &::-webkit-scrollbar-thumb {
      -webkit-border-radius: 0px;
      border-radius: 0px;
      background-color:#5d6074;
    }

    &::-webkit-scrollbar-thumb:hover{
      background-color:#5d6074;
    }

    &::-webkit-resizer{
      width:3px;
      height:0px
    }

    &::-webkit-scrollbar{
      width: 3px;
    }
  }

  &__menu-title {
    font-weight: bold;
    font-size: 26px;
    color: #fff;
    padding: 45px 40px 40px 40px;

    @media(max-width: 767px) {
      font-size: 20px;
      padding: 20px;
    }

    &--mobile {
      display: none;
      @media(max-width: 767px) {
        display: block;
      }
    }

  }

  &__menu-list {
    &--mobile {
      display: none;
      @media(max-width: 767px) {
        display: block;
      }
    }
  }

  &__menu-item {
    position: relative;
    margin: 0 10px 10px 10px;

    &:last-child {
      margin-bottom: 40px;
    }
  }

  &__menu-link {
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    display: block;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 7px;
    padding: 13px 35px 12px 20px;
    transition: background 0.3s;
    position: relative;

    @media(max-width: 767px) {
      font-style: 14px;
      padding: 10px 20px 10px 15px;
    }

    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  &__menu-ico {
    position: absolute;
    right: 20px;
    top: calc(50% - 7px);
    fill: #FFF;
    width: 14px;
    height: 14px;
    @media(max-width: 767px) {
      width: 10px;
      height: 10px;
      top: calc(50% - 5px);
      right: 15px;
    }
  }

  &__search {
    padding-bottom: 60px;

    &--mobile {
      display: none;

      @media(max-width: 767px) {
        display: block;
        padding: 0 10px;
      }
    }
  }

  &__search-form {
    display: flex;
    flex-direction: column;
    @media(max-width: 767px) {
      flex-direction: row;
    }
  }

  &__search-input {
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

  &__search-btn {
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

  &__search-ico {
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