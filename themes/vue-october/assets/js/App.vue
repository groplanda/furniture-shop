<template lang="pug">
  .wrapper(:class="{ 'wrapper--active': activeWrapper }")
    Header(:settings="settings")
    FixedPanel(@togglePanel="togglePanel")
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
  data() {
    return {
      activeWrapper: false
    }
  },
  computed: {
    settings() {
      return this.$store.getters.getSettings;
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
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchSettings");
    if (localStorage.getItem('cart')) {
      this.$store.dispatch("fillCart" , JSON.parse(localStorage.getItem('cart')));
    }
  }
}
</script>
