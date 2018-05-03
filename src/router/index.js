import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import HomeSearch from '@/base/header/header-search'
import Sitemap from 'components/sitemap/sitemap'
import Brand from 'components/brand/brand'
import BrandDetail from 'components/brand-detail/brand-detail'
import SearchList from 'components/search-list/search-list'
import NewsList from 'components/news-list/news-list'
import NewsDetail from 'components/news-detail/news-detail'
import SpecialZone from 'components/special-zone/special-zone'
import Product from 'components/product/product'
import Comment from 'components/comment/comment'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/site/index'
    },
    {
      path: '/index.php',
      redirect: '/site/index'
    },
    { // 网站首页路由
      path: '/site/index',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    { // 网站搜索路由
      path: '/site/index/search',
      name: 'HomeSearch',
      component: HomeSearch,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站搜索列表路由
      path: '/site/index/search-list',
      name: 'SearchList',
      component: SearchList,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站分类路由
      path: '/site/index/sitemap',
      name: 'Sitemap',
      component: Sitemap,
      meta: {
        keepAlive: true
      }
    },
    { // 网站品牌列表路由
      path: '/site/index/brand',
      name: 'Brand',
      component: Brand,
      meta: {
        keepAlive: true,
        noShowFooter: true
      }
    },
    { // 网站品牌详细路由
      path: '/site/index/brand-detail',
      name: 'BrandDetail',
      component: BrandDetail,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站资讯中心路由
      path: '/site/index/news-list',
      name: 'NewsList',
      component: NewsList,
      meta: {
        noShowFooter: true
      }
    },
    { // 网站新闻详细路由
      path: '/site/index/news-detail',
      name: 'NewsDetail',
      component: NewsDetail,
      meta: {
        noShowFooter: true
      }
    },
    { // 特惠专区
      path: '/site/index/special-zone',
      name: 'SpecialZone',
      component: SpecialZone,
      meta: {
        noShowFooter: true
      }
    },
    { // 商品页面
      path: '/site/index/product',
      name: 'Product',
      component: Product,
      meta: {
        noShowFooter: true
      }
    },
    { // 商品评价
      path: '/site/index/comment',
      name: 'Comment',
      component: Comment,
      meta: {
        noShowFooter: true
      }
    }
  ]
})
