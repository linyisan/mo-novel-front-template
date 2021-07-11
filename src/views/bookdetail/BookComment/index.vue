<template>
  <div>
    <div class="pad20">
      <div class="bookComment">
        <div class="book_tit">
          <div class="fl">
            <h3>作品评论区</h3><span id="bookCommentTotal">({{ total }}条)</span>
          </div>
          <el-link icon="el-icon-edit" class="fr" href="#txtComment">发表评论</el-link>
        </div>
        <div v-if="total<=0" id="noCommentPanel" class="no_comment"> <!--style="display: none;"-->
          <el-image :src="require('@/assets/images/no_comment.png')" />
          <span class="block">暂无评论</span>
        </div>

        <div id="commentPanel" class="commentBar">
          <div v-for="comment in bookCommentList" :key="comment.id" class="comment_list cf">
            <div class="user_heads fl">
              <img :src="comment.userInfoVo.avatar" class="user_head">
            </div>
            <ul class="pl_bar fr">
              <li class="fr">
                <el-rate :value="comment.star" disabled />
              </li>
              <li class="name">{{ comment.userInfoVo.name }}</li>
              <li class="dec">{{ comment.content }}</li>
              <li class="other cf">
                <span class="time fl">{{ comment.updateTime }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!--无评论时此处隐藏-->
        <!--        <div v-if="total>0" id="moreCommentPanel" class="more_bar">
          <a href="'/book/comment-'+${book.id}+'.html'">查看全部评论&gt;</a>
        </div>-->
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
        <el-divider />
        <div id="reply_bar" class="reply_bar">

          <!--          <el-input
            id="txtComment"
            v-model="temp.content"
            type="textarea"
            placeholder="我来说两句..."
            :maxlength="1000"
            :minlength="5"
            show-word-limit
            :autosize="{minRows: 4}"
          />-->
          <!--          <div class="reply_btn">
            &lt;!&ndash;            <span class="fl black9"><em id="emCommentNum" class="ml5">0/1000</em> 字</span>&ndash;&gt;
            <span class="fr"><el-button class="btn_ora" @click="handleCreateComment">发表</el-button></span>
          </div>-->
          <el-form ref="dataForm" :model="temp" :rules="rules">
            <el-row type="flex" justify="space-between">
              <div class="tit">
                <span class="font16">发表评论</span>
              </div>
              <el-form-item prop="star">
                本书评分：
                <el-rate v-model="temp.star" />
              </el-form-item>
            </el-row>
            <el-form-item prop="content">
              <el-input
                id="txtComment"
                v-model="temp.content"
                type="textarea"
                placeholder="我来说两句..."
                :maxlength="1000"
                :minlength="5"
                show-word-limit
                :autosize="{minRows: 4}"
              />
            </el-form-item>
            <el-form-item>
              <div class="reply_btn">
                <!--            <span class="fl black9"><em id="emCommentNum" class="ml5">0/1000</em> 字</span>-->
                <span class="fr"><el-button class="btn_ora" @click="handleCreateComment">发表</el-button></span>
              </div>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { searchBookComment, addBookComment } from '@/api/comment'
import { addRating } from '@/api/rating'
import { MessageBox } from 'element-ui'

export default {
  components: { Pagination },
  props: {
    bookId: {
      require: true
    }
  },
  data() {
    return {
      bookCommentList: null,
      listQuery: {
        page: 1,
        limit: 20,
        resourceId: this.bookId
      },
      loading: true,
      total: 0,

      temp: {
        star: 0,
        content: ''
      },
      rules: {
        star: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请输入评论',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token'
    ]),
    isLogin() {
      if (!this.token) return false
      else return true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      searchBookComment(this.listQuery).then(response => {
        this.loading = false
        this.bookCommentList = response.data.items
        this.total = response.data.total
      })
    },
    async handleCreateComment() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        if (!this.isLogin) {
          MessageBox.alert('请先登录', '信息', {
            confirmButtonText: '确定',
            // cancelButtonText: 'Cancel',
            type: 'error'
          })
          return false
        }
        addRating({ userId: this.id, bookId: this.bookId, star: this.temp.star }).then(_ => {
          addBookComment({
            userId: this.id,
            resourceId: this.bookId,
            content: this.temp.content,
            star: this.temp.star
          }).then(_ => {
            this.getList()
          })
        })

        this.temp.content = ''
        this.temp.star = 0
      })
    }
  }
}
</script>

<style scoped>
  @import "~@/assets/css/main.css";
  @import "~@/assets/css/book.css";
  @import "~@/assets/css/base.css";
</style>
