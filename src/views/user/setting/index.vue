<template>
  <div class="my_info cf">
    <div class="my_info_txt">
      <ul class="mytab_list">
        <li><i class="tit">我的头像</i>
          <a style="position: relative">
            <img id="imgLogo" class="user_img" alt="我的头像" :src="this.avatar">
            <input id="file0" class="opacity" onchange="picChange()" type="file" name="file" title="点击上传图片" style="z-index: 100;cursor: pointer;left: 0px; top: -25px; width: 60px; height: 80px; opacity: 0; position: absolute;  ">

          </a>

        </li>
        <li><i class="tit">我的昵称</i><a id="my_name" href="/user/set_name.html">{{ this.name }}</a></li>
        <li style="display:none"><i class="tit">电子邮箱</i><a href="javascript:void(0);" /></li>
        <li><i class="tit">我的性别</i><a id="my_sex" href="/user/set_sex.html" /></li>
        <li><i class="tit">我的密码</i><a href="/user/set_password.html">修改密码</a></li>
        <li><i class="tit">当前状态</i><a @click="logout">退出登录</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  },
  create: {},
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped>

</style>
