<template lang="pug">
  section.question-form
    ._image
      img(src="/themes/vue-october/assets/images/question_form.png", alt="вопросы")._image-thumb
    ._container
      ._title Остались вопросы?
      button(type="button" @click="popup = true")._btn Напишите нам
    Popup(v-if="popup" @close="popup = false")
      ._form-title Остались вопросы?
      ContactForm

</template>
<script>
import Popup from '@vue/components/Popup/Popup';
import ContactForm from '@vue/components/ContactForm/ContactForm';

export default {
  name: "QuestionForm",
  components: {
    Popup,
    ContactForm
  },
  data() {
    return {
      popup: false
    }
  }

}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.question-form {
  position: relative;
  background: $dark;
  border-radius: 20px;
  box-shadow: 7px 7px 30px $shadow-primary;
  margin-bottom: 100px;

  @media(max-width: 1199px) {
    margin-bottom: 60px;
  }

  @media(max-width: 767px) {
    margin-bottom: 30px;
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__image-thumb {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: 50% 50%;
  }

  &__container {
    padding: 27px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    @media(max-width: 991px) {
      padding: 20px;
    }

    @media(max-width: 575px) {
      flex-direction: column;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 53px;
    color: #fff;
    margin: 20px 40px;

    @media(max-width: 1440px) {
      font-size: 45px;
    }

    @media(max-width: 1199px) {
      font-size: 40px;
      margin: 20px 30px;
    }

    @media(max-width: 991px) {
      font-size: 35px;
      margin: 15px;
    }

    @media(max-width: 767px) {
      font-size: 25px;
    }

    @media(max-width: 575px) {
      max-width: 100%;
      margin: 0 0 15px 0;
    }

    @media(max-width: 350px) {
      font-size: 20px;
    }
  }

  &__form-title {
    font-weight: bold;
    font-size: 26px;
    color: #fff;
    padding: 0 30px 40px 0;
  }

  &__btn {
    margin: 20px 40px;
    font-weight: 600;
    font-size: 15px;
    padding: 16px 25px 16px;
    transition: background 0.3s, color 0.3s;
    color: #fff;
    border: none;
    background: rgba(255, 255, 255, 0.07);

    @media(max-width: 1199px) {
      margin: 20px 30px;
    }

    @media(max-width: 991px) {
      margin: 15px;
    }

    @media(max-width: 767px) {
      font-size: 14px;
      padding: 12px 20px;
    }

    @media(max-width: 575px) {
      margin: 0;
    }
  }

}
</style>