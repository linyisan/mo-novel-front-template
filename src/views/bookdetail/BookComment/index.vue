<template>
  <div>
    <div class="pad20">
      <div class="bookComment">
        <div class="book_tit">
          <div class="fl">
            <h3>作品评论区</h3><span id="bookCommentTotal">(0条)</span>
          </div>
          <a class="fr" href="#txtComment">发表评论</a>
        </div>
        <div v-if="total<=0" id="noCommentPanel" class="no_comment"> <!--style="display: none;"-->
          <el-image :src="require('@/assets/images/no_comment.png')" />
          <span class="block">暂无评论</span>
        </div>
        <div id="commentPanel" class="commentBar" />

        <!--无评论时此处隐藏-->
        <div v-if="total>0" id="moreCommentPanel" class="more_bar">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0
    }
  }
}
</script>

<style scoped>
  @import "~@/assets/css/main.css";
  @import "~@/assets/css/book.css";
  @import "~@/assets/css/base.css";
</style>
