<template>
  <div class="eval-info">
    <div class="user-info">
      <img class="user-img" src="https://img.alicdn.com/tps/TB1l6dkOXXXXXXEXVXXXXXXXXXX-210-210.png" />
      <div class="user-name">小星哈哈哈！</div>
      <div class="user-level"></div>
    </div>
    <div class="user-eval">
      按照图册买了一套，超级超级好评。基本款但是无论颜色还是款式都很喜欢，设计十分合理。橄榄色上衣很显气质，剪裁合理，穿上很好看。窄裙布料很舒服，我胯宽有点显，要努力减肥，瘦下来穿着一身会更加好看。总之，无比推荐图上的一套穿搭，为优衣库打call
    </div>
    <div class="order-info">
      2018-04-20 颜色分类:11 粉红色;尺码:160/84A/M
    </div>
    <div class="seller-re">
      <span>商家回复：</span>你个大坑或不买拉到，不要影响我写代码
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.eval-info
  position: relative
  .user-info
    margin: 10px 0
    font-size: 0
    .user-img
      width: 24px
      height: 24px
      border-radius: 50%
      vertical-align: middle
    .user-name
      display: inline-block
      font-size: 12px
      line-height: 22px
      padding: 5px
      vertical-align: middle
      color: #999
    .user-level
      display: inline-block
      vertical-align: middle
      height: 14px
      width: 28px
      overflow: hidden
      position: relative
      &:after
        content: '创客'
        font-size: 20px
        width: 56px
        height: 28px
        color: #FFFFFF
        position: relative
        background: #FF9500
        line-height: 28px
        text-align: center
        display: block
        border-radius: 5px
        transform: scale(0.5)
        transform-origin: 0 0
  .user-eval
    font-size: 13px
    line-height: 17px
    text-align: justify
    text-indent: 2em
  .order-info
    font-size: 10px
    padding-top: 8px
    color: #999
    line-height: 14px
  .seller-re
    margin-top: 8px
    font-size: 13px
    line-height: 17px
    text-align: justify
    span
      color: #666666
</style>
