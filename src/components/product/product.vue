<template>
  <div class="product child-view">
    <div class="pro-header" :class="{act: showNav}" ref="proHeader">
      <div class="le" @click="goBack">
        <i class="ico"></i>
      </div>
      <div class="cen">
        <div :class="{act: navAct === 1}" @click.stop="changeCurAct(1)">商品</div>
        <div v-if="commentCount > 0" :class="{act: navAct === 2}" @click.stop="changeCurAct(2)">评价</div>
        <div :class="{act: navAct === 3}" @click.stop="changeCurAct(3)">详情</div>
      </div>
      <div class="ri">
        <a href="/simple/cart">
          <i class="ico"></i>
          <div class="cart-num" v-if="cartNum > 0">{{cartNum}}</div>
        </a>
      </div>
    </div>
    <div class="good-banner">
      <swiper v-if="goodsInfo.photo && goodsInfo.photo.length > 0" :options="swiperOptionProBanner" ref="proBannerSwiper">
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

    <div ref="evaluate">
      <div class="evaluate" v-if="commentCount > 0">
        <h2 class="tit">商品评价 ({{commentCount}})</h2>
        <div class="eval-list">
          <eval-info :evalData="comment[0]"></eval-info>
        </div>
        <router-link :to="`/site/index/comment?goods_id=${$route.query.id}`" tag="div" class="look-more-eval">查看更多评价</router-link>
      </div>
    </div>

    <div class="goods-img" ref="goodsImg">
      <h2 class="tit">商品详情</h2>
      <div class="content article_detail" v-html="goodsInfo.content">
      </div>
    </div>

    <div class="good-bottom-fix">
      <router-link to="/site/index" class="item mi-item"><i class="i-home"></i><p>首页</p></router-link>
      <a class="item mi-item"><i class="i-fav" @click="addFavorite()" :class="{'on' : favoriteText === '已收藏'}"></i><p>{{favoriteText}}</p></a>
      <a class="item yellow" @click="changepPopupVisible(1)">加入购物车</a>
      <a class="item red" @click="changepPopupVisible(2)">立即购买</a>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="po-box">
        <div class="po-close" @click="closePopupVisible()"></div>
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
          <div class="easy-info">
            <div class="le">编号：{{goodsInfo.goods_no}}</div>
            <div class="ri">库存：{{goodsInfo.store_nums}}件</div>
          </div>
          <div class="format-list" v-if="goodsInfo.spec_array instanceof Array">
            <div v-for="(item, index) in goodsInfo.spec_array" :key="index" class="format-item">
              <h2 class="name">
                {{item.name}}
              </h2>
              <div class="val-list">
                <a v-for="(itemc, indexc) in item.value" :class="{'on': specJSON[index] && specJSON[index].value === itemc}" @click="changeSpec(item.id, itemc, item.name, index)" :key="indexc">{{itemc}}</a>
              </div>
            </div>
            <div class="format-item format-item-big">
              <h2 class="name">购买数量</h2>
              <div class="number">
                <div class="min" @touchmove.stop.prevent @click.stop.prevent="minNum" ref="minNum" :class="{disable: counter <= 1}">-</div>
                <div class="input">
                  <input name="pricenum" v-model="counter" type="tel">
                </div>
                <div class="add" @touchmove.stop.prevent @click.stop.prevent="addNum" ref="addNum" :class="{disable: counter >= goodsInfo.store_nums}">+</div>
              </div>
            </div>
          </div>
        </div>
        <div class="po-btn" @touchmove.stop.prevent @click.stop.prevent="goActUrl()">
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
import { getGoodsDetail, actAddFavorite, actChangeSpec, actJoinCart, getShowCart, getCommentList } from '@/api/api.js'
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
      counter: 1, // 数量加减
      favoriteText: '收藏',
      favoriteSync: 0,
      specJSON: [],
      clickSync: 0, // 防止重复点击
      comment: [], // 评价
      commentCount: 0,
      cartNum: 0
    }
  },
  created () {
    this._getAllData()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goActUrl () { // 执行立即购买加入购物车操作
      if (this.clickSync) {
        return
      }
      if (this.checkSpecFull()) {
        this.toast('请先选择商品规格')
        return
      }
      if (Number(this.goodsInfo.store_nums) <= 0) {
        this.toast('该规格商品库存不足')
        return
      }
      let type = 'goods'
      let id = this.goodsInfo.id
      if (this.goodsInfo.spec_goods_id) {
        type = 'product'
        id = this.goodsInfo.spec_goods_id
      }
      if (this.popupBtnTitle === '加入购物车') {
        this.clickSync = 1
        this.loading.open({
          spinnerType: 'triple-bounce'
        })
        actJoinCart({goods_id: id, type: type, goods_num: this.counter}).then((res) => {
          if (res.message === '添加成功') {
            getShowCart().then((json) => {
              this.toast(`目前选购商品共${json.count}件，合计：￥${json.sum}`)
              this.clickSync = 0
              this.loading.close()
              this.cartNum = json.count
            })
          } else {
            this.toast(res.message)
            this.loading.close()
            this.clickSync = 0
          }
        })
      } else {
        let needUrl = `/simple/cart2/id/${id}/num/${this.counter}/type/${type}`
        window.location.href = needUrl
      }
    },
    changeSpec (specId, specData, specName, index) { // 插入数据规格
      this.$set(this.specJSON, index, {id: specId, type: specData.split('/').length > 3 ? 2 : 1, value: specData, name: specName})
      if (this.checkSpecFull()) return
      this.loading.open({
        spinnerType: 'triple-bounce'
      })
      actChangeSpec({goods_id: this.goodsInfo.id, specJSON: this.specJSON}).then((res) => {
        this.loading.close()
        if (res.flag === 'success') {
          let data = res.data
          this.goodsInfo = Object.assign({}, this.goodsInfo, {goods_no: data.products_no, store_nums: data.store_nums, sell_price: data.sell_price, spec_goods_id: data.id, market_price: data.market_price, weight: data.weight})
        } else {
          this.toast(res.message)
        }
      })
    },
    checkSpecFull () { // 检测规格是否完整
      let full = 0
      for (let i = 0; i < this.specJSON.length; i++) {
        if (!this.specJSON[i].id) {
          full = 1
          break
        }
      }
      return full
    },
    addFavorite () { // 收藏操作完成
      if (this.favoriteText === '已收藏' || this.favoriteSync) return
      this.favoriteSync = 1
      this.loading.open({
        spinnerType: 'triple-bounce'
      })
      actAddFavorite({'goods_id': this.goodsInfo.id, 'random': Math.random()}).then((res) => {
        this.loading.close()
        if (res.message === '请先登录') {
          window.location.href = `${URL}/simple/login?tourist&callback=/site/index/product?id=${this.goodsInfo.id}`
        } else if (res.message === '收藏成功') {
          this.favoriteText = '已收藏'
          this.toast(res.message)
        } else {
          this.toast(res.message)
        }
        this.favoriteSync = 0
      })
    },
    addNum () { // 数量操作增加
      this.counter = this.counter + 1
    },
    minNum () { // 数量操作减少
      this.counter = this.counter - 1
    },
    changepPopupVisible (val) { // 购物车与立即购买操作
      this.popupBtnTitle = val === 1 ? '加入购物车' : '立即购买'
      this.popupVisible = !this.popupVisible
    },
    closePopupVisible () {
      this.popupVisible = false
    },
    _getAllData () { // 获取数据
      let promise1 = new Promise((resolve, reject) => {
        getGoodsDetail(this.$route.query).then((res) => {
          if (res.code === 1) {
            if (!res.data.id) { // 如果商品id 不存在显示商品下架
              this.toast('当前商品不存在或已经下架')
              setTimeout(() => {
                this.goBack()
              }, 2000)
              return
            }
            this.goodsInfo = res.data
            this.goodsInfo.spec_array = evalArr(this.goodsInfo.spec_array)
            this.goodsInfo.spec_array.forEach((cur, index) => { // 添加规格设定
              this.specJSON.push({})
            })
            this.favoriteText = this.goodsInfo.is_favorite !== 'true' ? '收藏' : '已收藏'
            // this.goodsInfo.content = this.goodsInfo.content.replace(/\/upload\/image/g, `${URL}/upload/image`)
          } else {
            this.toast('当前商品不存在或已经下架')
            setTimeout(() => {
              this.goBack()
            }, 2000)
            return
          }
          resolve(res.data)
        })
      })
      let promise2 = new Promise((resolve, reject) => {
        getCommentList({goods_id: this.$route.query.id, page: 1}).then((res) => {
          if (res.count > 0) {
            this.commentCount = res.count
            this.comment = res.data
          }
        })
      })
      let promise3 = new Promise((resolve, reject) => {
        getShowCart().then((res) => {
          this.cartNum = res.count
        })
      })
      let promiseAll = Promise.all([promise1, promise2, promise3])
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
    counter (N, O) { // 监听数量
      this.counter = Number(N)
      if (N <= 1) {
        this.counter = 1
      }
      if (N >= Number(this.goodsInfo.store_nums)) {
        this.counter = Number(this.goodsInfo.store_nums)
      }
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
.mint-toast.is-placemiddle // 要比mint-popup大
  z-index: 2002
.mint-popup.mint-popup-bottom
  z-index: 2000 !important
.v-modal
  z-index: 1999 !important
.mint-toast-text
  line-height: 1.6
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
      transition: all 0.4s ease
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
      position: relative
      .ico
        bg-image("~common/images/cart-on")
      .cart-num
        position: absolute
        z-index: 1
        top: 4px
        right: -10px
        background: #ff0036
        color: #FFFFFF
        font-size: 20px
        padding: 6px
        text-align: center
        line-height: 20px
        min-width: 32px
        border-radius: 26px
        transform: scale(0.5)
        transform-origin: 0 0
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
      transition: all 0.4s ease
      &>div
        position: relative
        flex: 1
        width: 0
        font-size: 13px
        height: 44px
        text-align: center
        line-height: 44px
        border-bottom: 2px solid #fff
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
    height: 375px
    overflow: hidden
    position: relative
    background: #F9F9F9 url("~common/images/logo.png") 50% 50%/auto no-repeat
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
    z-index: 10
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
          & + p
            color: #ff0036
  .mint-popup-bottom
    width: 100%
    top: 30%
  .po-box
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .po-close
      position: absolute
      z-index: 1
      top: 0
      right: 0
      top: 2px
      right: 2px
      width: 30px
      height: 30px
      background: url("~common/images/close.png") 50%/80% 80% no-repeat
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
          margin-right: 24px
          color: #051B28
          font-size: 14px
          line-height: 20px
          height: 40px
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
      .easy-info
        height: 30px
        padding: 10px
        color: #666
        .le
          float: left
        .ri
          float: right
      .format-list
        position: absolute
        top: 106px
        left: 0
        right: 0
        bottom: 0
        padding: 10px 10px 0 10px
        overflow-x: hidden
        overflow-y: scroll
        .format-item
          position: relative
          padding: 14px 0 8px
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
                extend-click()
                &.disable
                  color: #aaaaaa
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
                  line-height: 20px
                  padding: 8px 0
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
              margin-bottom: 8px
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
        content: '专享'
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
