<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :total = "total"
      :searchShow="true"
      @pageChange="pageChange"
      @on-detail=searchDetail
      v-show="tableShow">

      <!--      预测结果显示-->
      <div class="flex bgc">

        <div class="flex">
          <div>
            商品类型:&nbsp;
            <el-select v-model="commLevelCode_0" style="width: 140px">
              <el-option
                v-for="(item, index) in goodsTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            商品大类:&nbsp;
            <el-select v-model="commLevelCode_1" style="width: 140px">
              <el-option
                v-for="(item, index) in goodsClassOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            商品名称:&nbsp;
            <el-select v-model="commLevelCode_2" style="width: 140px">
              <el-option
                v-for="item in goodsNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            预测频度:
            <el-select v-model="yuceType" style="width: 140px">
              <el-option
                v-for="item in yuceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>


        <div>
          <el-button type="primary" @click="handleClick">查 询</el-button>
        </div>
      </div>

    </jtable>

    <div v-show="priceShow">
      <el-card style="padding: 10px">
        <div style="font-size: 18px;text-align: center">咖啡(英）-日预测</div>
        <div id="RESULT" style="width: 100%;height: 500px;margin-top: 10px"></div>
        <div style="margin-top: 20px">
          <el-table border stripe :data="dialogTableData">
            <el-table-column prop="dataDate" label="交易时间" align="center"></el-table-column>
            <el-table-column prop="realPrice" label="报价（实际）" align="center"></el-table-column>
            <el-table-column prop="forePrice" label="报价（预测）" align="center"></el-table-column>
            <el-table-column prop="reviPrice" label="报价（修正）" align="center"></el-table-column>
            <el-table-column label="异常点修正" align="center">
              <template>
                <el-button size="small" type="primary" @click="changePage = true">修正</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog title="修正价格" :visible.sync="changePage">
          <div>
            <el-input v-model="gridData"></el-input>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 20px">
            <el-button type="primary" style="margin-right: 15px" @click="handleChange">修正</el-button>
            <el-button style="margin-left: 15px" @click="changePage = false">返回</el-button>
          </div>
        </el-dialog>
      </el-card>
      <div style="display: flex;justify-content: center;margin-top: 10px">
        <el-button type="warning" @click="handleClose">关闭</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import {mapActions} from 'vuex'
  import {psspricereltDetail,psspricereltUpdate} from '@/api/manager'
  export default {
    name: "result",
    data() {
      return {
        commId:'',
        total:0,
        getCommTypeData: '',
        commLevelCode_2: '',                         //商品名称
        goodsNameOptions: [],
        commLevelCode_1: '',                         //商品大类
        goodsClassOptions: [],
        commLevelCode_0: '',                   //商品类型
        goodsTypeOptions: [],
        tableShow: true,
        predictionTime: '',                           //预测时间段
        predictionName: '',                          //预测名称
        indexTableData: [{
          dataName: '数据集名称',
          correlation: '分析名称',
          type: '分析类型',
          vision: '版本信息',
          time: '运行时间'
        }, {
          dataName: '数据集名称',
          correlation: '分析名称',
          type: '分析类型',
          vision: '版本信息',
          time: '运行时间'
        }, {
          dataName: '数据集名称',
          correlation: '分析名称',
          type: '分析类型',
          vision: '版本信息',
          time: '运行时间'
        }],
        indexColumnData: {
          dataName: '商品名称',
          correlation: '模型名称',
          type: '预测类型',
          vision: '版本信息',
          time: '偏差时间'
        },
        shangpingName: '',                        //预测商品名称
        yuceTypeOptions: [{
          label: '日预测',
          value: '日预测'
        }, {
          label: '周预测',
          value: '周预测'
        }, {
          label: '月预测',
          value: '月预测'
        }],                        //预测类型选择
        yuceType: '日预测',                               //预测类型
        resultNameOptions: '',                      //预测结果商品大类选择
        resultName: '',                            //预测结果商品大类
        resultType: '',                            //预测结果类型
        resultTypeOptions: [],                       //预测结果类型选择
        priceShow: false,
        value1: '',
        changePage: false,
        gridData: '',
        dialogTableData: [],
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        columnData: {
          commName: '商品名称',
          modName: '模型名称',
          foreType: '预测类型',
        }
      }
    },
    components: {
      jtable
    },
    methods: {
      handleChange(){
        let data = {
          commId: this.commId,
          reviPrice: this.gridData,
        }
        psspricereltUpdate(data).then(res=>{
          this.changePage = false
          this.gridData = ''
          this.$message({
            message: '修正成功',
            type: 'success'
          })
        })
      },
      handleClose(){
        this.tableShow = true
        this.priceShow = false
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleClick()
      },
      handleClick() {
        let data = {
          type3CommId: this.commLevelCode_2,
          foreType: this.yuceType,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        this.queryResult(data).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount;
        })
      },
      ...mapActions([
        'getCommType',
        'queryResult'
      ]),
      searchDetail(data) {
        this.tableShow = false
        this.priceShow = true
        this.commId = data.row.commId
        psspricereltDetail(this.commId).then(res=>{
          this.dialogTableData = [res.data.dataGrid]
        })
        this.$nextTick(() => {
            this.drawRESULT()
        })
      },
      drawRESULT() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('RESULT'))
        // 绘制图表
        let option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            show: true,
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            show: true,
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    watch: {
      commLevelCode_0(val) {
        this.goodsClassOptions = [];
        this.commLevelCode_1 = ''
        let num = 0
        if (val) {
          for (let i in this.getCommTypeData.commLevelCode_1) {
            if (this.getCommTypeData.commLevelCode_1[i].parentCode === val) {
              this.goodsClassOptions[num] = {}
              this.goodsClassOptions[num].value = this.getCommTypeData.commLevelCode_1[i].commId
              this.goodsClassOptions[num].label = this.getCommTypeData.commLevelCode_1[i].commName
              num++
            }
          }
        }
      },
      commLevelCode_1(val) {
        this.goodsNameOptions = []
        this.commLevelCode_2 = ''
        let num = 0
        if (val) {
          for (let i in this.getCommTypeData.commLevelCode_2) {
            if (this.getCommTypeData.commLevelCode_2[i].parentCode === val) {
              this.goodsNameOptions[num] = {}
              this.goodsNameOptions[num].value = this.getCommTypeData.commLevelCode_2[i].commId
              this.goodsNameOptions[num].label = this.getCommTypeData.commLevelCode_2[i].commName
              num++
            }
          }
        }
      },
    },
    created() {
      this.getCommType().then(res => {
        this.getCommTypeData = {};
        this.getCommTypeData = res.data;
        this.commLevelCode_0 = ''
        this.goodsTypeOptions = [];
        for (let i in this.getCommTypeData.commLevelCode_0) {
          this.goodsTypeOptions[i] = {};
          this.goodsTypeOptions[i].value = this.getCommTypeData.commLevelCode_0[i].commId;
          this.goodsTypeOptions[i].label = this.getCommTypeData.commLevelCode_0[i].commName
        }
        this.goodsTypeOptions.unshift({label: '全部', value: ''})
      })
    }
  }
</script>

<style scoped>

</style>
