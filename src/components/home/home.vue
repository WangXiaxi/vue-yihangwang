<template>
  <div class="home child-view">
    <div class="home-header">
      <router-link to="/site/index/search" tag="div" class="btn-opcity"></router-link>
      <a href="tel:4006610571" class="btn-phone"></a>
    </div>
    <div class="home-banner" v-if="optionBanner.length>0">
      <div class="banner-swiper">
        <swiper :options="swiperOptionBanner" ref="bannerSwiper">
          <swiper-slide v-for="(item, index) in optionBanner" :key="index">
            <a :href="item.url"><img :src="imgHandle(item.img)"></a>
          </swiper-slide>
          <div class="home-swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="w-bg"></div>
    </div>
    <div class="home-nav">
      <ul class="nav">
        <router-link tag="li" to="/site/index/sitemap">
          <i class="icon-img-nav1"></i>
          <span>商品分类</span>
        </router-link>
        <router-link tag="li" to="/site/index/brand">
          <i class="icon-img-nav2"></i>
          <span>名特优品牌</span>
        </router-link>
        <router-link tag="li" to="/site/index/search-list?searchTitle=伴手礼&cat=14">
          <i class="icon-img-nav3"></i>
          <span>杭州礼包</span>
        </router-link>
        <router-link tag="li" to="/site/index/special-zone">
          <i class="icon-img-nav4"></i>
          <span>特惠专区</span>
        </router-link>
        <router-link tag="li" to="/site/index/news-list?id=9">
          <i class="icon-img-nav5"></i>
          <span>资讯中心</span>
        </router-link>
      </ul>
    </div>
    <!-- 占位 -->
    <div class="spilter"></div>
    <!-- 新品专区 -->
    <div class="home-hot">
      <div class="pub-tit">
        <h3><span class="tit">优品热卖</span></h3>
        <div class="hot-tips"></div>
        <!-- <div class="more">
          <span>更多</span>
          <i></i>
        </div> -->
      </div>
      <div class="hot-swiper" v-if="newgoodsRows.length>0">
        <swiper :options="swiperOptionHot" ref="hotSwiper">
          <swiper-slide v-for="(item, index) in newgoodsRows" :key="index">
            <a class="hot-item" :href="`/site/products/id/${item.id}`">
              <img :src="imgHandle(item.img, '@_@w@_@200@_@h@_@200')">
              <div class="info">
                <p class="tit">{{item.name}}</p>
                <div class="price"><span class="tip">￥</span><span class="money">{{item.price}}</span></div>
                <div class="sell-num">库存{{item.store_nums}}</div>
              </div>
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 占位 -->
    <div class="spilter"></div>
    <!-- 甄选精货 -->
    <div class="home-pick" v-if="optionHot.length>0">
      <i class="icon-img-pick">
      </i>
      <div class="pick-swiper">
        <swiper :options="swiperOptionPick" ref="pickSwiper">
          <swiper-slide v-for="(item, index) in optionHot" :key="index">
            <a :href="`/site/products/id/${item.id}`" class="item-pick">
              <h3>
                <span class="tit">{{item.name}}</span>
                <span class="price"><span>￥</span>{{item.price.split(".")[0]}}.<span>{{item.price.split(".")[1]}}</span></span>
                <div class="pick-more">
                  速抢
                </div>
              </h3>
              <img :src="imgHandle(item.img, '@_@w@_@200@_@h@_@200')">
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div v-if="floorGoods.length>0" v-for="(item, index) in floorGoods" :key="index">
      <!-- 占位 -->
      <div class="spilter"></div>
      <!-- 楼层 -->
      <div class="home-floor" :class="`floor-${index+1}`">
        <h1 class="tit-tip">{{item.cat_name}}</h1>
        <router-link tag="div" :to="`/site/index/search-list?searchTitle=${item.cat_name}&cat=${item.id}`" class="floor-banner">
          <img v-lazy="imgHandle(item.ad_img)">
        </router-link>
        <ul class="floor-goods">
          <li class="good-item" v-for="(items, indexs) in item.children" :key="indexs">
            <a :href="`/site/products/id/${items.id}`">
              <h2 class="tit">{{items.name}}</h2>
              <p class="des">{{item.cat_name}}</p>
              <div class="bot-part">
                <div class="left">
                  <div class="price">
                    <span class="money-tip">￥</span>
                    <span class="big-num">{{items.price.split(".")[0]}}.</span>
                    <span class="small-num">{{items.price.split(".")[1]}}</span>
                  </div>
                  <div class="red-btn">立即购买</div>
                </div>
                <div class="right">
                  <img  v-lazy="imgHandle(items.img, '@_@w@_@200@_@h@_@200')" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copy-right">
      Copyright © 2018 忆杭网版权所有
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getHome } from '@/api/api.js'
import { URL } from '@/api/config'
import { homeFloorJsonHandle } from 'common/js/datahandle'

export default {
  data () {
    return {
      swiperOptionBanner: {
        loop: true,
        speed: 600,
        pagination: '.home-swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        autoplay: 3000,
        autoHeight: true,
        autoplayDisableOnInteraction: false
      },
      swiperOptionHot: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        freeMode: true
      },
      swiperOptionPick: {
        direction: 'vertical',
        speed: 300,
        spaceBetween: 10,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
      },
      optionBanner: [],
      optionHot: [],
      newgoodsRows: [],
      floorGoods: []
    }
  },
  created () {
    this.loading.open({
      text: '数据加载...',
      spinnerType: 'triple-bounce'
    })
    getHome().then((res) => {
      if (res.code === 1) {
        setTimeout(() => {
          this.loading.close()
        }, 500)
        this.optionBanner = res.data.homeSlide
        this.optionHot = res.data.finegoodsRows
        this.newgoodsRows = res.data.newgoodsRows
        this.floorGoods = homeFloorJsonHandle(res.data)
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
  },
  deactivated () {
    if (this.$refs.bannerSwiper) {
      this.$refs.bannerSwiper.swiper.stopAutoplay()
    }
    if (this.$refs.pickSwiper) {
      this.$refs.pickSwiper.swiper.stopAutoplay()
    }
  },
  activated () {
    if (this.$refs.bannerSwiper) {
      this.$refs.bannerSwiper.swiper.startAutoplay()
    }
    if (this.$refs.pickSwiper) {
      this.$refs.pickSwiper.swiper.startAutoplay()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.swiper-container-horizontal
  .home-swiper-pagination
    position: absolute
    z-index: 1
    text-align: center
    bottom: 16px !important
    .swiper-pagination-bullet
      margin: 0 3px
      opacity: 1
      background: RGB(204, 204, 204)
      transition: all 0.3s
      &.swiper-pagination-bullet-active
        background: RGB(255, 255, 255)
        width: 18px
        border-radius: 5px
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.home
  background: #f2f2f2
  padding-top: 44px
  padding-bottom: 59px
  .spilter
    width: 100%
    height: 10px
    background: #F2F2F2
.home-header
  position: fixed
  top: 0
  z-index: 100
  width: 100%
  max-width: 750px; /*no*/
  height: 44px
  background: #266E0A 50% 50%/100% 100% no-repeat
  bg-image("~common/images/topbg")
  .btn-phone
    position: absolute
    width: 45px
    height: 44px
    right: 0
    top: 0
  .btn-opcity
    width: 240px
    height: 42px
    position: absolute
    right: 46px
    top: 0
.home-banner
  width: 100%
  position: relative
  height: 165px
  overflow: hidden
  background: #FFFFFF
  .banner-swiper
    .swiper-slide
      width: 100%
      img
        width: 100%
        height: 165px
  .w-bg
    position: absolute
    z-index: 1
    top: 155px
    left: 50%
    transform: translateX(-50%)
    background: #FFFFFF
    width: 328%
    padding-top: 100%
    border-radius: 50% 50% 0 0
.home-nav
  width: 100%
  height: 90px
  background: #FFFFFF
  .nav
    display: flex
    position: relative
    li
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      flex: 1
      width: 0
      padding-top: 11px
      i
        display: block
        width: 46px
        height: 46px
        margin-bottom: 9px
        background: 50% 50%/100% 100% no-repeat
        &.icon-img-nav5
          bg-image("~common/images/home-nav5")
        &.icon-img-nav4
          bg-image("~common/images/home-nav4")
        &.icon-img-nav3
          bg-image("~common/images/home-nav3")
        &.icon-img-nav2
          bg-image("~common/images/home-nav2")
        &.icon-img-nav1
          bg-image("~common/images/home-nav1")
      span
        font-size: 12px
        color: #666666
.home-hot
  padding: 16px 0 12px
  position: relative
  background: #FFFFFF
  .hot-swiper
    padding-left: 12px
    .swiper-slide
      width: 102px
      &:last-child
        margin-right: 12px
  .hot-item
    display: block
    width: 102px
    img
      width: 102px
      height: 102px
    .info
      position: relative
      .tit
        font-size: 12px
        margin-top: 5px
        text-align: center
        no-wrap()
      .price
        margin-top: 12px
        font-size: 12px
        color: RGB(235, 18, 18)
        line-height: 12px
        .tip
          font-size: 10px
      .sell-num
        position: absolute
        right: 0
        bottom: 0
        font-size: 10px
        line-height: 12px
.home-pick
  background: #FFFFFF
  padding: 20px 12px
  display: flex
  .icon-img-pick
    display: block
    width: 46px
    height: 52px
    background: right center/100% 100% no-repeat
    bg-image("~common/images/home-pick")
  .pick-swiper
    margin-left: 10px
    flex: 1
    width: 0
    height: 52px
    display: flex
    border-left: 1px solid #E6E6E6
    padding-left: 10px
    .pick-swiper
      height: 52px
      overflow: hidden
    .swiper-slide
      height: 52px
      width: 100%
    .item-pick
      display: block
      position: relative
      width: 100%
      height: 52px
      padding-right: 62px
      h3
        display: block
        flex: 1
        width: 100%
        height: 100%
        position: relative
        .tit
          height: 32px
          font-size: 12px
          line-height: 16px
          display: block
          overflow: hidden
          color: #FF8F00
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .price
          position: absolute
          bottom: 0
          left: 0
          font-size: 18px
          color: #EB1212
          span
            font-size: 12px
        .pick-more
          font-size: 12px
          position: absolute
          right: 0
          bottom: 0
          line-height: 18px
          color: #EB1212
          padding-right: 12px
          background: right center/auto 10px no-repeat
          bg-image("~common/images/more")
      img
        position: absolute
        right: 0
        top: 0
        display: block
        width: 52px
        height: 52px
.home-floor
  position: relative
  padding-bottom: 15px
  background: #FFFFFF
  .tit-tip
    position: relative
    width: 104px
    height: 30px
    font-size: 16px
    text-align: center
    color: #fff
    line-height: 30px
    border-radius: 0 15px 15px 0
    z-index: 1
  .floor-banner
    display: block
    position: relative
    img
      display: block
      width: 100%
      height: 165px
      background: #F9F9F9 url("~common/images/logo.png") 50% 50%/auto no-repeat
      margin-top: -15px
  .floor-goods
    overflow: hidden
    .good-item
      width: 50%
      float: left
      padding: 12px
      .tit
        font-size: 14px
        line-height: 16px
        color: #666666
        no-wrap()
      .des
        height: 12px
        margin-top: 7px
        color: #999999
        font-size: 12px
      .bot-part
        position: relative
        overflow: hidden
        margin-top: 10px
        .left
          width: 50%
          float: left
          .price
            font-size: 0
            color: #EB1212
            padding-top: 5px
            .big-num
              font-size: 16px
          .red-btn
            margin-top: 35px
            background: #EB1212
            color: #FFFFFF
            border-radius: 10px
            height: 17px
            padding: 4px 0
            line-height: 1
            font-size: 10px
            width: 55px
            text-align: center
        .right
          width: 50%
          float: left
          img
            width: 100%
            background: #F9F9F9 url("~common/images/logo.png") 50% 50%/50% auto no-repeat
  &.floor-1
    .tit-tip
      background: linear-gradient(to right, #FF9F41, #FD7700)
  &.floor-2
    .tit-tip
      background: linear-gradient(to right, #3ABEFE, #00A9FC)
  &.floor-3
    .tit-tip
      background: linear-gradient(to right, #FE5D4E, #FD1702)
  &.floor-4
    .tit-tip
      background: linear-gradient(to right, #01FEB7, #0AE6A9)
  &.floor-5
    .tit-tip
      background: linear-gradient(to right, #B163FF, #7E05FA)
  &.floor-6
    .tit-tip
      background: linear-gradient(to right, #4DAA29, #256D09)
  &.floor-7
    .tit-tip
      background: linear-gradient(to right, #7ED3DB, #05CBE0)
  &.floor-8
    .tit-tip
      background: linear-gradient(to right, #43406A, #0F034D)
  &.floor-1, &.floor-3, &.floor-5
    .floor-goods
      .good-item:nth-child(2n)
        background: #F2F2F2
  &.floor-2, &.floor-4, &.floor-6
    .floor-goods
      .good-item:nth-child(2n + 1)
        background: #F2F2F2
.pub-tit
  height: 16px
  position: relative
  padding: 0 12px
  margin-bottom: 13px
  h3
    line-height: 16px
    font-size: 10px
    color: RGB(235, 18, 18)
    vertical-align: middle
    border-left: 2px solid #266E0A
    padding-left: 10px
    span
      vertical-align: middle
    .tit
      font-size: 16px
      color: RGB(17, 17, 17)
      margin-right: 7px
.more
  position: absolute
  right: 12px
  top: 0
  height: 16px
  line-height: 16px
  font-size: 0
  padding-right: 12px
  background: right center/auto 12px no-repeat
  bg-image("~common/images/more")
  span
    color: RGB(235, 18, 18)
    font-size: 12px
.copy-right
  text-align: center
  line-height: 50px
  color: #999999
  margin-top: 10px
</style>
