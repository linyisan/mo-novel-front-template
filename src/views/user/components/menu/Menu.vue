<template>
  <div class="menu">
    <template v-for="item in routes">
      <sub-menu
        v-if="item.children && item.children.length > 1"
        :key="item.path"
        :item="item"
        :base-path="item.path"
      />
      <menu-item
        v-else
        :key="item.path"
        :path="item.path"
        :title="item.meta.title"
      />
    </template>
  </div>
</template>

<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'

export default {
  name: 'SimpleMenu',
  components: { MenuItem, SubMenu },
  props: {},
  data() {},
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .menu {
    user-select: none;
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 5px 5px 5px rgba(204, 204, 204, 0.23);
    background: white;
    overflow-x: hidden;
  }
</style>
