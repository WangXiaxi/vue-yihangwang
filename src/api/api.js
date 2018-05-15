import axios from 'common/js/http.js'
import { URL } from './config'
import qs from 'qs'

/** 首页分类 **/
export function getHome () {
  const url = URL + '/ajaxapi/getHome'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 商品查询 **/
export function getSearch (data) {
  const url = URL + '/ajaxapi/getSearch'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 商品分类 **/
export function getProSitemap () {
  const url = URL + '/ajaxapi/getProSitemap'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 名牌优品牌 **/
export function getBrandList () {
  const url = URL + '/ajaxapi/getBrandList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 名牌优品牌详细 **/
export function getBrandDetail (data) {
  const url = URL + '/ajaxapi/getBrandDetail'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 获取新闻列表详细 **/
export function getNewsList (data) {
  const url = URL + '/ajaxapi/getNewsList'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 获取新闻详细 **/
export function getNewsDetail (id) {
  const url = URL + '/ajaxapi/getNewsDetail'
  const data = {
    id: id
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 获取特惠专区 **/
export function discountArea (data) {
  const url = URL + '/ajaxapi/discountArea'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 获取商品详细 **/
export function getGoodsDetail (data) {
  const url = URL + '/ajaxapi/getGoodsDetail'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 商品收藏商品 **/
export function actAddFavorite (data) {
  const url = URL + '/simple/favorite_add'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 商品选择规格 **/
export function actChangeSpec (data) {
  const url = URL + '/site/getProduct'
  return axios.post(url, qs.stringify(data, {arrayFormat: 'indices'})).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 商品加入购物车操作 **/
export function actJoinCart (data) {
  const url = URL + '/simple/joinCart'
  return axios.post(url, qs.stringify(data, {arrayFormat: 'indices'})).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 购物车查询操作 **/
export function getShowCart () {
  const url = URL + '/simple/showCart'
  return axios.get(url, {
    params: {
      random: Math.random()
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 获取商品评价 **/
export function getCommentList (data) {
  const url = URL + '/ajaxapi/goodsComments'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 获取购物车商品 **/
export function getCartList () {
  const url = URL + '/ajaxapi/getCartList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/** 购物车删除操作 **/
export function removeCart (data) {
  const url = URL + '/simple/removeCart'
  let goodsId = data.product_id > 0 ? data.product_id : data.goods_id
  let goodsType = data.product_id > 0 ? 'product' : 'goods'
  let datas = {
    goods_id: goodsId,
    type: goodsType,
    random: Math.random()
  }
  return axios.get(url, {
    params: datas
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
