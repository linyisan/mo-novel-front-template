<template>
  <div class="channelWrap channelBanner cf box_center">
    <el-card class="listWrapper" v-for="item in list" :key="item.id">
      <router-link target="_blank" :to="{name: 'BookDetail', params:{bookId: item.id}}">
        <span class="book-cover"><img class="lazyload" :src="item.cover" :alt="item.title"></span>
        <div class="book-txt">
          <h2 style="font-size: 15px;">{{ item.title }}</h2>
          <p class="tit">作者：{{ item.authorName }}</p>
          <p class="tit">{{ item.introduction }}</p>
        </div>
      </router-link>
    </el-card>
  </div>
</template>

<script>
import { dicts, getDictLabel } from '@/dicts'
import { recommandByCategoriesPercent } from '@/api/bookshelf'
import { mapGetters } from 'vuex'
export default {
  filters: {
    getDictLabel: getDictLabel
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  data() {
    return {
      dicts,
      listLoading: true,
      list: [],
      total: 0
    }
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
      recommandByCategoriesPercent(this.id).then(res => {
        this.list = res.data.items
        this.total = res.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/css/base.css";
  @import "~@/assets/css/main.css";
  .listWrapper { padding: 17px 0; margin-bottom: 10px; }
  .book-cover { float: left; margin-right: 14px; border-radius: 14px; }
  .lazyload { height: 150px; }
  /*.book-txt { float: left; !*padding-right: 20px;*! }*/
  .book-txt {
    .tit {
      margin-bottom: 10px;
      font-family: "Microsoft YaHei";
      font-size: 13px;
    }
  }
</style>
