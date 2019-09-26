<template>
  <div>

    <div style="padding: 20px 10px;background: #ffffff">

      <div class="bgc flex">
        <div>
          <span style="margin-right: 20px">按时间查询</span>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button type="primary">提交查询</el-button>
      </div>

      <div style="height: 40px;line-height: 40px;font-weight: bold;margin-left: 10px">说明:伦敦交易所近期收盘价中粒</div>
      <div style="margin-top: 10px;display: flex;justify-content: space-around">

        <div style="width: 25%;border-right: 1px #cccccc dashed">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/商品名称.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">商品名称</div>
            <div style="padding-left: 10px">小麦</div>
          </div>
        </div>

        <div style="width: 25%;border-right: 1px #cccccc dashed">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/模型名称.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">模型名称</div>
            <div style="padding-left: 10px">小麦</div>
          </div>
        </div>

        <div style="width: 25%;border-right: 1px #cccccc dashed">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/算法名称.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">算法名称</div>
            <div style="padding-left: 10px">咖啡</div>
          </div>
        </div>

        <div style="width: 25%;">
          <div style="display: flex;justify-content: center">
            <img src="../../assets/img/单位.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;letter-spacing: 1px;margin-top: 15px;color: #cccccc">
            <div style="padding-right: 10px;border-right: 1px solid #cccccc">单位</div>
            <div style="padding-left: 10px">美元/吨</div>
          </div>
        </div>

      </div>
    </div>

    <div style="height: 50px;line-height: 50px;color: #cccccc;display: flex;">
      <div style="margin-right: 10px;width: 140px">咖啡(英) - 日预测</div>
      <div style="height: 24px;border-bottom: 1px #cccccc solid;width: 100%"></div>
    </div>

    <div style="display: flex">
      <el-card style="width: 55%;margin-right: 8px">
        <div id="divineone" style="height: 300px"></div>
      </el-card>
      <el-card style="width: 45%">
        <div id="divinetwo" style="height: 300px"></div>
      </el-card>
    </div>

    <jtable
      style="margin-top: 10px"
      :tableData="tableData"
      :columnData="columnData">

    </jtable>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    export default {
        data() {
            return {
                dateValue: '',
                tableData: [{
                    time:'2019.09.25',
                    real:1388,
                    divine:1350,
                    change:'修正',
                }],
                columnData: {
                    time:'交易时间',
                    real:'报价/单位(实际)',
                    divine:'报价/单位(预测)',
                    change:'异常点修改',
                }
            }
        },
        components: {
            jtable
        },
        methods: {
            drawDivineone(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('divineone'))
                // 绘制图表
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','搜索引擎']
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
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            drawDivinetwo(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('divinetwo'))
                // 绘制图表
                var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
                var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
                var yMax = 500;
                var dataShadow = [];

                for (var i = 0; i < data.length; i++) {
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
                var zoomSize = 6;
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
            this.drawDivineone();
            this.drawDivinetwo()
        }
    }
</script>

<style scoped>

</style>
