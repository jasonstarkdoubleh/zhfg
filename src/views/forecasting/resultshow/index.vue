<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :searchShow="true"
      @on-detail = searchDetail>

<!--      预测结果显示-->
      <div class="flex bgc">
        <div>

          商品类型:
          <el-select v-model="resultType" size="mini" style="margin-right: 20px">
            <el-option
              v-for="item in resultTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品大类:
          <el-select v-model="resultName" size="mini" style="margin-right: 20px">
            <el-option
              v-for="item in resultNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          预测类型:
          <el-select v-model="yuceType" size="mini" style="margin-right: 20px">
            <el-option
              v-for="item in yuceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品名:
          <el-input size="mini" style="width: 150px;margin-right: 20px" v-model="shangpingName"></el-input>

          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog :visible.sync="priceShow" fullscreen>
      <div style="padding: 10px">
        <div style="font-size: 18px;text-align: center">咖啡(英）-日预测</div>
        <div id="RESULT" style="width: 100%;height: 500px;margin-top: 10px"></div>
        <el-card>
          <div style="display: flex;justify-content: space-between;border-bottom: 1px solid #eee;padding-bottom: 10px">
            <div style="display: flex;align-items: center">
              <span style="display: inline-block;border-radius: 50%;background: red;width: 14px;height: 14px;"></span>
              <span>按时间查询</span>
            </div>
            <div>
              <el-date-picker
                size="small"
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div>
              <el-button size="small">提交查询</el-button>
            </div>
          </div>
          <div style="margin-top: 10px">
            <div style="display: flex;">
              <div style="margin-right: 20px">商品名称:大麦</div>
              <div style="margin-right: 20px">模型名称:大麦</div>
              <div style="margin-right: 20px">算法名称:咖啡</div>
            </div>
          </div>
          <div style="margin-top: 10px">
            单位:美元/吨
          </div>
          <div style="margin-top: 10px">
            说明:伦敦商品交易所最近期货收盘价，中粒
          </div>
        </el-card>
        <div style="margin-top: 20px">
          <el-table border stripe :data="dialogTableData">
            <el-table-column prop="time" label="交易时间" align="center"></el-table-column>
            <el-table-column prop="infact" label="报价/单位（实际）" align="center"></el-table-column>
            <el-table-column prop="plan" label="报价/单位（预测）" align="center"></el-table-column>
            <el-table-column prop="change" label="异常点修正" align="center">
              <template>
                <el-button size="small" type="primary" @click="changePage = true">修正</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog title="修正页面" :visible.sync="changePage">
          <el-table :data="gridData" border>
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="商品价格" width="200"></el-table-column>
            <el-table-column property="price" label="价格"></el-table-column>
            <el-table-column property="change" label="修正价格" width="200"></el-table-column>
          </el-table>
          <div style="display: flex;justify-content: center;margin-top: 20px">
            <el-button type="primary" style="margin-right: 15px" @click="changePage = false">修正</el-button>
            <el-button style="margin-left: 15px" @click="changePage = false">返回</el-button>
          </div>
        </el-dialog>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="indexShow" fullscreen>
      <div style="padding: 10px">
        <jtable
          :tableData="indexTableData"
          :columnData="indexColumnData"
          :searchShow="true">

          <div style="display: flex;justify-content: space-between">
            <div>
              指数名称:
              <el-input size="mini" style="width: 150px;margin-right: 20px" v-model="predictionName"></el-input>

              预测时间段:
              <el-date-picker
                size="mini"
                style="margin-right: 20px"
                v-model="predictionTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>

              <el-button type="primary" size="small">查询</el-button>
            </div>
          </div>

        </jtable>
        <div id="ZHIBIAO" style="width: 100%;height: 500px;margin-top: 50px"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    export default {
        name: "result",
        data() {
            return {
                predictionTime: '',                           //预测时间段
                predictionName:'',                          //预测名称
                indexTableData: [{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                },{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                },{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                }],
                indexColumnData: {
                    dataName:'商品名称',
                    correlation:'模型名称',
                    type:'预测类型',
                    vision:'版本信息',
                    time:'偏差时间'
                },
                indexShow:false,
                shangpingName: '',                        //预测商品名称
                yuceTypeOptions: '',                        //预测类型选择
                yuceType: '',                               //预测类型
                resultNameOptions:'',                      //预测结果商品大类选择
                resultName: '',                            //预测结果商品大类
                resultType: '',                            //预测结果类型
                resultTypeOptions:[],                       //预测结果类型选择
                priceShow:false,
                value1:'',
                changePage:false,
                gridData: [{
                    date: '2019-04-30',
                    name: '咖啡（英)',
                    price: '1350',
                    change:'1220'
                },{
                    date: '2019-04-30',
                    name: '咖啡（英)',
                    price: '1350',
                    change:'1220'
                },{
                    date: '2019-04-30',
                    name: '咖啡（英)',
                    price: '1350',
                    change:'1220'
                }],
                dialogTableData:[{
                    time:'2019-05-09',
                    infact:1320,
                    plan:1310,
                    change:'修正'
                },{
                    time:'2019-05-09',
                    infact:1320,
                    plan:1310,
                    change:'修正'
                },{
                    time:'2019-05-09',
                    infact:1320,
                    plan:1310,
                    change:'修正'
                },{
                    time:'2019-05-09',
                    infact:1320,
                    plan:1310,
                    change:'修正'
                }],
                tableData: [{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                },{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                },{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                }],
                columnData: {
                    dataName:'商品名称',
                    correlation:'模型名称',
                    type:'预测类型',
                    vision:'版本信息',
                    time:'偏差时间'
                }
            }
        },
        components: {
            jtable
        },
        methods: {
            searchDetail(){
                // this.priceShow = true
                this.indexShow = true
                this.$nextTick(() => {
                    // this.drawRESULT()
                    this.drawZHIBIAO()
                })
            },
            drawRESULT(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('RESULT'))
                // 绘制图表
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    grid: {
                        // show:true,
                        x: '3%',
                        x2: '4%',
                        y2: '3%',
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        show:true,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            drawZHIBIAO(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('ZHIBIAO'))
                // 绘制图表
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    grid: {
                        // show:true,
                        x: '3%',
                        x2: '4%',
                        y2: '3%',
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        show:true,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
        }
    }
</script>

<style scoped>

</style>
