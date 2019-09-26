<template>
  <div class="macrograph">
    <div style="display: flex">
      <div>
        <div :class="{ cpi: true, active: active === 1 }" @click="changePi(1)" style="display: flex;align-items: center;justify-content: center;margin-right: 20px;height: 40px;width: 150px;font-size: 18px;line-height: 40px;cursor: pointer;border-radius: 4px">
          <img src="../../../../assets/img/预测服务(1).png" v-if="active === 1" alt="">
          <img src="../../../../assets/img/预测服务.png" v-if="active === 2" alt="">
          <span style="margin-left: 5px">CPI预测</span>
        </div>
        <div v-if="active === 1" style="margin-top: -3px;margin-left: 73px">
          <img src="../../../../assets/img/多边形3.png" alt="">
        </div>
      </div>

      <div>
        <div :class="{ cpi: true, active: active === 2 }" @click="changePi(2)" style="display: flex;align-items: center;justify-content: center;height: 40px;width: 150px;font-size: 18px;line-height: 40px;cursor: pointer;border-radius: 4px">
          <img src="../../../../assets/img/预测服务.png" v-if="active === 1" alt="">
          <img src="../../../../assets/img/预测服务(1).png" v-if="active === 2" alt="">
          <span style="margin-left: 5px">PPI预测</span>
        </div>
        <div v-if="active === 2" style="margin-top: -3px;margin-left: 73px">
          <img src="../../../../assets/img/多边形3.png" alt="">
        </div>
      </div>

    </div>

    <el-card style="border-top: 2px #2c83fc solid;margin-top: -3px">
      <div id="CPI" style="height: 300px;width: 100%"></div>
    </el-card>

    <div style="height: 60px;background: #ffffff;margin-top: 10px;line-height: 60px;font-size: 18px;display: flex;align-items: center">

      <div style="margin-left: 18px;margin-right: 30px;font-weight: bold">各商品指数变化</div>

      <div :class="{ change: true, active:  isactive === 1 }" @click="changeGoods(1)" style="display: flex;align-items: center;justify-content: center;margin-right: 10px;height: 40px;width: 150px;font-size: 18px;line-height: 40px;cursor: pointer;border-radius: 4px">
        <img src="../../../../assets/img/猪.png" alt="">
        <span style="margin-left: 3px;letter-spacing: 2px">猪肉</span>
      </div>

      <div :class="{ change: true, active:  isactive === 2 }" @click="changeGoods(2)" style="display: flex;align-items: center;justify-content: center;margin-right: 10px;height: 40px;width: 150px;font-size: 18px;line-height: 40px;cursor: pointer;border-radius: 4px">
        <img src="../../../../assets/img/鸡蛋.png" alt="">
        <span style="margin-left: 3px;letter-spacing: 2px">蛋类</span>
      </div>

      <div :class="{ change: true, active:  isactive === 3 }" @click="changeGoods(3)" style="display: flex;align-items: center;justify-content: center;margin-right: 10px;height: 40px;width: 150px;font-size: 18px;line-height: 40px;cursor: pointer;border-radius: 4px">
        <img src="../../../../assets/img/饺子.png" alt="">
        <span style="margin-left: 3px;letter-spacing: 2px">食物</span>
      </div>

      <div :class="{ change: true, active:  isactive === 4 }" @click="changeGoods(4)" style="display: flex;align-items: center;justify-content: center;margin-right: 10px;height: 40px;width: 150px;font-size: 18px;line-height: 40px;cursor: pointer;border-radius: 4px">
        <img src="../../../../assets/img/糖果.png" alt="">
        <span style="margin-left: 3px;letter-spacing: 2px">糖果</span>
      </div>

    </div>

    <div style="margin: 10px 20px">
      <div style="display: flex;">

        <el-card style="width: 33%;margin-right: 10px">
          <div slot="header">
            猪肉价格指数同比及环比预测
          </div>
          <div id="macone" style="height: 200px"></div>
        </el-card>

        <el-card style="width: 33%;margin-right: 10px">
          <div slot="header">
            商务部鲜猪肉批发价格
          </div>
          <div id="mactwo" style="height: 200px"></div>
        </el-card>

        <el-card style="width: 33%">
          <div slot="header">
            全国生猪存栏量
          </div>
          <div id="macthree" style="height: 200px"></div>
        </el-card>

      </div>
    </div>


<!--    <el-card style="margin-top: 10px">-->
<!--      <el-table id="CPITABLE"-->
<!--                :data="tableData"-->
<!--                height="600"-->
<!--                border-->
<!--                stripe>-->

<!--        <el-table-column label="月份" align="center" prop="date" width="200"></el-table-column>-->

<!--        <el-table-column label="全国" align="center">-->
<!--          <el-table-column property="qmouth" label="当月" align="center"></el-table-column>-->
<!--          <el-table-column property="qyearUp" label="同比增长" align="center"></el-table-column>-->
<!--          <el-table-column property="qquarterUp" label="环比增长" align="center"></el-table-column>-->
<!--          <el-table-column property="qtotal" label="累计" align="center"></el-table-column>-->
<!--        </el-table-column>-->

<!--        <el-table-column label="城市" align="center">-->
<!--          <el-table-column property="cmouth" label="当月" align="center"></el-table-column>-->
<!--          <el-table-column property="cyearUp" label="同比增长" align="center"></el-table-column>-->
<!--          <el-table-column property="cquarterUp" label="环比增长" align="center"></el-table-column>-->
<!--          <el-table-column property="ctotal" label="累计" align="center"></el-table-column>-->
<!--        </el-table-column>-->

<!--        <el-table-column label="农村" align="center">-->
<!--          <el-table-column property="nmouth" label="当月" align="center"></el-table-column>-->
<!--          <el-table-column property="nyearUp" label="同比增长" align="center"></el-table-column>-->
<!--          <el-table-column property="nquarterUp" label="环比增长" align="center"></el-table-column>-->
<!--          <el-table-column property="ntotal" label="累计" align="center"></el-table-column>-->
<!--        </el-table-column>-->

<!--      </el-table>-->
<!--    </el-card>-->

  </div>
</template>

<script>
    export default {
        data(){
            return {
                isactive: 1,
                active: 1,
            }
        },
        methods: {
            changeGoods(data) {
                this.isactive = data
            },
            changePi(data) {
                this.active = data
            },
            drawCPI(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('CPI'))
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
            drawMacone(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('macone'))
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
            drawMactwo(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('mactwo'))
                // 绘制图表
                var base = +new Date(1968, 9, 3);
                var oneDay = 24 * 3600 * 1000;
                var date = [];

                var data = [Math.random() * 300];

                for (var i = 1; i < 20000; i++) {
                    var now = new Date(base += oneDay);
                    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
                    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
                }

                let option = {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    title: {
                        left: 'center',
                        text: '大数据量面积图',
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 10
                    }, {
                        start: 0,
                        end: 10,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: [
                        {
                            name:'模拟数据',
                            type:'line',
                            smooth:true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            areaStyle: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },
                            data: data
                        }
                    ]
                };

                myChart.setOption(option);
            },
            drawMacthree(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('macthree'))
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
            this.drawCPI();
            this.drawMacone();
            this.drawMactwo();
            this.drawMacthree()
        }
    }
</script>

<style lang="scss">
  .macrograph {

    .cpi {
      background: #ffffff;
    }

    .change {
      background-image: url("../../../../assets/img/矩形9拷贝.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .active {
      background-image: url("../../../../assets/img/矩形9.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
    }

  }
  #CPITABLE .el-table td{
    padding: 6px 0;
  }
</style>
