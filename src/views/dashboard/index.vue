<template>
  <div class="dashboard-container">
    <div class="fixed-header">
      <Navbar></Navbar>
    </div>

    <div class="main-body">
      <div class="left-section">
        <div class="live-preview">
          <div class="preview-title">
            <div><img src="../../assets/img/实时总览.png" style="margin: 0 6px 0 0"></div>
            <div style="color: black">实时预览</div>
          </div>
          <div class="num-details">
            <div class="details-body">

              <div style="text-align: center">
                <span style="color: #4eb1fd">总量</span><span style="font-size: 12px">(万)</span>
                <div style="margin-top: 15px;text-align: center">
                  <span v-for="(item, index) in numArrayAll" :key="index" class="num-style" style="color: #4eb1fd;border: 1px solid #4eb1fd;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </div>
              </div>

              <div style="text-align: center">
                <span style="color: red">红色</span>
                <div style="margin-top: 15px;text-align: center">
                  <span v-for="(item, index) in redEwarnTotal" :key="index" class="num-style" style="color: red;border: 1px solid red;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </div>
              </div>

              <div style="text-align: center">
                <span style="color: orange">橙色</span>
                <div style="margin-top: 15px;text-align: center">
                  <span v-for="(item, index) in orangeEwarnTotal" :key="index" class="num-style" style="color: orange;border: 1px solid orange;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </div>
              </div>

              <div style="text-align: center">
                <span style="color: #ffcb48">黄色</span>
                <div style="margin-top: 15px;text-align: center">
                  <span v-for="(item, index) in yellowEwarnTotal" :key="index" class="num-style" style="color: #ffcb48;border: 1px solid #ffcb48;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </div>
              </div>

              <div style="text-align: center">
                <span style="color: green">绿色</span>
                <div style="margin-top: 15px;text-align: center">
                  <span v-for="(item, index) in greenEwarnTotal" :key="index" class="num-style" style="color: green;border: 1px solid green;">
                    <vue-count-up :start-value="0" :end-value="item"></vue-count-up>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="goods-details">
          <div class="preview-title">
            <div><img src="../../assets/img/预警.png" style="margin: 1px 6px 0 0"></div>
            <div style="color: black">商品预警情况</div>
          </div>

          <div class="goods-more" v-loading="qiuLoading">
            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>商品预警趋势</div>
            </div>
            <div class="goods-echarts">
              <div class="echarts-all">
                <div id="dashboardtwo" style="width: 100%;height: 100%"></div>
              </div>
            </div>
          </div>

          <div class="goods-more" v-loading="qiuLoading">
            <div class="preview-title">
              <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
              <div>商品预警分布</div>
            </div>
            <div class="goods-echarts">
              <div class="echarts-all">
                <div id="dashboardone" style="width: 100%;height: 100%"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div style="width: 55%;height: 100%;background: #fff;margin: 0 6px">
        <div class="preview-title">
          <div><img src="../../assets/img/预警详情.png" style="margin: 1px 6px 0 0"></div>
          <div style="color: black">商品预警详情</div>
        </div>

        <div class="goods-thing" style="height: calc(100% - 60px);">
          <div style="margin: 10px 30px">
            <el-radio-group v-model="radio" size="small">
              <el-radio-button :label="1">大宗商品</el-radio-button>
              <el-radio-button :label="2">民生商品</el-radio-button>
            </el-radio-group>
          </div>

          <div class="qiu" style="height:286px;text-align: center;margin-top: 100px;position: relative" v-loading="qiuLoading">
            <div style="position: absolute;height: 50px;width: 100px;top: 45%;left: 44%;color: #2d84fe;font-weight: bold">
              <div>{{qiuName.name}}</div>
              <div>{{qiuName.eng}}</div>
            </div>

            <template v-for="(item, index) in goodsAll">
              <div :style="itemStyle[index]" :key="index" class="kuang">
                <div class="kuang-sub" v-if="index < 4">
                  <div style="margin-top: 18px">{{item.commName}}</div>
                  <div v-if="item.ewarnLevel === '绿色预警'" style="margin-top: 10px;color: green">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                  <div v-if="item.ewarnLevel === '黄色预警'" style="margin-top: 10px;color: #ffcb48">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                  <div v-if="item.ewarnLevel === '橙色预警'" style="margin-top: 10px;color: orange">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                  <div v-if="item.ewarnLevel === '红色预警'" style="margin-top: 10px;color: red">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                </div>

                <div :class="{'kuang-item': true, 'is-active-right': boot === index }" @click="handleChange(index, item, true)">
                  <div style="width: 35px;height: 35px">
                    <img :src="require(`../../../public/img/${item.commId}.jpg`)" alt="" style="width: 35px;height: 35px">
                  </div>
                </div>
                <div class="kuang-sub" style="text-align: left" v-if="index > 3">
                  <div style="margin-top: 18px">{{item.commName}}</div>
                  <div v-if="item.ewarnLevel === '绿色预警'" style="margin-top: 10px;color: green">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                  <div v-if="item.ewarnLevel === '黄色预警'" style="margin-top: 10px;color: #ffcb48">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                  <div v-if="item.ewarnLevel === '橙色预警'" style="margin-top: 10px;color: orange">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                  <div v-if="item.ewarnLevel === '红色预警'" style="margin-top: 10px;color: red">
                    {{item.priValue}}{{item.unit}} {{item.priRange}}%
                    <i class="el-icon-caret-top" v-if="item.priRange > 0"></i>
                    <i class="el-icon-caret-bottom" v-else></i>
                  </div>
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>

      <div class="right-section">
        <div class="goods-all">
          <div class="opinion-details" v-loading="loading">
            <div class="preview-title">
              <div><img src="../../assets/img/舆情情况.png" style="margin: 1px 6px 0 0"></div>
              <div style="cursor: pointer;color: #2d84fe" @click="handleGolang('/secondpage/index', '舆情')">各商品的舆情情况</div>
            </div>

            <el-scrollbar style="height: calc(100% - 60px)">
              <div class="opinion-body" v-if="urlInfo.length > 0">
                <div class="opinion-item">
                  <div class="opinion-index" style="width: 80%;">
                    <div class="hot hot-red">
                      <span>1</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(urlInfo[0].url)">{{ this.urlInfo[0].title }}</span>
                    </div>
                  </div>
                  <div class="fire">
                    <img src="../../assets/img/热度.png">&nbsp;
                    <span>{{ this.urlInfo[0].heat }}</span>
                  </div>
                </div>

                <div class="opinion-item">
                  <div class="opinion-index" style="width: 80%;">
                    <div class="hot hot-orange">
                      <span>2</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(urlInfo[1].url)">{{ this.urlInfo[1].title }}</span>
                    </div>
                  </div>
                  <div class="fire">
                    <img src="../../assets/img/热度.png">&nbsp;
                    <span>{{ this.urlInfo[1].heat }}</span>
                  </div>
                </div>

                <div class="opinion-item">
                  <div class="opinion-index" style="width: 80%;">
                    <div class="hot hot-yellow">
                      <span>3</span>
                    </div>&nbsp;&nbsp;
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <span style="cursor: pointer" @click="targetPage(urlInfo[2].url)">{{ this.urlInfo[2].title }}</span>
                    </div>
                  </div>
                  <div class="fire">
                    <img src="../../assets/img/热度.png">&nbsp;
                    <span>{{ this.urlInfo[2].heat }}</span>
                  </div>
                </div>

                <div class="opinion-item" v-for="(item, index) in infoCopy" :key="index">
                  <div class="opinion-index" style="width: 80%;">
                    <div class="hot hot-gray">
                      <span>{{ index+4 }}</span>
                    </div>&nbsp;&nbsp;

                    <div style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap;width: 80%;">
                      <!--                        <el-link :href="item.url" target="_blank" type="primary">{{ item.title }}</el-link>-->
                      <span style="cursor: pointer" @click="targetPage(item.url)">{{ item.title }}</span>
                    </div>
                  </div>

                  <div class="fire">
                    <img src="../../assets/img/热度.png">&nbsp;
                    <span>{{ item.heat }}</span>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>

          <div class="report-details">
            <div class="preview-title">
              <div><img src="../../assets/img/分析报告.png" style="margin: 1px 6px 0 0"></div>
              <div style="cursor: pointer;color: #2d84fe">各商品的分析报告</div>
            </div>

            <el-scrollbar style="height: calc(100% - 60px)">
              <div class="opinion-body">

                <div class="opinion-item" v-if="rptList.length > 0">
                  <div class="opinion-index" @click="handleGolang(rptList[0].rptPath)">
                    <div class="hot hot-red">
                      <span>1</span>
                    </div>&nbsp;&nbsp;
                    <div>
                      <span>{{this.rptList[0].rptName}}</span>
                    </div>
                  </div>
                </div>

                <div class="opinion-item" v-if="rptList.length > 1">
                  <div class="opinion-index" @click="handleGolang(rptList[1].rptPath)">
                    <div class="hot hot-orange">
                      <span>2</span>
                    </div>&nbsp;&nbsp;
                    <div>
                      <span>{{this.rptList[1].rptName}}</span>
                    </div>
                  </div>
                </div>

                <div class="opinion-item" v-if="rptList.length > 2">
                  <div class="opinion-index" @click="handleGolang(rptList[2].rptPath)">
                    <div class="hot hot-yellow">
                      <span>3</span>
                    </div>&nbsp;&nbsp;
                    <div>
                      <span>{{this.rptList[2].rptName}}</span>
                    </div>
                  </div>
                </div>

                <div class="opinion-item" v-for="(item,index) in rptListCopy">
                  <div class="opinion-index" @click="handleGolang(item.rptPath)">
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
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Navbar } from '@/layout/components'
  import VueCountUp from 'vue-countupjs'
  import {queryRptName} from '@/api/manager'
  export default {
    name: 'Dashboard',
    data() {
      return {
        rptList:[],
        rptListCopy:[],
        qiuLoading: true,
        loading: true,
        num: 0,
        goodsAll: [],
        dazong:[],
        minsheng: [],
        dataSet:[],
        itemStyle: [{
          top: '-70px',
          left: '120px'
        },{
          top: '30px',
          left: '20px'
        },{
          bottom: '30px',
          left: '20px'
        },{
          bottom: '-70px',
          left: '120px'
        },{
          bottom: '-70px',
          right: '120px'
        },{
          bottom: '30px',
          right: '20px'
        },{
          top: '30px',
          right: '20px'
        },{
          top: '-70px',
          right: '120px'
        }],
        allShow: {},
        radio: 1,
        urlInfo: [],
        infoCopy: [],
        numArrayAll: '',
        greenEwarnTotal: '',
        orangeEwarnTotal: '',
        redEwarnTotal: '',
        yellowEwarnTotal: '',
        boot: '',
        qiuName: {name:'大宗商品', eng:'DAZONG'},
        interVal: '',
        caidanValue: 0
      }
    },
    watch: {
      radio(val) {
        if(val === 1) {
          this.qiuName = {name:'大宗商品', eng:'DAZONG'}
          this.goodsAll = this.dazong.slice(0,8)
          this.handlePic(this.dazong)
        }else {
          this.qiuName = {name:'民生商品', eng:'MINSHENG'}
          this.goodsAll = this.minsheng.slice(0,8)
          this.handlePic(this.minsheng)
        }
      }
    },
    methods: {
      handlePic(data) {
        this.num = 8
        if(this.interVal) {
          clearInterval(this.interVal)
        }
        this.interVal =  setInterval(() => {
          this.num += 8
          if(this.num > data.length || this.num === data.length) {
            this.num = 0
          }
          this.goodsAll = data.slice(this.num, this.num+8)
        },10000)
      },
      handleGolang(path) {
        let newUrl = `http://10.1.1.134:8081${path}`
        window.open(newUrl,'_blank')
      },
      handleChange(index, item, boo) {
        for(let i in this.allShow) {
          this.allShow[i] = false
        }
        this.allShow[index] = true
        this.boot = index
        if(boo) {
          this.$router.push({ path:'/secondpage/index'})
          this.changePageValue(item)
        }
      },
      targetPage(url) {
        let newUrl = `https://${url}`
        window.open(newUrl,'_blank')
      },
      ...mapActions([
        'view',
        'changePageValue',
        'getTopUrlInfo'
      ]),
      drawOne(data) {
        let myChart = this.$echarts.init(document.getElementById('dashboardone'));
        let legendData = []
        let seriesData = []
        let num = 0
        for(let i in data) {
          if(i==='绿色预警'){
            num=0
          }
          if(i==='黄色预警'){
            num=1
          }
          if(i==='橙色预警'){
            num=2
          }
          if(i==='红色预警'){
            num=3
          }
          legendData[num] = i
          seriesData[num] = {}
          seriesData[num].value = parseInt(data[i])
          seriesData[num].name = i
        }
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top:'0%',
            data: legendData
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: seriesData,
              label:{
                show:false
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal:{
                  color:function(params) {
                    let colorList = ['green','#ffcb48', 'orange','red'];
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },

      drawTwo(data) {
        let myChart = this.$echarts.init(document.getElementById('dashboardtwo'));
        let len = 0
        let k = ''
        Object.keys(data).forEach((item, index) => {
          if(data[item].length > len) {
            len = data[item].length
            k = item
          }
        })
        let time = data[k].map((item, index) => {
          return data[k][index].ewarnDate
        })
        let keys = Object.keys(data)
        let dataValue1 = data[keys[0]].map(item => {
          return item.ewarnCount
        })
        let dataValue2 = data[keys[1]].map(item => {
          return item.ewarnCount
        })
        let dataValue3 = data[keys[2]].map(item => {
          return item.ewarnCount
        })
        let dataValue4 = data[keys[3]].map(item => {
          return item.ewarnCount
        })
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
          grid:{
            left:20,
            top:0,
            right:0,
            bottom:20
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : time,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#ccc'
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
                  color: '#ccc'
                }
              }
            }
          ],
          series : [
            {
              name: keys[0],
              type:'line',
              stack: '总量',
              // areaStyle: {},
              data: dataValue1
            },
            {
              name: keys[1],
              type:'line',
              stack: '总量',
              // areaStyle: {},
              data: dataValue2
            },
            {
              name: keys[2],
              type:'line',
              stack: '总量',
              // areaStyle: {},
              data: dataValue3
            },
            {
              name: keys[3],
              type:'line',
              stack: '总量',
              // areaStyle: {},
              data: dataValue4
            },
          ]
        };
        myChart.setOption(option);
      },
    },
    components:{
      Navbar,
      VueCountUp
    },
    computed: {
      ...mapGetters([
        'name',
      ])
    },
    mounted() {
      let i = 0
      for(;i<8;i++) {
        this.allShow[i] = false
        this.dataSet[i] = {}
      }
      this.view().then(res => {
        let data = res.data
        this.numArrayAll = (parseInt(data.commTotal/10000) + '').split("")
        this.greenEwarnTotal = (parseInt(data.greenEwarnTotal) + '').split("")
        this.orangeEwarnTotal = (parseInt(data.orangeEwarnTotal) + '').split("")
        this.redEwarnTotal = (parseInt(data.redEwarnTotal) + '').split("")
        this.yellowEwarnTotal = (parseInt(data.yellowEwarnTotal) + '').split("")
        this.dazong = data.ewanInfo.dazong
        this.minsheng = data.ewanInfo.minsheng
        this.goodsAll = this.dazong.slice(0,8)
        this.handlePic(this.dazong)
        this.drawOne(data.rateVel)
        this.drawTwo(data.priVal)
        this.qiuLoading = false
      })
      let num = 0
      setInterval(() => {
        this.handleChange(num,undefined,false)
        num++
        if(num === 8) {
          num = 0
        }
      },1000)
    },
    created() {
      queryRptName().then(res=>{
        this.rptList = res.page
        if(this.rptList.length > 3) {
          this.rptListCopy = this.rptList.slice(3)
        }
      })
      this.getTopUrlInfo().then(res => {
        this.urlInfo = res.data
        this.infoCopy = this.urlInfo.slice(3)
        this.loading = false
        // this.loading = true
      }).catch(()=>{
        this.urlInfo = []
      })
    }
  }
</script>

<style lang="scss">
  .dashboard-container{
    height: 100vh;
    /*overflow: hidden;*/
    color: #ffffff;

    .goods-thing {
      background-image: url('../../assets/img/价格子系统.png');
      background-repeat:no-repeat;
      background-position: bottom;
      /*background-size:100% 100%;*/

      .qiu {
        background-image: url('../../assets/img/qiu2.png');
        background-repeat:no-repeat;
        background-position: center;
        background-size: 40%;

        .kuang {
          width: 200px;
          height: 84px;
          position: absolute;
          display: flex;

          .kuang-sub {
            width: 123px;
            height: 100%;
            color: black;
            text-align: right
          }

          .kuang-item {
            width: 77px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-image: url('../../assets/img/kuang.png');
            background-repeat:no-repeat;
            background-position: center;
            background-size: 110%;
          }

          .kuang-item:hover {
            background-image: url('../../assets/img/kuang2.png');
          }

          .is-active-right {
            background-image: url('../../assets/img/kuang2.png');
          }
        }
      }
    }

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
      box-sizing: border-box;
      padding: 84px 14px 8px;
      background: #f0f2f6;

      .preview-title {
        height: 50px;
        box-sizing: border-box;
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
        width: calc((100% - 700px) / 2);
        height: 100%;

        .live-preview {
          height: 135px;
          background-image: url('../../assets/img/dashboard1-1.png');
          background-repeat:no-repeat;
          background-size:100% 100%;

          .num-details {
            width: calc(100% - 16px);
            padding: 0 0 0 16px;
            color: #afb6ce;
            margin-top: 5px;

            .details-body {
              display: flex;
              justify-content: space-around;
              letter-spacing: 1px;

              .num-style {
                margin-right:4px;
                font-size: 16px;
                padding: 10px 4px
              }
            }
          }
        }

        .goods-details {
          height: calc(100% - 139px);
          margin-top: 4px;
          background: #ffffff;
          /*background-image: url("../../assets/img/dashboard1-2.png");*/
          /*background-repeat: no-repeat;*/
          /*background-size: 100% 100%;*/

          .goods-more {
            margin: 0 20px;
            height: 40%;
            /*background-image: url("../../assets/img/dashboard2-1.png");*/
            /*background-repeat: no-repeat;*/
            /*background-size: 100% 100%;*/

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
        }
      }

      .right-section {
        width: calc((100% - 700px) / 2);
        height: 100%;
        /*padding-left: 6px;*/

        .goods-all {
          /*display: flex;*/
          /*justify-content: space-between;*/
          height: 100%;
          /*padding: 0;*/

          .opinion-details {
            height: calc(50% - 2px);
            /*margin-right: 4px;*/
            background: #ffffff;
            color: #666666;
            /*background-image: url("../../assets/img/dashboard2-2.png");*/
            /*background-repeat: no-repeat;*/
            /*background-size: 100% 100%;*/
          }

          .report-details {
            height: calc(50% - 2px);
            margin-top: 4px;
            background: #ffffff;
            color: #666666;
            /*background-image: url("../../assets/img/dashboard2-3.png");*/
            /*background-repeat: no-repeat;*/
            /*background-size: 100% 100%;*/
          }
        }
      }
    }
  }
</style>
