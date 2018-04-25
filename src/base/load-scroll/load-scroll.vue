<template>
  <p class="page-infinite-loading">
    <span style="font-size: 0" v-if="ifShowLoad">
      <div class="mint-spinner-fading-circle circle-color-117" style="width: 18px; height: 18px;">
        <div class="mint-spinner-fading-circle-circle is-circle2"></div>
        <div class="mint-spinner-fading-circle-circle is-circle3"></div>
        <div class="mint-spinner-fading-circle-circle is-circle4"></div>
        <div class="mint-spinner-fading-circle-circle is-circle5"></div>
        <div class="mint-spinner-fading-circle-circle is-circle6"></div>
        <div class="mint-spinner-fading-circle-circle is-circle7"></div>
        <div class="mint-spinner-fading-circle-circle is-circle8"></div>
        <div class="mint-spinner-fading-circle-circle is-circle9"></div>
        <div class="mint-spinner-fading-circle-circle is-circle10"></div>
        <div class="mint-spinner-fading-circle-circle is-circle11"></div>
        <div class="mint-spinner-fading-circle-circle is-circle12"></div>
        <div class="mint-spinner-fading-circle-circle is-circle13"></div>
      </div>
    </span>
    <span>{{title}}</span>
  </p>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    loadType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      title: '正在努力加载中。。。',
      ifShowLoad: true
    }
  },
  created () {
    this.stateChange()
  },
  methods: {
    stateChange () {
      switch (this.loadType) {
        case 1:
          this.title = '正在努力加载中。。。'
          this.ifShowLoad = true
          break
        case 2:
          this.title = '没有更多数据了'
          this.ifShowLoad = false
          break
      }
    }
  },
  watch: {
    loadType () {
      this.stateChange()
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .page-infinite-loading
    text-align: center
    height: 61px
    line-height: 46px
    background: #FFFFFF
    padding-bottom: 15px
    div
      display: inline-block
      vertical-align: middle
      margin-right: 5px
    span
      vertical-align: middle
      font-size: 14px
      color: #999999
  .mint-spinner-fading-circle-circle::before
    background: #999999
</style>
