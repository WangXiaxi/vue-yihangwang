import axios from 'common/js/http.js'
import { URL } from './config'
// import qs from 'qs'

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

/** 获取新闻列表详细 **/
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

/** 商品查询 **/
export function discountArea (data) {
  const url = URL + '/ajaxapi/discountArea'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
