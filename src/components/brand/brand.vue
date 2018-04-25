<template>
  <div class="brand child-view">
    <header-pub headerTitle="商品品牌"></header-pub>
    <div v-if="brandList.length>0" class="brand-box">
      <router-link v-for="(item, index) in brandList" :to="`/site/index/brand-detail?id=${item.id}`" tag="a" :key="index">
        <img class="brand-img" :src="imgHandle(item.logo)" />
        <h3 class="brand-tit">{{item.name}}</h3>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getBrandList } from '@/api/api.js'
import HeaderPub from 'base/header/header-pub'
import { URL } from '@/api/config'

export default {
  components: {
    HeaderPub
  },
  data () {
    return {
      brandList: []
    }
  },
  created () {
    getBrandList().then((res) => {
      if (res.code === 1) {
        this.brandList = res.data
      }
    })
  },
  methods: {
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
.brand
  padding-top: 52px
  .brand-box
    position: relative
    overflow: hidden
    padding: 0 6px
    a
      display: block
      width: 50%
      float: left
      padding: 0 6px
      margin-bottom: 10px
      .brand-img
        width: 100%
        border: 1px solid #eee
      .brand-tit
        text-align: center
        font-size: 14px
        line-height: 28px
        font-weight: 500
</style>
