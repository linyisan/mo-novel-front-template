<template>
  <div class="my_bookshelf">
    <div class="title cf">
      <h2 class="fl"><a href="javascript:void(0);" class="red">我的书架</a></h2><i class="fl ml20 mr20 font16">|</i><h2 class="fl"><a href="/user/read_history.html">最近阅读</a></h2>
    </div>

    <div id="divData" class="updateTable">
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th class="style">
              类别
            </th>
            <th class="name">
              书名
            </th>
            <th class="chapter">
              最新章节
            </th>
            <th class="time">
              更新时间
            </th>
            <th class="goread">
              书签
            </th>
          </tr>
        </thead>
        <tbody id="bookShelfList" />
      </table>
      <div id="shellPage" class="pageBox cf" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
