<template>
  <div v-if="book">
    <el-row type="flex" justify="center" class="bookdetail-layout-header">
      <div class="bookdetail-layout-header-main">
        <div class="book-info">
          <div class="book-info-cover"><img
            :src="book.cover"
            alt="小说封面"
            style="width: 150px; height: 200px;"
          ></div>
          <div class="book-info-detail">
            <h1 class="book-name">{{ book.title }}</h1>
            <p class="book-author"><a href="#">作者：{{ book.authorName }}</a></p>
            <p class="book-word-cout">本书字数：{{ book.wordCount }} </p>
            <p class="book-status">
              <span>更新时间：5 个月</span>
              <span class="status" style="color: #de9763">•{{ book.status | getDictLabel(dicts.bookStatusMap) }}</span>
            </p>
            <div class="book-info-btns-wrap">
              <el-button type="primary">立即阅读</el-button>
              <el-dropdown trigger="click" @command="handleReadingProcess">
                <el-button ref="btn_addBookShelf" type="primary" round>
                  加入书架<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in dicts.readingProcess" :key="item.value" :command="item.value">{{
                    item.label }}
                  </el-dropdown-item>
                  <el-dropdown-item v-show="bookshelf.readingProcess>0" key="4" :command="4" divided>取消收藏
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button>收入书单</el-button>
              <el-button>more</el-button>
            </div>
          </div>
          <!--          <div class="book-info-footer">
            <div class="tag" style="margin: 5px;">
              <el-tag><a href="#">玄幻</a></el-tag>
              <el-tag type="success"><a href="#">异世大陆</a></el-tag>
              <el-tag type="info" closable>私人标签</el-tag>
              <el-button size="mini">新建标签</el-button>
            </div>
          </div>-->
        </div>
      </div>
      <div class="bookdeatil-layout-header-side">
        <div class="book-score-overview"><h1 class="score">8.7</h1>
          <p class="score-count">5647个评分</p></div>
        <div class="book-score-charts">评分分布图表</div>
        <div class="my-rating"><span>我的评分</span>
          <el-rate :value="3" />
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="center" class="bookdetail-layout-main">
      <div class="bookdetail-layout-main-left" style="margin-right: 40px;">
        <el-collapse accordion>
          <el-collapse-item title="简介" name="1">
            {{ book.introduction }}
          </el-collapse-item>
        </el-collapse>

        <el-card>
          <el-row type="flex" justify="space-between">
            <span>
<!--              <a href="#">综合</a><el-divider direction="vertical" />
              <a href="#">最新</a><el-divider direction="vertical" />
              <a href="#">热度</a><el-divider direction="vertical" />
              <a href="#">关注</a><el-divider direction="vertical" />-->
            </span>
            <el-link icon="el-icon-edit" underline href="#">发布评论</el-link>
          </el-row>
        </el-card>

        <div class="book-review">
          <el-card v-for="item in bookCommentList" :key="item.id" style="margin-top: 10px;">
            <el-row class="book-review-ower" type="flex" justify="space-between">
              <div class="ower-info">
                <el-avatar style="display: inline-flex;" :src="item.userInfoVo.avatar" />
                <span style="margin-left: 5px">{{ item.userInfoVo.name }}</span></div>
              <div>
                <el-rate :value="item.star" disabled />
              </div>
            </el-row>
            <div class="book-review-content">
              {{ item.content }}
            </div>
            <div>发布于{{ item.updateTime }}</div>
            <!--            <div class="book-review-actions">
              <el-button>👍</el-button>
              <el-button>👎🏼</el-button>
              <el-button>51个评论</el-button>
              <el-button>more</el-button>
            </div>-->
          </el-card>
        </div>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getBookComment"
        />
      </div>
      <!--      <el-card
        :body-style="{padding: '0px'}"
        class="bookdetail-layout-main-right hidden-sm-and-down"
      >
        <div slot="header">
          <h2>同类推荐</h2>
        </div>
        <div class="tj_bar">
          <ul id="recBookList">
            <li v-for="recBook in recBookList" :key="recBook.id">
              <router-link v-if="recBook.id!==book.id" tag="a" target="_blank" :to="{name: 'BookDetail', params:{recBookId: recBook.id}}">
                <div class="book_intro">
                  <div class="cover">
                    <img :src="recBook.cover" :alt="recBook.title">
                  </div>
                  <div class="dec">
                    <span class="book_name">{{ recBook.title }}</span>
                    <span href="#" class="txt">{{ recBook.introduction }}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </el-card>-->
      <div id="RelateBookOther" class="wrap_inner wrap_right_cont mb20">
        <div class="title cf">
          <h3 class="on">同类推荐</h3>
          <el-divider />
          <div class="tj_bar">
            <ul id="recBookList">
              <li v-for="recBook in recBookList" :key="recBook.id">
                <router-link
                  v-if="recBook.id != bookId"
                  tag="a"
                  target="_blank"
                  :to="{name: 'BookDetail', params:{bookId: recBook.id}}"
                >
                  <div class="book_intro">
                    <div class="cover">
                      <img :src="recBook.cover" :alt="recBook.title">
                    </div>
                    <div class="dec">
                      <span class="book_name">{{ recBook.title }}</span>
                      <span href="#" class="txt">{{ recBook.introduction }}</span>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getBook, searchBook } from '@/api/book'
import { searchBookComment } from '@/api/comment'
import { searchBookshelf, addBookshelf, editBookshelf, deleteBookshelf } from '@/api/bookshelf'
import { dicts, getDictLabel } from '@/dicts'
import { mapGetters } from 'vuex'

export default {
  filters: {
    getDictLabel: getDictLabel
  },
  components: { Pagination },
  data() {
    return {
      book: null,
      bookshelf: {},
      dicts,
      recBookList: null,

      commentReplyList: null,
      bookCommentList: null,
      listQuery: {
        page: 1,
        limit: 20,
        resourceId: this.$route.params.bookId
      },
      loading: true,
      total: 0
    }
  },
  computed: {
    bookId() {
      return this.$route.params.bookId
    },
    ...mapGetters([
      'id',
      'token'
    ])
  },
  created() {
    console.log(this.bookId)
    if (!this.bookId || isNaN(Number(this.bookId))) {
      this.$router.replace('/404')
    }
    this.loading = true
    getBook(this.bookId).then(response => {
      this.book = response.data
      this.getList()
    })
    this.loading = false
  },
  methods: {
    getList() {
      searchBook({ categoryId: this.book.categoryId }).then(response => {
        this.recBookList = response.data.items
      })
      searchBookshelf({ userId: this.id, bookId: this.bookId }).then(response => {
        const bookshelf = response.data.items[0]
        this.bookshelf = Object.assign({}, bookshelf)
        this.bookshelf.readingProcess = bookshelf ? bookshelf.readingProcess : 0
        if (this.bookshelf.readingProcess < 1) this.$refs['btn_addBookShelf'].$el.innerText = '加入书架'
        else this.$refs['btn_addBookShelf'].$el.innerText = getDictLabel(this.bookshelf.readingProcess, dicts.readingProcess)
      })
      this.getBookComment()
    },
    getBookComment() {
      searchBookComment(this.listQuery).then(response => {
        this.bookCommentList = response.data.items
        this.total = response.data.total
      })
    },
    handleReadingProcess(command) {
      console.log('handleReadingProcess', command)
      delete this.bookshelf.createTime
      delete this.bookshelf.updateTime
      delete this.bookshelf.book

      this.bookshelf.readingProcess = command
      this.bookshelf.bookId = this.bookId
      this.bookshelf.userId = this.id
      if (!this.bookshelf.id) addBookshelf(this.bookshelf)
      else if (command === 4) deleteBookshelf(this.bookshelf.id)
      else editBookshelf(this.bookshelf)
      this.getList()
    }
  }
}
</script>

<style scoped lang="scss">
  ol, ul, li {
    list-style: none outside none
  }

  .wrap_inner {
    padding: 20px;
    border-radius: 6px;
    background: #fff;
    /*border: 1px solid grey;*/
    box-shadow: 1px 5px 5px 5px rgba(0,0,0,0.15);
  }

  /*@import "~@/assets/css/main.css";*/
  @import "~@/assets/css/book.css";
  /*@import "~@/assets/css/base.css";*/

  .bookdetail-layout-header {

  }

  .bookdetail-layout-header-main {

  }

  .bookdeatil-layout-header-side {

  }

  .book-info {
    overflow: auto;

    > * {
      margin-right: 20px;
    }

    .book-info-cover {
      float: left;
    }

    .book-info-detail {
      float: left;
    }

  }

  .book-info-btns-wrap {
    .el-button {
      margin-right: 10px;
    }

  }

  .score-count {

  }

  .bookdetail-layout-main {
    margin-top: 20px;
  }

  .bookdetail-layout-main-left {
    width: 700px;
  }

  .bookdetail-layout-main-right {
  }
</style>
