<template>
    <div class="warning-page">
      <div class="flex-justify">
        <el-card class="card-width">
          <div slot="header" class="clearfix">
            <i class="el-icon-menu" style="margin-right: 2px"></i><span>民生商品</span>
          </div>
          <el-table
            :data="minsheng"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="预警名称"
              width="180">
              <template slot-scope="scope">
                <el-link type="info" @click="handleWarningShow">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="rate"
              label="涨幅">
              <template slot-scope="scope">
                <span v-if="parseInt(scope.row.rate) > 0" style="color: red">{{scope.row.rate}}<i class="el-icon-top" type="danger"></i></span>
                <span v-else-if="parseInt(scope.row.rate) < 0" style="color: green">{{scope.row.rate}}&nbsp;<i class="el-icon-bottom" type="danger"></i></span>
                <span v-else="parseInt(scope.row.rate) === 0">{{scope.row.rate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间">
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="card-width">
          <div slot="header" class="clearfix">
            <i class="el-icon-menu" style="margin-right: 2px"></i><span>大宗商品</span>
          </div>
          <el-table
            :data="dazong"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="预警名称"
              width="180">

              <template slot-scope="scope">
                <el-link type="info" @click="handleWarningShow">{{ scope.row.name }}</el-link>
              </template>

            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="rate"
              label="涨幅">
              <template slot-scope="scope">
                <span v-if="parseInt(scope.row.rate) > 0" style="color: red">{{scope.row.rate}}<i class="el-icon-top" type="danger"></i></span>
                <span v-else-if="parseInt(scope.row.rate) < 0" style="color: green">{{scope.row.rate}}&nbsp;<i class="el-icon-bottom" type="danger"></i></span>
                <span v-else="parseInt(scope.row.rate) === 0">{{scope.row.rate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间">
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <el-dialog :visible.sync="warningShow" fullscreen>
        <div class="flex-align bgc">
          <span style="margin-right: 30px;font-size: 15px">预警商品:</span>
          <el-radio v-model="radio" label="1" border>小麦</el-radio>
          <el-radio v-model="radio" label="2" border>苹果</el-radio>
          <el-radio v-model="radio" label="3" border>玉米</el-radio>
          <el-radio v-model="radio" label="4" border>土豆</el-radio>
        </div>
        <div style="margin-top: 10px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="常规预警" name="first">
              <div class="flex-justify">
                <el-card style="width: 30%;margin-right: 10px">
                  <div slot="header" class="clearfix">
                    <span>小麦价格走势</span>
                  </div>
                  <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="rate"
                      label="当前价格">
                      <template slot-scope="scope">
                        <span v-if="parseInt(scope.row.rate) > 0" style="color: red">{{scope.row.rate}}</span>
                        <span v-else-if="parseInt(scope.row.rate) < 0" style="color: green">{{scope.row.rate}}</span>
                        <span v-else="parseInt(scope.row.rate) === 0">{{scope.row.rate}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="本月价格">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="本年价格">
                    </el-table-column>
                  </el-table>
                </el-card>

                <el-card style="width: calc(70% - 10px)">
                  <div slot="header" class="clearfix">
                    <span>小麦 -- 常规预警</span>
                  </div>
                  <div id="myChart" style="width: 100%;height: 300px;margin-top: 20px"></div>
                </el-card>
              </div>
            </el-tab-pane>

            <el-tab-pane label="非常规预警" name="second">非常规预警</el-tab-pane>

            <el-tab-pane label="舆情预警" name="third">舆情预警</el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
    export default {
        data(){
            return {
                activeName: 'first',
                radio:'1',
                tableData: [],
                minsheng:[],
                dazong:[],
                warningShow:false
            }
        },
        methods:{

            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleWarningShow(){
                this.warningShow = true;
                this.$nextTick(() => {
                    this.drawLine();
                })

            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                var option = {
                    title : {
                        text: '动态数据',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最新成交价', '预购队列']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    dataZoom : {
                        show : false,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        },
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : (function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(len + 1);
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            scale: true,
                            name : '价格',
                            boundaryGap: [0.2, 0.2]
                        },
                        {
                            type : 'value',
                            scale: true,
                            name : '预购量',
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series : [
                        {
                            name:'预购队列',
                            type:'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },
                        {
                            name:'最新成交价',
                            type:'line',
                            data:(function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                                }
                                return res;
                            })()
                        }
                    ]
                };
                var lastData = 11;
                var axisData;
                let timeTicket
                clearInterval(timeTicket);
                timeTicket = setInterval(() => {
                    lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    lastData = lastData.toFixed(1) - 0;
                    axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                    // 动态数据接口 addData
                    myChart.addData([
                        [
                            0,        // 系列索引
                            Math.round(Math.random() * 1000), // 新增数据
                            true,     // 新增数据是否从队列头部插入
                            false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                        ],
                        [
                            1,        // 系列索引
                            lastData, // 新增数据
                            false,    // 新增数据是否从队列头部插入
                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            axisData  // 坐标轴标签
                        ]
                    ]);
                }, 2100);
                myChart.setOption(option);
            },
            ...mapActions([
                'queryList'
            ])
        },
        created() {
            this.queryList().then(res => {
                console.log(res)
                this.minsheng = res.data[1].minsheng
                this.dazong = res.data[0].dazong
            })
        }
    }
</script>

<style lang="scss">
  .warning-page {
    .el-tabs__item {
      padding: 0 10px;
    }
    .el-table td {
      padding: 5px 0;
    }
    .el-table th {
      padding: 15px 0;
    }
    .el-table td, .el-table th {
      text-align: left;
      background: #ffffff;
      border: 1px solid #ffffff;
    }
    .el-table td, .el-table th.is-leaf {
      border-bottom: none;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before {
      background: #ffffff;
    }
    .el-card__body {
      padding-top: 0;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
  }
</style>
