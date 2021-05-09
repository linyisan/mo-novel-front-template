<template>
  <div>
    <comment :comments="commentData" />
    <filteritem
      first-item-text="不限"
      :list="wordCountMap"
      label="测试"
      @change="function(mvalue){changeEdu(mvalue);temp=mvalue;}"
    />
    <p>{{ '2' | getDictLabel(eduOption) }}</p>
    <p>{{ dicts.sortMap }}</p>
    <reading-setting />
  </div>
</template>

<script>
import comment from '@/components/Comment'
import { dicts, getDictLabel } from '@/dicts'
import Filteritem from '@/components/Filteritem'
import { fetchList } from '../../api/comment'
import ReadingSetting from '@/views/bookcontent/components/ReadingSetting'

export default {
  components: {
    ReadingSetting,
    comment,
    Filteritem
  },
  filters: {
    getDictLabel: getDictLabel,
    wordCountFilter(key) {
      const keyValue = this.wordCountMap.reduce((acc, cur) => {
        acc[cur.label] = cur.value
        return acc
      }, {})
      return keyValue[key]
    }
  },
  data() {
    return {
      commentData: [],
      eduOption: [{ value: 1, label: 'a' }, { value: 2, label: 'b' }],
      wordCountMap: [{ label: '30万字以下', value: JSON.stringify({ 'wordCountMin': 300000, 'wordCountMax': null }) },
        { label: '30-50万字', value: JSON.stringify({ 'wordCountMin': 300000, 'wordCountMax': 500000 }) },
        { label: '50-100万字', value: JSON.stringify({ 'wordCountMin': 500000, 'wordCountMax': 1000000 }) },
        { label: '100万字以上', value: JSON.stringify({ 'wordCountMin': null, 'wordCountMax': 1000000 }) }
      ],
      temp: null,
      dicts: dicts
    }
  },
  watch: {
    temp(oldValue, newValue) {
      console.log('watch', newValue)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList().then(response => {
        this.commentData = response.data
      })
    },
    changeEdu(value) {
      console.log('str_json', value)
      console.log('obj_json', JSON.parse(value))
    }
  }
}
</script>
