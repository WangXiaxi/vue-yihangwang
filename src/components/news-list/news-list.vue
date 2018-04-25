<template>
  <div class="news-list child-view">
    <header-pub headerTitle="资讯中心"></header-pub>
    <div class="list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="load"
          infinite-scroll-immediate-check="false"
          infinite-scroll-distance="10">
      <router-link v-for="(item, index) in newsList" :to="`/site/index/news-detail?id=${item.id}`" tag="a" :key="index">
        <h2 class="tit">{{item.title}}</h2>
        <p class="time">发布时间：{{item.create_time}}</p>
      </router-link>
    </div>
    <LoadScroll :loadType="loadType"></LoadScroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { getNewsList } from '@/api/api.js'
import HeaderPub from 'base/header/header-pub'
import { URL } from '@/api/config'
import LoadScroll from 'base/load-scroll/load-scroll'

export default {
  components: {
    HeaderPub,
    LoadScroll
  },
  data () {
    return {
      load: true,
      newsList: [],
      queryData: {
        page: 1
      },
      loadType: 1
    }
  },
  created () {
    this.queryData = Object.assign({}, this.queryData, this.$route.query)
    getNewsList(this.queryData).then((res) => {
      if (res.code === 1) {
        this.newsList = res.data
        if (res.data < 10) {
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
    imgHandle (img, size) {
      if (size) {
        let handImg = img.replace(/\//g, '@_@')
        return `${URL}/pic/thumb/img/${handImg}${size}`
      }
      return `${URL}/${img}`
    },
    loadMore () {
      this.load = true
      this.queryData.page = this.queryData.page + 1
      getNewsList(this.queryData).then((res) => {
        console.log(res)
        if (res.code === 1) {
          setTimeout(() => {
            this.newsList = this.newsList.concat(res.data)
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
.news-list
  padding-top: 52px
  .list
    padding: 0 12px
    a
      display: block
      position: relative
      margin-bottom: 10px
      padding-bottom: 20px
      &:after
        line-scale()
      .tit
        padding: 5px 0
        font-size: 16px
        line-height: 1.4
        color: #666666
      .time
        font-size: 12px
        line-height: 16px
</style>
