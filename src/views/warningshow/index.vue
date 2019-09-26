<template>
    <div class="warning-show">
      <div style="height: 100px;background-color: #ffffff;border-radius: 3px;padding: 15px 3px 0">
        <div style="font-size: 22px;margin-left: 15px;display: flex;align-items: center">
          <img src="../../../public/img/组86.png" alt="">
          <span style="margin-left: 5px">小麦</span>
        </div>
        <div style="background-color: #eeeeee;height: 2px;margin: 6px 0 12px"></div>
        <div style="margin: 0 15px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="常规预警" name="first">
              <div style="display: flex;justify-content: flex-end;margin-bottom: 12px">
                <el-radio-group v-model="radio" size="medium">
                  <el-radio-button label="小麦"></el-radio-button>
                  <el-radio-button label="苹果"></el-radio-button>
                  <el-radio-button label="大豆"></el-radio-button>
                  <el-radio-button label="玉米"></el-radio-button>
                </el-radio-group>
              </div>
              <div style="margin-bottom: 12px;display: flex;justify-content: space-between">

                <div style="width: 33%;height: 80px;margin-right: 10px;background-color: #ffffff;padding: 10px;display: flex">

                  <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                    <img src="../../assets/img/饼干.png" style="width: 50px;margin: 5px">
                  </div>

                  <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                    <div style="position: relative;width: 100%">
                      <div style="font-size: 16px">当前价格</div>
                      <div style="color: #cccccc;position: absolute;width: 100%;bottom: 0">
                        同比增长0.15%
                        <i class="el-icon-top-right" style="color: red"></i>
                      </div>
                    </div>
                    <div style="margin-right: 30px;line-height: 60px;font-size: 22px;font-weight: bold">
                      34
                    </div>
                  </div>
                </div>

                <div style="width: 33%;height: 80px;margin-right: 10px;background-color: #ffffff;padding: 10px;display: flex">

                  <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                    <img src="../../assets/img/饼干.png" style="width: 50px;margin: 5px">
                  </div>

                  <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                    <div style="position: relative;width: 100%">
                      <div style="font-size: 16px">本月均价</div>
                      <div style="color: #cccccc;position: absolute;width: 100%;bottom: 0">
                        同比增长0.15%
                        <i class="el-icon-top-right" style="color: red"></i>
                      </div>
                    </div>
                    <div style="margin-right: 30px;line-height: 60px;font-size: 22px;font-weight: bold">
                      34
                    </div>
                  </div>
                </div>

                <div style="width: 33%;height: 80px;background-color: #ffffff;padding: 10px;display: flex">

                  <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                    <img src="../../assets/img/饼干.png" style="width: 50px;margin: 5px">
                  </div>

                  <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                    <div style="position: relative;width: 100%">
                      <div style="font-size: 16px">本年均价</div>
                      <div style="color: #cccccc;position: absolute;width: 100%;bottom: 0">
                        同比增长0.15%
                        <i class="el-icon-top-right" style="color: red"></i>
                      </div>
                    </div>
                    <div style="margin-right: 30px;line-height: 60px;font-size: 22px;font-weight: bold">
                      34
                    </div>
                  </div>
                </div>

              </div>
              <el-card>
                <div slot="header" class="clearfix">
                  <span>小麦 -- 常规预警</span>
                </div>
                <div id="myChart" style="width: 100%;height: 400px;margin-top: 20px"></div>
              </el-card>
            </el-tab-pane>

            <el-tab-pane label="非常规预警" name="second">非常规预警</el-tab-pane>

            <el-tab-pane label="舆情预警" name="third">舆情预警</el-tab-pane>
          </el-tabs>
        </div>
      </div>

    </div>
</template>

<script>
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
        },
        mounted() {
            this.drawLine()
        }
    }
</script>

<style lang="scss">
  .warning-show {
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }

    /*.el-tabs__content {*/
    /*  margin-top: 60px;*/
    /*}*/
  }
</style>
