<template>
  <div>
    <el-row type="flex" justify="center" class="bookdetail-layout-header">
      <div class="bookdetail-layout-header-main">
        <div class="book-info">
          <div class="book-info-cover"><img
            src="https://qidian.qpic.cn/qdbimg/349573/1010868264/300"
            alt="小说封面"
            style="width: 150px; height: 200px;"
          ></div>
          <div class="book-info-detail">
            <h1 class="book-name">闺蜜之主</h1>
            <p class="book-author"><a href="#">作者：爱潜水的乌贼</a></p>
            <p class="book-word-cout">本书字数：446.5万字 </p>
            <p class="book-status">
              <span>更新时间：5 个月</span>
              <span class="status" style="color: #de9763">•完结</span>
            </p>
            <div class="book-info-btns-wrap">
              <el-button type="primary">立即阅读</el-button>
              <el-dropdown>
                <el-button>
                  加入书架<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>正在追读</el-dropdown-item>
                  <el-dropdown-item>养肥待看</el-dropdown-item>
                  <el-dropdown-item>已经看过</el-dropdown-item>
                  <el-dropdown-item>不看屏蔽</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button>收入书单</el-button>
              <el-button>more</el-button>
            </div>
          </div>
          <div class="book-info-footer">
            <div class="tag" style="margin: 5px;">
              <el-tag><a href="#">玄幻</a></el-tag>
              <el-tag type="success"><a href="#">异世大陆</a></el-tag>
              <el-tag type="info" closable>私人标签</el-tag>
              <el-button size="mini">新建标签</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="bookdeatil-layout-header-side">
        <div class="book-score-overview"><h1 class="score">8.7</h1>
          <p class="score-count">5647个评分</p></div>
        <div class="book-score-charts">评分分布图表</div>
        <div class="my-rating"><span>我的评分</span>
          <el-rate :value="3" />
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="center" class="bookdetail-layout-main">
      <div class="bookdetail-layout-main-left" style="margin-right: 40px;">
        <el-collapse accordion>
          <el-collapse-item title="简介" name="1">
            蒸汽与机械的浪潮中，谁能触及非凡？历史和黑暗的迷雾里，又是谁在耳语？我从诡秘中醒来，睁眼看见这个世界：枪械，大炮，巨舰，飞空艇，差分机；魔药，占卜，诅咒，倒吊人，封印物……光明依旧照耀，神秘从未远离，这是一段“愚者”的传说。
          </el-collapse-item>
        </el-collapse>

        <el-card>
          <el-row type="flex" justify="space-between">
            <span>
              <a href="#">综合</a><el-divider direction="vertical" />
              <a href="#">最新</a><el-divider direction="vertical" />
              <a href="#">热度</a><el-divider direction="vertical" />
              <a href="#">关注</a><el-divider direction="vertical" />
            </span>
            <el-link icon="el-icon-edit" underline href="#">发布评论</el-link>
          </el-row>
        </el-card>

        <div class="book-review">
          <el-card v-for="n in 5" style="margin-top: 10px;">
            <el-row class="book-review-ower" type="flex" justify="space-between">
              <div class="ower-info">
                <el-avatar style="display: inline-flex;">吃鸡</el-avatar>
                <span style="margin-left: 5px">beesshp</span></div>
              <div>
                <el-rate :value="4" disabled />
              </div>
            </el-row>
            <div class="book-review-content">{{ n }}
              吹过了，前期可以说是神作，后期直接崩掉。而且别拿克苏鲁来挡枪，后期打怪升级级流是个鬼的克苏鲁，克苏鲁是人类对未知原始的恐惧好吧。如果乌贼把蒸汽朋克或者维多利亚时代写好了那也行，但后期变成超级系了是什么鬼。（本来想给3星的，但这虚高的评分还是算了吧）
            </div>
            <div>发布于2021-04-11 13:21</div>
            <div class="book-review-actions">
              <el-button>👍</el-button>
              <el-button>👎🏼</el-button>
              <el-button>51个评论</el-button>
              <el-button>more</el-button>
            </div>
          </el-card>
        </div>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
      <el-card class="bookdetail-layout-main-right hidden-sm-and-down" style="width: 220px;height: 360px;padding: 30px;"><h1>书单收录页</h1></el-card>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 5,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      }
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  created() {
    this.getList()
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
