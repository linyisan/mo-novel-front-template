<template>
  <div class="my_info cf">
    <div class="my_info_txt">
      <ul class="mytab_list">
        <li><i class="tit">我的头像</i>
          <a style="position: relative">
            <img id="imgLogo" class="user_img" alt="我的头像" :src="avatar">
          </a>

        </li>
        <li><i class="tit">我的密码</i><a @click="handleUpdate">修改密码</a></li>
        <li><i class="tit">当前状态</i><a @click="logout">退出登录</a></li>
      </ul>
    </div>
    <data-form-dlg :visible.sync="dialogFormVisible" @msubmit="msubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {logout, updatePwd} from '@/api/user'
import DataFormDlg from './DataFormDlg'

export default {
  components: { DataFormDlg },
  computed: {
    ...mapGetters([
      'avatar',
      'id'
    ])
  },
  data() {
    return {
      dialogFormVisible: false
    }
  },
  create: {},
  methods: {
    handleUpdate() {
      this.dialogFormVisible = true
    },
    msubmit(tempData) {
      tempData.userId = this.id
      updatePwd(tempData).then(_ => {
        this.$notify({
          title: 'Success',
          message: '修改密码成功',
          type: 'success',
          duration: 2000
        })
      })
    },
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
