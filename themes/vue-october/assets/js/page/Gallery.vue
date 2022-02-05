<template lang="pug">
  section.post.section
    ._container.container.container--main
      ._heading
        ._title Наши работы
      Loading(v-if="images.length < 1")
      .gallery.-page(v-else)
        ._inner
          VueGallery(:images="images" :index="index" @close="index = null")
          ._list
            ._elem(
              v-for="(image, imageIndex) in imageList"
              :key="imageIndex"
              @click="index = imageIndex")
              img(:src="image.src")._elem-image
              ._elem-body(v-if="image.title")
                ._elem-title {{ image.title }}
                ._elem-description(v-if="image.description") {{ image.description }}
</template>
<script>
import Loading from "@vue/components/Preloader/Loading";
import axios from "axios";
import VueGallery from "vue-gallery";

export default {
  name: "Gallery",
  components: {
    Loading,
    VueGallery
  },
  data() {
    return {
      index: null,
      images: [],
      imageList: []
    };
  },
  methods: {
    fetchGallery(name = 'our-works') {
      axios
        .get(`/api/gallery/${name}`)
        .then(response => {
          if (response.data.images && response.data.images.length) {
            this.imageList = response.data.images.map(image => {
              return {
                'src': image.path,
                'title': image.title || '',
                'description': image.description || ''
              }
            });
            this.images = this.imageList.map(image => image.src);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    this.fetchGallery(this.$route.name);
  }
};
</script>
