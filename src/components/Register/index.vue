<template>
  <div>
    <el-dialog v-bind="$attrs" title="注册" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-row :gutter="15">
        <el-form
          ref="dataForm"
          :model="tempFormData"
          :rules="rules"
          size="medium"
          label-width="85px"
          label-position="left"
        >
          <el-col :span="13">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="tempFormData.username"
                placeholder="请输入用户名"
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="tempFormData.password"
                placeholder="请输入密码"
                clearable
                show-password
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { register } from '@/api/user'

export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      tempFormData: {
        username: undefined,
        password: undefined
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['dataForm'].resetFields()
      this.$refs['dataForm'].clearValidate()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        register(this.tempFormData).then(_ => {
          this.$notify({
            title: 'Success',
            message: '注册成功',
            type: 'success',
            duration: 2000
          })
          this.close()
        })
      })
    }
  }
}

</script>
<style>
</style>
