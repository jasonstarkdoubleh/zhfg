<template>
  <div class="analyse-page">

    <div style="height: 50px;line-height: 50px;background-color: #ffffff;border-radius: 3px;font-size: 22px;">
      <div style="margin-left: 15px;display: flex;align-items: center">
        <img src="../../../public/img/组86.png" alt="">
        <span style="margin-left: 5px">小麦</span>
      </div>
    </div>

    <div style="margin: 10px">

      <div style="margin-bottom: 10px;display: flex;justify-content: space-between">

        <div style="width: 33%;height: 88px;margin-right: 10px;background-color: #ffffff;padding: 14px;display: flex">

          <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
            <img src="../../assets/img/饼干.png" style="width: 50px;margin: 5px">
          </div>

          <div style="display: flex;justify-content: space-between;width: 100%">

            <div style="display: flex;flex-direction: column;justify-content: space-between">
              <div style="font-size: 16px">猪肉产量</div>
              <div style="color: #cccccc;">
                上年产量2160万吨,同比增长0.15%
                <i class="el-icon-top-right" style="color: red"></i>
              </div>
            </div>

            <div style="line-height: 60px;font-size: 20px;font-weight: bold;">
              2165万吨
            </div>

          </div>
        </div>

        <div style="width: 33%;height: 88px;margin-right: 10px;background-color: #ffffff;padding: 14px;display: flex">

          <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
            <img src="../../assets/img/饼干.png" style="width: 50px;margin: 5px">
          </div>

          <div style="display: flex;justify-content: space-between;width: 100%">

            <div style="display: flex;flex-direction: column;justify-content: space-between">
              <div style="font-size: 16px">鲜猪肉销量</div>
              <div style="color: #cccccc;">
                上年产量2160万吨,同比增长0.15%
                <i class="el-icon-top-right" style="color: red"></i>
              </div>
            </div>

            <div style="line-height: 60px;font-size: 20px;font-weight: bold;">
              2165万吨
            </div>

          </div>
        </div>

        <div style="width: 33%;height: 88px;background-color: #ffffff;padding: 15px;display: flex">

          <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
            <img src="../../assets/img/饼干.png" style="width: 50px;margin: 5px">
          </div>

          <div style="display: flex;justify-content: space-between;width: 100%">

            <div style="display: flex;flex-direction: column;justify-content: space-between">
              <div style="font-size: 16px">居民家庭人均</div>
              <div style="color: #cccccc;">
                上年产量2160万吨,同比增长0.15%
                <i class="el-icon-top-right" style="color: red"></i>
              </div>
            </div>

            <div style="line-height: 60px;font-size: 20px;font-weight: bold;">
              2165万吨
            </div>

          </div>
        </div>

      </div>

      <div style="display: flex;justify-content: space-between;">

        <div style="width: 33%;margin-right: 10px;">
          <div style="height: 168px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              生猪猪肉价格分析
            </div>
            <div style="display: flex;height: calc(100% - 35px)">

              <div style="width: 33%;height: 100%;margin-top: 10px;padding: 0 20px 10px;display: flex;flex-direction: column;justify-content: space-around;border-right: 1px dashed #eeeeee">
                <div style="color: #b5b5b5">市场价格</div>
                <div>
                  <span style="color: #2c83fc;font-size: 22px">15</span>
                  元/kg
                </div>
                <div>
                  同比<i class="el-icon-caret-top" style="color: red"></i>
                  6.4%
                </div>
              </div>

              <div style="width: 33%;height: 100%;margin-top: 10px;padding: 0 20px 10px;display: flex;flex-direction: column;justify-content: space-around;border-right: 1px dashed #eeeeee">
                <div style="color: #b5b5b5">市场价格</div>
                <div>
                  <span style="color: #ff2b38;font-size: 22px">15</span>
                  元/kg
                </div>
                <div>
                  同比<i class="el-icon-caret-top" style="color: red"></i>
                  6.4%
                </div>
              </div>

              <div style="width: 33%;height: 100%;margin-top: 10px;padding: 0 20px 10px;display: flex;flex-direction: column;justify-content: space-around;">
                <div style="color: #b5b5b5">电商价格</div>
                <div>
                  <span style="color: #3965b4;font-size: 22px">15</span>
                  元/kg
                </div>
                <div>
                  同比<i class="el-icon-caret-top" style="color: red"></i>
                  6.4%
                </div>
              </div>

            </div>
          </div>

          <div style="margin-top: 10px;height: 248px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              进出口额趋势分析
            </div>
            <div style="height: 210px;width: 100%" id="manyanalyse"></div>
          </div>
        </div>

        <div style="width: 33%;margin-right: 10px;height: 426px;background-color: #ffffff;padding: 4px 10px 32px;">
          <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
            各地猪肉价格趋势分布
          </div>
          <div style="width: 100%;height: 375px" id="analysemap"></div>
        </div>

        <div style="width: 33%;">
          <div style="height: 168px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              生猪猪肉价格分析
            </div>
            <div style="display: flex;height: calc(100% - 35px)">

              <div style="width: 50%;height: 100%" id="analysepieone"></div>

              <div style="width: 50%;height: 100%" id="analysepietwo"></div>

            </div>
          </div>

          <div style="margin-top: 10px;height: 248px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              生猪发病指数分析
            </div>
            <div style="height: 210px;width: 100%">
              <el-scrollbar style="height: calc(100% - 30px)">
                <div class="opinion-body">

                  <div class="opinion-item">

                    <div class="opinion-index">
                      <div class="hot hot-red">
                        <span style="color: #ffffff">1</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>猪瘟病发病数</span>
                      </div>
                    </div>

                    <div>
                      <el-progress :percentage="50"></el-progress>
                    </div>

<!--                    <div>-->
<!--                      <span>2345</span>-->
<!--                    </div>-->

                  </div>



                  <div class="opinion-item">
                    <div class="opinion-index">
                      <div class="hot hot-orange">
                        <span style="color: #ffffff">2</span>
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
                        <span style="color: #ffffff">3</span>
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
                        <span style="color: #ffffff">{{ item+3 }}</span>
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
      <div style="display:flex;">

        <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
      </div>


    </div>
  </div>
</template>

<script>
    import 'echarts/map/js/china'
    export default {
        data(){
            return {
                activeName: 'first',
                radio: '小麦',
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('manyanalyse'));

                // 指定图表的配置项和数据
                let option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {},
                        color: '#2c83fc'
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            drawMap(){
                let myChart = this.$echarts.init(document.getElementById('analysemap'));
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}'
                    },
                    series: [
                        {
                            name: '中国',
                            type: 'map',
                            roam: false,
                            mapType: 'china',
                            selectedMode : 'multiple',
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 14,
                                        color: '#fff'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 14,
                                        color: '#fff'
                                    }
                                }
                            },
                            data:[
                                {name:'广东', selected:true}
                            ],
                            itemStyle: {
                                normal: {
                                    areaColor: '#1E90FF',
                                },
                                emphasis: {//鼠标移入高亮显颜色
                                    areaColor: '#1B0CFF'
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            },
            drawPieOne() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('analysepieone'));

                // 指定图表的配置项和数据

                var option = {
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal:{
                                    color:function(params) {
                                        let colorList = [ '#2c83fc', '#3aceff', '#3965b4' ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            drawPieTwo() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('analysepietwo'));

                // 指定图表的配置项和数据
                var option = {
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:234, name:'联盟广告'},
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal:{
                                    color:function(params) {
                                        let colorList = [ '#2c83fc', '#3aceff', '#3965b4' ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
        },
        mounted() {
            this.drawLine();
            this.drawMap();
            this.drawPieOne();
            this.drawPieTwo();
        }
    }
</script>

<style lang="scss">

.analyse-page {
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
}

</style>
