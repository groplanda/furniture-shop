<template lang="pug">
  footer.footer.section
    ._up(:class="{ 'footer__up--show': showUp }" @click="onUp")
      span._up-text Вверх
      icon(name="up" component="footer")._up-ico

    ._container.container.container--main
      ._row
        ._content
          ._site(v-if="settings.siteLogo")
            img(:src="'/storage/app/media' + settings.siteLogo", :alt="settings.siteName")._site-thumb
          ._site(v-else-if="settings.siteName")
            ._site-name {{ settings.siteName }}
            ._site-descr Магазин мебели
            ._site-copy © 2021. All rights reserved
          ._nav
            router-link(:to="{name: 'home'}")._nav-link Главная
            router-link(
              :to="link.url"
              v-for="(link, index) in navbar"
              :key="index")._nav-link {{ link.title }}
          ._feedback
            ._contacts
              ._title Контакты
              ._contacts-item.-phone(v-if="settings.phone")
                icon(name="phone" component="header")._phone-ico
                a(:href="'tel:' + preparePhone(phone.val)" v-for="(phone, index) in settings.phone" :key="index")._phone-link {{ phone.val }}
              ._contacts-item.-address(v-if="settings.address")
                icon(name="map" component="header")._address-ico
                ._address-text {{ settings.address }}

            ._social
              ._title Мы в соцсетях
              ._social-list
                a(:href="settings.instagram" v-if="settings.instagram && settings.instagram.length > 0" target="_blank")._social-link
                  icon(name="inst" component="header")._social-ico
                a(:href="settings.vk" v-if="settings.vk && settings.vk.length > 0" target="_blank")._social-link
                  icon(name="vk" component="header")._social-ico
                a(:href="settings.ok" v-if="settings.ok && settings.ok.length > 0" target="_blank")._social-link
                  icon(name="ok" component="header")._social-ico
                a(:href="'whatsapp://send?phone=+' + settings.whatsapp" v-if="settings.whatsapp && settings.whatsapp.length > 0" target="_blank")._social-link
                  icon(name="whatsapp" component="header")._social-ico
        ._form
          ._form-inner
            ._title.-form Оставьте заявку!
            icon(name="envelope" component="footer")._form-ico
            ContactForm(className="footer")

</template>
<script>
import { formattedPhone } from '@vue/helpers/formatted.js';
import ContactForm from '@vue/components/ContactForm/ContactForm';

export default {
  name: "Footer",
  components: {
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
  methods: {
    preparePhone(phone) {
      return formattedPhone(phone);
    },
    onUp() {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  },
  data() {
    return {
      showUp: false,
      phones: []
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      const offset = this.pageYOffset || document.documentElement.scrollTop;

      if (offset > 500) {
        this.showUp = true
      } else {
        this.showUp = false
      }
    })
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.footer {
  position: relative;
  padding-bottom: 50px;

  $root: &;

  @media(max-width: 1199px) {
    padding: 10px 0;
    background: #F8F8F8;
  }

  &__up {
    height: 90px;
    font-weight: 500;
    font-size: 20px;
    color: $dark;
    display: flex;
    align-items: center;
    transform: rotate(-90deg);
    cursor: pointer;
    margin-top: auto;
    margin-bottom: 0px;
    position: fixed;
    bottom: 50px;
    left: 13px;
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;

    @media(max-width: 1199px) {
      left: 0;
    }

    @media(max-width: 767px) {
      transform: rotate(0);
      width: 40px;
      height: 40px;
      background: $dark;
      justify-content: center;
      left: 10px;
      bottom: 30px;
      border-radius: 20px;
    }

    &--show {
      opacity: 1;
      pointer-events: all;
      cursor: pointer;
    }

    @media(min-width: 768px) {
      &:hover {
        #{$root} {
          &__up-ico {
            right: -5px;
          }
        }
      }
    }
  }

  &__up-text {
    display: block;
    padding-right: 30px;
    @media(max-width: 767px) {
      display: none;
    }
  }

  &__up-ico {
    fill: $dark;
    width: 16px;
    height: 24px;
    display: block;
    transform: rotate(90deg);
    position: absolute;
    top: 36px;
    right: 0;
    transition: right 0.3s;

    @media(max-width: 767px) {
      position: inherit;
      top: auto;
      right: auto;
      fill: #FFF;
      transform: none;
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__content {
    width: 100%;
    max-width: calc(100% - 445px);
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 1199px) {
      margin-top: 20px;
      max-width: 100%;
      order: 1;
      background: #FFF;
      border-radius: 20px;
      padding: 30px 20px;
    }
  }

  &__site {
    width: 100%;
    max-width: 310px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;

    @media(max-width: 1740px) {
      max-width: 260px;
    }

    @media(max-width: 1440px) {
      max-width: 200px;
    }

    @media(max-width: 1199px) {
      max-width: 260px;
    }

    @media(max-width: 991px) {
      display: none;
    }
  }

  &__site-thumb {
    max-width: 200px;
    display: flex;
  }

  &__site-name {
    font-weight: bold;
    font-size: 24px;
    color: $primary;
    margin-bottom: 8px;

    @media(max-width: 1740px) {
      font-size: 20px;
    }
  }

  &__site-descr {
    font-weight: normal;
    font-size: 17px;
    color: #818181;
    margin-bottom: 20px;

    @media(max-width: 1740px) {
      font-size: 15px;
    }
  }

  &__site-copy {
    font-weight: normal;
    font-size: 15px;
    color: $primary;
    margin-top: auto;
  }

  &__nav {
    width: 100%;
    max-width: 210px;
    display: flex;
    flex-direction: column;
    padding-right: 20px;

    @media(max-width: 1740px) {
      max-width: 190px;
    }

    @media(max-width: 1440px) {
      display: none;
    }

    @media(max-width: 575px) {
      max-width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      order: 2;
      padding-right: 0;
      margin-top: 30px;
    }
  }

  &__nav-link {
    font-size: 15px;
    color: #ababab;
    display: block;
    text-decoration: none;
    padding: 10px 0 10px;
    transition: color 0.3s;

    &:hover, &:focus {
      color: $primary;
    }

    &:first-child {
      padding-top: 0;
    }

    @media(max-width: 575px) {
      font-size: 14px;
      padding: 10px 0;
      margin-right: 10px;

      &:first-child {
        padding-top: 10px;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__feedback {
    width: 100%;
    max-width: calc(100% - 520px);
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 1740px) {
      max-width: calc(100% - 450px);
    }

    @media(max-width: 1440px) {
      max-width: calc(100% - 200px);
    }

    @media(max-width: 1199px) {
      max-width: calc(100% - 260px);
    }

    @media(max-width: 991px) {
      max-width: 100%;
    }

  }

  &__contacts {
    width: 100%;
    max-width: 50%;
    padding-right: 20px;

    @media(max-width: 1440px) {
      max-width: 60%;
    }
    @media(max-width: 575px) {
      max-width: 100%;
      padding-right: 0;
      margin-bottom: 30px;
    }
  }

  &__contacts-item {
    padding-left: 35px;
    position: relative;

    @media(max-width: 1740px) {
      padding-left: 30px;
    }

    &--phone {
      padding-bottom: 20px;
    }

    &--address {
      max-width: 300px;
    }
  }

  &__phone-ico {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 4px;
    left: 0;
  }

  &__address-ico {
    width: 9px;
    height: 18px;
    position: absolute;
    top: calc(50% - 9px);
    left: 0;
  }

  &__phone-link {
    display: block;
    font-weight: bold;
    font-size: 19px;
    color: $primary;
    padding-bottom: 6px;

    @media(max-width: 1740px) {
      font-size: 18px;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__address-text {
    color: $primary;
    font-size: 15px;
  }

  &__social {
    width: 100%;
    max-width: 50%;

    @media(max-width: 1440px) {
      max-width: 40%;
    }

    @media(max-width: 575px) {
      max-width: 100%;
    }
  }

  &__social-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #F8F8F8;
    margin: 0 5px 10px;

    @media(max-width: 1440px) {
      width: 35px;
      height: 35px;
      margin: 0 2.5px 5px;
    }
  }

  &__social-ico {
    fill: $primary;
    max-width: 20px;
    max-height: 21px;
    position: absolute;

    @media(max-width: 1440px) {
      max-width: 16px;
      max-height: 17px;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 24px;
    color: $primary;
    padding-bottom: 40px;

    &--form {
      color: #FFF;
      line-height: 32px;
      padding: 0 24px 40px 0;
      @media(max-width: 991px) {
        padding-left: 15px;
      }
    }

    @media(max-width: 1740px) {
      font-size: 20px;
    }

    @media(max-width: 1199px) {
      padding-bottom: 20px;
    }
  }

  &__form {
    width: 100%;
    max-width:  405px;
    margin-left: 40px;
    position: relative;

    @media(max-width: 1199px) {
      max-width: 100%;
      margin-left: 0;
      order: 0;
    }
  }

  &__form-ico {
    width: 26px;
    height: 26px;
    fill: #FFF;
    position: absolute;
    right: 40px;
    top: 40px;
  }

  &__form-inner {
    background: $dark;
    padding: 35px 40px 40px;
    box-shadow: 7px 7px 30px $shadow-primary;
    border-radius: 20px;
    min-height: 100%;

    @media(max-width: 991px) {
      padding: 25px 5px;
    }

    @media(max-width: 767px) {
      padding: 25px 20px;
    }
  }

  &__form-row {
    @media(max-width: 1199px) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
    }
  }

  &__form-group {
    position: relative;
    margin-bottom: 20px;

    @media(max-width: 1199px) {
      width: 100%;
      max-width: 33.333%;
      padding: 0 15px;
      margin-bottom: 0;
    }

    @media(max-width: 767px) {
      max-width: 100%;
      padding: 0;
      padding-bottom: 20px;
    }
  }

  &__form-label {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 10px;
    margin: 0;
    display: flex;
  }

  &__form-mark {
    color: #ff5640;
    margin-left: 4px;
  }

  &__form-input {
    font-size: 16px;
    color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    box-shadow: none;
    border-radius: 10px;
    padding: 12px 28px;
    width: 100%;
    height: auto;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    transition: all 0.18s linear;

    &:hover, &:focus {
      color: #fff;
      border-color: transparent;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: none;
    }
  }

  &__form-submit {
    font-weight: 600;
    font-size: 15px;
    padding: 16px 25px;
    transition: background 0.3s, color 0.3s;
    color: #fff;
    border: none;
    background: rgba(255, 255, 255, 0.07);
    border-radius: 5px;

    @media(max-width: 1199px) {
      padding: 14px 25px;
      width: 100%;
      max-width: calc(33.333% - 30px);
      margin: 0 15px;
    }

    @media(max-width: 767px) {
      margin: 0;
      max-width: 100%;
    }

    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>