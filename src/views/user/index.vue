<template>
  <div>
    <div class="main box_center cf">
      <div class="userBox cf">
        <div class="my_l">

          <ul class="log_list">
            <li>
              <router-link class="link_1" :to="{name: 'UserInfo', params: {userId: id}}" active-class="on">个人中心</router-link>
            </li>
            <li>
              <router-link class="link_4" :to="{name: 'Bookshelf', params: {userId: id}}" active-class="on">我的书架</router-link>
            </li>
            <li>
              <router-link class="link_6" :to="{name: 'Comment', params: {userId: id}}" active-class="on">我的书评</router-link>
            </li>
            <li>
              <router-link class="link_7" :to="{name: 'Feedback', params: {userId: id}}" active-class="on">我的反馈</router-link>
            </li>
            <li>
              <router-link class="link_8" :to="{name: 'Setting', params: {userId: id}}" active-class="on">账号设置</router-link>
            </li>
          </ul>

        </div>
        <div class="my_r">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
      basePath: 'https://localhost:9528'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'id',
      'token'
    ])
  }
}
</script>

<style scoped>
  @import '~@/assets/css/user.css';
  @import "~@/assets/css/base.css";
</style>
