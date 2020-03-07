<template>
  <div class="analyse-page" style="overflow: hidden">

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
                {{item[0].value}}{{item[0].unit}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scrow-view">
        <el-scrollbar style="height: 100%">
          <el-radio-group v-model="radio" size="medium" @change="chooseItem" style="display: flex">
            <el-radio-button v-for="(item, index) in radioOptions"  :key="index" :label="item.commId">
              {{item.commName}}
            </el-radio-button>
          </el-radio-group>
        </el-scrollbar>
      </div>



      <div style="display: flex;justify-content: space-between;margin-top: 12px">
        <div style="width: 33%;margin-right: 5px">
          <div style="height: 168px;background-color: #ffffff;padding: 4px 10px 24px;">

            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              {{this.pageName}}价格分析
            </div>

            <div style="display: flex;height: calc(100% - 35px);justify-content: space-between">
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
                  <div v-if="parseInt(item.huanBi) > 0 || parseInt(item.huanBi) === 0">
                    环比<i class="el-icon-caret-top" style="color: red"></i>
                    {{item.huanBi}}
                  </div>
                  <div v-else>
                    环比<i class="el-icon-caret-bottom" style="color: green"></i>
                    {{item.huanBi}}
                  </div>
                </div>
              </div>
              <div id="manyanalysebar" style="width: 45%;height: 100%;margin-top: 20px;margin-right: 10px"></div>
            </div>
          </div>

          <div style="margin-top: 5px;height: 248px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              进出口额趋势分析
            </div>
            <div style="height: 210px;width: 100%" id="manyanalyse"></div>
          </div>
        </div>

        <div style="width: 33%;margin-right: 5px;height: 421px;background-color: #ffffff;padding: 4px 10px 32px;">
          <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
            各地{{this.pageName}}价格趋势分布
          </div>
          <div style="height: 375px" id="analysemap"></div>
        </div>

        <div style="width: 33%;" class="scroll-yes">
          <div style="height: 168px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              {{this.pageName}}舆情TOP10
            </div>
            <el-scrollbar style="height: 132px;width: 100%" v-loading="yuqingLoading">
              <div class="opinion-body" v-if="urlInfo.length > 0">
                <div class="opinion-item" style="overflow: hidden">
                  <div class="opinion-index">
                    <div class="hot hot-red">
                      <span>1</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(urlInfo[0].url)">{{ this.urlInfo[0].title }}</span>
                    </div>
                  </div>
                </div>
                <div class="opinion-item" style="overflow: hidden">
                  <div class="opinion-index">
                    <div class="hot hot-orange">
                      <span>2</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(urlInfo[1].url)">{{ this.urlInfo[1].title }}</span>
                    </div>
                  </div>
                </div>
                <div class="opinion-item" style="overflow: hidden">
                  <div class="opinion-index">
                    <div class="hot hot-yellow">
                      <span>3</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(urlInfo[2].url)">{{ this.urlInfo[2].title }}</span>
                    </div>
                  </div>
                </div>
                <div class="opinion-item" v-for="(item, index) in top10" :key="index" style="overflow: hidden">
                  <div class="opinion-index">
                    <div class="hot hot-gray">
                      <span>{{ index+4 }}</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(item.url)">{{ item.title }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>

          <div style="margin-top: 5px;height: 248px;background-color: #ffffff;padding: 4px 10px 24px;">
            <div style="height: 35px;line-height: 35px;border-bottom: 1px solid #eeeeee;font-size: 16px;letter-spacing: 1px">
              {{this.pageName}}报告
            </div>
            <div style="height: 200px;">
              <el-scrollbar style="height: 100%">
                <div class="opinion-body">

                  <div class="opinion-item" v-if="rptList.length > 0">
                    <div class="opinion-index" @click="handleGolang(rptList[0].rptId)" style="cursor: pointer">
                      <div class="hot hot-red">
                        <span>1</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>{{this.rptList[0].rptName}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="opinion-item" v-if="rptList.length > 1">
                    <div class="opinion-index" @click="handleGolang(rptList[1].rptId)" style="cursor: pointer">
                      <div class="hot hot-orange">
                        <span>2</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>{{this.rptList[1].rptName}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="opinion-item" v-if="rptList.length > 2">
                    <div class="opinion-index" @click="handleGolang(rptList[2].rptId)" style="cursor: pointer">
                      <div class="hot hot-yellow">
                        <span>3</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>{{this.rptList[2].rptName}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="opinion-item" v-for="(item,index) in rptListCopy" :key="index">
                    <div class="opinion-index" @click="handleGolang(item.rptId)" style="cursor: pointer">
                      <div class="hot hot-gray">
                        <span>{{ index + 4 }}</span>
                      </div>&nbsp;&nbsp;
                      <div>
                        <span>{{item.rptName}}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {queryRptName} from '@/api/manager'
  import 'echarts/map/js/china'
  import { mapGetters, mapActions } from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        rptList:[],
        rptListCopy:[],
        yuqingLoading:true,
        urlInfo:'',
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
      handleGolang(rptId) {
        let newUrl = `https://sp.ndrc.gov.cn:8080/fagaiwei_api/report/pssrptinfo/preview?fileType=pdf&infoId=${rptId}`
        window.open(newUrl,'_blank')
      },
      targetPage(url) {
        let newUrl = `https://${url}`
        window.open(newUrl,'_blank')
      },
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
        this.drawBar(this.currPrice)
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
        'getSubCommByCommId',
        'getHeatTop'
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
            right: '1%',
            bottom: '16%',
            top:'6%',
            containLabel: true
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 40,
              end: 60
            },
            {
              type: 'inside',
              realtime: true,
              start: 40,
              end: 60
            }
          ],
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
      drawBar(data) {

        let myChart = this.$echarts.init(document.getElementById('manyanalysebar'));
        let option = {
          xAxis: {
            type: 'category',
            data: ['同比','环比']
          },
          yAxis: {
            type: 'value'
          },
          grid: {
            left: '0',
            right: '0',
            bottom: '0',
            top:'6%',
            containLabel: true
          },
          series: [{
            data: [parseInt(data[0].tongBi), parseInt(data[0].huanBi)],
            type: 'bar'
          }]
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
    },
    mounted() {
      this.personScroll()
    },
    created() {
      if(!this.pageValue.commId) {
        this.$message({
          message:'请选择商品后进行查看',
          type:'warning'
        })
      }
      queryRptName().then(res=>{
        this.rptList = res.page
        if(this.rptList.length > 3) {
          this.rptListCopy = this.rptList.slice(3)
        }
      })
      this.pageName = this.pageValue.commName
      this.detailV2(this.pageValue.commId).then(res => {
        this.allValue = res.data
        this.getSubCommByCommId(this.pageValue.commId).then(res => {
          this.radioOptions =  res.data
          this.radio = this.radioOptions[0].commId
          this.chooseItem(this.radio)
        })
      })
      this.getHeatTop(this.pageValue.commId).then(res => {
        this.urlInfo = res.data.top_url
        this.infoCopy = this.urlInfo.slice(3)
        this.top10 = this.infoCopy.slice(0,7)
        this.yuqingLoading = false
      }).catch(()=>{
        this.urlInfo = []
      })
    }
  }
</script>

<style lang="scss">

  .analyse-page {
    .scrow-view {
      .el-scrollbar__view {
        padding-bottom: 10px;
      }
    }

    .scroll-yes {
      .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
    }
    .opinion-body {
      box-sizing: border-box;
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
