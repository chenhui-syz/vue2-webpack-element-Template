import Mock from 'mockjs'

const products = Mock.mock({
  'items|30': [{
    productID: '@id',
    productName: '@title',
    productSecret: '@guid',
    description: '@sentence(10, 20)',
    createTime: '@datetime',
    status: '@boolean'
  }]
})

const product = {
  productID: '123',
  productName: '测试系统名',
  productSecret: 'asd-zxc-qwe',
  description: '我是描述我是描述我是描述我是描述我是描述我是描述',
  createTime: '2020-2-20',
  status: 1
}

export default [
  {
    url: '/product/query',
    type: 'post',
    response: config => {
      const items = products.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/product/get',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: product
      }
    }
  }
]
