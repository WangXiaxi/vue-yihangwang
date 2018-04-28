<template>
  <div class="news-detail child-view">
    <header-pub headerTitle="文章详情"></header-pub>
    <div v-if="articeObj" class="artice-main">
      <div class="title">
        {{articeObj.title}}
      </div>
      <div class="time">
        发布时间：{{articeObj.create_time}}
      </div>
      <div class="content article_detail" v-html="articeObj.content">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getNewsDetail } from '@/api/api.js'
import HeaderPub from 'base/header/header-pub'
import { URL } from '@/api/config'

export default {
  components: {
    HeaderPub
  },
  data () {
    return {
      articeObj: {}
    }
  },
  created () {
    getNewsDetail(this.$route.query.id).then((res) => {
      if (res.code === 1) {
        this.articeObj = res.data
        this.articeObj.content = this.articeObj.content.replace(/\/upload\/image/g, `${URL}/upload/image`)
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
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.news-detail
  padding-top: 52px
  .artice-main
    padding: 0 12px
    .title
      line-height: 1.5
      font-size: 18px
      text-align: center
      padding: 10px 0
    .time
      text-align: center
      line-height: 2
      position: relative
      padding-bottom: 14px
      margin-bottom: 12px
      &:after
        line-scale()
</style>
