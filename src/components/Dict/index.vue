<template>
  <!--  LJohn [打造一款适合自己的快速开发框架-前端篇之字典组件设计与实现](https://juejin.cn/post/6844904198539395079)-->
  <div class="m-dict">
    <!--表单布局模式-->
    <slot v-if="mode==='form'" :dict="dict">
      <el-select v-if="dict.items" v-model="mValue" :size="size" @change="handleChange">
        <el-option
          v-for="item in dict.items"
          :key="item.dictItemValue"
          :label="item.name"
          :value="item.dictItemValue"
        />
      </el-select>
    </slot>
    <!--列表布局模式-->
    <slot v-else-if="mode==='list'" :dict="dict">
      <span v-for="item in dict.items" :key="item.dictItemValue">
        <el-tag v-if="item.dictItemValue === value" :type="type" size="mini">{{ item.name }}</el-tag>
      </span>
    </slot>
    <!--搜索表单布局模式-->
    <slot v-else-if="mode==='searchForm'" :dict="dict">
      <el-select v-if="dict.items" v-model="mValue" :size="size" @change="handleChange">
        <el-option label="所有" :value="undefined" />
        <el-option
          v-for="item in dict.items"
          :key="item.dictItemValue"
          :label="item.name"
          :value="item.dictItemValue"
        />
      </el-select>
    </slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MDict',
  props: {
    // 字典唯一编码(表名_字段名)
    dictKey: {
      type: String,
      default: undefined
    },
    // 字典类型(enum->枚举类字典类型,db->数据库字典类型,local->本地字典类型)
    // 不传的话，后端先查enum,再查db
    type: {
      type: String,
      default: 'enum'
    },
    // 绑定的值
    value: {
      type: [String, Number],
      default: undefined
    },
    size: { // medium/small/mini
      type: String,
      default: 'medium'
    },
    mode: { // form->普通表单,list->列表页,searchForm->搜索表单
      type: String,
      default: 'form'
    }
  },
  data() {
    return {
      mValue: this.value
    }
  },
  computed: {
    ...mapGetters([
      'dictMap'
    ]),
    // 当前字典
    dict() {
      return this.dictMap[this.dictKey] || {}
    }
  },
  watch: {
    value(n) { // 监听父组件值变动，子组件也要变动
      this.mValue = n
    }
  },
  created() {
    if (!this.dictMap[this.dictKey]) {
      // 这里调用store/modules/dict.js/action->getByDictKey
      this.$store.dispatch('dict/getByDictKey', {
        dictKey: this.dictKey,
        type: this.type
      })
    }
  },
  methods: {
    // 子组件值变化要通知父组件
    handleChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
