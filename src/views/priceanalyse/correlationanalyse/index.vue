<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :selection="true"
      :searchShow="true"
      :statusShow="true"
      :deleteShow="true"
      @on-detail="handlecorrelation"
    v-show="tableShow">

<!--      相关性分析-->
      <div class="flex bgc">
        <div>
          分析名称:&nbsp;
          <el-input style="width: 180px;margin-right: 20px" v-model="correlationName"></el-input>

          分析类型:&nbsp;
          <el-select v-model="warningName" style="margin-right: 20px">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          数据集名称:&nbsp;
          <el-select v-model="warningName"style="margin-right: 20px">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handlecorrelation">查询</el-button>
        </div>
      </div>

    </jtable>

    <div v-show="correlationShow">
      <div>
        <div class="flex">
          <h3 style="color: #3a8ee6;padding-right: 5px">一般相关性分析</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
        </div>

        <div class="flex bgc">
          <div>
            分析名称:&nbsp;
            <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>

            分析描述:&nbsp;
            <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>

            数据集:&nbsp;
            <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>

            变量选择:&nbsp;
            <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>

            版本信息:&nbsp;
            <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>
          </div>

          <el-button type="primary">运行</el-button>
        </div>

      </div>

      <div style="margin-top: 10px">
        <div class="flex">
          <h3 style="color: #3a8ee6;padding-right: 5px">相关性结果</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
        </div>
        <div class="flex bgc">
          <div>
            审批人:&nbsp;
            <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>

            活动区域:&nbsp;
            <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div style="margin-top: 10px">
        <div class="flex">
          <h3 style="color: #3a8ee6;padding-right: 5px">相关性图</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
        </div>
        <div style="height: 500px;background: #f0f0f1;box-sizing: border-box;border: 1px solid #f0f0f1">
          <div id="cookTble" style="width: 70%;height: 400px;margin: 50px auto 0"></div>
        </div>

      </div>

      <div style="margin-top: 10px">
        <div class="flex-justify bgc" style="align-items: center;background: #eeeeee">
          <div>
            <h3 style="display: inline-block;margin-right: 60px">相关性表</h3>
          </div>

          <div>
            查找变量:&nbsp;
            <el-select v-model="searchQuantity" placeholder="请选择" style="margin-right: 20px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary">下载表格</el-button>
          </div>
        </div>

        <div style="margin-top: 5px">
          <el-table id="QUANTITY"
                    :data="dialogTableData"
                    max-height="600"
                    border
                    stripe>

            <el-table-column label="" align="center" prop="lie" width="200"></el-table-column>

            <el-table-column label="猪生产价格指数" align="center">
              <el-table-column property="zxiangguan" label="相关系数" align="center"></el-table-column>
              <el-table-column property="zpvalue" label="Pvalue" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="粮食产量" align="center">
              <el-table-column property="lxiangguan" label="相关系数" align="center"></el-table-column>
              <el-table-column property="lpvalue" label="Pvalue" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="粮食相关指数" align="center">
              <el-table-column property="sxiangguan" label="相关系数" align="center"></el-table-column>
              <el-table-column property="spvalue" label="Pvalue" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="人均纯收入" align="center">
              <el-table-column property="rxiangguan" label="相关系数" align="center"></el-table-column>
              <el-table-column property="rpvalue" label="Pvalue" align="center"></el-table-column>
            </el-table-column>

            <el-table-column label="人均猪肉消费类" align="center">
              <el-table-column property="jxiangguan" label="相关系数" align="center"></el-table-column>
              <el-table-column property="jpvalue" label="Pvalue" align="center"></el-table-column>
            </el-table-column>

          </el-table>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import jtable from '_c/Jtable'
    export default {
        data(){
            return {
                tableShow: true,
                warningName:'',
                warningNameOptions:[],
                correlationName: '',                        //分析名称
                correlationShow:false,
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
                },
                dialogTableData: [{
                    lie:'猪肉生产价格',
                    zxiangguan:'1.21',
                    zpvalue:'0.59',
                    lxiangguan:'1.21',
                    lpvalue:'0.59',
                    sxiangguan:'1.21',
                    spvalue:'0.59',
                    rxiangguan:'1.21',
                    rpvalue:'0.59',
                    jxiangguan:'1.21',
                    jpvalue:'0.59',
                },{
                    lie:'粮食产量',
                    zxiangguan:'1.21',
                    zpvalue:'0.59',
                    lxiangguan:'1.21',
                    lpvalue:'0.59',
                    sxiangguan:'1.21',
                    spvalue:'0.59',
                    rxiangguan:'1.21',
                    rpvalue:'0.59',
                    jxiangguan:'1.21',
                    jpvalue:'0.59',
                },{
                    lie:'粮食价格指数',
                    zxiangguan:'1.21',
                    zpvalue:'0.59',
                    lxiangguan:'1.21',
                    lpvalue:'0.59',
                    sxiangguan:'1.21',
                    spvalue:'0.59',
                    rxiangguan:'1.21',
                    rpvalue:'0.59',
                    jxiangguan:'1.21',
                    jpvalue:'0.59',
                }],
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formInline: {
                    user: '',
                    region: ''
                },
                options: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '国民生产总值'
                }, {
                    value: '选项3',
                    label: '居民消费价格指数'
                }, {
                    value: '选项4',
                    label: '工业品价格出厂指数'
                }, {
                    value: '选项5',
                    label: '采购经理人指数'
                },{
                    value: '选项6',
                    label: '企业商品价格指数'
                },{
                    value: '选项7',
                    label: '消费者信息指数'
                },{
                    value: '选项8',
                    label: '社会消费品零售总额'
                }],
                searchQuantity:''
            }
        },
        components:{
            jtable
        },
        methods: {
            handlecorrelation(){
                this.tableShow = false
                this.correlationShow = true
                this.$nextTick(() => {
                    this.drawCook()
                })
            },
            drawCook(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('cookTble'))
                // 绘制图表
                let option = {
                    title: {
                        text: '关系图'
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
            onSubmit() {
                console.log('submit!');
            }
        },
    }
</script>

<style>
  #QUANTITY .el-table td{
    padding: 6px 0;
  }
</style>
