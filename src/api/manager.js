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

//预测分析
export function queryComm(data) {
  return request({
    url: `/price/psspricerelt/secondpage/comm?commId=${data}`,
    method: 'get',
  })
}

//宏观指标类型查询
export function queryIndexType() {
  return request({
    url: `/analyse/macro/queryIndexType`,
    method: 'get',
  })
}

//宏观指标趋势图
export function queryValByIndexType(data) {
  return request({
    url: `/analyse/macro/queryValByIndexType?indexType=${data}`,
    method: 'get',
  })
}

//宏观指标趋势图
export function getHeatTop(data) {
  return request({
    url: `/tengxun/analyze/getHeatTop/${data}`,
    method: 'post',
  })
}

//报告配置信息查询
export function pssrptconf(params) {
  return request({
    url: `/report/pssrptconf/list`,
    method: 'get',
    params
  })
}

//舆情趋势
export function yuqingInfo(data) {
  return request({
    url: `yuqing/info/${data}`,
    method: 'get',
  })
}

//价格预测查看详情
export function psspricereltDetail(data) {
  return request({
    url: `/price/psspricerelt/detail/${data}`,
    method: 'get',
  })
}

//价格预测修正价格
export function psspricereltUpdate(data) {
  return request({
    url: `/price/psspricerelt/update`,
    method: 'post',
    data
  })
}

//价格预测修正价格
export function linecharts(params) {
  return request({
    url: `/price/psspricerelt/secondpage/linecharts`,
    method: 'get',
    params
  })
}

//报告生成配置保存 -- 自动
export function pssrptconfSave(data) {
  return request({
    url: `/report/pssrptconf/save`,
    method: 'post',
    data
  })
}

//报告生成配置保存 -- 修改
export function pssrptconfUpdate(data) {
  return request({
    url: `/report/pssrptinfo/update`,
    method: 'post',
    data
  })
}

//调度名称查询
export function queryRschList() {
  return request({
    url: `/job/pssrschconf/queryRschList`,
    method: 'get'
  })
}

//删除分析记录
export function deleteAnalyId(data) {
  return request({
    url: `/price/pssanalyrelt/delete/${data}`,
    method: 'get'
  })
}

//分析记录详情
export function pssanalyreltDetail(data) {
  return request({
    url: `/price/pssanalyrelt/detail/${data}`,
    method: 'get'
  })
}

//获取报告模板
export function queryRptTemplate(data) {
  return request({
    url: `/report/rptTemplate/queryRptTemplate`,
    method: 'get'
  })
}

//查询模型预处理
export function queryDataSet(params) {
  return request({
    url: `/moxing/queryDataSet`,
    method: 'get',
    params
  })
}

//模型管理测试接口
export function get_algorithm_list() {
  return request({
    url: `/model/model/get_algorithm_list`,
    method: 'post'
  })
}

//获取报告模板
export function pssrptinfoList(params) {
  return request({
    url: `/report/pssrptinfo/list`,
    method: 'get',
    params
  })
}


//获取算法
export function getAlgorithmNames() {
  return request({
    url: `/model/getAlgorithmNames`,
    method: 'get'
  })
}

//模型管理查询
export function queryModel(params) {
  return request({
    url: `/model/queryModel`,
    method: 'get',
    params
  })
}

//预处理
export function get_summary(data) {
  return request({
    url: `/model/dataset/get_summary`,
    method: 'post',
    data
  })
}

//报告查询预览,下载
export function preview(params) {
  return request({
    url: `/report/pssrptinfo/preview?fileType=docx&infoId=4`,
    method: 'get',
    params
  })
}

//绘制趋势图 -日期选择
export function get_columns(data) {
  return request({
    url: `/model/dataset/get_columns`,
    method: 'post',
    data
  })
}

//绘制趋势图
export function line_chart(data) {
  return request({
    url: `/model/dataset/line_chart`,
    method: 'post',
    data
  })
}

//绘制相关性矩阵
export function corr_matrix(data) {
  return request({
    url: `/model/dataset/corr_matrix`,
    method: 'post',
    data
  })
}

//数据切分
export function split(data) {
  return request({
    url: `/model/dataset/split`,
    method: 'post',
    data
  })
}

//数据过滤
export function filter(data) {
  return request({
    url: `/model/dataset/filter`,
    method: 'post',
    data
  })
}

//数据填补
export function dataset_fill(data) {
  return request({
    url: `/model/dataset/dataset_fill`,
    method: 'post',
    data
  })
}

//数据填补
export function add_data_feature(data) {
  return request({
    url: `/model/dataset/add_data_feature`,
    method: 'post',
    data
  })
}

//滞后性
export function lag_data(data) {
  return request({
    url: `/model/dataset/lag_data`,
    method: 'post',
    data
  })
}

//数据源管理-查询
export function queryDataSourcesList(params) {
  return request({
    url: `/dataAccess/dataSources/queryDataSourcesList`,
    method: 'get',
    params
  })
}

//数据源管理-删除
export function deleteDataSources(data) {
  return request({
    url: `/dataAccess/dataSources/deleteDataSources`,
    method: 'post',
    data
  })
}

//数据源管理-删除
export function queryRptName(params) {
  return request({
    url: `/report/pssrptinfo/queryRptName`,
    method: 'get',
    params
  })
}
