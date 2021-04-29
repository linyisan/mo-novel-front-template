<template>
  <el-main v-if="book" v-loading="loading">
    <div class="main box_center cf mb50">
      <h1>当前bookId:{{ $route.params.bookId }}</h1>
      <div class="nav_sub">
        > {{ book.categoryId }} > {{ book.title }}
        <!--        <a href="/" th:text="${application.website.name}"></a>&gt;<a th:href="'/book/bookclass.html?c='+${book.catId}" th:text="${book.catName}"></a>&gt;<a-->
        <!--        th:href="'/book/'+${book.id}+'.html'" th:utext="${book.bookName}"></a>-->
      </div>
      <div class="channelWrap channelBookInfo cf">
        <div class="bookCover cf">
          <a href="https://qidian.qpic.cn/qdbimg/349573/1010868264/300" class="book_cover"><img
            class="cover"
            src="https://qidian.qpic.cn/qdbimg/349573/1010868264/300"
            alt="闺蜜之主"
          ></a>
          <div class="book_info">
            <div class="tit">
              <h1>{{ book.title }}</h1><!--<i class="vip_b">VIP</i>-->
              <a class="author">{{ book.authorName }} 著</a>
            </div>
            <ul class="list">
              <li><span class="item">类别：{{ book.categoryId }}</span>
                <span class="item">状态： {{ book.status }}</span>
                <span class="item">总点击：{{ book.visitCount }}</span>
                <span class="item">总字数：{{ book.wordCount }}</span></li>
            </ul>
            <div class="intro_txt">
              <p>
                {{ book.introduction }}
                <a class="icon_hide" href="javascript:void(0)" onclick=""><i />收起</a>
                <a class="icon_show" href="javascript:void(0)" onclick=""><i />展开</a>
              </p></div>
            <div id="optBtn" class="btns">
              <a href="bookcontent" class="btn_ora">点击阅读</a>
              <span id="cFavs"><a
                href="javascript:void(0);"
                class="btn_ora_white btn_addsj"
                onclick="javascript:BookDetail.AddFavorites(37,0,0);"
              >加入书架</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="channelBookContent cf">
        <!--left start-->
        <div class="wrap_left fl">
          <div class="wrap_bg">

            <!--章节目录 start-->
            <!--<div class="pad20_nobt">
              <div class="bookChapter">
                <div class="book_tit">
                  <div class="fl">
                    <h3>最新章节</h3><span id="bookIndexCount">(0章)</span></div>
                  <a class="fr" th:href="'/book/indexList-'+${book.id}+'.html'">全部目录</a>
                </div>
                <ul class="list cf">
                  <li>
                    <span class="fl font16"> <a
                      th:href="'/book/'+${book.id}+'/'+${book.lastIndexId}+'.html'"
                      th:utext="${book.lastIndexName}"
                    >&lt;!&ndash;<i class="vip">VIP</i>&ndash;&gt;</a></span>
                    <span
                      class="black9 fr"
                      th:text="'更新时间：'+${#dates.format(book.lastIndexUpdateTime, 'yy/MM/dd HH:mm:ss')}"
                    />
                  </li>
                  <li id="lastBookContent" class="zj_yl" />
                  &lt;!&ndash;此处是该章节预览，截取最前面的42个字&ndash;&gt;
                </ul>
              </div>
            </div>-->
            <!--章节目录 end-->

            <!--作品评论区 start-->
            <div class="pad20">
              <div class="bookComment">
                <div class="book_tit">
                  <div class="fl">
                    <h3>作品评论区</h3><span id="bookCommentTotal">(0条)</span>
                  </div>
                  <a class="fr" href="#txtComment">发表评论</a>
                </div>
                <div id="noCommentPanel" class="no_comment" style="display: none;">
                  <img src="/images/no_comment.png" alt="">
                  <span class="block">暂无评论</span>
                </div>
                <div id="commentPanel" class="commentBar" />

                <!--无评论时此处隐藏-->
                <div id="moreCommentPanel" class="more_bar">
                  <a href="'/book/comment-'+${book.id}+'.html'">查看全部评论&gt;</a>
                </div>

                <div id="reply_bar" class="reply_bar">
                  <div class="tit">
                    <span class="fl font16">发表评论</span>
                    <!--未登录状态下不可发表评论，显示以下链接-->
                    <span class="fr black9" style="display:none; ">请先 <a
                      class="orange"
                      href="/user/login.html"
                    >登录</a><em
                      class="ml10 mr10"
                    >|</em><a
                      class="orange"
                      href="/user/register.html"
                    >注册</a></span>
                  </div>
                  <textarea
                    id="txtComment"
                    name="txtComment"
                    rows="2"
                    cols="20"
                    class="replay_text"
                    placeholder="我来说两句..."
                  />
                  <div class="reply_btn">
                    <span class="fl black9"><em id="emCommentNum" class="ml5">0/1000</em> 字</span>
                    <span class="fr"><a
                      class="btn_ora"
                      href="javascript:void(0);"
                      onclick="javascript:BookDetail.SaveComment(37,0,$('#txtComment').val());"
                    >发表</a></span>
                  </div>
                </div>

              </div>
            </div>
            <!--            <pagination />-->
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
              <ul id="recBookList" />
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
import { fetchBook } from '@/api/book'

export default {
  // components: { Pagination },
  data() {
    return {
      loading: true,
      book: null
    }
  },
  computed: {
    bookId() {
      return this.$route.params.bookId
    }
  },
  created() {
    console.log(this.bookId)
    if (!this.bookId || isNaN(Number(this.bookId))) {
      this.$router.replace('/404')
    }
    this.loading = true
    fetchBook(this.bookId).then(response => {
      this.book = response.data
    })
    this.getList()
    this.loading = false
  },
  methods: {
    getList() {
      this.listLoading = false
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
      // }
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
