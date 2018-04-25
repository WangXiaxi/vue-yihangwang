<template>
  <a :href="`/site/products/id/${goodInfo.id}`" class="goods-info">
    <div class="img-box">
      <img v-lazy="imgHandle(goodInfo.img, '@_@w@_@200@_@h@_@200')">
    </div>
    <div class="info">
      <p class="tit">{{goodInfo.name}}</p>
      <div class="price"><span class="tip">￥</span><span class="money">{{goodInfo.sell_price.split(".")[0]}}.</span><span class="tip">{{goodInfo.sell_price.split(".")[1]}}</span></div>
      <div class="sell-num">库存{{goodInfo.store_nums}}</div>
    </div>
  </a>
</template>

<script type="text/ecmascript-6">
import { URL } from '@/api/config'
export default {
  props: {
    goodInfo: {
      type: Object,
      dafault: {}
    }
  },
  methods: {
    imgHandle (img, size) {
      let handImg = img.replace(/\//g, '@_@')
      return `${URL}/pic/thumb/img/${handImg}${size}`
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.goods-info
  display: block
  .img-box
    width: 100%
    padding-top: 100%
    position: relative
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: #F9F9F9 url("~common/images/logo.png") 50% 50%/70% auto no-repeat
  .info
    position: relative
    padding: 3px 6px 6px 6px
    .tit
      height: 32px
      position: relative
      overflow: hidden
      color: RGB(102, 102, 102)
      font-size: 12px
      line-height: 16px
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    .price
      color: RGB(235, 18, 18)
      padding-top: 10px
      .tip
        font-size: 10px
      .money
        font-size: 14px
    .sell-num
      position: absolute
      right: 6px
      bottom: 6px
      color: RGB(153, 153, 153)
      font-size: 10px
      line-height: 14px
</style>
