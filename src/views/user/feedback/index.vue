<template>
  <div class="my_bookshelf">
    <div class="title cf">
      <h2 class="fl">我的反馈</h2>
      <div class="fr">
        <el-button class="btn_ora" round @click="handleCreate">添加</el-button>
      </div>

      <div style="clear: both" />
      <el-card v-for="item in list" :key="item.id" style="margin-top: 10px;">
        <el-row type="flex" justify="space-between">
          <div class="feedback-content">{{ item.content }}</div>
          <el-tag :type="item.done === 1? 'success': 'info'">{{ item.done | getDictLabel(dicts.doneMap) }}</el-tag>
        </el-row>
        <div>发布于 {{ item.updateTime }}</div>
        <div class="actions">
          <el-button size="mini" type="primary" @click="handleUpdate(item)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(item.id)">删除</el-button>
        </div>
      </el-card>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      <data-form-dlg :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :temp-form-data="temp" @msubmit="msubmit" />

    </div>
  </div>
</template>

<script>
import { searchFeedback, editFeedback, deleteFeedback, addFeedback } from '@/api/feedback'
import DataFormDlg from './DataFormDlg'
import Pagination from '@/components/Pagination'
import { dicts, getDictLabel } from '@/dicts'

export default {
  components: { DataFormDlg, Pagination },
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      dicts,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        userId: this.$route.params.userId
      },
      total: 0,

      dialogFormVisible: false,
      temp: {},
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      }
    }
  },
  created() {
    this.getList()
  }, methods: {
    getList() {
      this.listLoading = true
      searchFeedback(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      this.listLoading = false
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.temp = {}
    },
    handleUpdate(feedback) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = {}
      this.temp.id = feedback.id
      this.temp.content = feedback.content
      // 防止引用传递
      this.temp = Object.assign({}, this.temp)
    },
    msubmit(tempData) {
      tempData.userId = this.listQuery.userId
      if (this.dialogStatus === 'create') {
        addFeedback(tempData).then(_ => {
          this.dialogFormVisible = false
          this.getList()
          this.$notify({
            title: 'Success',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        // 修改
        editFeedback(tempData).then(res => {
          this.dialogFormVisible = false
          this.getList()
          this.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    handleDelete(feedbackId) {
      deleteFeedback(feedbackId).then(_ => {
        this.getList()
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }

}
</script>

<style scoped>

  .feedback-content {
    font-size: 15px;
  }

</style>
