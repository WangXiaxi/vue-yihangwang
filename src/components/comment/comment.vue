<template>
  <transition name="opac">
    <div class="comment child-view">
      <header-pub headerTitle="用户评价"></header-pub>
      <div class="list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="load"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="10">
        <eval-info v-for="(item, index) in commentList" :evalData="item" :key="index"></eval-info>
      </div>
      <LoadScroll :loadType="loadType"></LoadScroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { getCommentList } from '@/api/api.js'
import HeaderPub from 'base/header/header-pub'
import LoadScroll from 'base/load-scroll/load-scroll'
import EvalInfo from 'base/eval-info/eval-info'

export default {
  components: {
    HeaderPub,
    LoadScroll,
    EvalInfo
  },
  data () {
    return {
      load: true,
      commentList: [],
      queryData: {
        page: 1
      },
      loadType: 1
    }
  },
  created () {
    this.queryData = Object.assign({}, this.queryData, this.$route.query)
    getCommentList(this.queryData).then((res) => {
      if (res.code === 1) {
        this.commentList = res.data
        if (res.data.length < 10) {
          this.load = true
          this.loadType = 2
        } else {
          this.load = false
          this.loadType = 1
        }
      } else {
        this.toast('当前文章列表不存在')
      }
    })
  },
  methods: {
    loadMore () {
      this.load = true
      this.queryData.page = this.queryData.page + 1
      getCommentList(this.queryData).then((res) => {
        if (res.code === 1) {
          setTimeout(() => {
            this.commentList = this.commentList.concat(res.data)
            if (res.data.length < 10) {
              this.load = true
              this.loadType = 2
            } else {
              this.load = false
              this.loadType = 1
            }
          }, 1000)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.opac-enter-active,.opac-leave-active
  transition: all 0.5s
.opac-enter,.opac-leave-to
  opacity: 0
.comment
  background: #ffffff
  padding-top: 44px
  padding-bottom: 59px
  .list
    padding: 0 12px
    .eval-info
      padding: 0 0 12px 0
      &:after
        line-scale()
</style>
