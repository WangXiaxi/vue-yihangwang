<template>
  <div class="cart child-view">
    <header-pub headerTitle="购物车"></header-pub>
    <div class="goods-list">
      <div class="good-item">
        <div class="header-top">
          <div class="trade-name"><img class="pp-img" src="http://192.168.100.55/upload/2016/11/21/20161121193833421.png"><span>忆杭网自营</span></div>
          <div class="fr" @click="editIsShow()">编辑</div>
        </div>
        <div class="goods-info">
          <div class="goods-info-item">
            <div class="le">
              <div class="img-box">
                <img src="https://gw.alicdn.com/bao/uploaded/i3/TB1d7VNl8USMeJjy1zjuvs0dXXa_042436.jpg">
              </div>
              <div class="content">
                <h2>方回春堂人参玉苓竹茯苓</h2>
                <div>
                  <div class="spec">种类：百合 颜色：蓝色</div>
                  <div class="beizhu">
                  </div>
                  <div class="bot-box">
                    <div class="price"><span class="pri-ico">￥</span><span class="big">78.</span><span class="small">00</span></div>
                    <div class="num">x3</div>
                  </div>
                </div>
                <div class="change-num">
                  
                </div>
              </div>
            </div>
            <div class="ri">

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot-fix">
      <div class="right-info">
        <div class="fl"><span>已优惠:</span>￥50.00<i class="more-info"></i></div>
        <div class="fr"><span class="pub">合计:</span><span class="big">￥289.</span><span class="small">00</span></div>
      </div>
      <div class="submit-btn">结算(5)</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import HeaderPub from 'base/header/header-pub'
import { getCartList } from '@/api/api.js'
export default {
  components: {
    HeaderPub
  },
  data () {
    return {
    }
  },
  created () {
    getCartList().then((res) => {
      console.log(res)
    })
  },
  methods: {
    editIsShow () {
      alert(112)
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
          background: center right/6px no-repeat
          bg-image('~common/images/more')
          .pp-img
            display: inline-block
            height: 30px
            vertical-align: middle
          span
            display: inline-block
            max-width: 100px
            line-height: 40px
            font-size: 14px
            padding-right: 10px
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
        .goods-info-item
          position: relative
          display: flex
          &:after
            line-scale()
            background-image: linear-gradient(180deg, transparent, transparent 50%, #dedede 50%)
          &:last-child
            &:after
              content: none
          .le
            flex: 1
            width: 0
            overflow: hidden
            position: relative
            background: #f5f5f5
            height: 120px
            display: flex
            justify-content: center
            align-items: center
            .img-box
              width: 100px
              height: 100px
              margin-left: 10px
              img
                width: 100%
                height: 100%
            .content
              height: 100%
              margin-left: 10px
              flex: 1
              padding: 10px 10px 10px 0
              h2
                height: 42px
                line-height: 1.5
                font-size: 14px
                overflow: hidden
                text-overflow: ellipsis
                display: -webkit-box
                -webkit-line-clamp: 2
                -webkit-box-orient: vertical
              .spec
                color: #999
                font-size: 12px
                margin-top: 5px
              .beizhu
                margin-top: 5px
                height: 14px
                font-size: 12px
                line-height: 14px
                color: #ff0036
                opacity: 0.8
              .bot-box
                margin-top: 5px
                overflow: hidden
                .price
                  float: left
                  font-size: 12px
                  .pri-ico
                    color: #ff0036
                  .big
                    color: #ff0036
                    font-size: 16px
                  .small
                    color: #ff0036
                .num
                  float: right
                  font-size: 14px
                  padding-top: 2px
                  color: #666666
          .ri
            width: 0px
  .bot-fix
    background: #FFFFFF
    position: fixed
    bottom: 0
    left: 0
    right: 0
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
      width: 100px
      background: #ff0036
      color: #FFFFFF
      font-size: 14px
      line-height: 46px
      text-align: center
</style>
