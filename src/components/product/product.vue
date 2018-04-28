<template>
  <div class="product child-view">
    <div class="pro-header" :class="{act: showNav}" ref="proHeader">
      <div class="le">
        <i class="ico"></i>
      </div>
      <div class="cen">
        <div :class="{act: navAct === 1}" @click.stop="changeCurAct(1)">商品</div>
        <div :class="{act: navAct === 2}" @click.stop="changeCurAct(2)">评价</div>
        <div :class="{act: navAct === 3}" @click.stop="changeCurAct(3)">详情</div>
      </div>
      <div class="ri">
        <i class="ico"></i>
      </div>
    </div>
    <div class="good-banner" v-if="goodsInfo.photo && goodsInfo.photo.length > 0">
      <swiper :options="swiperOptionProBanner" ref="proBannerSwiper">
        <swiper-slide v-for="(item, index) in goodsInfo.photo" :key="index">
          <img :src="imgHandle(item.img)">
        </swiper-slide>
        <div class="pro-swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="good-info">
      <h2 class="title">{{goodsInfo.name}}</h2>
      <div class="price" v-if="!goodsInfo.group_price && goodsInfo.sell_price">
        <span class="money-ico">￥</span><span class="big-pri">{{goodsInfo.sell_price.split(".")[0]}}.</span><span class="small-pri">{{goodsInfo.sell_price.split(".")[1]}}</span>
      </div>
      <div class="price" v-if="goodsInfo.group_price">
        <span class="zx"></span><span class="money-ico">￥</span><span class="big-pri">{{goodsInfo.group_price.split(".")[0]}}.</span><span class="small-pri">{{goodsInfo.group_price.split(".")[1]}}</span>
        <span class="old-pri">￥{{goodsInfo.sell_price}}</span>
      </div>

      <div class="bai-pin">
        <div class="fl">编号：{{goodsInfo.goods_no}}</div>
        <div class="ri" v-if="goodsInfo.brand">品牌：<router-link :to="`/site/index/brand-detail?id=${goodsInfo.brand_id}`">{{goodsInfo.brand}}</router-link></div>
      </div>

      <div class="kucui">
        <div class="fl">预计3-7个工作日送达</div>
        <div class="ri">库存：{{goodsInfo.store_nums}}件</div>
      </div>
    </div>

    <div class="evaluate" ref="evaluate">
      <h2 class="tit">商品评价 (1)</h2>
      <div class="eval-list">
        <eval-info></eval-info>
      </div>
      <div class="look-more-eval">查看更多评价</div>
    </div>

    <div class="goods-img" ref="goodsImg">
      <h2 class="tit">商品详情</h2>
      <div class="content article_detail" v-html="goodsInfo.content">
      </div>
    </div>

    <div class="good-bottom-fix">
      <a class="item mi-item"><i class="i-home"></i><p>首页</p></a>
      <a class="item mi-item"><i class="i-fav"></i><p>收藏</p></a>
      <a class="item yellow" @click="changepPopupVisible()">加入购物车</a>
      <a class="item red" @click="changepPopupVisible()">立即购买</a>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="po-box">
        <div class="po-head-img">
          <img v-if="goodsInfo.img" :src="imgHandle(goodsInfo.img, '@_@w@_@200@_@h@_@200')">
        </div>
        <div class="po-body">
          <div class="top">
            <div class="name">{{goodsInfo.name}}</div>
            <div class="price" v-if="!goodsInfo.group_price && goodsInfo.sell_price">
              <span class="money-ico">￥</span><span class="big-pri">{{goodsInfo.sell_price.split(".")[0]}}.</span><span class="small-pri">{{goodsInfo.sell_price.split(".")[1]}}</span>
            </div>
            <div class="price" v-if="goodsInfo.group_price">
              <span class="zx"></span><span class="money-ico">￥</span><span class="big-pri">{{goodsInfo.group_price.split(".")[0]}}.</span><span class="small-pri">{{goodsInfo.group_price.split(".")[1]}}</span>
              <span class="old-pri">￥{{goodsInfo.sell_price}}</span>
            </div>
          </div>
          <div class="format-list" v-if="goodsInfo.spec_array instanceof Array">
            <div v-for="(item, index) in goodsInfo.spec_array" :key="index" class="format-item">
              <h2 class="name">
                {{item.name}}
              </h2>
              <div class="val-list">
                <a v-for="(itemc, indexc) in item.value" :key="indexc">{{itemc}}</a>
              </div>
            </div>
            <div class="format-item format-item-big">
              <h2 class="name">购买数量</h2>
              <div class="number">
                <div class="min">-</div>
                <div class="input">
                  <input type="" name="pricenum" v-model="counter" type="tel">
                </div>
                <div class="add">+</div>
              </div>
            </div>
          </div>
        </div>
        <div class="po-btn">
          {{popupBtnTitle}}
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderPub from 'base/header/header-pub'
import EvalInfo from 'base/eval-info/eval-info'
import { URL } from '@/api/config'
import { getGoodsDetail } from '@/api/api.js'
import { evalArr } from 'common/js/datahandle'

export default {
  components: {
    HeaderPub,
    EvalInfo
  },
  data () {
    return {
      swiperOptionProBanner: {
        loop: true,
        speed: 600,
        pagination: '.pro-swiper-pagination',
        autoplay: 5000
      },
      navAct: 1, // 导航跳转
      showNav: 0,
      goodsInfo: {},
      popupVisible: false,
      popupBtnTitle: '确定',
      counter: 0 // 数量加减
    }
  },
  created () {
    this._getAllData()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    changepPopupVisible () {
      this.popupVisible = !this.popupVisible
    },
    _getAllData () {
      let promise1 = new Promise((resolve, reject) => {
        getGoodsDetail(this.$route.query).then((res) => {
          if (res.code === 1) {
            console.log(res.data)
            this.goodsInfo = res.data
            this.goodsInfo.spec_array = evalArr(this.goodsInfo.spec_array)
            this.goodsInfo.content = this.goodsInfo.content.replace(/\/upload\/image/g, `${URL}/upload/image`)
          } else {
            this.$router.push({path: '/site/index/error', query: {word: '当前商品不存在获已经下架'}})
          }
          resolve(res.data)
        })
      })
      let promiseAll = Promise.all([promise1])
      promiseAll.then(() => {
        setTimeout(() => {
        }, 20)
      })
    },
    imgHandle (img, size) {
      if (size) {
        let handImg = img.replace(/\//g, '@_@')
        return `${URL}/pic/thumb/img/${handImg}${size}`
      }
      return `${URL}/${img}`
    },
    changeCurAct (val) { // 导航变动
      this.navAct = val
      let duceOffset = this.$refs.proHeader.clientHeight
      let offsetTop = [0, this.$refs.evaluate.offsetTop - duceOffset, this.$refs.goodsImg.offsetTop - duceOffset]
      document.documentElement.scrollTop = offsetTop[val - 1]
      document.body.scrollTop = offsetTop[val - 1]
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let duceOffset = this.$refs.proHeader.clientHeight
      let offsetTop2 = this.$refs.evaluate.offsetTop - duceOffset
      let offsetTop3 = this.$refs.goodsImg.offsetTop - duceOffset
      this.showNav = scrollTop < 100 ? 0 : 1 // 显示导航
      if (scrollTop < offsetTop2) {
        this.navAct = 1
      } else if (scrollTop >= offsetTop2 && scrollTop < offsetTop3) {
        this.navAct = 2
      } else {
        this.navAct = 3
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    counter (N, O) {
      console.log(N, O)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.pro-swiper-pagination
  .swiper-pagination-bullet
    width: 10px
    border-radius: 5px
    height: 5px
  .swiper-pagination-bullet-active
    background-color: #ff0036
    transition: all 0.5s
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.product
  background: #f5f5f5
  .pro-header
    position: fixed
    background: transparent
    display: flex
    top: 0
    height: 44px
    width: 100%
    max-width: 750px; /*no*/
    z-index: 10
    transition: all 0.4s ease
    &:after
      line-scale()
      opacity: 0
    .le,.ri
      width: 45px
      height: 44px
      display: flex
      justify-content: center
      align-items: center
      transition: all 0.4s ease
      .ico
        display: block
        width: 30px
        height: 30px
        border-radius: 50%
        background: 50% 50% / 68% auto no-repeat
        background-color: rgba(0, 0, 0, .4)
        transition: all 0.4s ease
    .le
      padding-left: 5px
      .ico
        bg-image("~common/images/pro-goback-on")
    .ri
      padding-right: 5px
      .ico
        bg-image("~common/images/cart-on")
    .cen
      flex: 1
      width: 0
      display: flex
      justify-content: center
      align-items: center
      margin: 0 8%
      opacity: 0
      pointer-events: none
      position: relative
      z-index: 2
      &>div
        position: relative
        flex: 1
        width: 0
        font-size: 13px
        height: 44px
        text-align: center
        line-height: 44px
        border-bottom: 2px solid #fff
        transition: all 0.4s ease
        &.act
          color: #ff0036
          border-color: #ff0036
    &.act
      background: #FFFFFF
      &:after
        opacity: 1
      .cen
        opacity: 1
        pointer-events: auto
      .le
        .ico
          background-color: transparent
          bg-image("~common/images/pro-goback")
      .ri
        .ico
          background-color: transparent
          bg-image("~common/images/cart")
  .good-banner
    width: 100%
    overflow: hidden
    position: relative
    .swiper-container
      .swiper-wrapper
        img
          width: 100%
          height: 375px
          background: #F9F9F9 url("~common/images/logo.png") 50% 50%/auto no-repeat
      .pro-swiper-pagination
        position: absolute
        z-index: 1
        text-align: center
  .good-info
    padding: 10px 12px
    background: #FFFFFF
    .title
      color: #051B28
      font-size: 14px
      line-height: 20px
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    .bai-pin
      overflow: hidden
      color: #666666
      margin-top: 6px
      padding-top: 15px
      position: relative
      &:after
        line-scale()
        top: 0
        bottom: auto
      .fl
        float: left
      .ri
        float: right
        a
          color: #F23B62
    .kucui
      color: #666666
      padding-top: 15px
      overflow: hidden
      .fl
        float: left
      .ri
        float: right
  .evaluate
    margin-top: 10px
    padding: 10px
    background: #FFFFFF
    h2
      padding: 2px 0 6px
      font-size: 14px
      color: #666666
    .look-more-eval
      width: 107px
      height: 24px
      margin: 14px auto 5px
      border: 1px solid rgba(255, 0, 54, .5)
      color: rgba(255, 0, 54, .8)
      background: #fff
      border-radius: 12px
      line-height: 0
      font-size: 12px
      padding: 12px 0
      -webkit-appearance: none
      text-align: center
  .goods-img
    margin-top: 10px
    background: #fff
    padding: 10px 10px 0
    .tit
      color: #666666
      font-size: 14px
      text-align: center
      line-height: 24px
    .content
      margin-top: 10px
      background: #ffffff
      padding-bottom: 60px
  .good-bottom-fix
    position: fixed
    height: 46px
    width: 100%
    max-width: 750px; /*no*/
    bottom: 0
    background: #FFFFFF
    display: flex
    .item
      display: flex
      flex: 1
      flex-direction: column
      justify-content: center
      align-items: center
      &.yellow
        font-size: 14px
        color: #FFFFFF
        background: #e7b32b
      &.red
        font-size: 14px
        color: #FFFFFF
        background: #FF0036
    .mi-item
      max-width: 80px
      .i-home
        display: block
        width: 20px
        height: 20px
        margin-bottom: 3px
        background: 50% 50%/90% no-repeat
        bg-image("~base/footer-nav/images/nav1")
      .i-fav
        display: block
        width: 20px
        height: 20px
        margin-bottom: 3px
        background: 50% 50%/90% no-repeat
        bg-image("~common/images/fav")
        &.on
          bg-image("~common/images/fav-on")
  .mint-popup-bottom
    width: 100%
    top: 30%
  .po-box
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .po-head-img
      position: absolute
      width: 120px
      height: 120px
      border: 1px solid rgba(0,0,0,.1)
      top: -40px
      left: 10px
      img
        width: 100%
        height: 100%
    .po-body
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 46px
      overflow-x: hidden
      overflow-y: auto
      .top
        margin: 8px 10px 0 140px
        .name
          color: #051B28
          font-size: 14px
          line-height: 20px
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
      .format-list
        padding: 10px
        .format-item
          position: relative
          padding: 14px 0
          &.format-item-big
            padding: 10px 0
            .name
              line-height: 36px
            .number
              position: absolute
              right: 10px
              top: 10px
              width: 100px
              height: 36px
              display: flex
              .min, .add
                display: block
                width: 30px
                height: 36px
                background-color: #f5f5f5
                display: flex
                justify-content: center
                align-items: center
                font-size: 24px
                padding-bottom: 3px
              .input
                flex: 1
                width: 0
                background: #f5f5f5
                input
                  background: #f5f5f5
                  outline: none
                  width: 100%
                  height: 100%
                  text-align: center
                  font-size: 16px
          .name
            font-size: 14px
            color: #333333
            padding-bottom: 10px
          .val-list
            font-size: 0
            a
              display: inline-block
              line-height: 0
              padding: 16px
              font-size: 14px
              background: #f3f3f3
              border-radius: 3px
              color: #555
              margin-right: 10px
              &.on
                color: #FFFFFF
                background: #ff0036
          &:after
            line-scale()
            top: 0
            bottom: auto
    .po-btn
      position: absolute
      height: 46px
      left: 0
      right: 0
      bottom: 0
      font-size: 14px
      text-align: center
      line-height: 46px
      color: #FFFFFF
      background: #ff0036
  .price
    line-height: 36px
    height: 36px
    .money-ico
      font-size: 16px
      color: #ff0036
    .big-pri
      color: #ff0036
      font-weight: 300
      font-size: 24px
    .small-pri
      color: #ff0036
      font-size: 16px
    .zx
      display: inline-block
      height: 14px
      width: 28px
      overflow: hidden
      position: relative
      margin-right: 4px
      &:before
        content: '分享'
        font-size: 20px
        width: 56px
        height: 28px
        color: #FFFFFF
        position: relative
        background: #ff0036
        line-height: 28px
        text-align: center
        display: block
        border-radius: 5px
        transform: scale(0.5)
        transform-origin: 0 0
    .old-pri
      font-size: 14px
      color: #666666
      font-weight: 300
      margin-left: 14px
      text-decoration: line-through
</style>
