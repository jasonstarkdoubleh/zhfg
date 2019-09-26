<template>
  <div class="second-page">

    <div class="header-layout">

      <div class="header-left">
        <div class="main-bgc" style="cursor: pointer" @click="handleProductionShow('bodyLayoutShow')">
          <span style="margin-right: 20px">小麦</span>
        </div>
        <div :class="{ 'goodleft-bgc': true, 'is-active':allShow.productionShow }" @click="handleProductionShow('productionShow')">
          <span>生产</span>
        </div>
        <div :class="{ 'goodleft-bgc': true, 'is-active':allShow.waterShow }" @click="handleProductionShow('waterShow')">
          <span>流通</span>
        </div>
        <div :class="{ 'goodleft-bgc': true, 'is-active':allShow.priceShow }" @click="handleProductionShow('priceShow')">
          <span>价格</span>
        </div>
      </div>

      <div class="header-right">
        <div :class="{ 'goodright-bgc': true, 'is-active-right':allShow.shopShow }" @click="handleProductionShow('shopShow')">
          <span>
            消费
          </span>
        </div>
        <div :class="{ 'goodright-bgc': true, 'is-active-right':allShow.moneyShow }" @click="handleProductionShow('moneyShow')">
          <span>
            贸易
          </span>
        </div>
        <div :class="{ 'goodright-bgc': true, 'is-active-right':allShow.backetShow }" @click="handleProductionShow('backetShow')">
          <span>
            成本收益
          </span>
        </div>
        <div :class="{ 'goodright-bgc': true, 'is-active-right':allShow.newsShow }" @click="handleProductionShow('newsShow')">
          <span>
            舆情
          </span>
        </div>
      </div>

    </div>

    <div v-show="allShow.bodyLayoutShow" class="body-layout">

      <div class="goods-warning">

        <div class="preview-title">
          <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
          <div>商品预警情况</div>
        </div>

        <div style="margin-top: 30px;display: flex;justify-content: space-around">

          <div style="text-align: center">
            <div style="color: #2d84fe">
              小麦价格
            </div>
            <div style="color: #1cff9e;font-weight: bold;font-size: 16px;margin-top: 10px">
              <span style="font-size: 22px">
                <vue-count-up :start-value="0" :end-value="1000"></vue-count-up>
              </span>
              元
              <span style="font-size: 22px">
                /
                <vue-count-up :start-value="0" :end-value="50"></vue-count-up>
              </span>
              公斤
            </div>
          </div>

          <div style="text-align: center">
            <div style="color: #2d84fe">
              同比增幅
            </div>
            <div style="color: #1cff9e;font-weight: bold;font-size: 16px;margin-top: 10px">
              <span style="font-size: 22px">
                <vue-count-up :start-value="0" :end-value="8.8"></vue-count-up>
              </span>%
            </div>
          </div>

          <div style="text-align: center">
            <div style="color: #2d84fe">
              环比增幅
            </div>
            <div style="color: #1cff9e;font-weight: bold;font-size: 16px;margin-top: 10px">
              <span style="font-size: 22px">
                <vue-count-up :start-value="0" :end-value="5.6"></vue-count-up>
              </span>%
            </div>
          </div>
        </div>

        <div id="secondmap" style="height: calc(100% - 150px)">

        </div>
      </div>

      <div class="body-right">
        <div class="right-up">
          <div class="up up-1" style="height: calc(100% + 1px)">

            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>小麦所有价格数据</div>
            </div>

            <div class="goods-table">

              <el-scrollbar class="scrollbar-table" style="height: calc(100% - 60px)">

                <el-table
                  :data="peopleLife"
                  :header-cell-style="{background:'rgb(15, 29, 111)'}"
                  stripe
                  style="width: 100%">

                  <el-table-column
                    prop="name"
                    label="名称">
                    <template slot-scope="scope">
                      <el-link type="primary">{{ scope.row.name }}</el-link>
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

          <div class="up up-2" style="margin: 4px 2px 0">
            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>情感分布趋势</div>
            </div>
            <div id="secondpie" style="height: 80%"></div>
          </div>

          <div class="up up-3" style="margin-top: 2px;height: calc(100% - 1px)">
            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>热点舆情TOP10</div>
            </div>

            <el-scrollbar style="height: calc(100% - 60px)">
              <div style="margin: 10px 0 0 16px">

                <div style="height: 30px;line-height: 30px">
                  <span style="color: red">NO.1</span>&nbsp;
                  韩国可能完全中断进口
                </div>

                <div style="height: 30px;line-height: 30px">
                  <span style="color: orange">NO.1</span>&nbsp;
                  韩国可能完全中断进口
                </div>

                <div style="height: 30px;line-height: 30px">
                  <span style="color: yellow">NO.1</span>&nbsp;
                  韩国可能完全中断进口
                </div>

                <div style="height: 30px;line-height: 30px" v-for="item in 7">
                  <span>NO.{{ item + 3}}</span>&nbsp;
                  韩国可能完全中断进口
                </div>

              </div>
            </el-scrollbar>

          </div>

        </div>
        <div class="right-down">
          <div class="down1">
            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>热度走势</div>
            </div>
            <div id="secondline" style="height: 80%"></div>
          </div>
          <div class="down2">
            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>各商品的分析报告</div>
            </div>
            <el-scrollbar style="height: calc(100% - 60px)">
              <div style="font-size: 16px;">

                <div style="height: 110px;border: 1px solid #3F7FFF;margin: 10px 16px 10px;padding: 10px 6px 20px;">
                  <div style="color: #1E90FF;border-bottom: #1E90FF 1px dashed;padding-bottom: 2px;margin-bottom: 5px">NO.1 路透社报料伊朗削减</div>
                  <div style="height: 20px;line-height: 20px">
                    回复内容回复内容回复内容回复内容回复内容回复
                  </div>
                  <div style="margin-top: 30px;display: flex;justify-content: space-between">
                    <div>
                      <span>2019-09-23</span>
                    </div>
                    <div style="color: #2d84fe;cursor: pointer">详情 ></div>
                  </div>
                </div>

                <div style="height: 110px;border: 1px solid #3F7FFF;margin: 10px 16px 10px;padding: 10px 6px 20px;">
                  <div style="color: #1E90FF;border-bottom: #1E90FF 1px dashed;padding-bottom: 2px;margin-bottom: 5px">NO.1 路透社报料伊朗削减</div>
                  <div style="height: 20px;line-height: 20px">
                    回复内容回复内容回复内容回复内容回复内容回复
                  </div>
                  <div style="margin-top: 30px;display: flex;justify-content: space-between">
                    <div>
                      <span>2019-09-23</span>
                    </div>
                    <div style="color: #2d84fe;cursor: pointer">详情 ></div>
                  </div>
                </div>

                <div style="height: 110px;border: 1px solid #3F7FFF;margin: 10px 16px 10px;padding: 10px 6px 20px;">
                  <div style="color: #1E90FF;border-bottom: #1E90FF 1px dashed;padding-bottom: 2px;margin-bottom: 5px">NO.1 路透社报料伊朗削减</div>
                  <div style="height: 20px;line-height: 20px">
                    回复内容回复内容回复内容回复内容回复内容回复
                  </div>
                  <div style="margin-top: 30px;display: flex;justify-content: space-between">
                    <div>
                      <span>2019-09-23</span>
                    </div>
                    <div style="color: #2d84fe;cursor: pointer">详情 ></div>
                  </div>
                </div>

              </div>
            </el-scrollbar>

          </div>
        </div>
      </div>
    </div>

    <div v-show="!allShow.bodyLayoutShow" style="padding-top: 10px;margin: 0 -15px; ">

      <div v-if="allShow.productionShow">
        <second secondLine="trendline" secondPoint="trendpoint"></second>
      </div>

      <div v-if="allShow.waterShow">
        <second secondLine="waterline" secondPoint="waterpoint"></second>
      </div>

      <div v-if="allShow.priceShow">
        <second secondLine="priceline" secondPoint="pricepoint"></second>
      </div>

      <div v-if="allShow.shopShow">
        <second secondLine="shopline" secondPoint="shoppoint"></second>
      </div>

      <div v-if="allShow.moneyShow">
        <second secondLine="moneyline" secondPoint="moneypoint"></second>
      </div>

      <div v-if="allShow.backetShow">
        <second secondLine="backetline" secondPoint="backetpoint"></second>
      </div>

      <div v-if="allShow.newsShow">
        <div style="display: flex;height: calc(100vh - 140px)">

          <div class="goods-warning" style="width: 30%">
              <div class="preview-title">
                <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
                <div>热点舆情TOP50</div>
              </div>

              <el-scrollbar style="height: calc(100% - 60px)">
                <div style="margin: 10px 0 0 16px">

                  <div style="height: 30px;line-height: 30px">
                    <span style="color: red">NO.1</span>&nbsp;
                    韩国可能完全中断进口
                  </div>

                  <div style="height: 30px;line-height: 30px">
                    <span style="color: orange">NO.1</span>&nbsp;
                    韩国可能完全中断进口
                  </div>

                  <div style="height: 30px;line-height: 30px">
                    <span style="color: yellow">NO.1</span>&nbsp;
                    韩国可能完全中断进口
                  </div>

                  <div style="height: 30px;line-height: 30px" v-for="item in 47">
                    <span>NO.{{ item + 3}}</span>&nbsp;
                    韩国可能完全中断进口
                  </div>

                </div>
              </el-scrollbar>
          </div>

          <div class="body-right" style="margin-top: 4px;padding-bottom: 4px;width: 70%">
            <div style="height: 40%;width: 100%;margin-bottom: 4px" id="newspie" class="news-pie"></div>
            <div style="height: 60%;width: 100%;" id="newsline" class="news-pie"></div>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
    import 'echarts/map/js/china'
    import VueCountUp from 'vue-countupjs'
    import second from '_c/Second'
    export default {
        data: function () {
            return {
                tableData: [],
                allShow: {
                    bodyLayoutShow: true,
                    productionShow: false,
                    waterShow: false,
                    priceShow: false,
                    shopShow: false,
                    moneyShow: false,
                    backetShow: false,
                    newsShow: false,
                },
                peopleLife:[{
                    name: '水果',
                    price: '斤',
                },{
                    name: '水果',
                    price: '斤',
                },{
                    name: '水果',
                    price: '斤',
                },{
                    name: '水果',
                    price: '斤',
                },{
                    name: '水果',
                    price: '斤',
                },{
                    name: '水果',
                    price: '斤',
                },{
                    name: '水果',
                    price: '斤',
                }],
            }
        },
        components: {
            VueCountUp,
            second
        },
        methods: {
            handleProductionShow(data){
                for(let i in this.allShow){
                    this.allShow[i] = false
                }
                this.allShow[data] = true
                if(this.allShow.newsShow){
                    this.$nextTick(() => {
                        this.drawNewsPie()
                        this.drawNewsLine()
                    })
                }
            },

            drawMap(){
                let myChart = this.$echarts.init(document.getElementById('secondmap'));
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
            drawPie() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('secondpie'));

                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     x: 'left',
                    //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    // },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('secondline'));

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
            drawNewsPie() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('newspie'));

                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     x: 'left',
                    //     data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    // },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            drawNewsLine() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('newsline'));

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
        mounted() {
            this.drawMap()
            this.drawPie()
            this.drawLine()
        }
    }
</script>

<style lang="scss">
  .second-page {
    height: calc(100vh - 95px);
    color: #ccc;

    .preview-title {
      display: flex;
      align-items: center;
      padding: 16px 0 0 16px;
      font-size: 16px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .scrollbar-table {

      .el-table thead {
        color: #cccccc;
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

    .header-layout {
      display:flex;
      justify-content: space-between;
      margin: -26px -20px 0;

      .header-left {
        display: flex;


        .main-bgc {
          width: 140px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #1cff9e;
          background-image: url("../../assets/img/maingood.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
        }

        .goodleft-bgc {
          width: 130px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          background-image: url("../../assets/img/goodleft.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
        }

        .goodleft-bgc:hover {
          color: #ffffff;
          background-image: url("../../assets/img/leftclick.png");
        }

        .is-active {
          color: #ffffff;
          background-image: url("../../assets/img/leftclick.png");
        }
      }

      .header-right {
        display: flex;


        .goodright-bgc {
          width: 130px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          background-image: url("../../assets/img/goodright.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
        }

        .goodright-bgc:hover {
          color: #ffffff;
          background-image: url("../../assets/img/rightclick.png");
        }

        .is-active-right {
          color: #ffffff;
          background-image: url("../../assets/img/rightclick.png");
        }
      }
    }

    .body-layout {
      height: 100%;
      display: flex;
      padding-top: 10px;
      margin: 0 -15px;

    }

    .goods-warning {
      width: 40%;
      height: 100%;
      background-image: url("../../assets/img/page1-1.png");
      background-repeat:no-repeat;
      background-size:100% 100%;
    }

    .body-right {
      width: 60%;
      height: 100%;
      margin-left: 6px;

      .news-pie{
        background-image: url("../../assets/img/dashboard1-2.png");
        background-repeat:no-repeat;
        background-size:100% 100%;
      }

      .right-up {
        height: 35%;
        display: flex;
        padding-top: 1px;

        .up {
          width: 33%;
          height: 100%;
          background-repeat:no-repeat;
          background-size:100% 100%;

          .goods-table {
            width: calc(100% - 16px);
            height: 100%;
            padding: 10px 0 0 16px;
          }
        }

        .up-1 {
          background-image: url("../../assets/img/up-1.png");
        }

        .up-2 {
          background-image: url("../../assets/img/up-2.png");
        }

        .up-3 {
          background-image: url("../../assets/img/up-1.png");
        }
      }

      .right-down {
        height: 65%;
        display: flex;
        margin-top: 5px;

        .down1 {
          width: 66%;
          margin-right: 5px;
          background-image: url("../../assets/img/down1.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
        }

        .down2 {
          width: 33%;
          background-image: url("../../assets/img/down2.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
        }
      }
    }

    .right-production {
      background-image: url("../../assets/img/page1-1.png");
      background-repeat:no-repeat;
      background-size:100% 100%;
    }
  }
</style>
