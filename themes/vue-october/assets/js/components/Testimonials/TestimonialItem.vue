<template lang="pug">
  .testimonial-item
    ._avatar
      img(:src="'/storage/app/media' + testimonial.avatar", :alt="testimonial.title")._avatar-thumb
    ._group
      icon(name="quote" component="testimonial")._quote
      ._time {{ time }}
      ._name {{ testimonial.title }}
      ._text {{ testimonial.description }}

</template>
<script>
export default {
  name: "TestimonialItem",
  props: {
    testimonial: {
      type: Object,
      required: true
    }
  },
  computed: {
    time() {
      const date = new Date(this.testimonial.date);
      return this.addZero(date.getDate()) + '.' + this.addZero(date.getMonth()) + '.' + date.getFullYear();
    }
  },
  methods: {
    addZero(number) {
      if (number < 10) {
        return '0' + number
      }
      return number;
    }
  }
}
</script>
<style lang="scss">
@import '@/scss/vars.scss';
.testimonial-item {
  background: #F8F8F8;
  border-radius: 20px;
  padding: 30px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;

  @media(max-width: 1740px) {
    padding: 20px;
  }

  @media(max-width: 991px) {
    padding: 10px;
  }

  &__avatar {
    border-radius: 10px;
    overflow: hidden;
    width: 100px;
    position: relative;
    margin-right: 30px;

    @media(max-width: 1740px) {
      margin-right: 20px;
      width: 80px;
    }

    @media(max-width: 991px) {
      margin-right: 15px;
      width: 75px;
    }

    @media(max-width: 350px) {
      margin-right: 10px;
      width: 50px;
    }

    &::after {
      display: block;
      content: "";
      padding-top: 100%;
    }
  }

  &__avatar-thumb {
    max-width: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__group {
    width: 100%;
    max-width: calc(100% - 130px);

    @media(max-width: 1740px) {
      max-width: calc(100% - 100px);
    }

    @media(max-width: 991px) {
      max-width: calc(100% - 90px);
    }

    @media(max-width: 350px) {
      max-width: calc(100% - 60px);
    }
  }

  &__quote {
    fill: $dark;
    width: 32px;
    height: 20px;
    margin-bottom: 20px;

    @media(max-width: 350px) {
      width: 28px;
      height: 16px;
      margin-bottom: 10px;
    }
  }

  &__time {
    font-weight: normal;
    font-size: 13px;
    color: $shadow-primary;
    margin-bottom: 10px;
  }

  &__name {
    font-weight: 500;
    font-size: 17px;
    color: $primary;
    margin-bottom: 20px;
    @media(max-width: 1740px) {
      margin-bottom: 10px;
    }

    @media(max-width: 350px) {
      font-size: 15px;
    }
  }

  &__text {
    font-weight: normal;
    font-size: 14px;
    color: $primary;
    line-height: 1.45;
    @media(max-width: 991px) {
      font-size: 13px;
    }
  }
}
</style>