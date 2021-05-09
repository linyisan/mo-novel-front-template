<template>
  <div>
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
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
