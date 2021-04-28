<template>
  <div class="read_style_1" oncontextmenu="return false" onselectstart="return false">
    小说内容页
    <div class="readBody cf">
      <div class="readMain cf">
        <div class="read_menu">
          <div class="menu_left">
            <ul>
              <li><a class="ico_catalog" href="/book/indexList-1382646040489963520.html" title="目录">
                <b>目录</b></a></li>
              <li><a class="ico_page" href="/book/1382646040489963520.html" title="返回书页"><b>书页</b></a></li>
              <li id="cFavs" class="li_shelf"><a class="ico_shelf" href="javascript:void(0);"><b>已收藏</b></a></li>
              <li class="li_shelfed" style="display: none;"><a class="ico_shelfed" href="javascript:void(0);" title="已收藏"><b>已收藏</b></a>
              </li>

              <li><a class="ico_comment" href="/book/comment-1382646040489963520.html" title="评论">
                <b>评论</b></a></li>
              <li><a class="ico_setup" href="javascript:void(0);" title="设置"><b>设置</b></a></li>
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
            <a href="/">首页 </a>&gt; <a href="/book/bookclass.html?c=5">科幻灵异</a>&gt; <a
            href="/book/1382646040489963520.html"
          >大灾变时代</a>
          </div>
          <div id="readcontent">
            <div class="textbox cf">

              <div class="book_title">
                <h1>第一卷 黎明学府 第五十九章 变样的江东市</h1>
                <div class="textinfo">
                  类别：<a href="/book/bookclass.html?c=5">科幻灵异</a>
                  作者：<a href="javascript:searchByK('团猪')">团猪</a><span>字数：4028</span><span>更新时间：21/04/15 18:44:39</span>
                </div>
              </div>

              <div class="txtwrap">
                <div id="showReading" class="readBox" style="font-size: 16px; font-family: microsoft yahei">小说主体</div>

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
  </div>
</template>

<script>
// import BookDetail from 'src/assets/js/bookdetail.js'

export default {
  data() {
    return {
      bookId: null, // book.id
      bookName: null, // book.booName
      preIndexName: null, // bookIndex.indexName 当前章节名
      preContentId: null, // bookIndex.id 当前章节内容ID
      preIndexId: null, // preBookIndexId 上一章节ID
      nextIndexId: null // nextBookIndexId 下一章节ID
    }
  }
}
</script>
<style scoped>
  @import "~@/assets/css/base.css";
  @import "~@/assets/css/book.css";
</style>
