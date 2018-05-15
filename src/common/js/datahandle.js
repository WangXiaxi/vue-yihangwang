import minlogo from 'common/images/minlogo.png' // 引入图片

export function sitemapJsonHandle (data) {
  let f = JSON.parse(JSON.stringify(data.top))
  data.second.map((t) => {
    f.map((o) => {
      if (t.parent_id === o.id) {
        if (typeof (o.children) !== 'object') {
          o.children = []
        }
        o.children.push(JSON.parse(JSON.stringify(t)))
      }
    })
  })
  return f
}

export function homeFloorJsonHandle (data) {
  let f = JSON.parse(JSON.stringify(data.homecatsRows))
  let g = JSON.parse(JSON.stringify(data.homegoodsRows))
  f.map((o, i) => {
    o.children = g[i].slice(0, 2)
  })
  return f
}

export function compare (property, sort) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    if (sort === 'desc') {
      return value1 - value2
    } else {
      return value2 - value1
    }
  }
}

// echo 转 arr
export function evalArr (data) {
  let dataArr = []
  if (data) {
    let dataObj = JSON.parse(data)
    for (let k in dataObj) {
      dataObj[k].value = dataObj[k].value.split(',')
      dataArr.push(dataObj[k])
    }
  }
  return dataArr
}

// cart data 操作
export function cartDataHandle (data) {
  let newArr = []
  data.forEach((cur, index) => {
    if (cur.spec_array) {
      cur.spec_array = evalArr(cur.spec_array)
    }
    let isExist = true // 默认允许添加
    for (let i = 0; i < newArr.length; i++) {
      if (Number(newArr[i].brand_id) === Number(cur.brand_id)) {
        isExist = false
        newArr[i].children.push(cur)
        break
      }
    }
    if (isExist) {
      let brandObj = {}
      if (cur.brand_id) {
        brandObj = {
          brand_id: cur.brand_id,
          brand_logo: cur.brand_logo,
          brand_name: cur.brand_name,
          brand_url: `/site/index/brand-detail?id=${cur.brand_id}`,
          children: []
        }
      } else {
        brandObj = {
          brand_id: 0,
          brand_logo: minlogo,
          brand_name: '忆杭网自营',
          brand_url: '/site/index/sitemap',
          children: []
        }
      }
      brandObj.children[0] = cur
      newArr.push(brandObj)
    }
  })
  return newArr
}
