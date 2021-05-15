<template>
  <div>
    <!--    <comment :comments="commentData" />-->
    <vue-carousel :imgs="imgs" :delay="2000" :img-height="302" :dot-width="20" :img-width="400" />
  </div>
</template>

<script>
// import comment from '@/components/Comment'
import VueCarousel from '@/components/Carousel'

export default {
  components: {
    VueCarousel
    // comment,
  },
  filters: {
  },
  data() {
    return {
      imgs: [
        { src: require('@/assets/images/404.jpeg') },
        { src: require('@/assets/images/no_comment.png') },
        { src: require('@/assets/images/pic_upload.png') },
        { src: require('@/assets/images/smlcover.png') }
      ],
      commentData: []
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
