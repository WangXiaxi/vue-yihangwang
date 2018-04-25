<template>
  <div class="search-list child-view">
    <header-pub headerTitle="特惠专区"></header-pub>
    <div class="sort-fixed">
      <ul>
        <li @click="changeState('sale')" :class="{'on-top': queryData.order === 'sale' && queryData.by === 'desc', 'on-bot': queryData.order === 'sale' && queryData.by === 'asc'}">销量</li>
        <li @click="changeState('cpoint')" :class="{'on-top': queryData.order === 'cpoint' && queryData.by === 'desc', 'on-bot': queryData.order === 'cpoint' && queryData.by === 'asc'}">评价</li>
        <li @click="changeState('price')" :class="{'on-top': queryData.order === 'price' && queryData.by === 'desc', 'on-bot': queryData.order === 'price' && queryData.by === 'asc'}">价格</li>
        <li @click="changeState('new')" :class="{'on-top': queryData.order === 'new' && queryData.by === 'desc', 'on-bot': queryData.order === 'new' && queryData.by === 'asc'}">最新上架</li>
      </ul>
    </div>
    <div class="goods-box"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="load"
          infinite-scroll-immediate-check="false"
          infinite-scroll-distance="10">
      <goods-Info v-for="(item, index) in goodsArr" :goodInfo="item" :key="index"></goods-Info>
    </div>
    <LoadScroll :loadType="loadType"></LoadScroll>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderPub from 'base/header/header-pub'
import { discountArea } from '@/api/api'
import GoodsInfo from 'base/goods-info/goods-info'
import LoadScroll from 'base/load-scroll/load-scroll'

export default {
  components: {
    HeaderPub,
    GoodsInfo,
    LoadScroll
  },
  data () {
    return {
      goodsArr: [],
      load: true,
      queryData: {
        page: 1,
        order: '', // 排序类型
        by: '', // 排序
        cat_id: '10086' // 分类
      },
      loadType: 1
    }
  },
  computed: {
  },
  created () {
    this.createFirst()
  },
  methods: {
    changeState (state) {
      // 初始化数据
      // 判端排序方向
      if (this.queryData.order !== state) {
        this.queryData.order = state
        this.queryData.by = 'desc'
      } else {
        if (this.queryData.by === 'asc') {
          this.queryData.by = 'desc'
        } else {
          this.queryData.by = 'asc'
        }
      }
      this.queryData.page = 1
      this.goodsArr = []
      this.loadType = 1
      this.load = true
      // 重查
      this.createFirst()
    },
    createFirst () {
      this.loading.open({
        text: '数据加载...',
        spinnerType: 'triple-bounce'
      })
      this.queryData = Object.assign({}, this.queryData, this.$route.query)
      delete this.queryData.searchTtitle
      discountArea(this.queryData).then((res) => {
        if (res.code === 1) {
          this.goodsArr = res.data
          setTimeout(() => {
            this.loading.close()
          }, 500)
          if (this.goodsArr.length < 10) {
            this.load = true
            this.loadType = 2
          } else {
            this.load = false
            this.loadType = 1
          }
        }
      })
    },
    loadMore () {
      this.load = true
      this.queryData.page = this.queryData.page + 1
      discountArea(this.queryData).then((res) => {
        if (res.code === 1) {
          setTimeout(() => {
            this.goodsArr = this.goodsArr.concat(res.data)
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
body
  background: #f2f2f2
.search-list
  background: #FFFFFF
  padding-top: 94px
  min-height: 200px
  z-index: 1
  .sort-fixed
    position: fixed
    top: 42px
    width: 100%
    max-width: 750px; /*no*/
    height: 42px
    background: #FFFFFF
    z-index: 10
    ul
      display: flex
      position: relative
      &:after
        line-scale()
      li
        font-size: 12px
        flex: 1
        text-align: center
        line-height: 42px
        position: relative
        &.on-top, &.on-bot
          color: red
          &:before
            position: absolute
            content: ' '
            width: 100%
            bottom: 0
            height: 1px
            left: 0
            background: red
            z-index: 2
          &:after
            content: ' '
            display: inline-block
            vertical-align: middle
            width: 8px
            height: 5px
            margin-left: 3px
            transition: all 0.3s
            background: 50% 50%/100% auto no-repeat
        &.on-top
          &:after
            bg-image("~common/images/sort")
        &.on-bot
          &:after
            transform: rotate(180deg)
            bg-image("~common/images/sort")
  .goods-box
    overflow: hidden
    padding: 0 12px
    .goods-info
      float: left
      width: 49%
      margin-right: 2%
      border: 1px solid #EEE
      margin-bottom: 2%
      &:nth-of-type(2n)
        margin-right: 0
</style>
