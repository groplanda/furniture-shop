<template lang="pug">
  header.header.section
    Popup(v-if="popup" @close="popup = false")
      ._form-title Заказать звонок
      ContactForm
    ._container.container
      ._row.-mobile
        button._burg(@click="openNav")
          icon(name="burg" component="header")._burg-ico

        button._call(@click="showPopup = !showPopup")
          icon(name="phone" component="header")._call-ico

        ._cart
          router-link(:to="{ name: 'cart' }" v-if="cart")._cart-link
          ._cart-amount {{ cart }}
          icon(name="cart" component="header")._cart-ico



      ._row.-desktop
        router-link(v-if="settings.siteLogo" :to="{name: 'home'}")._logo
          img(:src="'/storage/app/media' + settings.siteLogo", :alt="settings.siteName")._logo-thumb
        ._logo(v-else-if="settings.siteName")
          ._logo-name {{ settings.siteName }}
          ._logo-info Магазин мебели

        nav._nav
          ._nav-item
            router-link(:to="{name: 'home'}")._nav-link Главная
          ._nav-item(v-for="(link, idx) in navbar" :key="idx")
            router-link(:to="link.url")._nav-link {{ link.title }}

        ._contacts
          ._address.-top(v-if="settings.address")
            icon(name="map" component="header")._address-ico
            ._address-text {{ settings.address }}

          ._phone.-top(v-if="settings.phone")
            icon(name="phone" component="header")._phone-ico
            a(:href="'tel:' + preparePhone(phone.val)" v-for="(phone, index) in settings.phone" :key="index")._phone-link {{ phone.val }}

          button._more(@click="showPopup = !showPopup")
            icon(name="more" component="header")._more-ico

          ._popup(v-if="showPopup")
            ._popup-title Контакты
            button._popup-btn(@click="showPopup = false")
              icon(name="close" component="header")._popup-close

            ._address(v-if="settings.address")
              icon(name="map" component="header")._address-ico
              ._address-text {{ settings.address }}

            ._phone(v-if="settings.phone")
              icon(name="phone" component="header")._phone-ico
              a(:href="'tel:' + preparePhone(phone.val)" v-for="(phone, index) in settings.phone" :key="index")._phone-link {{ phone.val }}

            ._social
              ._social-list
                a(:href="settings.instagram" v-if="settings.instagram && settings.instagram.length > 0" target="_blank")._social-link
                  icon(name="inst" component="header")._social-ico
                a(:href="settings.vk" v-if="settings.vk && settings.vk.length > 0" target="_blank")._social-link
                  icon(name="vk" component="header")._social-ico
                a(:href="settings.ok" v-if="settings.ok && settings.ok.length > 0" target="_blank")._social-link
                  icon(name="ok" component="header")._social-ico
                a(:href="'whatsapp://send?phone=+' + settings.whatsapp" v-if="settings.whatsapp && settings.whatsapp.length > 0" target="_blank")._social-link
                  icon(name="whatsapp" component="header")._social-ico

            button(type="button" @click="popup = true")._btn Заказать звонок



</template>
<script>
import { formattedPhone } from '@vue/helpers/formatted.js';
import Popup from '@vue/components/Popup/Popup';
import ContactForm from '@vue/components/ContactForm/ContactForm';
export default {
  name: "Header",
  components: {
    Popup,
    ContactForm
  },
  props: {
    settings: {
      type: Object,
      default() {
        return {}
      }
    },
    navbar: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      popup: false,
      showPopup: false,
    }
  },
  computed: {
    cart() {
      const cart = this.$store.getters.getCart;
      if (cart.length > 0) {
        return cart.reduce((sum, el) => sum + el.amount, 0);
      }
      return 0;
    }
  },
  methods: {
    preparePhone(phone) {
      return formattedPhone(phone);
    },
    openNav() {
      const status = this.showPanel;
      this.$store.dispatch("setFixedPanelStatus", !status);
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';

.header {
  padding: 26px 0;
  min-height: 130px;

  @media(max-width: 1199px) {
    padding: 20px 0;
  }

  @media(max-width: 767px) {
    padding: 15px 0;
  }

  $root: &;

  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &--desktop {
      @media(max-width: 767px) {
        justify-content: center;
      }
    }

    &--mobile {
      display: none;
      @media(max-width: 767px) {
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;
      }
    }
  }

  &__burg {
    background: $dark;
    box-shadow: 5px 5px 20px $shadow-primary;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__burg-ico {
    width: 24px;
    height: 18px;
    fill: #fff;
  }

  &__call {
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__call-ico {
    fill: $primary;
    width: 19px;
    height: 19px;
  }

  &__cart {
    padding: 0 12px;
    width: 65px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  &__cart-link {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
  }

  &__cart-amount {
    font-weight: 600;
    font-size: 12px;
  }

  &__cart-ico {
    fill: $primary;
    width: 18px;
    height: 18px;
    opacity: .2;
  }

  &__logo {
    width: 100%;
    max-width: 285px;
    padding-right: 20px;

    @media(max-width: 1440px) {
      max-width: 240px;
    }

    @media(max-width: 767px) {
      max-width: 100%;
      padding-right: 0;
      text-align: center;
    }
  }

  &__logo-thumb {
    display: flex;
    max-width: 100%;
    height: 75px;
    max-height: 75px;
    @media(max-width: 767px) {
      margin: 0 auto;
    }
  }

  &__logo-name {
    font-weight: bold;
    font-size: 24px;
    color: $primary;
    display: block;
    text-decoration: none;
    margin-bottom: 7px;

    @media(max-width: 1440px) {
      font-size: 18px;
      margin-bottom: 5px;
    }
  }

  &__logo-info {
    font-size: 17px;
    color: $grey;

    @media(max-width: 1440px) {
      font-size: 15px;
    }
  }

  &__nav {
    width: 100%;
    max-width: calc(100% - 885px);
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media(max-width: 1440px) {
      max-width: calc(100% - 645px)
    }

    @media(max-width: 1199px) {
      display: none;
    }
  }

  &__nav-item {
    position: relative;
  }

  &__nav-link {
    display: block;
    padding: 16px 10px;
    text-decoration: none;
    font-weight: normal;
    font-size: 15px;
    color: $light;
    transition: color 0.3s;

    &:hover, &:focus {
        color: $primary;
    }
  }

  &__contacts {
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    position: relative;

    @media(max-width: 1440px) {
      max-width: 405px;
    }

    @media(max-width: 1199px) {
      max-width: calc(100% - 240px);
    }

    @media(max-width: 767px) {
      max-width: 100%;
    }

  }

  &__address {
    width: 100%;
    max-width: calc(100% - 300px);
    padding: 0 20px 0 30px;
    position: relative;

    @media(max-width: 1440px) {
      max-width: calc(100% - 215px);
      padding: 0 10px 0 20px;
    }

    @media(max-width: 1199px) {
      max-width: 250px;
    }

    @media(max-width: 991px) {
      max-width: 230px;
    }

    &--top {
      @media(max-width: 767px) {
        display: none;
      }
      #{$root} {
        &__address-text {
          @media(max-width: 1440px) {
            font-size: 14px;
          }
          @media(max-width: 1199px) {
            font-size: 16px;
          }
        }
      }
    }
  }

  &__address-ico {
    position: absolute;
    left: 0;
    top: 5px;
    width: 9px;
    height: 18px;
    fill: $primary;
  }

  &__address-text {
    color: $primary;
    font-size: 16px;
  }

  &__phone {
    width: 100%;
    max-width: 280px;
    padding: 0 20px 0 30px;
    position: relative;
    @media(max-width: 1440px) {
      max-width: 195px;
      padding: 0 10px 0 20px;
    }

    @media(max-width: 1199px) {
      max-width: 250px;
    }

    @media(max-width: 991px) {
      max-width: 240px;
    }

    &--top {
      @media(max-width: 767px) {
        display: none;
      }
      #{$root} {
        &__phone-link {
          @media(max-width: 1440px) {
            font-size: 16px;
          }
          @media(max-width: 1199px) {
            font-size: 20px;
          }
        }
      }
    }

  }

  &__phone-ico {
    position: absolute;
    left: 0;
    top: 5px;
    width: 16px;
    height: 16px;
    fill: $primary;
  }

  &__phone-link {
    color: $primary;
    font-weight: bold;
    font-size: 21px;
    display: block;
  }

  &__more {
    width: 100%;
    max-width: 20px;
    height: 20px;
    position: relative;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media(max-width: 767px) {
      display: none;
    }
  }

  &__more-ico {
    color: $light;
    width: 100%;
    height: 100%;
  }

  &__popup {
    width: 100%;
    max-width: 405px;
    background: $dark;
    position: absolute;
    border-radius: 20px;
    padding: 30px 40px 40px;
    right: 0;
    top: 100%;
    z-index: 5;

    @media(max-width: 767px) {
      top: 0;
      left: 0;
      max-width: 100%;
      position: fixed;
      z-index: 1030;
      border-radius: 0;
      padding: 30px 20px;
      height: 100%;
    }

    #{$root} {
      &__phone,
      &__address {
        max-width: 100%;
        padding: 0 0 0 40px;
        margin-bottom: 20px;
      }
      &__phone-link {
        color: #FFF;
      }
      &__address-text {
        font-size: 17px;
        color: #FFF;
      }
      &__address-ico,
      &__phone-ico {
        fill: #FFF;
      }
    }
  }

  &__popup-title {
    color: #FFF;
    font-weight: bold;
    font-size: 26px;
    padding: 0 25px 25px 0;
  }

  &__popup-btn {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 35px;
    right: 40px;
  }

  &__popup-close {
    fill: #fff;
    width: 100%;
    height: 100%;
  }

  &__social {
    width: 100%;
    padding: 0 5px;
  }

  &__social-list {
    margin: 0 -5px;
    display: flex;
    align-items: center;
  }

  &__social-link {
    border-radius: 5px;
    width: 100%;
    max-width: calc(16.666% - 10px);
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: $dark2;
    transition: background .3s ease;

    &:hover {
      background: $shadow-dark2;
    }

    &::after {
      content: "";
      display: block;
      padding-top: 100%;
    }

    @media(max-width: 767px) {
      max-width: 40px;
    }
  }

  &__social-ico {
    fill: #FFF;
    max-width: 20px;
    max-height: 21px;
    position: absolute;
  }

  &__btn {
    margin-top: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 11px 20px 11px;
    font-size: 15px;
    color: #FFF;
    font-weight: 500;
    border-radius: 10px;
    background: $dark2;
    transition: background .3s ease;

    &:hover, &:focus {
      background: $shadow-dark2;
    }
  }

  &__form-title {
    font-weight: bold;
    font-size: 26px;
    color: #fff;
    padding: 0 30px 40px 0;
  }
}
</style>