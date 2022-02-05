<template lang="pug">
  .folders
    ._row
      Categories

</template>
<script>
import Categories from '@vue/components/Categories/Categories';

export default {
  name: "Folders",
  components: {
    Categories
  }
}
</script>
<style lang="scss">
.folders {
  width: 100%;
  margin-bottom: 60px;

  @media(max-width: 767px) {
    margin-bottom: 40px;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;

    @media(max-width: 1740px) {
      margin: 0 -10px;
    }
  }
}
</style>
