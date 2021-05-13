<template>
  <div class="my_info cf">
    <div class="my_info_txt">
      <el-button class="btn_ora" style="float: right" round @click="handleUpdate">修改</el-button>
      <ul class="mytab_list">
        <li><i class="tit">我的头像</i><img class="user_big_head" alt="我的头像" :src="user.avatar"></li>
        <li><i class="tit">我的昵称</i>{{ user.username }}</li>
        <li><i class="tit">性别</i>{{ user.sex | getDictLabel(dicts.sexMap) }}</li>
        <li><i class="tit">邮箱</i>{{ user.email }}</li>
        <li><i class="tit">手机号</i>{{ user.mobile }}</li>
      </ul>
    </div>
    <data-form-dlg :visible.sync="dialogFormVisible" :dataform="user" @msubmit="msubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dicts, getDictLabel } from '@/dicts'
import { getUser, editUser } from '@/api/user'
import DataFormDlg from './DataFormDlg'

export default {
  components: { DataFormDlg },
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      dicts,
      user: {},

      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'id'
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getUser(this.id).then(res => {
        this.user = Object.assign({}, res.data)
      })
    },
    handleUpdate() {
      this.dialogFormVisible = true
    },
    msubmit(tempData) {
      console.log('父组件', JSON.stringify(tempData))
      // 修改
      editUser(tempData).then(res => {
        // const index = this.list.findIndex(v => v.id === tempData.id)
        // this.list.splice(index, 1, tempData)
        this.dialogFormVisible = false
        this.getData()
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/css/base.css";
  @import "~@/assets/css/user.css";
</style>
