import request from '@/utils/request'

export default {
    //预警配置-查询
    queryPageList(data) {
      return request({
        url: '/price/ewarn/conf/queryPageList',
        method: 'post',
        data
      })
    },

  //预警配置-新增
    save(data) {
    return request({
      url: '/price/ewarn/conf/save',
      method: 'post',
      data
    })
  },

  //查询预警类型
  warnType(data) {
    return request({
      url: `/price/ewarn/conf/getEwarnBycodeSimple/${data}`,
      method: 'get',
    })
  },

  //商品配置表单数据
  getGoodsData() {
    return request({
      url: '/warning/getGoodsData',
      method: 'get',
    })
  },

  //预警配置-删除
  delete(data) {
    return request({
      url: '/price/ewarn/conf/delete',
      method: 'post',
      data
    })
  },

  //商品配置-获取商品类型&商品大类
  getCommType() {
    return request({
      url: '/price/comm/conf/getCommType',
      method: 'get'
    })
  },

  //商品配置-查询
  goodsQueryPageList(data) {
    return request({
      url: '/price/comm/conf/queryPageList',
      method: 'post',
      data
    })
  },

  //价格预警结果
  queryList() {
    return request({
      url: '/price/pricee/warn/queryList',
      method: 'get',
    })
  },

  // 商品指标基础信息
  wpbaseindexinfo(data) {
    return request({
      url: `/price/wpbaseindexinfo/info/${data}`,
      method: 'get',
    })
  },

  // 查询所有商品
  queryAll() {
    return request({
      url: `/price/comm/conf/queryAll`,
      method: 'get',
    })
  },

  //首页商品详情
  view() {
    return request({
      url: `/price/first/view`,
      method: 'get',
    })
  },


}





