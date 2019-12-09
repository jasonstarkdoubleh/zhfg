<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数据展示" name="first">
        <jtable
          :tableData="tableData"
          :columnData="columnData"
          :selection="true"
          :searchShow="true"
          :statusShow="true"
          :deleteShow="true"
          :total="total">

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
              <el-select v-model="dataName"style="margin-right: 20px">
                <el-option
                  v-for="item in dataNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-button type="primary" @click="submit()">查 询</el-button>
            </div>
          </div>

        </jtable>
      </el-tab-pane>

      <el-tab-pane label="一般相关性分析" name="second">

        <div style="background: #ffffff;padding: 10px">
          <div style="">
            <div class="flex">
              <h3 style="color: #3a8ee6;padding-right: 5px">一般相关性分析</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
            </div>

            <div class="flex bgc">
              <div>

                数据集:&nbsp;
                <el-select v-model="formInline.dataSetId" style="width: 150px;margin-right: 20px">
                  <el-option
                    v-for="(item, index) in dataNameOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                变量选择:&nbsp;
                <el-select
                  v-model="formInline.indeVar"
                  style="width: 150px;margin-right: 20px"
                  multiple
                  collapse-tags>
                  <el-option
                    v-for="(item, index) in dataNameOptionsCopy"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                分析名称:&nbsp;
                <el-input v-model="formInline.analyName" style="width: 150px;margin-right: 20px"></el-input>

                分析描述:&nbsp;
                <el-input v-model="formInline.remark" style="width: 150px;margin-right: 20px"></el-input>
              </div>

              <el-button type="primary" @click="runTime">运行</el-button>
            </div>

          </div>

<!--          <div style="margin-top: 10px;">-->
<!--            <div class="flex">-->
<!--              <h3 style="color: #3a8ee6;padding-right: 5px">一般相关性结果</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>-->
<!--            </div>-->
<!--            <div class="flex bgc">-->
<!--              <div>-->

<!--                分析结果名称:&nbsp;-->
<!--                <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">-->
<!--                  <el-option label="区域一" value="shanghai"></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->

<!--                变量:&nbsp;-->
<!--                <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">-->
<!--                  <el-option label="区域一" value="shanghai"></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->

<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>


          <div style="margin-top: 10px;background: #ffffff;padding: 10px">
            <div class="flex">
              <h3 style="color: #3a8ee6;padding-right: 5px">相关性图</h3>
              <div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
            </div>
            <div style="height: 500px;box-sizing: border-box;border: 1px solid #f0f0f1">
              <div id="cookTble" style="width: 70%;height: 400px;margin: 50px auto 0"></div>
            </div>

          </div>

          <div style="margin-top: 10px;background: #ffffff;padding: 10px">
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
      </el-tab-pane>

<!--      <el-tab-pane label="偏相关性分析" name="third">-->
<!--        <div style="background: #ffffff;padding: 10px">-->
<!--          <div >-->
<!--            <div class="flex">-->
<!--              <h3 style="color: #3a8ee6;padding-right: 5px">偏相关性分析</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>-->
<!--            </div>-->

<!--            <div class="flex bgc">-->
<!--              <div>-->
<!--                分析名称:&nbsp;-->
<!--                <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>-->

<!--                分析描述:&nbsp;-->
<!--                <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">-->
<!--                  <el-option label="区域一" value="shanghai"></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->

<!--                数据集:&nbsp;-->
<!--                <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>-->

<!--                变量选择:&nbsp;-->
<!--                <el-select v-model="formInline.region" style="width: 150px;margin-right: 20px">-->
<!--                  <el-option label="区域一" value="shanghai"></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->

<!--                版本信息:&nbsp;-->
<!--                <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>-->
<!--              </div>-->

<!--              <el-button type="primary">运行</el-button>-->
<!--            </div>-->

<!--          </div>-->

<!--          <div style="margin-top: 10px;">-->
<!--            <div class="flex">-->
<!--              <h3 style="color: #3a8ee6;padding-right: 5px">偏相关性结果</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>-->
<!--            </div>-->
<!--            <div class="flex bgc">-->
<!--              <div>-->
<!--                审批人:&nbsp;-->
<!--                <el-input v-model="formInline.user" style="width: 150px;margin-right: 20px"></el-input>-->

<!--                活动区域:&nbsp;-->
<!--                <el-select v-model="formInline.change" style="width: 150px;margin-right: 20px">-->
<!--                  <el-option label="区域一" value="shanghai"></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->


<!--        <div style="margin-top: 10px;background: #ffffff;padding: 10px">-->
<!--          <div class="flex">-->
<!--            <h3 style="color: #3a8ee6;padding-right: 5px">相关性图</h3>-->
<!--            <div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>-->
<!--          </div>-->
<!--          <div style="height: 500px;box-sizing: border-box;border: 1px solid #f0f0f1">-->
<!--            <div id="cookTbletwo" style="width: 70%;height: 400px;margin: 50px auto 0"></div>-->
<!--          </div>-->

<!--        </div>-->

<!--        <div style="margin-top: 10px;background: #ffffff;padding: 10px">-->
<!--          <div class="flex-justify bgc" style="align-items: center;background: #eeeeee">-->
<!--            <div>-->
<!--              <h3 style="display: inline-block;margin-right: 60px">相关性表</h3>-->
<!--            </div>-->

<!--            <div>-->
<!--              查找变量:&nbsp;-->
<!--              <el-select v-model="searchQuantity" placeholder="请选择" style="margin-right: 20px">-->
<!--                <el-option-->
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--              <el-button type="primary">下载表格</el-button>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div style="margin-top: 5px">-->
<!--            <el-table id="QUANTITY"-->
<!--                      :data="dialogTableData"-->
<!--                      max-height="600"-->
<!--                      border-->
<!--                      stripe>-->

<!--              <el-table-column label="" align="center" prop="lie" width="200"></el-table-column>-->

<!--              <el-table-column label="猪生产价格指数" align="center">-->
<!--                <el-table-column property="zxiangguan" label="相关系数" align="center"></el-table-column>-->
<!--                <el-table-column property="zpvalue" label="Pvalue" align="center"></el-table-column>-->
<!--              </el-table-column>-->

<!--              <el-table-column label="粮食产量" align="center">-->
<!--                <el-table-column property="lxiangguan" label="相关系数" align="center"></el-table-column>-->
<!--                <el-table-column property="lpvalue" label="Pvalue" align="center"></el-table-column>-->
<!--              </el-table-column>-->

<!--              <el-table-column label="粮食相关指数" align="center">-->
<!--                <el-table-column property="sxiangguan" label="相关系数" align="center"></el-table-column>-->
<!--                <el-table-column property="spvalue" label="Pvalue" align="center"></el-table-column>-->
<!--              </el-table-column>-->

<!--              <el-table-column label="人均纯收入" align="center">-->
<!--                <el-table-column property="rxiangguan" label="相关系数" align="center"></el-table-column>-->
<!--                <el-table-column property="rpvalue" label="Pvalue" align="center"></el-table-column>-->
<!--              </el-table-column>-->

<!--              <el-table-column label="人均猪肉消费类" align="center">-->
<!--                <el-table-column property="jxiangguan" label="相关系数" align="center"></el-table-column>-->
<!--                <el-table-column property="jpvalue" label="Pvalue" align="center"></el-table-column>-->
<!--              </el-table-column>-->

<!--            </el-table>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
    </el-tabs>





  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
    export default {
        data(){
            return {
                activeName: 'first',
                dataName: '',
                dataNameOptions: [],
                dataNameOptionsCopy: [],
                warningName: '',
                warningNameOptions: [],
                correlationName: '',                        //分析名称
                total: 0,
                tableData: [],
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
                    dataSetId: '',
                    indeVar: [],
                    analyName: '',
                    remark: ''
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
                searchQuantity:'',
                selcetData:[]
            }
        },
        components:{
            jtable
        },
        watch: {
            dataSetId(val) {
                this.dataNameOptionsCopy = []
                this.formInline.indeVar = []
                for(let i in this.selcetData) {
                   if ( this.selcetData[i].dataSetId === val) {
                       let comm_table = JSON.parse(this.selcetData[i].indeVar).comm_table
                       let commIndexNames = JSON.parse(this.selcetData[i].indeName).commIndexNames
                       console.log(comm_table)
                       console.log(commIndexNames)
                       for(let k in comm_table) {
                           this.dataNameOptionsCopy[k] = {}
                           this.dataNameOptionsCopy[k].label = commIndexNames[k]
                           this.dataNameOptionsCopy[k].value = comm_table[k]
                       }
                       return
                   }
                }
            }
        },
        computed: {
            dataSetId() {
                return this.formInline.dataSetId
            }
        },
        methods: {
            runTime() {
                this.formInline.indeVar = [JSON.stringify({'comm_table': this.formInline.indeVar})]
                this.formInline.bussType = 0
                this.formInline.analyWay = "一般相关性分析"
                console.log(this.formInline)
                this.runGeneral(this.formInline).then(res => {
                    console.log(JSON.parse(res.data.coe))
                  console.log(JSON.parse(res.data.pva))
                })
            },
            submit() {
              this.pssanalyinfoList(this.correlationName, this.warningName, this.dataName).then(res => {
                  this.tableData = res.page.list
                  this.total = res.page.totalPage
              })
            },
            getPageAll() {
                this.bussType(1).then(res => {
                    this.warningNameOptions = []
                    for (let i in res.data) {
                        this.warningNameOptions[i] = {}
                        this.warningNameOptions[i].label = res.data[i].analyName
                        this.warningNameOptions[i].value = res.data[i].analyId
                    }
                })
                this.listAll().then(res => {
                    this.selcetData = res.list
                    this.dataNameOptions = []
                    for(let i in this.selcetData) {
                        this.dataNameOptions[i] = {}
                        this.dataNameOptions[i].label = this.selcetData[i].dataSetName
                        this.dataNameOptions[i].value = this.selcetData[i].dataSetId
                    }
                  console.log(this.dataNameOptions)
                })
            },
            ...mapActions([
                'bussType',
                'listAll',
                'pssanalyinfoList',
                'runGeneral'
            ]),
            handleClick(tab, event) {
                if(tab.name === 'second') {
                    this.$nextTick(() => {
                        this.drawCook()
                    })
                }
                if(tab.name === 'third') {
                    this.$nextTick(() => {
                        this.drawCooktwo()
                    })
                }
            },
            drawCook(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('cookTble'))
                // 绘制图表
                let option = {
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 20
                            },
                        }
                    },
                    legend: {
                        x: "center",
                        show: false,
                        data: ["夫妻", "战友", '亲戚']
                    },
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 45,
                            focusNodeAdjacency: true,
                            roam: true,
                            categories: [{
                                name: '夫妻',
                                itemStyle: {
                                    normal: {
                                        color: "#009800",
                                    }
                                }
                            }, {
                                name: '战友',
                                itemStyle: {
                                    normal: {
                                        color: "#4592FF",
                                    }
                                }
                            }, {
                                name: '亲戚',
                                itemStyle: {
                                    normal: {
                                        color: "#3592F",
                                    }
                                }
                            }],
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 12
                                    },
                                }
                            },
                            force: {
                                repulsion: 1000
                            },
                            edgeSymbolSize: [4, 50],
                            edgeLabel: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 10
                                    },
                                    formatter: "{c}"
                                }
                            },
                            data: [{
                                name: '徐贱云',
                                draggable: true,
                            }, {
                                name: '冯可梁',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '邓志荣',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '李荣庆',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '郑志勇',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '赵英杰',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '王承军',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '陈卫东',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '邹劲松',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '赵成',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '陈现忠',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '陶泳',
                                category: 1,
                                draggable: true,
                            }, {
                                name: '王德福',
                                category: 1,
                                draggable: true,
                            }],
                            links: [{
                                source: 0,
                                target: 1,
                                category: 0,
                                value: '夫妻'
                            }, {
                                source: 0,
                                target: 2,
                                value: '子女'
                            }, {
                                source: 0,
                                target: 3,
                                value: '夫妻'
                            }, {
                                source: 0,
                                target: 4,
                                value: '父母'
                            }, {
                                source: 1,
                                target: 2,
                                value: '表亲'
                            }, {
                                source: 0,
                                target: 5,
                                value: '朋友'
                            }, {
                                source: 4,
                                target: 5,
                                value: '朋友'
                            }, {
                                source: 2,
                                target: 8,
                                value: '叔叔'
                            }, {
                                source: 0,
                                target: 12,
                                value: '朋友'
                            }, {
                                source: 6,
                                target: 11,
                                value: '爱人'
                            }, {
                                source: 6,
                                target: 3,
                                value: '朋友'
                            }, {
                                source: 7,
                                target: 5,
                                value: '朋友'
                            }, {
                                source: 9,
                                target: 10,
                                value: '朋友'
                            }, {
                                source: 3,
                                target: 10,
                                value: '朋友'
                            }, {
                                source: 2,
                                target: 11,
                                value: '同学'
                            }],
                            lineStyle: {
                                normal: {
                                    opacity: 0.9,
                                    width: 1,
                                    curveness: 0
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            },
            drawCooktwo(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('cookTbletwo'))
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

            }
        },
        created() {
            this.getPageAll()
        }
    }
</script>

<style>
  #QUANTITY .el-table td{
    padding: 6px 0;
  }
</style>
