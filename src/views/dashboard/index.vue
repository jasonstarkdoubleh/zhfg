<template>
  <div class="dashboard-container">

    <div class="fixed-header">
      <Navbar></Navbar>
    </div>

    <div class="main-body">

      <div class="left-section">

        <div class="live-preview">

          <div class="preview-title">
            <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
            <div>实时预览</div>
          </div>

          <div class="num-details">
            <div class="details-body">

              <div>
                商品总数量
                <template v-for="item in numArray1">
                  <span class="num-style" style="color: #4eb1fd;border: 1px solid #4eb1fd;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </template>
              </div>

              <div>
                今日上涨总量
                <template v-for="item in numArray1">
                  <span class="num-style" style="color: #1cff9e;border: 1px solid #1cff9e;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </template>
              </div>

              <div>
                今日下跌总量
                <template v-for="item in numArray1">
                  <span class="num-style" style="color: #ff2661;border: 1px solid #ff2661;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </template>
              </div>

            </div>
          </div>
        </div>

        <div class="goods-details">

          <div class="preview-title">
            <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
            <div>商品预警详情</div>
          </div>

          <div class="goods-table">

            <el-scrollbar class="scrollbar-table" style="height: calc(100% - 60px)">

              <el-table
                :data="minsheng"
                :header-cell-style="{background:'rgb(15, 29, 111)'}"
                stripe
                style="width: 100%">

                <el-table-column
                  show-overflow-tooltip
                  prop="commName"
                  label="商品名称">
                  <template slot-scope="scope">
                    <el-link type="primary" @click="gorouter">{{ scope.row.commName }}</el-link>
                  </template>
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip
                  prop="priValue"
                  label="商品价格">
                  <template slot-scope="scope">
                    <span style="color: #409EFF">{{ scope.row.priValue }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip
                  prop="priRange"
                  label="增长幅度">

                  <template slot-scope="scope">

                    <template v-if="parseInt(scope.row.priRange) - 1  > 0">
                      <span style="color: #ff2661">
                        {{(parseInt(scope.row.priRange) - 1) * 100}}%
<!--                        <i class="el-icon-caret-top"></i>-->
                      </span>
                    </template>

                    <template v-else-if="parseInt(scope.row.priRange) - 1 < 0">
                      <span style="color: green">
                        {{(parseInt(scope.row.priRange) + 1) * 100 }}%&nbsp;
                      </span>
<!--                      <i class="el-icon-caret-bottom"></i>-->
                    </template>

                    <span v-else style="color: #409EFF">{{ 0 }}</span>

                  </template>
                </el-table-column>

                <el-table-column
                  show-overflow-tooltip
                  prop="ewarnLevel"
                  label="预警状态">
                  <template slot-scope="scope">
                    <span style="color: #409EFF">{{ scope.row.ewarnLevel }}</span>
                  </template>
                </el-table-column>

              </el-table>

            </el-scrollbar>

          </div>
        </div>
      </div>

      <div class="right-section">

        <div class="goods-more">
          <div class="preview-title">
            <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
            <div>商品预警情况</div>
          </div>
          <div class="goods-echarts">
            <div class="echarts-all">
              <div id="dashboardone" style="width: 49%;height: 100%"></div>
              <div id="dashboardtwo" style="width: 49%;height: 100%"></div>
            </div>
          </div>
        </div>

        <div class="goods-all">

            <div class="opinion-details">

              <div class="preview-title">
                <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
                <div>各商品的舆情情况</div>
              </div>

              <el-scrollbar style="height: calc(100% - 60px)">
                <div class="opinion-body">

                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-red">
                        <span>1</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>

                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-orange">
                        <span>2</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>

                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-yellow">
                        <span>3</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>


                  <div class="opinion-item" v-for="item in 15">
                    <div class="opinion-index">
                      <div class="hot hot-gray">
                        <span>{{ item+3 }}</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>

                </div>
              </el-scrollbar>

            </div>

            <div class="report-details">

              <div class="preview-title">
                <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
                <div>各商品的分析报告</div>
              </div>

              <el-scrollbar style="height: calc(100% - 60px)">
                <div class="opinion-body">

                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-red">
                        <span>1</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>

                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-orange">
                        <span>2</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>

                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-yellow">
                        <span>3</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>


                  <div class="opinion-item" v-for="item in 15">
                    <div class="opinion-index">
                      <div class="hot hot-gray">
                        <span>{{ item+3 }}</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>希拉里访问印度,减少进口伊朗石油</span>
                      </div>
                    </div>
                    <div class="fire">
                      <img src="../../assets/img/热度.png">&nbsp;
                      <span>2345</span>
                    </div>
                  </div>

                </div>
              </el-scrollbar>

            </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Navbar } from '@/layout/components'
import VueCountUp from 'vue-countupjs'
export default {
    name: 'Dashboard',
    data() {
        return {
            numArray1:[3,6,9],
            minsheng:[]
        }
    },
    methods: {
        ...mapActions([
           'view'
        ]),
        gorouter() {
          this.$router.push('/secondpage/index')
        },
        drawOne() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(document.getElementById('dashboardone'));

          // 指定图表的配置项和数据
          var option = {
              // title: {
              //     text: '预警情况',
              //     left: 'center',
              //     top: 20,
              //     textStyle: {
              //         color: '#fff'
              //     }
              // },

              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },

              visualMap: {
                  show: false,
                  min: 80,
                  max: 600,
                  inRange: {
                      colorLightness: [0, 1]
                  }
              },
              series : [
                  {
                      name:'访问来源',
                      type:'pie',
                      radius : '55%',
                      center: ['50%', '50%'],
                      data:[
                          {value:335, name:'直接访问'},
                          {value:310, name:'邮件营销'},
                          {value:274, name:'联盟广告'},
                          {value:235, name:'视频广告'},
                          {value:400, name:'搜索引擎'}
                      ].sort(function (a, b) { return a.value - b.value; }),
                      roseType: 'radius',
                      label: {
                          normal: {
                              textStyle: {
                                  color: 'rgba(255, 255, 255, 1)'
                              }
                          }
                      },
                      labelLine: {
                          normal: {
                              lineStyle: {
                                  color: 'rgba(255, 255, 255, 1)'
                              },
                              smooth: 0.2,
                              length: 10,
                              length2: 20
                          }
                      },
                      itemStyle: {
                          normal: {
                              color: '#c23531',
                              shadowBlur: 200,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      },

                      animationType: 'scale',
                      animationEasing: 'elasticOut',
                      animationDelay: function (idx) {
                          return Math.random() * 200;
                      }
                  }
              ]
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        },

        drawTwo() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('dashboardtwo'));

            // 指定图表的配置项和数据
            var option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                // legend: {
                //     data:['邮件营销','联盟广告','视频广告'],
                //     textStyle: {
                //         color: '#ffffff'
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#ffffff'
                            }
                        }

                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        areaStyle: {},
                        data:[150, 232, 201, 154, 190, 330, 410]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
    },
    components:{
        Navbar,
        VueCountUp
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    mounted() {
        this.drawOne()
        this.drawTwo()
    },
    created() {
        this.view().then(res => {
            console.log(res.data.ewanInfo)
            this.minsheng = res.data.ewanInfo
        })
    }
}
</script>

<style lang="scss">
  .dashboard-container{
    height: 100vh;
    overflow: hidden;
    color: #ffffff;

    .fixed-header {
      position: fixed;
      width: 100%;
      top: 0;
      right: 0;
      z-index: 9;
    }

    .main-body {
      display: flex;
      justify-content: space-between;
      height: 100%;
      padding: 84px 14px 8px;
      background: #051961;

      .preview-title {
        display: flex;
        align-items: center;
        padding: 16px 0 0 16px;
        font-size: 16px;
        color: #cccccc;
      }

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .opinion-body {
        padding: 10px 16px 0;
        /*height: calc(100% - 156px);*/

        .opinion-item {
          height: 30px;
          line-height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .opinion-index {
            display: flex;
            align-items: center;

            .hot {
              width: 20px;
              height: 20px;
              text-align: center;line-height: 20px;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }

            .hot-red {
              background-image: url('../../assets/img/红.png');
              background-repeat:no-repeat;
              background-size:100% 100%;
            }

            .hot-orange {
              background-image: url('../../assets/img/橙.png');
              background-repeat:no-repeat;
              background-size:100% 100%;
            }

            .hot-yellow {
              background-image: url('../../assets/img/黄.png');
              background-repeat:no-repeat;
              background-size:100% 100%;
            }

            .hot-gray {
              background-image: url('../../assets/img/深色.png');
              background-repeat:no-repeat;
              background-size:100% 100%;
            }

            .fire {
              display: flex;
              align-items: center;
            }
          }
        }
      }

      .left-section {
        width: 38%;
        height: 100%;

        .live-preview {
          height: 135px;
          background-image: url('../../assets/img/dashboard1-1.png');
          background-repeat:no-repeat;
          background-size:100% 100%;

          .num-details {
            width: calc(100% - 16px);
            padding: 40px 0 0 16px;
            color: #afb6ce;

            .details-body {
              display: flex;
              justify-content: space-between;
              letter-spacing: 1px;

              .num-style {
                margin-right:4px;
                font-size: 18px;
                padding: 10px 8px
              }
            }
          }
        }

        .goods-details {
          height: calc(100% - 135px);
          margin-top: 4px;
          background-image: url("../../assets/img/dashboard1-2.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;

          .goods-table {
            width: calc(100% - 16px);
            height: 100%;
            padding: 10px 0 0 16px;

            .scrollbar-table {

              .el-table thead {
                color: #ffffff;
              }

              .el-table tr {
                background: rgb(15, 29, 111);
              }

              .el-table td, .el-table th.is-leaf {
                border-bottom: 0 solid #EBEEF5;
              }

              .el-table::before {
                height: 0;
              }

              .el-table--striped .el-table__body tr.el-table__row--striped td {
                background: #1031a0;
              }

              .el-table--enable-row-hover .el-table__body tr:hover>td {
                background: #1a4894;
              }
            }
          }
        }
      }

      .right-section {
        width: 62%;
        height: 100%;
        padding-left: 6px;

        .goods-more {
          height: 50%;
          background-image: url("../../assets/img/dashboard2-1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;

          .goods-echarts {
            padding: 10px 0 0 16px;
            height: 80%;

            .echarts-all {
              display: flex;
              justify-content: space-between;
              height: 100%;
              padding-right:16px
            }
          }
        }

        .goods-all {
          display: flex;
          justify-content: space-between;
          height: 50%;
          padding: 3px 0 0;

          .opinion-details {
            width: 50%;
            margin-right: 4px;
            background-image: url("../../assets/img/dashboard2-2.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;

          }

          .report-details {
            width: 50%;
            margin-top: 5px;
            margin-bottom: -4px;
            background-image: url("../../assets/img/dashboard2-3.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

  }
</style>
