<template>
  <router-link :to="`/site/index/product?id=${dataGoods.goods_id}`" tag="div" class="goods-info-item">
    <div class="le">
      <div class="img-box">
        <img :src="imgHandle(dataGoods.img, '@_@w@_@200@_@h@_@200')">
      </div>
      <div class="content">
        <h2>{{dataGoods.name}}</h2>
        <div class="origin">
          <div class="spec"><span v-if="dataGoods.spec_array" v-for="(item, index) in dataGoods.spec_array" :key="index">{{item.name}}：{{item.value[0]}} </span></div>
          <div class="beizhu">
          </div>
          <div class="bot-box">
            <div class="price">
              <span class="pri-ico">￥</span><span class="big">{{curPrice.toFixed(2).split(".")[0]}}.</span><span class="small">{{curPrice.toFixed(2).split(".")[1]}}</span>
              <span class="old-price" v-if="Number(curPrice) !== Number(dataGoods.sell_price)">￥{{dataGoods.sell_price}}</span>
            </div>
            <div class="num">x{{dataGoods.count}}</div>
          </div>
        </div>
        <div class="change-num">
          <div class="number">
            <div class="min" @touchmove.stop.prevent @click.stop.prevent="minNum" ref="minNum" :class="{disable: counter <= 1}">-</div>
            <div class="input">
              <input name="pricenum" v-model="counter" type="tel">
            </div>
            <div class="add" @touchmove.stop.prevent @click.stop.prevent="addNum" ref="addNum" :class="{disable: counter >= dataGoods.store_nums}">+</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ri" @click.stop.prevent="deleGoods">
      删除
    </div>
  </router-link>
</template>
<script type="text/ecmascript-6">
import { URL } from '@/api/config'

export default {
  props: {
    dataGoods: {
      type: Object,
      dafault: {}
    },
    brandIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      counter: this.dataGoods.count,
      curPrice: this.dataGoods.sum / this.dataGoods.count
    }
  },
  methods: {
    deleGoods () {
      this.$emit('clickDele', this.dataGoods, this.brandIndex)
    },
    imgHandle (img, size) {
      if (size) {
        let handImg = img.replace(/\//g, '@_@')
        return `${URL}/pic/thumb/img/${handImg}${size}`
      }
      return `${URL}/${img}`
    },
    addNum () { // 数量操作增加
      this.counter = this.counter + 1
    },
    minNum () { // 数量操作减少
      this.counter = this.counter - 1
    }
  },
  watch: {
    counter (N, O) { // 监听数量
      if (N <= 1) {
        this.counter = 1
      }
      if (N >= Number(this.dataGoods.store_nums)) {
        this.counter = Number(this.dataGoods.store_nums)
      }
      let diff = this.counter - this.dataGoods.count
      if (!diff) {
        return
      }
      let type = 'goods'
      let id = this.dataGoods.goods_id
      if (Number(this.dataGoods.product_id)) {
        type = 'product'
        id = this.dataGoods.product_id
      }
      this.$emit('changeNum', {goods_id: id, type: type, goods_num: diff})
    },
    dataGoods () {
      this.counter = this.dataGoods.count
      this.curPrice = this.dataGoods.sum / this.dataGoods.count
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.goods-info-item
  position: relative
  display: flex
  &:after
    line-scale()
    background-image: linear-gradient(180deg, transparent, transparent 50%, #eaeaea 50%)
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
      width: 0
      padding: 10px 10px 10px 0
      .change-num
        display: none
        position: relative
        .number
          position: absolute
          left: 10px
          top: 15px
          width: 100px
          height: 36px
          display: flex
          .min, .add
            display: block
            width: 30px
            height: 36px
            background-color: #ffffff
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
            background: #ffffff
            input
              background: #ffffff
              outline: none
              width: 100%
              height: 100%
              text-align: center
              font-size: 16px
              line-height: 20px
              padding: 8px 0
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
        height: 12px
        font-size: 12px
        margin-top: 5px
        width: 100%
        no-wrap()
        span
          color: #999
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
          .old-price
            color: #666
            text-decoration: line-through
        .num
          float: right
          font-size: 14px
          padding-top: 2px
          color: #666666
  .ri
    width: 0px
    transition: width 0.4s ease
    background: #ff0036
    overflow: hidden
    color: #fff
    font-size: 14px
    display: flex
    justify-content: center
    align-items: center
    white-space: nowrap
.dele
  .goods-info-item
    .ri
      width: 60px
    .le
      .origin
        display: none
      .change-num
        display: block
</style>
