<template>
  <el-main v-if="book" v-loading="loading">
    <div class="main box_center cf mb50">
      <!--      <h1>当前bookId:{{ $route.params.bookId }}</h1>-->
      <div class="nav_sub">
        > {{ book.categoryId | getDictLabel(dicts.categoryMap) }} > {{ book.title }}
        <!--        <a href="/" th:text="${application.website.name}"></a>&gt;<a th:href="'/book/bookclass.html?c='+${book.catId}" th:text="${book.catName}"></a>&gt;<a-->
        <!--        th:href="'/book/'+${book.id}+'.html'" th:utext="${book.bookName}"></a>-->
      </div>
      <div class="channelWrap channelBookInfo cf">
        <div class="bookCover cf">
          <a href="https://qidian.qpic.cn/qdbimg/349573/1010868264/300" class="book_cover">
            <el-image class="cover" :src="book.cover" :alt="book.title" /></a>
          <div class="book_info">
            <div class="tit">
              <h1>{{ book.title }}</h1><!--<i class="vip_b">VIP</i>-->
              <a class="author">{{ book.authorName }} 著</a>
            </div>
            <ul class="list">
              <li><span class="item">类别：{{ book.categoryId | getDictLabel(dicts.categoryMap) }}</span>
                <span class="item">状态： {{ book.status | getDictLabel(dicts.bookStatusMap) }}</span>
                <span class="item">总点击：{{ book.visitCount }}</span>
                <span class="item">总字数：{{ book.wordCount }}</span>
                <span style="font-weight: 800;font-size: 20px;">评分：{{ book.score }}</span>
              </li>
            </ul>
            <div class="intro_txt">
              <p>
                {{ book.introduction }}
                <a class="icon_hide" href="javascript:void(0)" onclick=""><i />收起</a>
                <a class="icon_show" href="javascript:void(0)" onclick=""><i />展开</a>
              </p></div>
            <div id="optBtn" class="btns">
              <a href="bookcontent" class="btn_ora">点击阅读</a>
              <el-dropdown trigger="click" @command="handleReadingProcess">
                <el-button ref="btn_addBookShelf" type="primary" round>
                  加入书架<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in dicts.readingProcess" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
                  <el-dropdown-item v-show="bookshelf.readingProcess>0" key="4" :command="4" divided>取消收藏</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>

      <div class="channelBookContent cf">
        <!--left start-->
        <div class="wrap_left fl">
          <div class="wrap_bg">

            <!--章节目录 start-->
            <div v-if="book.lastBookIndex!=null" class="pad20_nobt">
              <div class="bookChapter">
                <div class="book_tit">
                  <div class="fl">
                    <h3>最新章节</h3><span id="bookIndexCount" /></div>
                  <router-link class="fr" :to="{name: 'BookIndex', params:{bookId: bookId}}">全部目录</router-link>
                </div>
                <ul class="list cf">
                  <li>
                    <span class="fl font16">
                      <router-link v-if="book.lastBookIndex!=null" target="_blank" :to="{name: 'BookContent', params: {bookId: book.id, bookIndexId: book.lastBookIndex.id}}">{{ book.lastBookIndex.title }}</router-link>
                      <span v-else>无</span>
                    </span>
                    <span class="black9 fr">更新时间：{{ book.lastBookIndex.createTime }}</span>
                  </li>
                  <li id="lastBookContent" class="zj_yl" />
                  <!--此处是该章节预览，截取最前面的42个字-->
                </ul>
              </div>
            </div>
            <!--章节目录 end-->

            <!--作品评论区 start-->
            <BookComment :book-id="bookId" />
            <!--            <book-comment2/>-->
            <!--作品评论区 end-->

          </div>
        </div>
        <!--left end-->

        <!--right start-->
        <div class="wrap_right fr">

          <!--          <script src="/javascript/authorinfo.js?uid=8" type="text/javascript" />
          <script type="text/javascript">
            var authorUId = 8;
            if (authorUId == 0) {
            $("#authorPanel").hide();
            } else {
            }
          </script>-->

          <div id="RelateBookOther" class="wrap_inner wrap_right_cont mb20">
            <div class="title cf">
              <h3 class="on">同类推荐</h3>
            </div>
            <div class="tj_bar">
              <ul id="recBookList">
                <li v-for="book in recBookList" :key="book.id">
                  <router-link tag="a" target="_blank" :to="{name: 'BookDetail', params:{bookId: book.id}}">
                    <div class="book_intro">
                      <div class="cover">
                        <img :src="book.cover" :alt="book.title">
                      </div>
                      <div class="dec">
                        <span class="book_name">{{ book.title }}</span>
                        <span href="#" class="txt">{{ book.introduction }}</span>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--right end-->
      </div>
    </div>
  </el-main>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { getBook, searchBook } from '@/api/book'
import { searchBookshelf, addBookshelf, editBookshelf, deleteBookshelf } from '@/api/bookshelf'
import { dicts, getDictLabel } from '@/dicts'
import BookComment from './BookComment'
import BookComment2 from './BookComment2'
import { mapGetters } from 'vuex'

export default {
  filters: {
    getDictLabel: getDictLabel
  },
  components: { BookComment, BookComment2 },
  data() {
    return {
      loading: true,
      book: null,
      bookshelf: {},
      dicts,
      recBookList: null,
      commentReplyList: null,
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
      this.$refs['btn_addBookShelf'].$el.innerText = '加入书架'
      searchBookshelf({ userId: this.id, bookId: this.bookId }).then(response => {
        const bookshelf = response.data.items[0]
        this.bookshelf = Object.assign({}, bookshelf)
        this.bookshelf.readingProcess = bookshelf ? bookshelf.readingProcess : 0
        if (this.bookshelf.readingProcess < 1) this.$refs['btn_addBookShelf'].$el.innerText = '加入书架'
        else this.$refs['btn_addBookShelf'].$el.innerText = getDictLabel(this.bookshelf.readingProcess, dicts.readingProcess)
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
      let message = ''
      if (!this.bookshelf.id) {
        addBookshelf(this.bookshelf).then(_ => { message = '加入书架成功' })
      } else if (command === 4) deleteBookshelf(this.bookshelf.id).then(_ => { message = '取消收藏成功' })
      else editBookshelf(this.bookshelf).then(_ => { message = '修改阅读进度成功' })

      this.$nextTick(_ => {
        this.$notify({
          title: 'Success',
          message: message,
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped>
  @import "~@/assets/css/main.css";
  @import "~@/assets/css/book.css";
  @import "~@/assets/css/base.css";

  .bookdetail-layout-header {

  }

  .bookdetail-layout-header-main {

  }

  .bookdeatil-layout-header-side {

  }

  .book-info {

  }

  .book-info-btns-wrap {

  }

  .score-count {

  }

  .bookdetail-layout-main-left {
    width: 700px;
  }
</style>
