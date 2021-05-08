<template>
  <div>
    <div class="my_info cf">
      <img id="imgLogo" class="user_big_head" :src="avatar">
      <div class="my_info_txt">
        <p id="my_name" class="my_name" />
      </div>
    </div>
    <div class="my_bookshelf">
      <div class="title cf">
        <h4 class="fl">
          我的书架</h4>
        <a href="/user/favorites.html" class="fr">全部收藏 &gt;</a>
      </div>
      <div class="updateTable">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  }
}
</script>

<style scoped>

</style>
