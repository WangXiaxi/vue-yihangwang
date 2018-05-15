<template>
  <div class="cart child-view">
    <header-pub headerTitle="购物车"></header-pub>
    <div class="goods-list">
      <div class="good-item" v-for="(item, index) in cartData" :key="index">
        <div class="header-top">
          <router-link tag="div" :to="item.brand_url" class="trade-name"><img class="pp-img" :src="imgHandle(item.brand_logo)"><span>{{item.brand_name}}</span></router-link>
          <div class="fr" @click="editIsShow(index)">
            <span v-if="!brandIndexArr[index]">编辑</span>
            <span v-else>完成</span>
          </div>
        </div>
        <div class="goods-info" :class="{dele:brandIndexArr[index]}">
          <cart-goods-info v-for="(items, indexs) in item.children" @clickDele="deleGoods" @changeNum="changeNumAct" :dataGoods="items" :brandIndex="index" :key="indexs"></cart-goods-info>
        </div>
      </div>
    </div>
    <div class="bot-fix">
      <div class="right-info">
        <div class="fl" v-if="Number(favourSum)"><span>已优惠:</span>￥{{favourSum}}<i class="more-info"></i></div>
        <div class="fr"><span class="pub">合计:</span><span class="big">￥{{finalSum.split(".")[0]}}.</span><span class="small">{{finalSum.split(".")[1]}}</span></div>
      </div>
      <a @click="goCartTwo" class="submit-btn">结算({{goodsNum}})</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderPub from 'base/header/header-pub'
import CartGoodsInfo from 'base/cart-goods-info/cart-goods-info'
import { getCartList, removeCart, actJoinCart } from '@/api/api.js'
import { cartDataHandle } from 'common/js/datahandle'
import { URL } from '@/api/config'

export default {
  components: {
    HeaderPub,
    CartGoodsInfo
  },
  data () {
    return {
      cartData: [],
      finalSum: '0.00',
      favourSum: '0.00',
      goodsNum: 0,
      brandIndexArr: [] // 记录编辑按钮
    }
  },
  created () {
    this.loading.open({
      spinnerType: 'triple-bounce'
    })
    this.getData().then(() => {
      this.cartData.forEach(() => {
        this.brandIndexArr.push(false)
      })
    })
  },
  methods: {
    goCartTwo () {
      if (this.cartData.length === 0) {
        this.toast('请前往选购商品')
      } else {
        window.location.href = '/simple/cart2'
      }
    },
    changeNumAct (obj) {
      this.loading.open({
        spinnerType: 'triple-bounce'
      })
      actJoinCart(obj).then((res) => {
        if (res.message === '添加成功') {
          this.getData() // 重置数据
          this.loading.close()
        } else {
          this.toast(res.message)
          this.loading.close()
        }
      })
    },
    deleGoods (obj, brandIndex) {
      this.loading.open({
        spinnerType: 'triple-bounce'
      })
      let beforeLength = this.cartData.length
      removeCart(obj).then((res) => {
        if (!res.isError) {
          this.getData().then(() => {
            if (beforeLength !== this.cartData.length) {
              this.brandIndexArr = this.brandIndexArr.filter((t, index) => {
                return index !== brandIndex
              })
            }
          }) // 重置数据
        }
        this.loading.close()
      })
    },
    getData (callback) {
      let promise1 = new Promise((resolve, reject) => {
        getCartList().then((res) => {
          if (res.code === 1) {
            this.favourSum = res.data.reduce.toFixed(2)
            this.finalSum = res.data.final_sum.toFixed(2)
            this.goodsNum = res.data.count
            this.cartData = cartDataHandle(res.data.goodsList) // 针对商家排序操作
            setTimeout(() => {
              this.loading.close()
            }, 500)
            resolve()
          }
        })
      })
      return promise1
    },
    editIsShow (index) {
      this.$set(this.brandIndexArr, index, !this.brandIndexArr[index])
    },
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
.cart
  background: #ecf0f3
  padding-top: 52px
  padding-bottom: 52px
  min-height: 100%
  .goods-list
    .good-item
      width: 100%
      background: #FFFFFF
      // height: 150px
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
      .header-top
        height: 40px
        position: relative
        // background: red
        &:after
          line-scale()
        .trade-name
          float: left
          font-size: 0
          padding-left: 12px
          background: center right/12px no-repeat
          bg-image('~common/images/more-b')
          .pp-img
            display: inline-block
            height: 30px
            vertical-align: middle
          span
            display: inline-block
            max-width: 100px
            line-height: 40px
            font-size: 14px
            padding-right: 14px
            color: #666666
            vertical-align: middle
            no-wrap()
        .fr
          float: right
          width: 50px
          text-align: center
          line-height: 40px
          color: #666666
          font-size: 14px
      .goods-info
        position: relative
  .bot-fix
    background: #FFFFFF
    position: fixed
    z-index: 10
    bottom: 0
    width: 100%
    max-width: 750px; /*no*/
    height: 46px
    box-shadow: 0 0 2px 0 #dedede
    display: flex
    .right-info
      flex: 1
      width: 0
      .fl
        float: left
        height: 100%
        line-height: 46px
        padding-left: 10px
        max-width: 130px
        color: #ff0036
        no-wrap()
        span
          color: #666666
      .fr
        float: right
        height: 100%
        padding-right: 10px
        line-height: 46px
        color: #ff0036
        max-width: 135px
        no-wrap()
        .big
          color: #ff0036
          font-size: 16px
          line-height: 46px
        .pub
          color: #666666
        .small
          font-size: 12px
          line-height: 46px
    .submit-btn
      display: block
      width: 100px
      background: #ff0036
      color: #FFFFFF
      font-size: 14px
      line-height: 46px
      text-align: center
</style>
