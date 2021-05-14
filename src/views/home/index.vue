<template>
  <div class="main box_center cf">
    <!--轮播图 start-->
    <div class="channelWrap channelBanner cf">
      <div class="leftBox">
        <div class="sliderContent">
          <dl id="carouseBig" class="scBigImg" />
          <div id="carouseSmall" class="scSmallImg">
            <ul />
          </div>
        </div>
        <div class="hot_articles">
          <dl id="topBooks1" class="hot_recommend" />
          <dl id="topBooks2" class="hot_recommend" />
          <dl id="indexNews" class="hot_notice" />
        </div>
      </div>
      <div class="rightBox">
        <div id="weekcommend" class="title cf">
          <h3>本周强推</h3>
        </div>
        <div class="rightList">
          <ul id="currentWeek" />
        </div>
      </div>
    </div>
    <!--轮播图 end-->

    <!--点击 start-->
    <div class="channelWrap channelPic cf">
      <div class="leftBox">
        <div class="title">
          <h2 class="on">热门推荐</h2>
        </div>
        <div id="hotRecBooks" class="picRecommend cf" />
      </div>
      <div id="bookrank1_ShowBookRank">
        <div class="rightBox ">
          <div class="title cf">
            <h3 class="on">点击榜单</h3>
          </div>
          <div class="rightList">
            <ul id="clickRankBooks">
              <li v-for="(item, index) in clickRankList" :key="item.id" :class="addRankListClass(index)">
                <router-link :to="{name: 'BookDetail', params: {bookId: item.id}}">
                  <div class="book_name"><i>{{ index+1 }}</i>{{ item.title }}</div>
                  <div v-if="index===0" class="book_intro">
                    <div class="cover"><img :src="item.cover"> </div>
                    <span class="txt">{{ item.introduction }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <!--            <div class="more"><a href="/book/book_ranking.html">查看更多&gt;</a></div>-->
          </div>
        </div>
      </div>
    </div>
    <!--点击 end-->

    <!--新书 start-->
    <div class="channelWrap channelPic cf">
      <div class="leftBox">
        <div class="title">
          <h2>精品推荐</h2>
        </div>
        <div id="classicBooks" class="picRecommend cf" />
      </div>
      <div id="bookrank2_ShowBookRank">
        <div class="rightBox ">
          <div class="title cf">
            <h3 class="on">新书榜单</h3>
          </div>
          <div class="rightList">
            <ul id="newRankBooks">
              <li v-for="(item, index) in newRankList" :key="item.id" :class="addRankListClass(index)">
                <router-link :to="{name: 'BookDetail', params: {bookId: item.id}}">
                  <div class="book_name"><i>{{ index+1 }}</i>{{ item.title }}</div>
                  <div v-if="index===0" class="book_intro">
                    <div class="cover"><img :src="item.cover"> </div>
                    <span class="txt">{{ item.introduction }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <!--            <div class="more"><a href="/book/book_ranking.html?type=1">查看更多&gt;</a></div>-->
          </div>
        </div>
      </div>
    </div>
    <!--新书 end-->

    <!--更新 start-->
    <div class="channelWrap channelTable cf">
      <div class="leftBox">
        <div class="title">
          <h2>最新更新</h2>
        </div>
        <div class="updateTable">
          <table cellpadding="0" cellspacing="0">
            <thead>
              <tr>
                <th class="style">类别</th>
                <th class="name">书名</th>
                <th class="chapter">最新章节</th>
                <th class="author">作者</th>
                <th class="time">更新时间</th>
              </tr>
            </thead>
            <tbody id="newRankBooks2">
              <tr v-for="item in updateRankList" :key="item.id">
                <td class="style">[{{ item.categoryId | getDictLabel(dicts.categoryMap) }}]</td>
                <td class="name"><router-link :to="{name: 'BookDetail', params:{bookId: item.id}}">{{ item.title }}</router-link></td>
                <td class="chapter">
                  <span v-if="!item.lastBookIndex">无</span>
                  <router-link v-else :to="{name: 'BookContent', params:{bookId: item.id, bookIndexId: item.lastBookIndex.id}}">{{ item.lastBookIndex.title }}</router-link>
                </td>
                <td class="author">{{ item.authorName }}</td>
                <td class="time">{{ item.updateTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="bookrank5_ShowBookRank">
        <div class="rightBox mb20">
          <div class="title cf">
            <h3 class="on">更新榜单</h3>
          </div>
          <div class="rightList">
            <ul id="updateRankBooks">
              <li v-for="(item, index) in updateRankList" :key="item.id" :class="addRankListClass(index)">
                <router-link :to="{name: 'BookDetail', params: {bookId: item.id}}">
                  <div class="book_name"><i>{{ index+1 }}</i>{{ item.title }}</div>
                  <div v-if="index===0" class="book_intro">
                    <div class="cover"><img :src="item.cover"> </div>
                    <span class="txt">{{ item.introduction }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <!--            <div class="more"><a href="/book/book_ranking.html?type=2">查看更多&gt;</a></div>-->
          </div>
        </div>
      </div>
      <!--更新 end-->
    </div>
  </div>
</template>

<script>
import { listClickRank, listNewRank, listUpdateRank } from '@/api/book'
import { dicts, getDictLabel } from '@/dicts'

export default {
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      dicts,
      listLoading: true,
      clickRankList: [],
      newRankList: [],
      updateRankList: []
    }
  },
  computed: {
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
      listClickRank().then(res => {
        this.clickRankList = res.data
      })
      listNewRank().then(res => {
        this.newRankList = res.data
      })
      listUpdateRank().then(res => {
        this.updateRankList = res.data
      })
      this.listLoading = false
    },
    addRankListClass(index) {
      const tmpClass = []
      if (index === 0) tmpClass.push('on')
      if (index < 3) tmpClass.push('num' + (index + 1))
      return tmpClass
    }
  }
}
</script>

<style scoped>
  @import "~@/assets/css/main.css";
  @import "~@/assets/css/base.css";
</style>
