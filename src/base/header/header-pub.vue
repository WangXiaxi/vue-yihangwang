<template>
  <!-- 加个随机参数防止VUE报红色错误 -->
  <div class="header-box">
    <div class="go-back" @click="goBack"></div>
    <div class="tit">{{headerTitle}}</div>
    <div class="right-btn">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    headerTitle: {
      type: String,
      dafault: '忆杭网'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.header-box
  height: 42px
  background: RGB(255, 255, 255)
  position: fixed
  top: 0
  width: 100%
  max-width: 750px; /*no*/
  z-index: 10
  &:after
    line-scale()
  .tit
    text-align: center
    width: 100%
    line-height: 42px
    font-size: 18px
  .go-back
    width: 42px
    height: 42px
    position: absolute
    left: 0
    top: 0
    background: 50% 50%/10px 18px no-repeat
    bg-image("~common/images/goback")
  .right-btn
    position: absolute
    right: 12px
    top: 0
    height: 42px
</style>
