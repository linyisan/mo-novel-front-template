<template>
  <div class="my_bookshelf">
    <div class="title cf">
      <h2 class="fl"><a href="javascript:void(0);" class="red">我的书架</a></h2><i class="fl ml20 mr20 font16">|</i>
      <!--      <h2 class="fl"><a href="/user/read_history.html">最近阅读</a></h2>-->
    </div>

    <div id="divData" class="updateTable">
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column label="类别" align="center" width="100px">
          <template slot-scope="scope">
            [<span>{{ scope.row.book.categoryId | getDictLabel(dicts.categoryMap) }}</span>]
          </template>
        </el-table-column>

        <el-table-column label="书名" align="center">
          <template slot-scope="scope">
            <router-link tag="a" target="_blank" :to="{name: 'BookDetail', params:{bookId: scope.row.bookId}}">{{ scope.row.book.title }}</router-link>
          </template>
        </el-table-column>

        <el-table-column label="最新章节" align="center">
          <template slot-scope="scope">
            <router-link v-if="scope.row.book.lastBookIndex!=null" target="_blank" :to="{name: 'BookContent', params: {bookId: scope.row.book.id, bookIndexId: scope.row.book.lastBookIndex.id}}">{{ scope.row.book.lastBookIndex.title }}</router-link>
            <span v-else>无</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.book.lastBookIndex!=null">{{ scope.row.book.lastBookIndex.createTime }}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>

        <el-table-column label="最近阅读" align="center" width="85px">
          <template slot-scope="scope">
            <span v-if="!scope.row.readingHistoryId">无</span>
            <router-link v-else :to="{name: 'BookContent', params: {bookId: scope.row.bookId, bookIndexId: scope.row.readingHistoryId}}">继续阅读</router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" width="50px">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="command=>handleReadingProcess(command,scope.row)">
              <span class="el-dropdown-link">
                <svg-icon icon-class="more" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in dicts.readingProcess" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
                <el-dropdown-item key="4" :command="4" divided>取消收藏</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div id="shellPage" class="pageBox cf" />
    </div>
  </div>
</template>

<script>
import { deleteBookshelf, editBookshelf, searchBookshelf } from '@/api/bookshelf'
import { dicts, getDictLabel } from '@/dicts'
import { mapGetters } from 'vuex'
export default {
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      dicts,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      searchBookshelf(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      this.listLoading = false
    },
    handleReadingProcess(command, bookshelf) {
      if (command === 4) deleteBookshelf(bookshelf.id)
      else editBookshelf({ userId: this.id, id: bookshelf.id, readingProcess: command })
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
