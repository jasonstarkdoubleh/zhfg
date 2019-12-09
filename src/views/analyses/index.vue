<template>
  <div class="analyse-page" style="overflow-x: hidden">

    <div style="height: 50px;line-height: 50px;background-color: #ffffff;border-radius: 3px;font-size: 22px;">
      <div style="margin-left: 15px;display: flex;align-items: center">
        <img src="../../../public/img/组86.png" alt="">
        <span style="margin-left: 5px">{{this.pageName}}</span>
      </div>
    </div>

    <div style="margin: 10px">
      <div ref="personWrap">
        <div ref="personTab" style="margin-bottom: 10px;display: flex;flex-wrap: wrap">
          <div v-for="(item, index) in allValue.noPriceList" :key="index" style="width: 460px;height: 88px;margin-right: 10px;background-color: #ffffff;padding: 14px;display: flex">
            <div style="height: 60px;width: 60px;margin-right: 10px">
              <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 60px;height:60px;">
            </div>
            <div style="display: flex;justify-content: space-between;width: 100%">
              <div style="display: flex;flex-direction: column;justify-content: space-between">
                <div style="font-size: 16px">{{item[0].commName}}</div>
                <div style="color: #cccccc;" v-if="parseInt(item[0].tongBi) > 0 || parseInt(item[0].tongBi) === 0">
                  同比增长{{item[0].tongBi}}
                  <i class="el-icon-top-right" style="color: red;margin-left: 5px"></i>
                </div>
                <div style="color: #cccccc;" v-else>
                  同比减少{{parseInt(item[0].tongBi)}}%
                  <i class="el-icon-bottom-left" style="color: green;margin-left: 5px"></i>
                </div>
              </div>
              <div style="line-height: 60px;font-size: 20px;font-weight: bold;">
                {{item[0].indexVal}}{{item[0].indexUnit}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex;justify-content: flex-end;margin-bottom: 12px;">
        <el-radio-group v-model="radio" size="medium" @change="chooseItem">
          <el-radio-button v-for="(item, index) in radioOptions"  :key="index" :label="item.commId">
            {{item.commName}}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div style="display: flex;justify-content: space-between;">

        <div style="width: 33%;margin-right: 10px;">
          <div style="height: 168px;background-color: #ffffff;padding: 4px 10px 24px;">

            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              {{this.pageName}}价格分析
            </div>

            <div style="display: flex;height: calc(100% - 35px);flex-wrap: wrap">
              <div v-for="(item, index) in currPrice" :key="index" style="width: 45%;height: 100%;margin-top: 25px;display: flex;justify-content: space-around;">
                <div>
                  <div style="color: #b5b5b5;margin-bottom: 10px">{{item.indexName}}</div>
                  <div style=";margin-bottom: 10px">
                    <span style="color: #2c83fc;font-size: 22px">{{item.indexVal}}</span>
                    {{item.indexUnit}}
                  </div>
                  <div v-if="parseInt(item.tongBi) > 0 || parseInt(item.tongBi) === 0">
                    同比<i class="el-icon-caret-top" style="color: red"></i>
                    {{item.tongBi}}
                  </div>
                  <div v-else>
                    同比<i class="el-icon-caret-bottom" style="color: green"></i>
                    {{item.tongBi}}
                  </div>
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
            各地{{this.pageName}}价格趋势分布
          </div>
          <div style="width: 100%;height: 375px" id="analysemap"></div>
        </div>

        <div style="width: 33%;">
          <div style="height: 168px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              {{this.pageName}}价格分析
            </div>
            <div style="display: flex;height: calc(100% - 35px)">

              <div style="width: 50%;height: 100%" id="analysepieone"></div>

              <div style="width: 50%;height: 100%" id="analysepietwo"></div>

            </div>
          </div>

          <div style="margin-top: 10px;height: 248px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              {{this.pageName}}指数分析
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
                        <span>希拉里</span>
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
  import { mapGetters, mapActions } from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        currPrice: [],
        lineData: [],
        mapData:[],
        allValue: {},
        pageName: '',
        activeName: 'first',
        radio: '',
        radioOptions: []
      }
    },
    computed:{
      ...mapGetters([
        'pageValue'
      ])
    },
    methods:{
      chooseItem() {
        let data = this.radio
        this.currPrice = []
        this.lineData = []
        this.mapData = []
        let num = 0
        for (let i in this.allValue.currPrice) {
          if(this.allValue.currPrice[i].commId === data) {
            this.currPrice[num] = this.allValue.currPrice[i]
            num++
          }
        }
        for (let i in this.allValue.lineData) {
          if(this.allValue.lineData[i][0].commId === data) {
            this.lineData = this.allValue.lineData[i]
          }
        }
        this.drawLine(this.lineData);
        for(let i in this.allValue.mapData) {
          if(this.allValue.mapData[i][0].commId === data){
            this.mapData = this.allValue.mapData[i]
          }
        }
        this.drawMap(this.mapData)
      },
      personScroll() {
        // 默认有六个li子元素，每个子元素的宽度为120px
        let width = 7 * 470;
        this.$refs.personTab.style.width = width + "px";
        // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.personWrap, {
              click: true,
              scrollX: true,
              scrollY: false,
              momentum: false,
              snap: true,
              snapLoop: true,
              snapThreshold: 0,
              snapSpeed: 400,
              startX: 0,
              eventPassthrough: "vertical"
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      personScroll() {
        // 默认有六个li子元素，每个子元素的宽度为120px
        let width = 7 * 470;
        this.$refs.personTab.style.width = width + "px";
        // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.personWrap, {
              click: true,
              scrollX: true,
              scrollY: false,
              momentum: false,
              snap: true,
              snapLoop: true,
              snapThreshold: 0,
              snapSpeed: 400,
              startX: 0,
              eventPassthrough: "vertical"
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      ...mapActions([
        'detailV2',
        'getSubCommByCommId'
      ]),
      handleClick(tab, event) {
        console.log(tab, event);
      },
      drawLine(data) {
        let myChart = this.$echarts.init(document.getElementById('manyanalyse'));
        let xData = []
        let yData = []
        for(let i in data) {
          xData[i] = data[i].date
          yData[i] = data[i].value
        }
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
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
              data : xData
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'搜索引擎',
              type:'line',
              label: {
                normal: {
                  show: false,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data:yData
            }
          ]
        };
        myChart.setOption(option);
      },
      drawMap(data){
        let mapValue = []
        let maxValue = 0
        let minValue = 0
        if(data.length){
          maxValue = data[0].value
          minValue = data[0].value
          for(let i in data) {
            mapValue[i] = {}
            mapValue[i].name = data[i].areaName.slice(0,2)
            mapValue[i].value = data[i].value
          }
          data.forEach(item=>{
            if(item.value>maxValue){
              maxValue = item.value
            }
            if(item.value<minValue){
              minValue=item.value
            }
          })
        }
        let myChart = this.$echarts.init(document.getElementById('analysemap'));
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: `{b}<br/>{c} ${data.length ? data[0].unit:''}`
          },
          visualMap: {
            type: 'continuous',
            orient: 'horizontal',
            itemWidth: 10,
            itemHeight: 80,
            text: ['高', '低'],
            showLabel: true,
            seriesIndex: [0],
            min: minValue,
            max: maxValue,
            inRange: {
              color: ['#6FCF6A', '#FFFD64', '#FF5000']
            },
            textStyle: {
              color: '#7B93A7'
            },
            bottom: 30,
            left: 'left',
          },
          series: [
            {
              name: '中国',
              type: 'map',
              roam: true,
              mapType: 'china',
              label: {
                normal: {
                  show: false,
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
              data:mapValue,
              itemStyle: {
                normal: {
                  areaColor: '#ccc',
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
      this.drawPieOne();
      this.drawPieTwo();
      this.personScroll()
    },
    created() {
      this.pageName = this.pageValue.commName
      this.detailV2(this.pageValue.commId).then(res => {
        this.allValue = res.data
        this.getSubCommByCommId(this.pageValue.commId).then(res => {
          this.radioOptions =  res.data
          this.radio = this.radioOptions[0].commId
          this.chooseItem(this.radio)
        })
      })
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
