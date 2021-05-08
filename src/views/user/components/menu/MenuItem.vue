<template>
  <router-link :to="path">
    <div class="menu-item">{{ title }}</div>
  </router-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    path: { // 唯一的routerPath
      type: String,
      required: true
    },
    title: { // 标题
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
  .menu-item {
    padding: 20px;
    color: rgb(153, 153, 153);
    user-select: none
  }
  .menu-item:hover {
    background: rgb(244, 244, 244);
  }
</style>
