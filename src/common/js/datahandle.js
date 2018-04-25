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
