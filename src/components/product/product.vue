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
    <div class="good-banner">
      <swiper :options="swiperOptionProBanner" ref="proBannerSwiper">
        <swiper-slide>
          <a>
            <img src="https://img.alicdn.com/imgextra/i3/196993935/TB1zVRudY1YBuNjSszhXXcUsFXa_!!0-item_pic.jpg">
          </a>
        </swiper-slide>
        <swiper-slide>
          <a>
            <img src="https://img.alicdn.com/imgextra/i3/196993935/TB1zVRudY1YBuNjSszhXXcUsFXa_!!0-item_pic.jpg">
          </a>
        </swiper-slide>
        <swiper-slide>
          <a>
            <img src="https://img.alicdn.com/imgextra/i3/196993935/TB1zVRudY1YBuNjSszhXXcUsFXa_!!0-item_pic.jpg">
          </a>
        </swiper-slide>
        <div class="pro-swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="good-info">
      <h2 class="title">楼外楼名楼伴手礼210g礼盒杭州特产正宗传统糕点零食点心口味混搭</h2>
      <div class="price">
        <span class="money-ico">￥</span><span class="big-pri">255.</span><span class="small-pri">00</span>
      </div>
      <div class="price" v-if="false">
        <span class="zx"></span><span class="money-ico">￥</span><span class="big-pri">255.</span><span class="small-pri">00</span>
        <span class="old-pri">￥300.00</span>
      </div>

      <div class="bai-pin">
        <div class="fl">编号：EH147738347075</div>
        <div class="ri">品牌：<a>楼外楼</a></div>
      </div>

      <div class="kucui">
        <div class="fl">预计3-7个工作日送达</div>
        <div class="ri">库存：10件</div>
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
      <div class="content">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderPub from 'base/header/header-pub'
import EvalInfo from 'base/eval-info/eval-info'
import { URL } from '@/api/config'

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
      showNav: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    changeCurAct (val) { // 导航变动
      this.navAct = val
      let duceOffset = this.$refs.proHeader.clientHeight
      let offsetTop = [this.$refs.proHeader.offsetTop - duceOffset, this.$refs.evaluate.offsetTop - duceOffset, this.$refs.goodsImg.offsetTop - duceOffset]
      document.documentElement.scrollTop = offsetTop[val - 1]
      document.body.scrollTop = offsetTop[val - 1]
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let duceOffset = this.$refs.proHeader.clientHeight
      let offsetTop1 = this.$refs.proHeader.offsetTop - duceOffset
      let offsetTop2 = this.$refs.evaluate.offsetTop - duceOffset
      let offsetTop3 = this.$refs.goodsImg.offsetTop - duceOffset
      console.log(scrollTop, offsetTop1, offsetTop2, offsetTop3)
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
      content: none
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
        content: ' '
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
    padding: 10px 0 0
    .tit
      color: #666666
      font-size: 14px
      text-align: center
      line-height: 24px
    .content
      margin-top: 10px
      background: #ffffff
      height: 1000px
</style>
