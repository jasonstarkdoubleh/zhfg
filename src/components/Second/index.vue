<template>
  <div class="flex-justify second" style="height: calc(100vh - 110px)">
    <div class="left-production" style="width: 45%;margin-right: 10px;height: 100%">
      <div class="preview-title">
        <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
        <div>
          {{this.goodsName}}信息
        </div>
      </div>

      <div style="padding: 10px 0 0 16px;box-sizing: border-box;height: calc(100% - 50px)">

        <div style="display: flex;align-items: center;justify-content: space-around;height: 50px;margin-bottom: 20px">
          <div>
            <span style="margin-right: 10px;font-size: 16px">时间</span>
            <el-date-picker
              v-model="dateSearch"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="background-color: transparent"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <el-button type="primary" @click="_byDate">查 询</el-button>
        </div>

        <div style="height: calc(100% - 70px)">
          <el-scrollbar class="scrollbar-table" :style="{'height':(mapShow ? '25%' : '100%')}">
            <el-table
              :data="tableData"
              :header-cell-style="{background:'#ffffff'}"
              stripe
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                show-overflow-tooltip
                prop="indexName"
                label="指标名称">
                <template slot-scope="scope">
                  <el-link @click="_lineChart(scope.row)">{{ scope.row.indexName }}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="取值">
                <template slot-scope="scope">
                  {{ scope.row.value }}
                </template>
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位">
                <template slot-scope="scope">
                  {{ scope.row.unit }}
                </template>
              </el-table-column>
            </el-table>
            <!--    分页-->
            <div style="display: flex;justify-content: flex-end;margin-top: 14px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </el-scrollbar>
          <div v-if="mapShow" style="height: 1px;background-color: #ccc"></div>
          <div v-if="mapShow" style='position: absolute;z-index: 9;margin-top: 30px'>
            <el-dropdown @command="_provinceMap">
            <span class="el-dropdown-link">
              {{this.commond||'指标选项'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item,index) in type4commList" :key="index" :command="item">
                  {{item.commName}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-if="mapShow" id="seconditemmap" style="height: 75%"></div>
        </div>
      </div>
    </div>

    <div class="left-production" style="width: calc(55% - 10px);height: 100%">
      <div class="preview-title">
        <div><img src="../../assets/img/shu.png" style="margin: 1px 6px 0 0"></div>
        <div>{{this.goodsName}}趋势</div>
      </div>

      <div style="margin: 10px 15px 20px;height: 30px;display: flex;justify-content: space-between">
          <el-radio-group v-model="radioPindu" size="mini" @change="changePindu(false)">
            <el-radio-button v-for="(item,index) in pindu" :key="index" :label="item.value">
              {{item.label}}
            </el-radio-button>
          </el-radio-group>
        <div>
          <el-radio v-model="testData" label="1" @change="changePindu(false)">折线柱状图</el-radio>
          <el-radio v-model="testData" label="2" @change="changePindu(true)">散点K线图</el-radio>
        </div>
      </div>

      <div v-show="typeShow" style="height: calc(100% - 110px)">
        <div :id="secondLine" style="height: 100%" v-if="lineShow"></div>
        <div :id="secondPoint" style="height: 100%" v-if="!lineShow"></div>
      </div>

    </div>
  </div>
</template>

<script>
  import {byDate,provinceMap,lineChart} from '@/api/manager'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        typeShow:true,
        nowDate:'',
        lastDate:'',
        mapValue: [],
        radio:'',
        lineShow: true,
        testData:'1',
        dateSearch:[],
        currentPage: 1,                    //当前页
        pageSize: 10,
        total:0,
        pindu:[],
        radioPindu:'',
        commond:''
      }
    },
    props: {
      mapShow: {
        type: Boolean,
        default: false
      },
      secondLine: {
        type: String,
        default: 'secondLine'
      },
      secondPoint: {
        type: String,
        default: 'secondLine'
      },
      goodsName: {
        type: String,
        required: true
      },
      goodsType: {
        type: String,
        required: true
      },
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      type4commList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed:{
      ...mapGetters([
        'pageValue'
      ])
    },
    watch:{
      mapShow(val){
        if(val){
          if(this.type4commList.length){
            this.commond = this.type4commList[0].commName
            this._provinceMap(this.type4commList[0])
          }
        }
      },
      goodsType(val){
        this.typeShow = false
        this.testData = '1'
        this.pindu = []
        if(this.tableData.length){
          this._lineChart(this.tableData[0])
        }
      }
    },
    methods: {
      changePindu(boo){
        this.typeShow = true;
        this.$nextTick(()=>{
          this.drawLine(this.radioPindu,boo)
        })
      },
      _lineChart(row){
        this.typeShow = false
        this.pindu = []
        this.radioPindu = ''
        lineChart(row.commId,row.indexId,this.goodsType,this.lastDate,this.nowDate).then(res=>{
          let pindu = Object.keys(res.data)     //[日]
          let data
          this.pindu = []
          pindu.forEach((item,indexPindu)=>{
            this.pindu[indexPindu] = {}
            this.pindu[indexPindu].label = item
            this.pindu[indexPindu].value = []
            Object.keys(res.data[item]).forEach(key=>{    //[北京]
              data = {}
              data.name = key
              data.date = []
              data.data = []
              res.data[item][key].forEach(val=>{
                data.date.push(val.date)
                data.data.push(val.value)
              })
            })
            this.pindu[indexPindu].value.push(data)
          })
          if(this.pindu.length){
            this.radioPindu = this.pindu[0].value
            this.changePindu(false)
          }
        })
      },
      _provinceMap(commond){
        this.commond = commond.commName
        provinceMap(commond.commId,'价格').then(res=>{
          this.mapValue = []
          for(let i in res.data) {
            this.mapValue[i] = {}
            this.mapValue[i].name = res.data[i].areaName.slice(0,2)
            this.mapValue[i].value = res.data[i].value
            this.mapValue[i].unit = res.data[i].unit
          }
          this.drawMap(this.mapValue)
        })
      },
      handleSizeChange(val) {                             //pageSize 改变时会触发
        this.pageSize = val
        this._byDate()
      },
      handleCurrentChange(val) {                          //currentPage 改变时会触发
        this.currentPage = val
        this._byDate()
      },
      _byDate(){
        if(this.dateSearch.length !== 2){
          return
        }
        byDate(this.pageValue.commId,this.goodsType,this.dateSearch[0],this.dateSearch[1],this.currentPage,this.pageSize).then(res=>{
          this.$emit('changeTableData',res.page.list,this.goodsType)
          this.total = res.page.totalCount
          this.dateSearch = []
        })
      },
      drawMap(data){
        let maxValue = ''
        let minValue = ''
        if(data.length){
          maxValue = data[0].value
          minValue = data[0].value
        }else {
          maxValue = 0
          minValue = 0
        }

        data.forEach(item=>{
          if(item.value>maxValue){
            maxValue = item.value
          }
          if(item.value<minValue){
            minValue=item.value
          }
        })
        let myChart = this.$echarts.init(document.getElementById('seconditemmap'));
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: `{b}<br/>{c} ${maxValue?data[0].unit:''}`
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
      drawLine(data,boo){
        console.log(boo)
        let series = []
        if(!data.length){
          data[0] = {}
          data[0].name = ''
          data[0].data = []
          data[0].date = []
        }
        if(boo){
          series = data.map(item=>{
            return {
              name:item.name,
              type:'scatter',
              areaStyle: {},
              data:item.data
            }
          })
        }else {
          series = data.map(item=>{
            return {
              name:item.name,
              type:'line',
              areaStyle: {},
              data:item.data
            }
          })
        }

        let myChart = this.$echarts.init(document.getElementById(this.secondLine))
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
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '10%',
          //   containLabel: true
          // },
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
          series : series
        };
        myChart.setOption(option);
      },
      drawPoint(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.secondPoint))
        // 绘制图表
        function random(){
          let r = Math.round(Math.random() * 100);
          return (r * (r % 2 == 0 ? 1 : -1));
        }

        function randomDataArray() {
          let d = [];
          let len = 100;
          while (len--) {
            d.push([
              random(),
              random(),
              Math.abs(random()),
            ]);
          }
          return d;
        }

        let option = {
          xAxis : [
            {
              type : 'value',
              splitNumber: 4,
              scale: true
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitNumber: 4,
              scale: true
            }
          ],
          series : [
            {
              name:'scatter1',
              type:'scatter',
              symbolSize: function (value){
                return Math.round(value[2] / 5);
              },
              data: randomDataArray()
            },
            {
              name:'scatter2',
              type:'scatter',
              symbolSize: function (value){
                return Math.round(value[2] / 5);
              },
              data: randomDataArray()
            }
          ]
        };

        myChart.setOption(option);
      },
    },
    created() {
      let date = new Date();
      let nowYear = date.getFullYear();
      let lastYear = nowYear;
      let nowMonth = date.getMonth() + 1;
      let lastMonth = 0;
      if(nowMonth === 1) {
        lastMonth = 12;
        lastYear -= 1
      }else {
        lastMonth = nowMonth - 1
      }
      let strDate = date.getDate();
      let seperator = "-";
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      if (lastMonth >= 1 && lastMonth <= 9) {
        lastMonth = "0" + lastMonth;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let nowDate = nowYear + seperator + nowMonth + seperator + strDate;
      let lastDate = lastYear + seperator + lastMonth + seperator + strDate;
      this.nowDate = nowDate;
      this.lastDate = lastDate;
      if(this.mapShow){
        if(this.type4commList.length){
          this.commond = this.type4commList[0].commName;
          this._provinceMap(this.type4commList[0])
        }
      }
      if(this.tableData.length){
        this._lineChart(this.tableData[0])
      }
    }
  }
</script>

<style lang="scss">
  .second {
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .left-production {
      border-radius: 6px;
      background: #ffffff;
      /*background-image: url("../../assets/img/down1.png");*/
      background-repeat:no-repeat;
      background-size:100% 100%;

      .el-radio {
        color: #cccccc;
      }
    }
    .preview-title {
      height: 50px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 16px 0 0 16px;
      font-size: 16px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-range-editor .el-range-input {
      background-color: transparent;
    }
    .el-date-editor .el-range-separator {
      color: #cccccc;
    }
  }

</style>
