<template>
  <a-tabs defaultActiveKey="1" tabPosition="left">
    <a-tab-pane tab="基本统计" key="1">
      <a-row>
        <a-col :span="24">
          <a-table
            :dataSource="tableData"
            :pagination="{pageSize: 5}"
            :bordered="true"
            rowKey="row_num"
            style="width: 85%">
            <a-table-column
              dataIndex="row_num"
              align="center"
              title="序号">
            </a-table-column>
            <a-table-column
              dataIndex="column_name"
              align="center"
              title="数据项名称">
            </a-table-column>
            <a-table-column
              dataIndex="type"
              align="center"
              title="数据类型">
            </a-table-column>
            <a-table-column
              dataIndex="null_sum"
              align="center"
              title="缺失值">
            </a-table-column>
            <a-table-column
              dataIndex="min"
              align="center"
              title="最小值">
            </a-table-column>
            <a-table-column
              dataIndex="max"
              align="center"
              title="最大值">
            </a-table-column>
            <a-table-column
              dataIndex="mean"
              align="center"
              title="平均值">
            </a-table-column>
            <a-table-column
              dataIndex="std"
              align="center"
              title="标准差">
            </a-table-column>
          </a-table>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane tab="绘制趋势图" key="2">
      <div>
<!--        <span>时间周期：</span>-->
<!--        <a-select v-model='drawStatistics' style="width:120px;" :dropdownMatchSelectWidth="false">-->
<!--          <a-select-option :key="index" v-for="(value,index) in optData "-->
<!--                           :value="value">{{ value }}-->
<!--          </a-select-option>-->
<!--        </a-select>-->
        <a-range-picker class="left10" style="width: 339px" @change="drawDateChange"/>
      </div>
      <div class="top10">
        <div class="inlineBlock" style="text-indent: 2em">
          <span style="margin-left: 3px">Y 项：</span>
        </div>
        <a-select v-model='valueY' style="width:120px;" :dropdownMatchSelectWidth="false">
          <a-select-option :key="index" v-for="(value,index) in optData" mode="multiple"
                           :value="value">{{ value }}
          </a-select-option>
        </a-select>
        <el-button class="left10" @click="drawY">绘图</el-button>
      </div>
      <div v-if="drawYFlag">
        <div id="YEcharts" style="height:270px;width: 700px"></div>
      </div>
      <div v-if="drawXFlag">
        <div id="XEcharts" style="height:270px;width: 700px"></div>
      </div>
    </a-tab-pane>
    <a-tab-pane tab="相关性矩阵" key="3">
      <div class="">
        <div>
<!--          <span>时间周期：</span>-->
<!--          <a-select v-model='matrixStatistics' style="width:120px;">-->
<!--            <a-select-option :key="index" v-for="(value,index) in optData "-->
<!--                             :value="value">{{ value }}-->
<!--            </a-select-option>-->
<!--          </a-select>-->
          <a-range-picker class="left10" style="width: 339px" @change="matrixDateChange"/>
        </div>
        <div class="top10">
          <div class="inlineBlock" style="text-indent: 1em">
            <span>数据项：</span>
          </div>
          <a-select :value="matrixDataSelected" mode="multiple" :maxTagCount="0" @change="matrixDataChange" :dropdownMatchSelectWidth="false"
                    style="width:120px">
            <a-select-option :key="item" v-for="item in optData"
                             :value="item">{{ item }}
            </a-select-option>
          </a-select>
          <a-button class="left10" @click="drawMatrix">绘图</a-button>
        </div>
        <div v-if="matrixFlag">
          <div id="matrixEchart" style="height:380px;width: 800px"></div>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
  import echarts from 'echarts'
  import "@/styles/general.scss"
  import {get_summary,get_columns,line_chart,corr_matrix} from '@/api/manager'

  export default {
    name: "DataParsing",
    data() {
      return {
        matrixFlag: false,
        drawYFlag: false,
        drawXFlag: false,
        tableData: [],
        matrixDataSelected: [],//相关行矩阵所选择的数据项
        matrixDate: [],//相关行矩阵所选择的时间
        drawDate: [],//绘制趋势图所选择的时间
        optData: [],
        drawStatistics: 'date',//绘制趋势图统计维度
        matrixStatistics: '',//相关行矩阵统计维度
        valueY: '',//Y项
        valueX: '',//X项
        YCharts: {
          title: {
            text: 'Y项',
            textStyle: {
              color: 'black',
              fontSize: '16',
            },
            left: '3%',
            top: '15px'
          },
          color: ['#51a2da'],
          grid: {
            left: '0',
            right: '4%',
            bottom: '5%',
            top: '18%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: {
            type: 'value'
          },
          series: {
            data: [],
            type: 'line'
          }
        },
        XCharts: {
          title: {
            text: 'X项',
            textStyle: {
              color: 'black',
              fontSize: '16',
            },
            left: '3%',
            top: '15px'
          },
          color: ['#51a2da'],
          grid: {
            left: '0',
            right: '4%',
            bottom: '5%',
            top: '18%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: {
            type: 'value'
          },
          series: {
            data: [],
            type: 'line'
          }
        },
        matrixCharts: {//矩阵图
          tooltip: {
            position: 'top'
          },
          animation: false,
          grid: {
            height: '60%',
            width: '80%',
            y: '10%',
            x: '15%'
          },
          xAxis: {
            type: 'category',
            data: [],
            splitArea: {
              show: true
            },
          },
          yAxis: {
            type: 'category',
            data: [],
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '8%',
            inRange: {
              color: ['#afbcea', '#2e50c8'],
              symbolSize: [30, 100]
            }
          },
          series: [{
            name: '矩阵值',
            type: 'heatmap',
            data: [],
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        },
      }
    },
    props: ['dataset_id'],
    methods: {
      matrixDataChange(value) {
        this.matrixDataSelected = value;
      },
      drawDateChange(date, dateString) {
        this.drawDate = dateString;//数组类型
      },
      matrixDateChange(date, dateString) {
        this.matrixDate = dateString;
      },
      drawMatrix() {
        if (this.dataset_id === '') {
          this.$message({
            message:'请选择数据集',
            type:'warning'
          })
          return
        }
        if (this.matrixDate.length === 0 || this.matrixDataSelected.length === 0 || this.matrixStatistics === '') {
          this.$message({
            message:'时间周期、开始日期、结束日期、数据项不允许为空',
            type:'warning'
          })
          return
        }
        this.matrixFlag = true;
        let data= {
          dataset_id: this.dataset_id,
          daytime: JSON.stringify(this.matrixDate),
          columns: JSON.stringify(this.matrixDataSelected),
          date_index: 'date'
        }
        corr_matrix(data).then(response => {
            let myMatrixChart = echarts.init(document.getElementById('matrixEchart'));
            this.matrixCharts.xAxis.data = response.data.x;
            this.matrixCharts.yAxis.data = response.data.y;
            this.matrixCharts.series[0].data = response.data.data;
            myMatrixChart.setOption(this.matrixCharts);
        })
      },
      drawY() {
        if (this.dataset_id === '') {
          this.$message({
            message:'请选择数据集',
            type:'warning'
          })
          return
        }
        if (this.drawDate.length === 0 || this.valueY === '' || this.drawStatistics === '') {
          this.$message({
            message:'时间周期、开始日期、结束日期、Y项不允许为空',
            type:'warning'
          })
          return
        }
        this.drawYFlag = true;
        let data = {
          dataset_id: this.dataset_id,
          daytime: JSON.stringify(this.drawDate),
          column: this.valueY,
          date_index: 'date'
        }
        line_chart(data).then(response => {
            let YEcharts = echarts.init(document.getElementById('YEcharts'));
            this.YCharts.xAxis.data = response.data.index;
            this.YCharts.series.data = response.data[this.valueY];
            YEcharts.setOption(this.YCharts);
        })
      },
      selectOption() {
        console.log(1)
        let data = {dataset_id:this.dataset_id}
        get_columns(data).then(response => {
          this.optData = response.data;
        })
      },

      clearParsingData(){
        this.drawStatistics = '';
        this.valueY = '';
        this.valueX = '';
        this.matrixFlag = false;
        this.drawYFlag = false;
        this.drawXFlag = false;
        this.matrixStatistics = '';
        this.matrixDataSelected = [];
      },
    },
    watch: {
      dataset_id(val) {
        this.clearParsingData();
        this.selectOption();
        let data = {dataset_id:val}
        get_summary(data).then(response => {
          this.tableData = response.data.tableData;
        })
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>

