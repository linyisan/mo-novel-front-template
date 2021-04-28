<template>
  <dl class="filterItem">
    <dt>{{ label }}：</dt>
    <dd ref="item" :class="{hasMore: hasMore}">
      <template v-if="firstItemText">
        <div class="item" :class="{active: !value.length}" @click="itemClick(firstItemText)">{{ firstItemText }}</div>
      </template>
      <div
        v-for="(item, i) of list"
        :key="i"
        class="item"
        :class="{active: value.includes(item.value?item.value:item.label?item.label:item)}"
        @click="itemClick(item.value?item.value:item.label?item.label:item)"
      >
        {{ item.label?item.label:item }}
      </div>
      <template v-if="showMore">
        <div v-if="hasMore" class="more" @click="hasMore = false">
          <span>更多</span>
          <a-icon type="caret-down" />
        </div>
        <div v-else class="more" @click="hasMore = true">
          <span>收起</span>
          <a-icon type="caret-up" />
        </div>
      </template>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    label: { // 左侧的标题
      type: String,
      required: true
    },
    firstItemText: { // 第一项的展示的选项，表示重置、选中全部或者不选
      type: String,
      required: true
    },
    list: { // 选项，格式["item"]|[{value:1,label:"a"}]
      type: Array,
      required: true
    },
    multiple: { // 是否支持多选
      type: Boolean,
      default: false
    },
    open: { // 选项超过一行时默认是否展开
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: [],
      valueOflabel: [], // 通过value获取当前选中的label
      hasMore: false,
      showMore: false
    }
  },
  watch: {
    list(n) {
      this.hasMore = false
      this.showMore = false
      this.$nextTick(this.calcHeight)
    },
    value: {
      deep: true,
      // immediate: true,
      handler(n) {
        if (typeof this.list[0] === 'string') return
        this.valueOflabel = []
        if (n.length) {
          n.forEach(v => {
            this.list.filter(b => {
              if (b.value === v) {
                this.valueOflabel.push(b.label)
              }
            })
          })
        }
      }
    }
  },
  mounted() {
    this.calcHeight()
  },
  methods: {
    calcHeight() {
      const height = this.$refs.item.offsetHeight
      if (height > 27) {
        if (!this.open) this.hasMore = true
        this.showMore = true
      } else {
        this.hasMore = false
        this.showMore = false
      }
    },
    itemClick(val) {
      if (this.multiple) {
        if (val == this.firstItemText) {
          this.value = []
        } else {
          const i = this.value.indexOf(val)
          if (i > -1) {
            this.value.splice(i, 1)
          } else {
            this.value.push(val)
          }
        }
      } else {
        if (val == this.firstItemText) {
          this.value = []
        } else {
          this.value = [val]
        }
      }
      this.$emit('change', this.value.join())
    },
    reset() {
      this.value = []
    }
  }
}
</script>

<style lang='scss' scoped>
  $primary-color: #409EFF;
  .filterItem {
    display: flex;
    /*margin: 14px 0;*/
    dt {
      margin-right: 10px;
      white-space: nowrap;
      text-align: right;
      min-width: 70px;
      color: grey;
    }

    dd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      padding-right: 48px;

      &.hasMore {
        height: 27px;
        overflow: hidden;
      }

      .item {
        padding: 0 5px;
        margin: 0 6px 6px 0;
        cursor: pointer;
        white-space: nowrap;

        &.active {
          background: $primary-color;
          color: #fff;
        }
      }

      .more {
        position: absolute;
        right: 0;
        top: 0;
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
</style>
