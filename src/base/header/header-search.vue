<template>
  <!-- 加个随机参数防止VUE报红色错误 -->
  <transition name="opac">
    <div class="header-search child-view">
      <div class="form">
        <div class="go-back" @click="goBack">返回</div>
        <div class="input-group">
          <input class="search" v-model="search" placeholder="请输入搜索商品关键词" ref="inputSearch">
          <div class="btn" @click="goSearch">
            搜索
          </div>
        </div>
      </div>
      <div class="history-list">
        <h3>最近查询</h3>
        <ul>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
          <li>楼外楼</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goSearch () {
      this.$router.push({path: '/site/index/search-list', query: {word: this.search}})
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.opac-enter-active,.opac-leave-active
  transition: all 0.5s
.opac-enter,.opac-leave-to
  opacity: 0
.header-search
  .form
    padding: 50px 12px 10px
    position: relative
    .go-back
      width: 80px
      height: 42px
      position: absolute
      left: 0
      top: 0
      font-size: 14px
      line-height: 14px
      padding: 15px 0 13px 32px
      background: 20% 50%/10px 18px no-repeat
      opacity: 0.8
      bg-image("~common/images/goback")
    .input-group
      position: relative
      padding-right: 64px
      &:after
        line-scale()
      .search
        display: block
        width: 100%
        font-size: 16px
        line-height: 28px
        padding: 10px 12px
        outline: none
      .btn
        position: absolute
        right: 2px
        top: 7px
        font-size: 16px
        background: #d29e61
        width: 60px
        line-height: 28px
        padding: 2px
        color: #FFFFFF
        text-align: center
        border-radius: 3px
  .history-list
    padding: 10px 12px
    h3
      color: #666666
      font-size: 14px
      font-weight: 400
    ul
      font-size: 0
      padding-top: 10px
      li
        display: inline-block
        padding: 5px 8px
        border-radius: 30px
        border: 1px solid #ccc
        margin-right: 10px
        margin-bottom: 8px
        font-size: 12px
        line-height: 14px
        Letter-spacing: 1px
        color: #999999
        &:first-child
          margin-left: 26px
</style>
