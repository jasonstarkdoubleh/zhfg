<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :searchShow="true"
      :statusShow="true"
      :deleteShow="true"
      @on-detail="handleCause">

<!--      因果分析-->
      <div class="flex bgc">
        <div>
          分析结果名称:&nbsp;
          <el-input style="width: 150px;margin-right: 20px" v-model="correlationName"></el-input>

          模型名称:&nbsp;
          <el-select v-model="warningName" style="margin-right: 20px">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          数据集名称:&nbsp;
          <el-select v-model="warningName" style="margin-right: 20px">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleCause">查询</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog :visible.sync="gelanjieShow" fullscreen>
      <div style="padding: 10px" id="GELANJIE">
        <div>
          <h3>格兰杰因果检验</h3>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px" label-width="80px">
            <el-form-item label="分析名称" style="margin-right: 20px">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="数据集">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px" label-width="80px">
            <el-form-item label="分析描述" style="margin-right: 20px">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="自变量">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px" label-width="80px">
            <el-form-item label="版本信息" style="margin-right: 20px">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="因变量">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 30px">
              <el-button type="primary">运行</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <h3>检验结果</h3>
          <el-form :model="formInline" class="demo-form-inline" style="margin-top: 10px;" label-width="80px">
            <el-form-item label="检验结果">
              <el-select v-model="formInline.region" placeholder="活动区域" style="width: 300px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div>
            <el-table :data="dialogTableData" border stripe style="width: 700px" max-height="600">
              <el-table-column label="" prop="column" align="center" width="200"></el-table-column>
              <el-table-column label="Pvalue" prop="pvalue" align="center" width="200"></el-table-column>
              <el-table-column label="是否为格兰杰原因" prop="gelanjie" align="center"></el-table-column>
            </el-table>
          </div>
        </div>

      </div>
    </el-dialog>

    <el-dialog :visible.sync="wayShow" fullscreen>
      <div class="flex">
        <h3 style="color: #3a8ee6;padding-right: 5px">因果分析</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
      </div>
      <div class="flex bgc" style="margin-top: 10px">
        <div>
          分析名称:&nbsp;
          <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>

          数据集:&nbsp;
          <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          分析描述:&nbsp;
          <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>

          模型选择:&nbsp;
          <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          变量选择:&nbsp;
          <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </div>

        <div>
          <el-button type="primary">运行</el-button>
        </div>
      </div>
      <div class="flex" style="margin-top: 10px">
        <h3 style="color: #3a8ee6;padding-right: 5px">因果分析结果</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
      </div>
      <div>
          因果图结果:&nbsp;
          <el-select v-model="formInline.region" style="width: 150px">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
      </div>

      <div class="flex" style="margin-top: 10px">
        <h3 style="color: #3a8ee6;padding-right: 5px">因果图</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
      </div>
      <div class="flex">
          <el-card style="width: 50%">
            <div slot="header">关系图</div>
            <div id="CAUSE" style="width:100%;height: 500px;margin-top: 10px"></div>
          </el-card>

          <el-card style="width: 50%;margin-left: 10px">
            <div slot="header">路径分析表</div>
            <div style="margin-top: 10px">
              <el-table :data="dialogTableData" border stripe style="width: 100%;height: 500px">
                <el-table-column label="" prop="column" align="center"></el-table-column>
                <el-table-column label="路径系数" prop="gelanjie" align="center"></el-table-column>
                <el-table-column label="Pvalue" prop="pvalue" align="center"></el-table-column>
              </el-table>
            </div>
          </el-card>

      </div>





    </el-dialog>
  </div>
</template>

<script>
  import jtable from '_c/Jtable'
    export default {
      data(){
          return {
              wayShow:false,
              formInline: {
                  user: '',
                  region: ''
              },
              dialogTableData:[{
                  column:'粮食产量',
                  pvalue:'0.245',
                  gelanjie:'否'
              },{
                  column:'粮食产量',
                  pvalue:'0.245',
                  gelanjie:'否'
              },{
                  column:'粮食产量',
                  pvalue:'0.245',
                  gelanjie:'是'
              },{
                  column:'粮食产量',
                  pvalue:'0.245',
                  gelanjie:'否'
              },{
                  column:'粮食产量',
                  pvalue:'0.245',
                  gelanjie:'否'
              },{
                  column:'粮食产量',
                  pvalue:'0.245',
                  gelanjie:'是'
              }],
              gelanjieShow:false,
              warningName:'',
              warningNameOptions:[],
              correlationName:'',
              tableData: [{
                  dataName:'数据集名称',
                  correlation:'分析名称',
                  type:'分析类型',
                  vision:'版本信息',
                  time:'运行时间'
              },{
                  dataName:'数据集名称',
                  correlation:'分析名称',
                  type:'分析类型',
                  vision:'版本信息',
                  time:'运行时间'
              },{
                  dataName:'数据集名称',
                  correlation:'分析名称',
                  type:'分析类型',
                  vision:'版本信息',
                  time:'运行时间'
              }],
              columnData: {
                  dataName:'数据集名称',
                  correlation:'分析名称',
                  type:'分析类型',
                  vision:'版本信息',
                  time:'运行时间'
              }
          }
      },
      components:{
          jtable
      },
      methods:{
          drawLine(){
              // 基于准备好的dom，初始化echarts实例
              let myChart = this.$echarts.init(document.getElementById('CAUSE'))
              // 绘制图表
              let option = {
                  title: {
                      text: ''
                  },
                  tooltip: {},
                  animationDurationUpdate: 1500,
                  animationEasingUpdate: 'quinticInOut',
                  series : [
                      {
                          type: 'graph',
                          layout: 'none',
                          symbolSize: 50,
                          roam: false,
                          label: {
                              normal: {
                                  show: true
                              }
                          },
                          edgeSymbol: ['circle', 'arrow'],
                          edgeSymbolSize: [4, 10],
                          edgeLabel: {
                              normal: {
                                  textStyle: {
                                      fontSize: 20
                                  }
                              }
                          },
                          data: [{
                              name: '节点1',
                              x: 300,
                              y: 300
                          }, {
                              name: '节点2',
                              x: 800,
                              y: 300
                          }, {
                              name: '节点3',
                              x: 550,
                              y: 100
                          }, {
                              name: '节点4',
                              x: 550,
                              y: 500
                          }],
                          // links: [],
                          links: [{
                              source: 0,
                              target: 1,
                              symbolSize: [5, 20],
                              label: {
                                  normal: {
                                      show: true
                                  }
                              },
                              lineStyle: {
                                  normal: {
                                      width: 5,
                                      curveness: 0.2
                                  }
                              }
                          }, {
                              source: '节点2',
                              target: '节点1',
                              label: {
                                  normal: {
                                      show: true
                                  }
                              },
                              lineStyle: {
                                  normal: { curveness: 0.2 }
                              }
                          }, {
                              source: '节点1',
                              target: '节点3'
                          }, {
                              source: '节点2',
                              target: '节点3'
                          }, {
                              source: '节点2',
                              target: '节点4'
                          }, {
                              source: '节点1',
                              target: '节点4'
                          }],
                          lineStyle: {
                              normal: {
                                  opacity: 0.9,
                                  width: 2,
                                  curveness: 0
                              }
                          }
                      }
                  ]
              };
              myChart.setOption(option);
          },
          handleCause(){
              // this.gelanjieShow = true
              this.wayShow = true
              this.$nextTick(() => {
                  this.drawLine()
              })
          }
      }
    }
</script>

<style>
  #GELANJIE .el-table td{
    padding: 12px 0;
  }
</style>
