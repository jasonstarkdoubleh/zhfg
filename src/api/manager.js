import request from '@/utils/request'

//调度任务查询
export function pssrschconfList(data, time, page, limit) {
  if(page){
    return request({
      url: `job/pssrschconf/list/?rschName=${data}&rschFreq=${time}&page=${page}&limit=${limit}`,
      method: 'get'
    })
  }else {
    return request({
      url: `job/pssrschconf/list/?rschName=${data}&rschFreq=${time}`,
      method: 'get'
    })
  }

}

//调度保存
export function save(data) {
  return request({
    url: `job/pssrschconf/save`,
    method: 'post',
    data
  })
}

//调度删除
export function del(data) {
  return request({
    url: `job/pssrschconf/delete`,
    method: 'post',
    data
  })
}

//调度更新
export function update(data) {
  return request({
    url: `job/pssrschconf/update`,
    method: 'post',
    data
  })
}

//调度查询类型信息
export function getAsciiByCode(CodeId) {
  return request({
    url: `/price/ascii/info/getAsciiByCode/${CodeId}`,
    method: 'get'
  })
}

//舆情TOP50
export function getTopUrlInfo(data) {
  return request({
    url: `https://jianguan.urlsec.qq.com/analyze/getTopUrlInfo`,
    method: 'post',
    data
  })
}

//数据集名
export function getHiveData(tableName) {
  return request({
    url: `/price/pssdatasetinfo/getHiveData/${tableName}`,
    method: 'get',
  })
}

//创建数据集
export function pssdatasetinfoSave(data) {
  return request({
    url: `/price/pssdatasetinfo/save`,
    method: 'post',
    data
  })
}

//删除数据集
export function pssdatasetinfo(dataSetId) {
  return request({
    url: `/price/pssdatasetinfo/delete/${dataSetId}`,
    method: 'post'
  })
}

//查询规格品下一级
export function tree(commId) {
  return request({
    url: `/price/wpbaseindexinfo/tree/${commId}`,
    method: 'get'
  })
}

//宏观指标名称
export function macTree() {
  return request({
    url: `/analyse/macro/tree`,
    method: 'get'
  })
}

//宏观指标名称
export function pssrptconf() {
  return request({
    url: `report/pssrptconf/list?rptType=0&rptFreq=D&rcshId=1`,
    method: 'get'
  })
}

//预警展示
export function indexIdConf(data1,data2) {
  return request({
    url: `/price/pricee/warn/indexIdConf/${data1}?ewarnTypeId=${data2}`,
    method: 'get'
  })
}

//查询指标值
export function indexLineData(data1,data2) {
  return request({
    url: `/price/pricee/warn/indexLineData?ewarnTypeId=${data1}&indexIds=${data2}`,
    method: 'get'
  })
}

//查询平均值
export function indexAvg(data1,data2) {
  return request({
    url: `/price/pricee/warn/indexAvg?ewarnTypeId=${data1}&indexId=${data2}`,
    method: 'get'
  })
}

//二级页面时间查询
export function byDate(data1,data2,data3,data4,data5,data6) {
  return request({
    url: `/price/second/indexType/byDate/${data1}?indexType=${data2}&startDate=${data3}&endDate=${data4}&pageIndex=${data5}&pageSize=${data6}`,
    method: 'get'
  })
}

//二级页面价格标签地图
export function provinceMap(data1,data2) {
  return request({
    url: `/price/second/provinceMap/${data1}?indexType=${data2}`,
    method: 'get'
  })
}

//二级页面价格标签页指标名称查询值
export function lineChart(data1,data2,data3,data4,data5) {
  return request({
    url: `/price/second/lineChart/${data1}?indexId=${data2}&indexType=${data3}&startDate=${data4}&endDate=${data5}`,
    method: 'get'
  })
}

//数据集表格数据
export function getIndexInfoByDataSetId(data) {
  return request({
    url: `/price/pssdatasetinfo/getIndexInfoByDataSetId/${data}`,
    method: 'get'
  })
}

//数据集修改
export function pssdatasetinfoUpdate(data) {
  return request({
    url: `/price/pssdatasetinfo/update/`,
    method: 'post',
    data
  })
}

//数据集修改
export function queryComm(data1,data2,data3,data4,data5) {
  return request({
    url: `/price/psspricerelt/query/comm?commId=${data1}&dateFrom=${data2}&dateTo=${data3}&pageIndex=${data4}&pageSize=${data5}`,
    method: 'get',
  })
}






