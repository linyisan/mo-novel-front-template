<template>
  <comment :comments="commentData" />
</template>

<script>
import comment from '@/components/Comment'
import { fetchList } from '../../api/comment'

export default {
  components: {
    comment
  },
  data() {
    return {
      commentData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList().then(response => {
        this.commentData = response.data
      })
    }
  }
}
</script>
