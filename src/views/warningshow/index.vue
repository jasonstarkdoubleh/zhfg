<template>
  <div class="warning-show">
    <div style="height: 100px;background-color: #ffffff;border-radius: 3px;padding: 15px 3px 0">
      <div style="font-size: 22px;margin-left: 15px;display: flex;align-items: center">
        <img src="../../../public/img/组86.png" alt="">
        <span style="margin-left: 5px">{{this.pageValue.commName}}</span>
      </div>
      <div style="background-color: #eeeeee;height: 2px;margin: 6px 0 12px"></div>
      <div style="margin: 0 15px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="常规预警" name="first">
            <div style="display: flex;justify-content: flex-end;margin-bottom: 12px">
              <el-radio-group v-model="radio" size="medium" @change="chooseItem">
                <el-radio-button v-for="(item, index) in radioOptions"  :key="index" :label="item">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-bottom: 12px;display: flex;justify-content: space-between">

              <div style="width: 33%;height: 80px;margin-right: 10px;background-color: #ffffff;padding: 10px;display: flex">

                <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                  <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 100%;height:100%;">
                </div>

                <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                  <div style="position: relative;">
                    <div style="font-size: 16px">当前价格</div>
                    <div style="color: #cccccc;position: absolute;bottom: 0;width: 200px">
                      同比增长{{this.dataAll.currPriceTongBi}}
                      <span v-if="dataAll.currPriceTongBi">
                          <i v-if="parseInt(dataAll.currPriceTongBi)>0" class="el-icon-top-right" style="color: red"></i>
                          <i v-else class="el-icon-bottom-left" style="color: green"></i>
                        </span>
                    </div>
                  </div>
                  <div style="margin-right: 30px;line-height: 60px;font-size: 18px;font-weight: bold">
                    {{this.dataAll.currPrice}}{{this.dataAll.unit}}
                  </div>
                </div>
              </div>

              <div style="width: 33%;height: 80px;margin-right: 10px;background-color: #ffffff;padding: 10px;display: flex">

                <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                  <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 100%;height:100%;">
                </div>

                <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                  <div style="position: relative">
                    <div style="font-size: 16px">本月均价</div>
                    <div style="color: #cccccc;position: absolute;width: 200px;bottom: 0">
                      同比增长{{this.dataAll.mouthTongBi}}
                      <span v-if="dataAll.mouthTongBi">
                          <i v-if="parseInt(dataAll.mouthTongBi)>0" class="el-icon-top-right" style="color: red"></i>
                          <i v-else class="el-icon-bottom-left" style="color: green"></i>
                        </span>
                    </div>
                  </div>
                  <div style="margin-right: 30px;line-height: 60px;font-size: 18px;font-weight: bold">
                    {{this.dataAll.monthAvg}}{{this.dataAll.unit}}
                  </div>
                </div>
              </div>

              <div style="width: 33%;height: 80px;background-color: #ffffff;padding: 10px;display: flex">

                <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                  <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 100%;height:100%;">
                </div>

                <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                  <div style="position: relative;">
                    <div style="font-size: 16px">本年均价</div>
                    <div style="color: #cccccc;position: absolute;width: 200px;bottom: 0">
                      同比增长{{this.dataAll.yearTongBi}}
                      <span v-if="dataAll.yearTongBi">
                          <i v-if="parseInt(dataAll.yearTongBi)>0" class="el-icon-top-right" style="color: red"></i>
                          <i v-else class="el-icon-bottom-left" style="color: green"></i>
                        </span>
                    </div>
                  </div>
                  <div style="margin-right: 30px;line-height: 60px;font-size: 18px;font-weight: bold">
                    {{this.dataAll.yearAvg}}{{this.dataAll.unit}}
                  </div>
                </div>
              </div>

            </div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>{{this.pageValue.commName}} -- 常规预警</span>
              </div>
              <div style="display: flex;overflow-x: auto;height: 40px">
                <el-radio
                  v-for="(item, index) in radioYujingOtions"
                  :key="index"
                  v-model="radioYujing"
                  :label="item.value"
                  @change="_indexAvg">
<!--                  <span @click="_indexAvg(item.value)">-->
                    {{item.label}}
<!--                  </span>-->
                </el-radio>
              </div>
              <div id="mychart" style="width: 100%;height: 400px;margin-top: 20px"></div>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="非常规预警" name="second">
            <div style="display: flex;justify-content: flex-end;margin-bottom: 12px">
              <el-radio-group v-model="notRadio" size="medium" @change="notChooseItem">
                <el-radio-button v-for="(item, index) in notRadioOptions" :key="index" :label="item">
                  {{item.label}}
                </el-radio-button>
              </el-radio-group>
            </div>
            <div style="margin-bottom: 12px;display: flex;justify-content: space-between">
              <div style="width: 33%;height: 80px;margin-right: 10px;background-color: #ffffff;padding: 10px;display: flex">
                <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                  <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 100%;height:100%;">
                </div>

                <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                  <div style="position: relative;">
                    <div style="font-size: 16px">当前价格</div>
                    <div style="color: #cccccc;position: absolute;bottom: 0;width: 200px">
                      同比增长{{this.notDataAll.currPriceTongBi}}
                      <span v-if="notDataAll.currPriceTongBi">
                          <i v-if="parseInt(notDataAll.currPriceTongBi)>0" class="el-icon-top-right" style="color: red"></i>
                          <i v-else class="el-icon-bottom-left" style="color: green"></i>
                        </span>
                    </div>
                  </div>
                  <div style="margin-right: 30px;line-height: 60px;font-size: 18px;font-weight: bold">
                    {{this.notDataAll.currPrice}}{{this.notDataAll.unit}}
                  </div>
                </div>
              </div>

              <div style="width: 33%;height: 80px;margin-right: 10px;background-color: #ffffff;padding: 10px;display: flex">

                <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                  <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 100%;height:100%;">
                </div>

                <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                  <div style="position: relative">
                    <div style="font-size: 16px">本月均价</div>
                    <div style="color: #cccccc;position: absolute;width: 200px;bottom: 0">
                      同比增长{{this.notDataAll.mouthTongBi}}
                      <span v-if="notDataAll.mouthTongBi">
                          <i v-if="parseInt(notDataAll.mouthTongBi)>0" class="el-icon-top-right" style="color: red"></i>
                          <i v-else class="el-icon-bottom-left" style="color: green"></i>
                        </span>
                    </div>
                  </div>
                  <div style="margin-right: 30px;line-height: 60px;font-size: 18px;font-weight: bold">
                    {{this.notDataAll.monthAvg}}{{this.notDataAll.unit}}
                  </div>
                </div>
              </div>

              <div style="width: 33%;height: 80px;background-color: #ffffff;padding: 10px;display: flex">

                <div style="height: 60px;width: 60px;margin-right: 10px;background-color: rgb(242, 242, 246)">
                  <img :src="require(`../../../public/img/${pageValue.commId}.jpg`)" style="width: 100%;height:100%;">
                </div>

                <div style="display: flex;justify-content: space-between;width: calc(100% - 80px)">
                  <div style="position: relative;">
                    <div style="font-size: 16px">本年均价</div>
                    <div style="color: #cccccc;position: absolute;width: 200px;bottom: 0">
                      同比增长{{this.notDataAll.yearTongBi}}
                      <span v-if="notDataAll.yearTongBi">
                          <i v-if="parseInt(notDataAll.yearTongBi)>0" class="el-icon-top-right" style="color: red"></i>
                          <i v-else class="el-icon-bottom-left" style="color: green"></i>
                        </span>
                    </div>
                  </div>
                  <div style="margin-right: 30px;line-height: 60px;font-size: 18px;font-weight: bold">
                    {{this.notDataAll.yearAvg}}{{this.notDataAll.unit}}
                  </div>
                </div>
              </div>

            </div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>{{this.pageValue.commName}} -- 非常规预警</span>
              </div>
              <div style="display: flex;justify-content: center">
                <el-radio
                  v-for="(item, index) in notRadioYujingOtions"
                  :key="index"
                  v-model="notRadioYujing"
                  :label="item.value"
                  @change="_notIndexAvg">
                    {{item.label}}
                </el-radio>
              </div>
              <div id="notmychart" style="width: 100%;height: 400px;margin-top: 20px"></div>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="舆情预警" name="third">舆情预警</el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { indexIdConf, indexLineData, indexAvg } from '@/api/manager'
  export default {
    data(){
      return {
        activeName: 'first',
        radio: '',
        notRadio:'',
        radioOptions: [],
        notRadioOptions:[],
        radioYujing:'',
        radioYujingOtions:[],
        notRadioYujing:'',
        notRadioYujingOtions:[],
        dataAll:{},
        notDataAll:{}
      }
    },
    computed:{
      ...mapGetters([
        'pageValue'
      ])
    },
    methods:{
      _indexAvg(){
        indexAvg(18,this.radioYujing).then(res => {
          this.dataAll = res.data
        })
      },
      _notIndexAvg(){
        indexAvg(19,notRadioYujing).then(res => {
          this.notDataAll = res.data
        })
      },
      chooseItem() {
        indexLineData(18,this.radio.value).then(res => {
          let data = []
          this.radioYujingOtions = []
          Object.keys(res.data).forEach((item, index) => {
            this.radioYujingOtions[index] = {}
            this.radioYujingOtions[index].label = item
            this.radioYujingOtions[index].value = res.data[item][0].indexId
            data = data.concat(res.data[item])
          })
          this.drawLine(data)
        })
      },
      notChooseItem() {
        indexLineData(19,this.notRadio.value).then(res => {
          let data = []
          this.notRadioYujingOtions = []
          Object.keys(res.data).forEach((item, index) => {
            this.notRadioYujingOtions[index] = {}
            this.notRadioYujingOtions[index].label = item
            this.notRadioYujingOtions[index].value = res.data[item][0].indexId
            data = data.concat(res.data[item])
          })
          if(data.length){
            this.drawLineTwo(data)
          }
        })
      },
      ...mapActions([
        'getSubCommByCommId',
        'detail'
      ]),
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.name === "third") {
          this.$router.push({
            path: '/secondpage/index',
            query:{
              num : 'newsShow'
            }
          })
        }
      },
      drawLine(data){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('mychart'))
        // 绘制图表
        let lineName =[]
        let lineValue = []
        let lineDataTime = []
        lineName.push(data[0].indexName)
        for(let i in data) {
          lineValue[i] = data[i].value
          lineDataTime[i] = data[i].dataTime
        }
        let option = {
          tooltip: {
            trigger: 'axis'
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
            data: lineDataTime
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:lineName[0],
              type:'line',
              stack: '总量',
              data:lineValue
            }
          ]
        };

        myChart.setOption(option);
      },
      drawLineTwo(data){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('notmychart'))
        // 绘制图表
        let lineName =[]
        let lineValue = []
        let lineDataTime = []
        lineName.push(data[0].indexName)
        for(let i in data) {
          lineValue[i] = data[i].value
          lineDataTime[i] = data[i].dataTime
        }
        let option = {
          tooltip: {
            trigger: 'axis'
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
            data: lineDataTime
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:lineName[0],
              type:'line',
              stack: '总量',
              data:lineValue
            }
          ]
        };

        myChart.setOption(option);
      },
    },
    created() {
      indexIdConf(this.pageValue.commId,18).then(res => {
        let num = 0;
        this.radioOptions = []
        for(let key in res.data) {
          this.radioOptions[num] = {};
          this.radioOptions[num].label = key;
          this.radioOptions[num].value = res.data[key];
          num++
        }
      })
      indexIdConf(this.pageValue.commId,19).then(res => {
        let num = 0;
        this.notRadioOptions = []
        for(let key in res.data) {
          this.notRadioOptions[num] = {};
          this.notRadioOptions[num].label = key;
          this.notRadioOptions[num].value = res.data[key];
          num++
        }
      })
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
