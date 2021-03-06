<template lang="pug">
  form.contact-form(
      :class="{ 'contact-form--footer': className === 'footer' }"
      @submit.prevent="onSubmit")
    ._form-group
      label._form-label Имя
        span._form-mark *
      input(type="text" v-model="form.user_name" placeholder="")._form-input
      span._error( v-if="nameErr") {{ nameErr }}
    ._form-group
      label._form-label Телефон
        span._form-mark *
      input(type="tel" v-model="form.user_phone" placeholder="" v-mask="'+7 (###) ###-##-##'")._form-input
      span._error( v-if="phoneErr") {{ phoneErr }}
    button(type="submit" :class="{'contact-form__btn--offset': className === 'footer' && (nameErr || phoneErr)}")._btn Отправить
    ._status {{ submitStatus }}
</template>
<script>
import { onValidate, checkErr } from '@vue/helpers/validate.js';
import axios from "axios";

export default {
  name: "ContactForm",
  props: {
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        user_name: "",
        user_phone: "",
      },
      submitStatus: null,
      errors: []
    }
  },
  computed: {
    nameErr() {
      return checkErr('user_name', this.errors);
    },

    phoneErr() {
      return checkErr('user_phone', this.errors);
    },

    submitMsg () {
      return this.submitStatus;
    }
  },
  methods: {
    onSubmit() {
      this.setSubmitStatus(null);
      this.errors = [];

      this.setSubmitStatus("Отправка формы...");

      axios.post('/api/send-message', this.form)
        .then(response => {
          let message = ''
          const data = response.data;
          if(data.status === 'error') {
            this.onValidate(data)
            this.setSubmitStatus(null);

          } else if(data.status === 'success') {
            message = data.message;
            this.resetForm();
          }

          this.setSubmitStatus(message);

        })
        .catch(error => {
          console.log(error);
        })
    },

    resetForm() {
      this.errors = [];
      this.setSubmitStatus(null);
      Object.keys(this.form).forEach(key => this.form[key] = '');
    },

    onValidate(response) {
      this.errors = onValidate(response, this.form);
    },

    setSubmitStatus(status) {
      this.submitStatus = status;
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.contact-form {

  $root: &;

  &--footer {
    @media(max-width: 1199px) {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
    }

    #{$root} {
      &__form-group {
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
      &__btn {
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
      }
    }
  }

  &__form-group {
    position: relative;
    margin-bottom: 20px;
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

  &__error {
    color: #ff5640;
    font-size: 12px;
    line-height: 21px;
    margin-top: 3px;
    display: block;

    @media (min-width: 768px) and (max-width: 992px) {
      font-size: 10px;
    }
  }

  &__form-input {
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
    -moz-appearance: none;
    transition: all 0.18s linear;

    &:hover, &:focus {
      color: #fff;
      border-color: transparent;
      background: $shadow-dark2;
      box-shadow: none;
    }
  }

  &__btn {
    font-weight: 600;
    font-size: 15px;
    padding: 16px 25px 16px;
    transition: background 0.3s, color 0.3s;
    color: #fff;
    border: none;
    background: rgba(255, 255, 255, 0.07);

    @media(max-width: 767px) {
      font-size: 14px;
      padding: 12px 20px;
    }

    &--offset {
      @media (min-width: 768px) and (max-width: 1199px) {
        margin-bottom: 23px !important;
      }
    }

    &:hover, &:focus {
      background: $shadow-dark2;
    }
  }

  &__status {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    margin-top: 10px;

    @media(max-width: 767px) {
      margin-top: 5px;
      font-size: 12px;
    }
  }

}
</style>