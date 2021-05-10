<template>
  <div :class="'read_style_' + readingSetting.readStyleId" oncontextmenu="return false" onselectstart="return false">
    <div class="readBody cf">
      <div class="readMain cf">
        <div class="read_menu">
          <div class="menu_left">
            <ul>
              <li><router-link class="ico_catalog" tag="a" :to="{name: 'BookIndex', params:{bookId: listQuery.bookId}}" title="目录"><b>目录</b></router-link></li>
              <li><router-link tag="a" class="ico_page" :to="{name: 'BookDetail', params: {bookId: listQuery.bookId}}" title="返回详情页"><b>详情页</b></router-link></li>
              <li id="cFavs" class="li_shelf"><a class="ico_shelf" href="javascript:void(0);"><b>已收藏</b></a></li>
              <li class="li_shelfed" style="display: none;"><a class="ico_shelfed" href="javascript:void(0);" title="已收藏"><b>已收藏</b></a>
              </li>

              <li><a class="ico_comment" href="/book/comment-1382646040489963520.html" title="评论">
                <b>评论</b></a></li>
              <li><a class="ico_setup" title="设置" @click="handleSetting"><b>设置</b></a></li>
            </ul>
          </div>
          <div class="menu_right" style="position: fixed; bottom: 0">
            <ul>
              <li><a
                class="ico_pagePrev"
                href="javascript:enterPreIndexPage('1382646040489963520','1382646084207194112');"
                title="上一章"
              ><i>上一章</i></a></li>
              <li><a
                class="ico_pageNext"
                href="javascript:enterNextIndexPage('1382646040489963520','1382646085612285952');"
                title="下一章"
              ><i>下一章</i></a></li>
            </ul>
          </div>
        </div>
        <div class="readWrap">
          <div class="bookNav">
            <!--TODO: GET方式-->
            <router-link to="/">首页 > </router-link>
            <router-link to="#">{{ book.categoryId | getDictLabel(dicts.categoryMap) }} > </router-link>
            <router-link :to="{name: 'BookDetail', params: {bookId: listQuery.bookId}}">{{ book.title }}</router-link>
          </div>
          <div id="readcontent">
            <div class="textbox cf">

              <div class="book_title">
                <h1>{{ bookIndex.title }}</h1>
                <div class="textinfo">
                  类别：<router-link to="#">{{ book.categoryId | getDictLabel(dicts.categoryMap) }}</router-link>
                  作者：<router-link to="#">{{ book.authorName }}</router-link>
                  字数：<span>{{ book.wordCount }}</span>
                  更新时间：<span>{{ bookIndex.updateTime }}</span>
                </div>
              </div>

              <div class="txtwrap">
                <div
                  id="showReading"
                  class="readBox"
                  :style="{fontFamily: readingSetting.fontFamily, fontSize: readingSetting.fontSize + 'px'}"
                  v-html="bookIndex.content"
                />

              </div>

            </div>
          </div>
          <div class="nextPageBox">
            <a class="prev" href="javascript:enterPreIndexPage('1382646040489963520','1382646084207194112');">上一章</a> <a
              class="dir"
              href="/book/indexList-1382646040489963520.html"
            >目录</a> <a
              class="next"
              href="javascript:enterNextIndexPage('1382646040489963520','1382646085612285952');"
            >下一章</a>
          </div>
        </div>
      </div>
    </div>
    <reading-setting :visible.sync="dialogFormVisible" :temp-form-data="readingSetting" />
  </div>
</template>

<script>
import { dicts, getDictLabel } from '@/dicts'
import { getBookIndex } from '@/api/bookIndex'
import { getBook } from '@/api/book'
import ReadingSetting from '@/views/bookcontent/components/ReadingSetting'
import { mapGetters } from 'vuex'

export default {
  components: { ReadingSetting },
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      book: {},
      bookId: null, // book.id
      bookName: null, // book.booName
      preIndexName: null, // bookIndex.indexName 当前章节名
      preContentId: null, // bookIndex.id 当前章节内容ID
      preIndexId: null, // preBookIndexId 上一章节ID
      nextIndexId: null, // nextBookIndexId 下一章节ID

      dialogFormVisible: false,

      listLoading: true,
      listQuery: {
        bookId: this.$route.params.bookId,
        bookIndexId: this.$route.params.bookIndexId
      },
      bookIndex: {},
      dicts
    }
  },
  computed: {
    ...mapGetters([
      'readingSetting'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData() {
      this.listLoading = true
      getBookIndex(this.listQuery.bookIndexId).then(res => {
        this.listLoading = false
        this.bookIndex = Object.assign({}, res.data)
        if (this.bookIndex.content) {
          this.bookIndex.content = this.bookIndex.content.replaceAll('    ', '&emsp;')
          this.bookIndex.content = this.bookIndex.content.replaceAll('\r\n', '<br>')
        }
      })
      getBook(this.listQuery.bookId).then(res => {
        this.listLoading = false
        this.book = Object.assign({}, res.data)
      })
    },
    handleSetting() {
      this.dialogFormVisible = true
    }
  }
}
</script>
<style scoped>
  @import "~@/assets/css/base.css";
  @import "~@/assets/css/book.css";
  @import "~@/assets/css/read.css";
</style>
