<template>
  <div class="sitemap child-view">
    <header-pub headerTitle="分类"></header-pub>
    <div class="left-class">
      <div class="scroll-box">
        <ul v-if="sitemapJson.length>0">
          <li v-for="(item, index) in sitemapJson" @click.stop="goScroll(index)" :class="{'on': curIndex === index}" :key="index">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="right-class">
      <div class="scroll-box" :class="{scroll: needScroll}" ref="scrollBox" @scroll="scrollClass" v-if="sitemapJson.length>0">
        <dl class="sitemap-son" v-for="(item, index) in sitemapJson" :key="index">
          <dt ref="rightTit">
            {{item.name}}
          </dt>
          <router-link v-for="(itemson, indexson) in item.children" :to="`/site/index/search-list?searchTitle=${itemson.name}&cat=${itemson.id}`" tag="dd" :key="indexson"><img v-if="itemson.img" :src="imgHandle(itemson.img, '@_@w@_@200@_@h@_@200')"><span>{{itemson.name}}</span></router-link>
        </dl>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getProSitemap } from '@/api/api.js'
import { sitemapJsonHandle } from 'common/js/datahandle.js'
import HeaderPub from 'base/header/header-pub'
import { URL } from '@/api/config'

export default {
  components: {
    HeaderPub
  },
  data () {
    return {
      sitemapJson: {},
      recordY: [],
      curIndex: 0,
      needScroll: true
    }
  },
  computed: {
  },
  created () {
    this.loading.open({
      text: '数据加载...',
      spinnerType: 'triple-bounce'
    })
    getProSitemap().then((res) => {
      if (res.code === 1) {
        setTimeout(() => {
          this.loading.close()
        }, 500)
        this.sitemapJson = sitemapJsonHandle(res.data)
        this.$nextTick(() => {
          let pad = this.$refs.rightTit[0].offsetTop
          this.$refs.rightTit.map((cur) => {
            this.recordY.push(cur.offsetTop - pad)
          })
        })
      }
    })
  },
  methods: {
    imgHandle (img, size) {
      let handImg = img.replace(/\//g, '@_@')
      return `${URL}/pic/thumb/img/${handImg}${size}`
    },
    goScroll (index) {
      this.needScroll = false
      setTimeout(() => {
        this.$refs.scrollBox.scrollTop = this.recordY[index]
        this.needScroll = true
      }, 50)
    },
    scrollClass () { // 滚动距离
      let curScroll = this.$refs.scrollBox.scrollTop
      if (curScroll < this.recordY[0]) {
        this.curIndex = 0
        return
      } else if (curScroll > this.recordY[this.recordY.length - 1]) {
        this.curIndex = this.recordY.length - 1
        return
      }
      for (let i = 0; i < this.recordY.length - 1; i++) {
        if (curScroll >= this.recordY[i] && curScroll < this.recordY[i + 1]) {
          this.curIndex = i
          break
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.sitemap
  widdth: 100%
  height: 100%
  display: flex
  padding-top: 42px
  padding-bottom: 50px
  background: #ECF0F3
  .left-class
    width: 94px
    height: 100%
    overflow: hidden
    -webkit-overflow-scrolling: touch
    background: #FFF
    .scroll-box
      position: relative
      width: 124px
      height: 100%
      overflow-x: hidden
      overflow-y: scroll
      ul
        width: 94px
        li
          font-size: 12px
          height: 50px
          text-align: center
          display: flex
          justify-content: center
          align-items: center
          position: relative
          color: #666666
          &:after
            line-scale()
          &.on
            background: #ECF0F3
            color: #333
  .right-class
    flex: 1
    width: 0
    height: 100%
    overflow: hidden
    .scroll-box
      -webkit-overflow-scrolling: auto
      position: relative
      width: calc(100% + 30px)
      padding-right: 30px
      height: 100%
      overflow-x: hidden
      overflow-y: scroll
      &.scroll
        -webkit-overflow-scrolling: touch
      .sitemap-son
        padding: 12px
        overflow: hidden
        dt
          background: #FFFFFF
          height: 30px
          line-height: 30px
          text-align: center
          font-size: 14px
          color: #666666
          border-radius: 3px
        dd
          width: 30%
          float: left
          text-align: center
          line-height: 24px
          margin-right: 5%
          margin-top: 5%
          background: #FFFFFF
          border-radius: 1px
          &:nth-of-type(3n)
            margin-right: 0
          img
            display: block
            width: 100%
            height: 77.09px
            padding: 6px
          span
            display: block
            no-wrap()
</style>
