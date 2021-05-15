<template>
  <div class="my_bookshelf">
    <div class="title cf">
      <h2 class="fl">我的书评</h2>
      <div class="fr" />
    </div>

    <el-card v-for="item in list" :key="item.id" class="book-review" style="margin-top: 10px;">
      <el-row class="book-review-about" type="flex" justify="space-between">
        <h2 style="font-weight: bold">《{{ item.book.title }}》</h2>
        <div>
          <el-rate :value="item.star" disabled />
        </div>
      </el-row>
      <div class="book-review-content">
        {{ item.content }}
      </div>
      <div>发布于 {{ item.updateTime }}</div>
      <div class="book-review-actions">
        <!--        <el-button>👍</el-button>
        <el-button>👎🏼</el-button>
        <el-button>51个评论</el-button>-->
        <el-button size="mini" type="primary" @click="handleUpdate(item)">修改</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(item.id)">删除</el-button>
      </div>
    </el-card>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <data-form-dlg :visible.sync="dialogFormVisible" :dataform="temp" @msubmit="msubmit" />

    <!--    <div class="bookComment">
      <div class="no_contet no_comment" style="display:none">
        您还没有发表过评论！
      </div>
      <div id="commentBar" class="commentBar" />
    </div>
    <div id="commentPage" class="pageBox cf" />-->
  </div>
</template>

<script>
import { searchBookComment, editBookComment, deleteBookComment } from '@/api/comment'
import { editRating } from '@/api/rating'
import { mapGetters } from 'vuex'
import DataFormDlg from './DataFormDlg'
import Pagination from '@/components/Pagination'

export default {
  components: { DataFormDlg, Pagination },
  computed: {
    ...mapGetters([
      'token',
      'id'
    ])
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        userId: this.$route.params.userId
      },
      total: 0,

      dialogFormVisible: false,
      temp: {}

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      searchBookComment(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      this.listLoading = false
    },
    handleUpdate(bookComment) {
      this.dialogFormVisible = true
      this.temp = {}
      this.temp.id = bookComment.id
      this.temp.star = bookComment.star
      this.temp.content = bookComment.content
      this.temp.rating = bookComment.rating
      // 防止引用传递
      this.temp = Object.assign({}, this.temp)
    },
    msubmit(tempData) {
      // 修改
      editBookComment({ id: tempData.id, content: tempData.content }).then(res => {
        // const index = this.list.findIndex(v => v.id === tempData.id)
        // this.list.splice(index, 1, tempData)
      })
      editRating({ id: tempData.rating.id, star: tempData.star }).then(_ => {
        this.dialogFormVisible = false
        this.getList()
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDelete(commentId) {
      deleteBookComment(commentId).then(_ => {
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
  .book-review-content {
    font-size: 15px;
  }

  .book-review > div > div{
    margin: 15px 0;
  }

</style>
