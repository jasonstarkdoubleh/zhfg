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

            <el-tab-pane label="非常规预警" name="second">
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
                <div id="myCharttwo" style="width: 100%;height: 400px;margin-top: 20px"></div>
              </el-card>
            </el-tab-pane>

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
                if(tab.name === "second") {
                    this.$nextTick(() => {
                        this.drawLinetwo()
                    })
                }
                if(tab.name === "third") {
                    this.$router.push({
                        path: '/secondpage/index',
                        query:{
                            num : 'newsShow'
                        }
                    })
                }
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                let option = {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
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
            drawLinetwo(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('myCharttwo'))
                // 绘制图表
                let option = {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
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
