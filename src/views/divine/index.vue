<template>
  <div>
    <div style="padding: 20px 10px;background: #ffffff">

      <div class="bgc flex">
        <div>
          <span style="margin-right: 20px">按时间查询</span>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button type="primary" @click="handleSearch">提交查询</el-button>
      </div>

      <!--      <div style="height: 40px;line-height: 40px;font-weight: bold;margin-left: 10px">-->
      <!--        说明:伦敦交易所近期收盘价中粒-->
      <!--      </div>-->
      <div style="margin-top: 20px;display: flex;justify-content: space-around">

        <div style="width: 33%;border-right: 1px #cccccc dashed">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/商品名称.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">商品名称</div>
            <div style="padding-left: 10px">{{this.dataModel.commName}}</div>
          </div>
        </div>

        <div style="width: 33%;border-right: 1px #cccccc dashed">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/模型名称.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">模型名称</div>
            <div style="padding-left: 10px">{{this.dataModel.modName}}</div>
          </div>
        </div>

        <div style="width: 33%;">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/算法名称.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">算法名称</div>
            <div style="padding-left: 10px">{{this.dataModel.algoName}}</div>
          </div>
        </div>

      </div>
    </div>

    <div style="height: 50px;line-height: 50px;color: #cccccc;display: flex;">
      <div style="margin-right: 10px;min-width: 140px">{{this.dataModel.modName}}</div>
      <div style="height: 24px;border-bottom: 1px #cccccc solid;width: 100%"></div>
    </div>

    <div style="display: flex">
      <el-card style="width: 100%">
        <div id="divineone" style="height: 300px"></div>
      </el-card>
    </div>

    <jtable
      style="margin-top: 10px"
      :total="total"
      @pageChange="pageChange"
      :tableData="tableData"
      :columnData="columnData">

    </jtable>
  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import {mapGetters} from 'vuex'
  import {queryComm,linecharts} from '@/api/manager'
  export default {
    data() {
      return {
        total:0,
        pageIndex:1,
        pageSize:10,
        dataModel:{},
        dateValue: [],
        tableData: [],
        columnData: {
          dataDate:'交易时间',
          realPrice:'报价(实际)',
          forePrice:'报价(预测)',
          reviPrice:'报价(修正)',
        }
      }
    },
    components: {
      jtable
    },
    computed:{
      ...mapGetters([
        'pageValue'
      ])
    },
    methods: {
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      handleSearch(){
        let data = {}
        if(this.dateValue.length === 2){
          data = {
            commId:this.pageValue.commId,
            pageIndex:this.pageIndex,
            pageSize:this.pageSize,
            dateFrom:this.dateValue[0],
            dateTo:this.dateValue[1]
          }
        }else {
          data = {
            commId:this.pageValue.commId,
            pageIndex:this.pageIndex,
            pageSize:this.pageSize
          }
        }
        linecharts(data).then(res=>{
          this.tableData = res.page.list
          this.total = res.page.totalCount
          this.drawDivineone(res.lineCharts)
        })
      },
      drawDivineone(data){
        let dateVal = []
        let series = []
        let num = 0
        Object.keys(data.shiJi).forEach(key=>{
          dateVal.push(data.shiJi[key].date)
        })
        for(let key in data){
          series[num] = {}
          series[num].name = key
          series[num].type = 'line'
          series[num].data = []
          for(let i in data[key]){
            series[num].data.push(data[key][i].val)
          }
          num++
        }
        console.log(data)
        console.log(series)
        let myChart = this.$echarts.init(document.getElementById('divineone'))
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            // show:true,
            x: '3%',
            x2: '4%',
            y2: '3%',
            containLabel: true,
          },
          xAxis: {
            show:true,
            type: 'category',
            boundaryGap: false,
            data: dateVal
          },
          yAxis: {
            show:true,
            type: 'value'
          },
          series:series
        };
        myChart.setOption(option);
      },
      drawDivinetwo(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('divinetwo'))
        // 绘制图表
        let dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
        let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
        let yMax = 500;
        let dataShadow = [];

        for (let i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }

        let option = {
          title: {
            text: '猪肉存栏量',
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: data
            }
          ]
        };

// Enable data zoom when user click bar.
        let zoomSize = 6;
        myChart.on('click', function (params) {
          console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });

        myChart.setOption(option);
      },
    },
    mounted() {
      let data = {
        commId:this.pageValue.commId,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }
      linecharts(data).then(res=>{
        this.tableData = res.page.list
        this.total = res.page.totalCount
        this.drawDivineone(res.lineCharts);
      })

      this.drawDivinetwo()
    },
    created() {
      queryComm(this.pageValue.commId).then(res=>{
        console.log(res)
        this.dataModel = res.data
      })
    }
  }
</script>

<style scoped>

</style>
