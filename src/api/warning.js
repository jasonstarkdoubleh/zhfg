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
      method: 'post',
    })
  },

  //首页商品详情
  view() {
    return request({
      url: `/price/first/view`,
      method: 'get',
    })
  },

  //商品配置保存
  confSave(data) {
    return request({
      url: `/price/comm/conf/saveAndUpdate`,
      method: 'post',
      data
    })
  },

  //趋势分析结果查询
  trendQueryList() {
    return request({
      url: `/analyse/trend/queryList`,
      method: 'get'
    })
  },

  //二级页面-展示
  secondView(commId) {
    return request({
      url: `/price/second/view/${commId}`,
      method: 'get'
    })
  },

  //分析类型
  bussType(bussType) {
    return request({
      url: `/price/pssanalyinfo/bussType/${bussType}`,
      method: 'get'
    })
  },

  //数据集名称
  getDataSetList() {
    return request({
      url: `/price/pssdatasetinfo/getDataSetList`,
      method: 'get'
    })
  },

  //数据集名称
  listAll() {
    return request({
      url: `/price/pssdatasetinfo/listAll`,
      method: 'get'
    })
  },

  //相关性查询
  pssanalyinfoList(data1,data2,data3) {
    return request({
      url: `/price/pssanalyinfo/list?analyway=${data1}&analyname=${data2}&datasetid=${data3}`,
      method: 'get'
    })
  },

  //多维详情
  detailV2(commId) {
    return request({
      url: `/analyse/multidimensional/detailV2/${commId}`,
      method: 'get'
    })
  },

  //查看下级
  getSubCommByCommId(commId) {
    return request({
      url: `/price/comm/conf/getSubCommByCommId/${commId}`,
      method: 'post'
    })
  },

  //获取舆情
  getTopUrlInfo() {
    return request({
      url: `/tengxun/analyze/getTopUrlInfo/`,
      method: 'post'
    })
  },

  //删除商品配置
  deleteGoods(confId) {
    return request({
      url: `/price/comm/conf/delete/${confId}`,
      method: 'post'
    })
  },

  //价格预警结果页
  warnQueryList() {
    return request({
      url: `/price/pricee/warn/queryList`,
      method: 'get'
    })
  },

  //价格预警结果页详情
  detail(data1, data2) {
    return request({
      url: `/price/pricee/warn/detail/${data1}?ewarnTypeId=${data2}`,
      method: 'get'
    })
  },

  //一般相关性分析运行
  runGeneral(data) {
    return request({
      url: `/price/pssanalyinfo/runGeneral`,
      method: 'post',
      data
    })
  },

  //预警配置修改
  confUpdate(data) {
    return request({
      url: `/price/ewarn/conf/update`,
      method: 'post',
      data
    })
  },

  //预警配置修改
  queryResult(data) {
    return request({
      url: `/price/psspricerelt/query`,
      method: 'get',
      params:data
    })
  },

  //三级商品热点舆情
  getHeatTop(data) {
    return request({
      url: `/tengxun/analyze/getHeatTop/${data}`,
      method: 'post'
    })
  },

}





