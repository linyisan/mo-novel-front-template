<template>
  <div>
    <el-dialog v-bind="$attrs" title="阅读设置" v-on="$listeners" @open="onOpen" @close="onClose" visible>
      <el-form
        ref="dataForm"
        :model="tempFormData"
        :rules="rules"
        size="medium"
        label-width="85px"
        label-position="left"
      >
        <el-form-item label="阅读主题：" prop="backgroundColor">
          <el-color-picker v-model="tempFormData.backgroundColor" size="medium" color-format="hex" />
        </el-form-item>
        <el-form-item label="正文字体：" prop="fontFamily">
          <el-radio-group v-model="tempFormData.fontFamily" size="medium">
            <el-radio-button
              v-for="(item, index) in fontFamilyOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体大小：" prop="fontSize">
          <el-input-number v-model="tempFormData.fontSize" placeholder="计数器字体大小：" :step="1" :min="8" />
        </el-form-item>
      </el-form>
<!--      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>-->
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
        backgroundColor: '#E0CFA3',
        fontFamily: 'microsoft yahei',
        fontSize: 12
      },
      rules: {
        fontFamily: [],
        fontSize: []
      },
      fontFamilyOptions: [{
        'label': '雅黑',
        'value': 'microsoft yahei'
      }, {
        'label': '宋体',
        'value': 'Simsun'
      }, {
        'label': '楷书',
        'value': 'kaiti'
      }]
    }
  },
  computed: {},
  watch: {
    tempFormData: {
      handler(newVal, oldVal) {
        console.log(newVal,'-', oldVal)
      },
      deep: true }
  },
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['dataForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
