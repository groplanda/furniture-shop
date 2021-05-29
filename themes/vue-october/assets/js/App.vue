<template lang="pug">
  .wrapper(:class="{ 'wrapper--active': activeWrapper }")
    Header
    FixedPanel(@togglePanel="togglePanel")
    .wrapper__container
      router-view
    Footer
</template>

<script>
import Header from "@vue/components/Header/Header";
import FixedPanel from "@vue/components/FixedPanel/FixedPanel";
import Footer from "@vue/components/Footer/Footer";

export default {
  name: "App",
  components: {
    Header,
    FixedPanel,
    Footer
  },
  data() {
    return {
      activeWrapper: false
    }
  },
  watch: {
    activeWrapper() {
      this.activeWrapper
      ? document.body.classList.add("open-modal")
      : document.body.classList.remove("open-modal");
    }
  },
  methods: {
    togglePanel(event) {
      this.activeWrapper = event;
    }
  },
  created() {
    if (localStorage.getItem('cart')) {
      this.$store.dispatch("fillCart" , JSON.parse(localStorage.getItem('cart')));
    }
  }
}
</script>
