<template>
  <div class="main box_center cf">
    <!--轮播图 start-->
    <div class="channelWrap channelBanner cf">
      <div class="leftBox">
        <div class="sliderContent">
          <dl id="carouseBig" class="scBigImg">
            <dd v-for="(item, index) in bookSettings.carouselList" :key="item.id" :class="{on: index===carousel.showIndex}"><router-link target="_blank" :to="{name: 'BookDetail', params:{bookId: item.bookId}}"><img :src="item.book.cover" :alt="item.book.title"></router-link></dd>
            <!--            <dd v-if="carousel.showBook" class="on"><router-link :to="{name: 'BookDetail', params:{bookId: carousel.showBook.id}}"><img :src="carousel.showBook.cover" :alt="carousel.showBook.title"></router-link></dd>-->
          </dl>
          <div id="carouseSmall" class="scSmallImg">
            <ul>
              <li v-for="(item, index) in bookSettings.carouselList" :key="item.id" :class="{on: index===carousel.showIndex}" @mouseenter="stop(index)" @mouseleave="start"><img :src="item.book.cover" :alt="item.book.title"> </li>
            </ul>
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
          <ul id="currentWeek">
            <li v-for="(item, index) in bookSettings.weekRecList" :key="item.id" :class="addRankListClass(index)">
              <router-link :to="{name: 'BookDetail', params: {bookId: item.book.id}}">
                <div class="book_name"><i>{{ index+1 }}</i>{{ item.book.title }}</div>
                <div v-if="index===0" class="book_intro">
                  <div class="cover"><img :src="item.book.cover"> </div>
                  <span class="txt">{{ item.book.introduction }}</span>
                </div>
              </router-link>
            </li>
          </ul>
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
        <div id="hotRecBooks" class="picRecommend cf">
          <div v-for="item in bookSettings.hotRecList" :key="item.id" class="itemsList">
            <router-link target="_blank" :to="{name: 'BookDetail', params:{bookId: item.book.id}}">
              <span class="items_img"><img class="lazyload" :src="item.book.cover" :alt="item.book.title"></span>
              <div class="items_txt">
                <h4>{{ item.book.title }}</h4>
                <p class="author">作者：{{ item.book.authorName }}</p>
                <p class="intro">{{ item.book.introduction }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div id="bookrank1_ShowBookRank">
        <div class="rightBox ">
          <div class="title cf">
            <h3 class="on">点击榜单</h3>
          </div>
          <div class="rightList">
            <ul id="clickRankBooks">
              <li v-for="(item, index) in clickRankList" :key="item.id" :class="addRankListClass(index)">
                <router-link target="_blank" :to="{name: 'BookDetail', params: {bookId: item.id}}">
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
        <div id="classicBooks" class="picRecommend cf">
          <div v-for="item in bookSettings.classicList" :key="item.id" class="itemsList">
            <router-link target="_blank" :to="{name: 'BookDetail', params:{bookId: item.book.id}}">
              <span class="items_img"><img class="lazyload" :src="item.book.cover" :alt="item.book.title"></span>
              <div class="items_txt">
                <h4>{{ item.book.title }}</h4>
                <p class="author">作者：{{ item.book.authorName }}</p>
                <p class="intro">{{ item.book.introduction }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div id="bookrank2_ShowBookRank">
        <div class="rightBox ">
          <div class="title cf">
            <h3 class="on">新书榜单</h3>
          </div>
          <div class="rightList">
            <ul id="newRankBooks">
              <li v-for="(item, index) in newRankList" :key="item.id" :class="addRankListClass(index)">
                <router-link target="_blank" :to="{name: 'BookDetail', params: {bookId: item.id}}">
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
                <td class="name"><router-link target="_blank" :to="{name: 'BookDetail', params:{bookId: item.id}}">{{ item.title }}</router-link></td>
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
                <router-link target="_blank" :to="{name: 'BookDetail', params: {bookId: item.id}}">
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
import { getAllBookSetting } from '@/api/bookSetting'
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
      updateRankList: [],
      bookSettings: {
        carouselList: [], // 轮播图
        topList: [], // 顶部小说
        weekRecList: [], // 本周强推
        hotRecList: [], // 热门推荐
        classicList: [] // 精品推荐
      },

      carousel: { // 轮播图相关变量
        showIndex: 0, // 显示第几个图片
        timer: null, // 定时器
        delay: 2000 // 切换时间
      }
    }
  },
  computed: {
  },
  created() {
    this.init()
    this.start()
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
      getAllBookSetting().then(res => {
        this.bookSettings.carouselList = res.data[0]
        this.bookSettings.topList = res.data[1]
        this.bookSettings.weekRecList = res.data[2]
        this.bookSettings.hotRecList = res.data[3]
        this.bookSettings.classicList = res.data[4]
      })
      this.listLoading = false
    },
    addRankListClass(index) {
      const tmpClass = []
      if (index === 0) tmpClass.push('on')
      if (index < 3) tmpClass.push('num' + (index + 1))
      return tmpClass
    },

    // 轮播图 start
    next() {
      if (this.carousel.showIndex >= this.bookSettings.carouselList.length - 1) {
        this.carousel.showIndex = 0
      } else {
        this.carousel.showIndex++
      }
    },
    start() {
      clearInterval(this.carousel.timer)
      this.carousel.timer = setInterval(() => {
        this.next()
      }, this.carousel.delay)
    },
    stop(index) {
      clearInterval(this.carousel.timer)
      this.carousel.showIndex = index
    }
    // 轮播图 end
  }
}
</script>

<style scoped>
  @import "~@/assets/css/main.css";
  @import "~@/assets/css/base.css";
</style>
