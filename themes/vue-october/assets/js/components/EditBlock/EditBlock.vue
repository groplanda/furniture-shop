<template lang="pug">
  .edit-block
    ._row
      ._item(v-for="(add, index) in adds" :key="index" :class="'edit-block__item_' + add.type")
        ._item-image
          img(:src="'/storage/app/media' + add.image", :alt="add.title")._item-thumb
        ._item-title {{ add.title }}
        ._item-row
          router-link(:to="{ name: 'category', params: { slug: add.link }}")._item-link Подробнее
            icon(name="control-prev" component="banner")._item-ico
          ._item-label(v-if="add.tag") {{ add.tag }}

</template>
<script>
export default {
  name: "EditBlock",
  data() {
    return {
      blocks: []
    }
  },
  computed: {
    adds() {
      return this.$store.getters.getSettings.adds || [];
    }
  }
}
</script>
