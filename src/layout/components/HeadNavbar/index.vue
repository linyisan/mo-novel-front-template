<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />

    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item v-for="route in routes" :key="route.path" style="display: inline-block;" :item="route" :base-path="route.path" />
      <!--头像 start-->
      <div class="right-menu">
        <el-dropdown v-if="hasLogin" class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link :to="{name: 'UserInfo', params: {userId: id}}">
              <el-dropdown-item>
                {{ name }}
              </el-dropdown-item>
            </router-link>
            <router-link :to="{name: 'Bookshelf', params: {userId: id}}">
              <el-dropdown-item divided>我的书架</el-dropdown-item>
            </router-link>
            <router-link :to="{name: 'Comment', params: {userId: id}}">
              <el-dropdown-item>我的书评</el-dropdown-item>
            </router-link>
            <router-link :to="{name: 'Feedback', params: {userId: id}}">
              <el-dropdown-item>我的反馈</el-dropdown-item>
            </router-link>
            <router-link :to="{name: 'Setting', params: {userId: id}}">
              <el-dropdown-item divided>账号设置</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span v-else>
          <router-link to="/login" style="color: white">登录</router-link>
          <el-divider direction="vertical" />
          <a style="color: white" @click="handleRegister">注册</a>
          <register :visible.sync="dialogFormVisible" />
        </span>
      </div>
      <!--头像 end-->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Register from '@/components/Register'

export default {
  components: { SidebarItem, Logo, Register },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id',
      'token'
    ]),
    hasLogin() {
      // console.log(this.token)
      if (this.token) return true
      else return false
    },
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(this.$route.path)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleRegister() {
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
