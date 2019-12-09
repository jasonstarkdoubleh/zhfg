<template>
  <div class="second-page">
    <div class="header-layout">
      <div class="header-left">
        <div class="main-bgc" style="cursor: pointer" @click="handleProductionShow('bodyLayoutShow')">
          <span style="margin-right: 20px">{{this.pageValue.commName}}</span>
        </div>
        <div v-for="i in 3" :key="i" :class="{ 'goodleft-bgc': true, 'is-active':allShow[allShowArray[i-1]] }" @click="handleProductionShow(allShowArray[i-1])">
          <span>{{allShowArray[i-1]}}</span>
        </div>
      </div>
      <div class="header-right">
        <div v-for="i in 4" :key="i" :class="{ 'goodright-bgc': true, 'is-active-right':allShow[allShowArray[i+2]] }" @click="handleProductionShow(allShowArray[i+2])">
          <span>{{allShowArray[i+2]}}</span>
        </div>
      </div>
    </div>
    <div v-if="allShow.bodyLayoutShow" class="body-layout">
      <div class="goods-warning">
        <div class="preview-title">
          <div><img src="../../assets/img/组151.png" style="margin: 1px 6px 0 0"></div>
          <div>{{this.pageValue.commName}}价格区域分布</div>
        </div>
        <div style="margin-top: 30px;display: flex;justify-content: space-around;padding: 10px 0" class="heng">
          <div style="text-align: center">
            <div>
              {{this.pageValue.commName}}价格
            </div>
            <div style="font-weight: bold;font-size: 16px;margin-top: 10px;color: #2d84fe">
              <span style="font-size: 22px">
                {{this.priToday}}
              </span>
              {{this.priCompany}}
            </div>
          </div>
          <div style="text-align: center">
            <div>同比增幅</div>
            <div style="color: #f9cd52;font-weight: bold;font-size: 16px;margin-top: 10px">
              <span style="font-size: 22px">
                <vue-count-up :start-value="0" :end-value="tongBi"></vue-count-up>
              </span>%
              <img  v-if="tongBi > 0" src="../../assets/img/zengred.png" alt="">
              <img  v-if="tongBi < 0" src="../../assets/img/zenggre.png" alt="">
            </div>
          </div>
          <div style="text-align: center">
            <div>环比增幅</div>
            <div style="color: #1cff9e;font-weight: bold;font-size: 16px;margin-top: 10px">
              <span style="font-size: 22px">
                <vue-count-up :start-value="0" :end-value="huanBi"></vue-count-up>
              </span>%
              <img  v-if="huanBi > 0" src="../../assets/img/zengred.png" alt="">
              <img  v-if="huanBi < 0" src="../../assets/img/zenggre.png" alt="">
            </div>
          </div>
        </div>
        <div v-if="mapShow" id="secondmap" style="height: calc(100% - 150px)" v-loading="mapLoading"></div>
        <div v-else style="height: calc(100% - 150px);display: flex;justify-content: center;align-items: center">暂无数据</div>
      </div>
      <div class="body-right">
        <div class="right-up">
          <div class="up up-1">
            <div class="preview-title">
              <div><img src="../../assets/img/组145.png" style="margin: 1px 6px 0 0"></div>
              <div>规格品价格数据</div>
            </div>
            <div class="goods-table">
              <el-scrollbar class="scrollbar-table" style="height: calc(100% - 60px)">
                <el-table
                  :data="peopleLife"
                  :header-cell-style="{background:'#ffffff'}"
                  stripe
                  v-loading="itemLoading"
                  style="width: 100%">
                  <el-table-column
                    show-overflow-tooltip
                    prop="commName"
                    label="名称">
                    <template slot-scope="scope">
                      <span>{{ scope.row.commName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    show-overflow-tooltip
                    prop="priToday"
                    label="价格">
                    <template slot-scope="scope">
                      <span>{{ scope.row.value }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
          <div class="up up-2">
            <div class="preview-title">
              <div><img src="../../assets/img/组132.png" style="margin: 1px 6px 0 0"></div>
              <div>生产数据情况</div>
            </div>
            <div id="secondpie" style="height: 80%"></div>
          </div>
          <div class="up up-3">
            <div class="preview-title">
              <div><img src="../../assets/img/组147.png" style="margin: 1px 6px 0 0"></div>
              <div>热点舆情TOP10</div>
            </div>
            <el-scrollbar style="height: calc(100% - 60px)" v-loading="yuqingLoading">
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
                </div>
                <div class="opinion-item" v-for="(item, index) in top10" :key="index">
                  <div class="opinion-index" style="width: 80%;">
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
        </div>
        <div class="right-down">
          <div class="down1">
            <div class="preview-title">
              <div><img src="../../assets/img/组132拷贝2.png" style="margin: 1px 6px 0 0"></div>
              <div>价格走势</div>
            </div>
            <div style="margin-top: 10px;margin-left: 20px">
              <el-radio-group v-model="radio" size="small" @change="changeQushi">
                <el-radio-button v-for="item in zoushiArray" :key="item" :label="item"></el-radio-button>
              </el-radio-group>
            </div>

            <el-radio-group v-model="radioPindu" size="mini" @change="changePindu" style="margin-top: 5px;margin-left: 20px">
              <el-radio-button v-for="(item,index) in pindu" :key="index" :label="item.value">{{item.label}}</el-radio-button>
            </el-radio-group>

            <div id="qushiline" style="height: 80%;"></div>

          </div>
          <div class="down2">
            <div class="preview-title">
              <div><img src="../../assets/img/组132拷贝.png" style="margin: 1px 6px 0 0"></div>
              <div>各商品分析报告</div>
            </div>
            <el-scrollbar style="height: calc(100% - 60px)">
              <div style="font-size: 16px;">
                <template v-for="i in 5">
                  <div :key="i" style="height: 110px;border: 1px solid #3F7FFF;margin: 10px 16px 10px;padding: 10px 6px 20px;">
                    <div style="color: black;border-bottom: #1E90FF 1px dashed;padding-bottom: 2px;margin-bottom: 5px">NO.{{i}} 路透社报料伊朗削减</div>
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
                </template>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>

    <div style="padding-top: 10px;">
      <second v-if="!allShow.bodyLayoutShow && !allShow['舆情']"
              :tableData="secondValue[chooseData]"
              :goodsType="chooseData"
              :goodsName="pageValue.commName"
              :type4commList="type4commList"
              :mapShow="chooseData === '价格'"
              @changeTableData="changeTableData"/>
      <div v-if="allShow['舆情']">
        <div style="display: flex;height: calc(100vh - 100px)">
          <div class="yuqing-warning" style="width: 40%">
            <div class="preview-title">
              <div><img src="../../assets/img/组147.png" style="margin: 1px 6px 0 0"></div>
              <div>热点舆情TOP50</div>
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

          <div class="body-right" style="width: 60%">
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
  import { mapActions, mapGetters }  from 'vuex'
  export default {
    data: function () {
      return {
        zoushiArray:['全国价格走势','区域价格分布','价格预测情况'],
        quanguo:'',
        quyu:'',
        jiageyuce:'',
        type4commList:[],
        mapShow:false,
        mapLoading: true,
        itemLoading:true,
        mapValue:[],
        yuqingLoading: true,
        urlInfo:'',
        infoCopy: '',
        top10: '',
        radio: '全国价格走势',
        priToday: 0,
        priCompany:'',
        tongBi: 0,
        huanBi: 0,
        secondValue:'',
        mapData:[],
        tableData: [],
        allShowArray:['生产','流通','价格','消费','贸易','成本','舆情'],
        allShow: {
          bodyLayoutShow: true,
        },
        peopleLife:[],
        chooseData:'',
        pindu:[],
        radioPindu:''
      }
    },
    components: {
      VueCountUp,
      second
    },
    watch:{
      bodyLayoutShow(val){
        if(val){
          this.$nextTick(()=>{
            this.drawMap(this.mapValue)
          })
        }
      },
      radio(val){
        this.drawLine([])
        this.radioPindu = ''
      }
    },
    computed: {
      bodyLayoutShow(){
        return this.allShow.bodyLayoutShow
      },
      ...mapGetters([
        'pageValue'
      ])
    },
    methods: {
      changePindu(){
        this.$nextTick(()=>{
          this.drawLine(this.radioPindu)
        })
      },
      changeQushi(){
        let pindu
        this.zoushiArray.forEach((item,index)=>{
          if(this.radio === '全国价格走势'){
            pindu = Object.keys(this.quanguo)     //[日]
            this.mapData = this.quanguo
          }
          if(this.radio === '区域价格分布'){
            pindu = Object.keys(this.quyu)     //[日]
            this.mapData = this.quyu
          }
          if(this.radio === '价格预测情况'){
            pindu = Object.keys(this.jiageyuce)     //[日]
            this.mapData = this.jiageyuce
          }
        })
        this.pindu = []
        this.radioPindu = ''
        let data
        let dateType = 'date'
        if(this.mapData === this.quyu){
          dateType = 'areaName'
        }
        pindu.forEach((item,indexPindu)=>{
          this.pindu[indexPindu] = {}
          this.pindu[indexPindu].label = item
          this.pindu[indexPindu].value = []
          Object.keys(this.mapData[item]).forEach(key=>{    //[指标]
            data = {}
            // data.name = this.mapData[item][key][0].indexName
            data.name = ''
            data.date = []
            data.data = []
            this.mapData[item][key].forEach(val=>{
              data.date.push(val[dateType])
              data.data.push(val.value)
            })
          })
          this.pindu[indexPindu].value.push(data)
        })

      },
      changeTableData(data1,data2){
        this.secondValue[data2] = data1
      },
      targetPage(url) {
        let newUrl = `https://${url}`
        window.open(newUrl,'_blank')
      },
      ...mapActions([
        'secondView',
        'getTopUrlInfo',
        'getHeatTop'
      ]),
      handleProductionShow(data){
        this.chooseData = data
        let obj = {}
        Object.keys(this.allShow).forEach(key=>{
          obj[key] = key === data;
        })
        this.allShow = obj
        if('舆情'===data){
          this.$nextTick(() => {
            this.drawNewsPie()
            this.drawNewsLine()
          })
        }
      },

      drawMap(data){
        this.mapLoading = false
        let maxValue = data[0].value
        let minValue = data[0].value
        data.forEach(item=>{
          if(item.value>maxValue){
            maxValue = item.value
          }
          if(item.value<minValue){
            minValue=item.value
          }
        })
        let myChart = this.$echarts.init(document.getElementById('secondmap'));
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: `{b}<br/>{c} ${data[0].unit}`
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
              data:data,
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
      drawPie() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('secondpie'));

        // 指定图表的配置项和数据
        let option = {
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };

        myChart.setOption(option);
      },
      drawLine(data){
        if(!data.length){
          data[0] = {}
          data[0].name = ''
          data[0].data = []
          data[0].date = []
        }
        let series = data.map(item=>{
          if(this.mapData === this.quyu){
            return {
              name:item.name,
              type:'bar',
              stack: '总量',
              areaStyle: {},
              data:item.data
            }
          }else {
            return {
              name:item.name,
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:item.data
            }
          }
        })
        let myChart = this.$echarts.init(document.getElementById('qushiline'))
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
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : data[0].date
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          // dataZoom: [
          //   {
          //     show: true,
          //     realtime: true,
          //     start: 65,
          //     end: 85
          //   },
          //   {
          //     type: 'inside',
          //     realtime: true,
          //     start: 65,
          //     end: 85
          //   }
          // ],
          series : series
        };
        myChart.setOption(option);
      },
      drawNewsPie() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('newspie'));

        // 指定图表的配置项和数据
        let option = {
          // title : {
          //     text: '某站点用户访问来源',
          //     subtext: '纯属虚构',
          //     x:'center'
          // },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top:'20%',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
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
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                // normal:{
                //     color:function(params) {
                //         let colorList = [ '#ff8343', '#70ff69' ];
                //         return colorList[params.dataIndex]
                //     }
                // }
              }
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
      this.drawPie()
      if(this.$route.query.num) {
        this.handleProductionShow(this.$route.query.num)
      }
    },
    created() {
      this.allShowArray.forEach((item,index) =>{
        this.allShow[item] = false
      })
      this.secondView(this.pageValue.commId).then(res => {
        this.secondValue = res.data
        this.quanguo = res.data.quanGuoJiaGeZouShi
        this.quyu = res.data.quYuJiaGeFengBu
        this.jiageyuce = res.data.jiaGeYuCe
        this.priToday = this.secondValue.price
        this.priCompany = this.secondValue.unit
        this.peopleLife = this.secondValue.priceList
        this.tongBi = parseInt(this.secondValue.tongBi)
        this.huanBi = parseInt(this.secondValue.huanBi)
        this.type4commList = res.type4commList
        this.itemLoading = false
        if(this.secondValue.provinceMap.length) {
          this.mapShow = true
          this.mapValue = []
          for(let i in this.secondValue.provinceMap) {
            this.mapValue[i] = {}
            this.mapValue[i].name = this.secondValue.provinceMap[i].areaName.slice(0,2)
            this.mapValue[i].value = this.secondValue.provinceMap[i].value
            this.mapValue[i].unit = this.secondValue.provinceMap[i].unit
          }
          this.$nextTick(() => {
            this.drawMap(this.mapValue)
          })
        }else {
          this.mapShow = false
        }
        this.changeQushi()
        console.log(this.pindu[0].value[0])
        this.radioPindu = this.pindu[0].value
        this.changePindu()
      })
      this.getHeatTop(this.pageValue.commId).then(res => {
        this.urlInfo = res.data.top_url
        this.infoCopy = this.urlInfo.slice(3)
        this.top10 = this.infoCopy.slice(0,7)
        // this.yuqingLoading = false
        this.yuqingLoading = true
      }).catch(()=>{
        this.urlInfo = []
      })
    }
  }
</script>

<style lang="scss">
  .second-page {
    height: calc(100vh - 100px);
    color: #787878;

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
    .heng {
      background-image: url("../../assets/img/heng.png");
      background-repeat:no-repeat;
      background-size:100% 100%;
    }

    .preview-title {
      display: flex;
      align-items: center;
      padding: 16px 0 0 16px;
      font-size: 16px;
      color: black;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .scrollbar-table {

      .el-table thead {
        color: #cccccc;
      }

      .el-table tr {
        background: rgb(224, 239, 255);
      }

      .el-table td, .el-table th.is-leaf {
        border-bottom: 0 solid #EBEEF5;
      }

      .el-table::before {
        height: 0;
      }

      .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #ffffff;
      }

      .el-table--enable-row-hover .el-table__body tr:hover>td {
        background: rgb(188, 222, 255);
      }
    }

    .header-layout {
      display:flex;
      justify-content: space-between;
      margin: -26px -20px 0;

      .header-left {
        display: flex;


        .main-bgc {
          width: 120px;
          height: 32px;
          margin-left: 5px;
          line-height: 32px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          background-image: url("../../assets/img/maingood.png");
          background-repeat:no-repeat;
          background-size:100% 100%;
        }

        .goodleft-bgc {
          width: 110px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          color: #54A6FC;
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
          width: 110px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          cursor: pointer;
          font-size: 16px;
          color: #54A6FC;
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
    }

    .goods-warning {
      width: 40%;
      height: 101%;
      border-radius: 6px;
      background: #ffffff;
      background-image: url("../../assets/img/价格子系统2.png");
      background-repeat:no-repeat;
      background-position: bottom;
    }

    .yuqing-warning {
      width: 40%;
      height: 100%;
      border-radius: 6px;
      background: #ffffff;
    }

    .body-right {
      width: 60%;
      height: 100%;
      margin-left: 6px;

      .news-pie{
        background: #ffffff;
        border-radius: 6px;
        /*background-image: url("../../assets/img/dashboard1-2.png");*/
        background-repeat:no-repeat;
        background-size:100% 100%;
      }

      .right-up {
        height: 35%;
        display: flex;
        justify-content: space-between;

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
          background: #ffffff;
          border-radius: 6px;
          /*background-image: url("../../assets/img/up-1.png");*/
        }

        .up-2 {
          background: #ffffff;
          border-radius: 6px;
          /*background-image: url("../../assets/img/up-2.png");*/
        }

        .up-3 {
          background: #ffffff;
          border-radius: 6px;
          /*background-image: url("../../assets/img/up-1.png");*/
        }
      }

      .right-down {
        height: 65%;
        display: flex;
        margin-top: 5px;

        .down1 {
          width: 60%;
          margin-right: 5px;
          background: #ffffff;
          /*background-image: url("../../assets/img/down1.png");*/
          background-repeat:no-repeat;
          background-size:100% 100%;
        }

        .down2 {
          width: 40%;
          background: #ffffff;
          /*background-image: url("../../assets/img/down2.png");*/
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
