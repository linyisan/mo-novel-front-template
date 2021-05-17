<template>
  <div class="box_center">
    <el-card v-for="item in list" :key="item.id" style="margin-bottom: 10px">
      <el-collapse>
        <el-collapse-item>
          <template slot="title"><h1 style="font-size: 20px;">{{ item.title }}</h1> </template>
          <el-divider/>
          <div style="padding: 10px;word-wrap: break-word;white-space: pre-wrap;font-weight:200;font-size:20px;font-family: 'Microsoft YaHei'">{{ item.content }}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { searchNotice } from '@/api/notice'
export default {
  data() {
    return {
      list: [],
      listLoding: true,
      total: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      searchNotice().then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  @import "~@/assets/css/base.css";
  @import "~@/assets/css/main.css";
</style>
