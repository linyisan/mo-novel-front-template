<template>
  <div>
    <el-dialog v-bind="$attrs" title="修改密码" v-on="$listeners" @open="onOpen" @close="onClose">
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
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input
                v-model="tempFormData.oldPassword"
                placeholder="请输入旧密码"
                clearable
                show-password
                minlength="6"
                maxlength="30"
                show-word-limit
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="tempFormData.newPassword"
                placeholder="请输入新密码"
                clearable
                show-password
                minlength="6"
                maxlength="30"
                show-word-limit
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
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    return {
      tempFormData: {
        oldPassword: undefined,
        newPassword: undefined
      },
      rules: {
        oldPassword: [{
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        }],
        newPassword: [{
          required: true,
          message: '请输入新密码',
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
        this.$emit('msubmit', this.tempFormData)
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
