<template>
  <div class="main box_center cf">
    <!--小说筛选区 start-->
    <div class="channelWrap classTable cf">
      <div class="so_tag">
        <ul class="list">
          <li id="workDirection" class="so_pd">
            <filteritem
              label="作品频道"
              first-item-text="不限"
              :list="channelMap"
              @change="function(mvalue){listQuery.channel=mvalue; handleFilter()}"
            />
            <!--            <span class="tit">作品频道：</span>
            <a filter-value="0" href="javascript:listBookCategory();search(1,20)" class="on">男频</a>
            <a filter-value="1" href="javascript:listBookCategory();search(1,20)">女频</a>-->
          </li>
          <li id="idGirl" class="so_class">
            <filteritem
              label="作品分类"
              first-item-text="不限"
              :list="categoryMap"
              @change="function(mvalue){listQuery.categoryId=mvalue; handleFilter()}"
            />
            <!--            <span class="tit">作品分类：</span>
            <span id="girlCategoryList" class="so_girl" style="display: none;" />
            <span id="boyCategoryList" class="so_boy" />-->
          </li>
          <!-- <li class="so_free">
               <span class="tit">是否免费：</span>
               <a href="?b=0&s=0&wb=0&wd=0&up=0&fr=0&so=0&ms=2" class="on">不限</a>
               <a href="?b=0&s=0&wb=0&wd=0&up=0&fr=1&so=0&ms=2" class="">免费作品</a>
               <a href="?b=0&s=0&wb=0&wd=0&up=0&fr=2&so=0&ms=2" class="">收费作品</a>
           </li>-->
          <li class="so_progress">
            <filteritem
              label="是否完结"
              first-item-text="不限"
              :list="bookStatusMap"
              @change="function(mvalue){listQuery.bookStatus=mvalue; handleFilter()}"
            />
            <!--            <span class="tit">是否完结：</span>
            <a href="javascript:search(1,20)" class="on">不限</a>
            <a filter-value="0" href="javascript:search(1,20)" class="">连载中</a>
            <a filter-value="1" href="javascript:search(1,20)" class="">已完结</a>-->
          </li>
          <li class="so_words">
            <filteritem label="作品字数" first-item-text="不限" :list="wordCountMap" @change="mchange" />
            <!--            <span class="tit">作品字数：</span>
            <a href="javascript:search(1,20)" class="on">不限</a>
            <a filter-value-max="300000" href="javascript:search(1,20)" class="">30万字以下</a>
            <a filter-value-min="300000" filter-value-max="500000" href="javascript:search(1,20)" class="">30-50万字</a>
            <a filter-value-min="500000" filter-value-max="1000000" href="javascript:search(1,20)" class="">50-100万字</a>
            <a filter-value-min="1000000" href="javascript:search(1,20)" class="">100万字以上</a>-->
          </li>
          <li class="so_update">
            <filteritem
              label="更新时间"
              first-item-text="不限"
              :list="updatePeriodMap"
              @change="function(mValue){listQuery.updatePeriodMap=mValue; handleFilter()}"
            />
            <!--            <span class="tit">更新时间：</span>
            <a href="javascript:search(1,20)" class="on">不限</a>
            <a filter-value="3" href="javascript:search(1,20)" class="">三日内</a>
            <a filter-value="7" href="javascript:search(1,20)" class="">七日内</a>
            <a filter-value="15" href="javascript:search(1,20)" class="">半月内</a>
            <a filter-value="30" href="javascript:search(1,20)" class="">一月内</a>-->
          </li>
          <li class="so_sort">
            <filteritem
              label="更新时间"
              first-item-text="不限"
              :list="sortMap"
              @change="function(mvalue){listQuery.sort=mvalue; handleFilter()}"
            />
            <!--            <span class="tit">排序方式：</span>
            <a href="javascript:search(1,20)" class="on">不限</a>
            <a filter-value="last_index_update_time" href="javascript:search(1,20)" class="">更新时间</a>
            <a filter-value="word_count" href="javascript:search(1,20)" class="">总字数</a>
            <a filter-value="visit_count" href="javascript:search(1,20)" class="">点击量</a>-->
          </li>
        </ul>
      </div>

    </div>
    <!--小说筛选区 end-->

    <!--小说展示区 start-->
    <div class="channelWrap channelClassContent cf">
      <div class="updateTable rankTable">
        <!--        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th class="rank">序号</th>
              <th class="style">类别</th>
              <th class="name">书名</th>
              <th class="chapter">最新章节</th>
              <th class="author">作者</th>
              <th class="word">字数</th>
            </tr>
          </thead>
          <tbody id="bookList" />
        </table>-->

        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column label="序号">
            <template slot-scope="scope">
              <!--              <span class="rank">{{ scope.row.id }}</span>-->
              <el-tag type="info">{{ scope.row.id }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="类别">
            <template slot-scope="scope">
              <span>{{ scope.row.categoryId }}</span>
            </template>
          </el-table-column>

          <el-table-column label="书名">
            <template slot-scope="scope">
              <router-link :to="{name: 'MBookDetail', params:{bookId: scope.row.id}}">{{ scope.row.title }}</router-link>
            </template>
          </el-table-column>

          <el-table-column label="最新章节">
            <template slot-scope="scope">
              <span>第x章</span>
            </template>
          </el-table-column>

          <el-table-column label="作者">
            <template slot-scope="scope">
              <span>{{ scope.row.authorName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="字数">
            <template slot-scope="scope">
              <span>{{ scope.row.wordCount }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div id="books" class="pageBox cf" />
      </div>
    </div>
    <!--小说展示区 end-->
  </div>
</template>

<script>
import { fetchList as bookfetchList } from '@/api/book'
import { fetchList as categoryfetList } from '@/api/category'
import Filteritem from '@/components/Filteritem'

export default {
  components: {
    Filteritem
  },
  /*  filters: {
      categoryFilter(value) {
        // arr to obj, such as { CN : "China", US : "USA" }
        const keyValue = this.categoryMap.reduce((acc, cur) => {
          acc[cur.value] = cur.label
          return acc
        }, {})
        return keyValue[value]
      }
    },*/
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        // keyword: null,
        channel: null,
        categoryId: null,
        bookStatus: null,
        wordCountMin: null,
        wordCountMax: null,
        // updateTimeMin: null,
        updatePeriod: null,
        sort: null
      },
      categoryMap: [],
      channelMap: [{ label: '男频', value: '0' }, { label: '女频', value: '1' }],
      bookStatusMap: [{ label: '连载中', value: '1' }, { label: '已完结', value: '2' }],
      wordCountMap: [{ label: '30万字以下', value: JSON.stringify({ 'wordCountMin': 300000, 'wordCountMax': null }) },
        { label: '30-50万字', value: JSON.stringify({ 'wordCountMin': 300000, 'wordCountMax': 500000 }) },
        { label: '50-100万字', value: JSON.stringify({ 'wordCountMin': 500000, 'wordCountMax': 1000000 }) },
        { label: '100万字以上', value: JSON.stringify({ 'wordCountMin': null, 'wordCountMax': 1000000 }) }
      ],
      updatePeriodMap: [
        { label: '三日内', value: '3' },
        { label: '七日内', value: '7' },
        { label: '半月内', value: '15' },
        { label: '一月内', value: '30' }
      ],
      sortMap: [
        { label: '更新时间', value: 'updateTime' },
        { label: '总字数', value: 'wordCount' },
        { label: '点击量', value: 'visitCount' }
      ]
    }
  },
  created() {
    this.fetchData()
    categoryfetList().then(response => {
      this.categoryMap = []
      response.data.items.forEach(item => {
        this.categoryMap.push({ value: item.id, label: item.name })
      })
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      bookfetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      /*      categoryfetList().then(response => {
          this.categoryMap = []
          response.data.items.forEach(item => {
            this.categoryMap.push({ value: item.id, label: item.name })
          })
        })*/

      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    mchange(mvalue) {
      if (!mvalue) {
        this.listQuery.wordCountMin = null
        this.listQuery.wordCountMax = null
      } else {
        var obj_mvalue = JSON.parse(mvalue)
        this.listQuery.wordCountMin = obj_mvalue ? obj_mvalue.wordCountMin : null
        this.listQuery.wordCountMax = obj_mvalue ? obj_mvalue.wordCountMax : null
      }
      this.handleFilter
    }
  }
}
</script>

<style scoped>
  @import "~@/assets/css/main.css";
  @import "~@/assets/css/base.css";
</style>
