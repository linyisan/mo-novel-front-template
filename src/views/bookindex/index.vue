<template>
  <div class="main box_center cf">
    <!--  <div class="nav_sub">
      <a href="/" th:text="${application.website.name}"></a>&gt;<a th:href="'/book/bookclass.html?c='+${book.catId}" th:text="${book.catName}"></a>&gt;<a
      th:href="'/book/'+${book.id}+'.html'" th:utext="${book.bookName}"></a>&gt;<a
      th:href="'/book/indexList-'+${book.id}+'.html'">作品目录</a>
    </div>-->
    <div class="channelWrap channelChapterlist cf mb50">

      <div class="bookMain">
        <div class="bookCover cf">
          <div class="book_info1">
            <div class="tit">
              <h1>{{ book.title }}</h1><!--<i class="vip_b">VIP</i>-->
            </div>
            <ul class="list">
              <li>
                <span>作者：{{ book.authorName }}</span>
                <span>类别：{{ book.categoryId | getDictLabel(dicts.categoryMap) }}</span>
                <span>状态：{{ book.status | getDictLabel(dicts.bookStatusMap) }}</span>
                <span>总点击：{{ book.visitCount }}</span>
                <span>总字数：{{ book.wordCount }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="dirWrap cf">
          <h3>总章节数：{{ total }}</h3>
          <div class="dirList">
            <ul>
              <li v-for="item in bookIndexList" :key="item.id">
                <router-link :to="{name: 'BookContent', params: {bookId: item.bookId, bookIndexId: item.id}}">{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dicts, getDictLabel } from '@/dicts'
import { searchBookIndex } from '@/api/bookIndex'
import { getBook } from '@/api/book'

export default {
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      book: {},
      bookIndexList: [],
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        limit: 99999,
        bookId: this.$route.params.bookId
      },
      dicts
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      searchBookIndex(this.listQuery).then(res => {
        this.listLoading = false
        this.bookIndexList = res.data.items
        this.total = res.data.total
      })
      getBook(this.listQuery.bookId).then(res => {
        this.listLoading = false
        this.book = Object.assign({}, res.data)
      })
    }
  }
}
</script>

  <style scoped>
    @import "~@/assets/css/main.css";
    @import "~@/assets/css/book.css";
    @import "~@/assets/css/base.css";
  </style>
