<template>
  <div class="eval-info">
    <div class="user-info">
      <img class="user-img" :src="showHeaderImg" />
      <div class="user-name" v-if="evalData.username">{{evalData.username.slice(0, 2)}}******{{evalData.username.charAt(evalData.username.length-1)}}</div>
      <div class="user-level" v-if="evalData.group_id === '3'"></div>
    </div>
    <div class="user-eval">
      {{evalData.contents}}
    </div>
    <div class="order-info">
      {{evalData.comment_time}}
    </div>
    <div class="seller-re" v-if="evalData.recontents">
      <span>商家回复：</span>{{evalData.recontents}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import avatar from './user_ico.jpg'

export default {
  props: {
    evalData: {
      type: Object,
      dafault: {}
    }
  },
  computed: {
    showHeaderImg () {
      let headIco = this.evalData.head_ico
      if (!this.evalData.head_ico) {
        headIco = avatar
      }
      return headIco
    }
  }
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
