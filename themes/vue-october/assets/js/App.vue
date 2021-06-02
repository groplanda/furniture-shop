<template lang="pug">
  .wrapper(:class="{ 'wrapper--active': activeWrapper }")
    Header(:settings="settings")
    FixedPanel
    .wrapper__container
      router-view
    Footer(:settings="settings")
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
  computed: {
    settings() {
      return this.$store.getters.getSettings;
    },
    activeWrapper() {
      return this.$store.getters.getPanelStatus;
    }
  },
  watch: {
    activeWrapper() {
      this.activeWrapper
      ? document.body.classList.add("open-modal")
      : document.body.classList.remove("open-modal");
    }
  },
  created() {
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchSettings");
    if (localStorage.getItem('cart')) {
      this.$store.dispatch("fillCart" , JSON.parse(localStorage.getItem('cart')));
    }
  }
}
</script>
