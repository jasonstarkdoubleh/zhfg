<template>
  <div class="flex-justify second">
    <div class="left-production" style="width: 45%;margin-right: 10px">
      <div class="preview-title">
        <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
        <div>
          小麦 -- 粮食信息
        </div>
      </div>

      <div style="padding: 10px 0 0 16px;width: calc(100% - 16px);height: 100%">

        <div style="display: flex;align-items: center;justify-content: space-between">
          <div>
            <span style="margin-right: 10px;font-size: 16px">时间</span>
            <el-date-picker
              v-model="dateSearch"
              type="daterange"
              style="background-color: transparent"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <el-button type="primary" style="margin-left: 20px">查 询</el-button>
        </div>

        <el-scrollbar class="scrollbar-table" style="height: calc(100% - 90px)">

          <el-table
            :data="peopleLife"
            :header-cell-style="{background:'rgb(15, 29, 111)'}"
            stripe
            style="width: 100%;margin-top: 10px">

            <el-table-column
              prop="goodsName"
              label="商品名称">
              <template slot-scope="scope">
                <el-link type="primary">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="指标名称">
              <template slot-scope="scope">
                <el-link type="primary">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>

            <el-table-column
              prop="value"
              label="取值">
              <template slot-scope="scope">
                <el-link type="primary">{{ scope.row.price }}</el-link>
              </template>
            </el-table-column>

            <el-table-column
              prop="price"
              label="价格">
              <template slot-scope="scope">
                <el-link type="primary">{{ scope.row.price }}</el-link>
              </template>
            </el-table-column>

          </el-table>

        </el-scrollbar>
      </div>
    </div>

    <div class="left-production" style="width: 55%;">

      <div class="preview-title">
        <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
        <div>小麦 -- 粮食生产趋势</div>
      </div>

      <div style="display: flex;justify-content: flex-end;padding-right: 16px;">
        <el-radio v-model="testData" label="1" @click.native="handleDraw(true)">折线柱状图</el-radio>
        <el-radio v-model="testData" label="2" @click.native="handleDraw(false)">散点K线图</el-radio>
      </div>

      <div :id="secondLine" style="width: 100%;height: 500px;margin-top: 20px" v-if="lineShow"></div>
      <div :id="secondPoint" style="width: 100%;height: 500px;margin-top: 20px" v-if="!lineShow"></div>

    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                lineShow: true,
                testData:'1',
                dateSearch:'',
                peopleLife:[{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                },{
                    goodsName: '苹果',
                    name: '水果',
                    value: '10',
                    price: '斤',
                }],
            }
        },
        props: {
            secondLine: {
                type: String,
                required: true
            },
            secondPoint: {
                type: String,
                required: true
            }
        },
        methods: {
            handleDraw(data) {
                if (data) {
                    this.lineShow = true
                    this.$nextTick(() => {
                        this.drawLine()
                    })
                }else {
                    this.lineShow = false
                    this.$nextTick(() => {
                        this.drawPoint()
                    })
                }
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById(this.secondLine))
                // 绘制图表
                let option = {
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint : {
                                data : [
                                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            },
            drawPoint(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById(this.secondPoint))
                // 绘制图表
                function random(){
                    var r = Math.round(Math.random() * 100);
                    return (r * (r % 2 == 0 ? 1 : -1));
                }

                function randomDataArray() {
                    var d = [];
                    var len = 100;
                    while (len--) {
                        d.push([
                            random(),
                            random(),
                            Math.abs(random()),
                        ]);
                    }
                    return d;
                }

                let option = {
                    xAxis : [
                        {
                            type : 'value',
                            splitNumber: 4,
                            scale: true
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitNumber: 4,
                            scale: true
                        }
                    ],
                    series : [
                        {
                            name:'scatter1',
                            type:'scatter',
                            symbolSize: function (value){
                                return Math.round(value[2] / 5);
                            },
                            data: randomDataArray()
                        },
                        {
                            name:'scatter2',
                            type:'scatter',
                            symbolSize: function (value){
                                return Math.round(value[2] / 5);
                            },
                            data: randomDataArray()
                        }
                    ]
                };

                myChart.setOption(option);
            },
        },
        mounted() {
            this.drawLine()
        }
    }
</script>

<style lang="scss">
  .second {
    .left-production {
      background-image: url("../../assets/img/down1.png");
      background-repeat:no-repeat;
      background-size:100% 100%;

      .el-radio {
        color: #cccccc;
      }
    }
    .preview-title {
      display: flex;
      align-items: center;
      padding: 16px 0 0 16px;
      font-size: 16px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-range-editor .el-range-input {
      background-color: transparent;
    }
    .el-date-editor .el-range-separator {
      color: #cccccc;
    }
  }

</style>
