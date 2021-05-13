<template>
  <div>
    <el-dialog v-bind="$attrs" title="修改" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form
        ref="dataForm"
        :model="dataform"
        :rules="rules"
        size="medium"
        label-width="85px"
        label-position="top"
      >
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="dataform.content"
            type="textarea"
            placeholder="请输入多行文本内容"
            :maxlength="1000"
            show-word-limit
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="评分" prop="star">
          <el-rate v-model="dataform.star" :max="5" />
        </el-form-item>
      </el-form>
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
  props: {
    dataform: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      rules: {
        content: [{
          required: true,
          message: '请输入多行文本内容',
          trigger: 'blur'
        }],
        star: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
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
        this.$emit('msubmit', this.dataform)
        this.close()
      })
    }
  }
}

</script>
<style>
  .el-rate {
    display: inline-block;
    vertical-align: text-top;
  }

</style>
