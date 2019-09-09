<template>
    <div style="margin-top: -10px">
      <div style="height: 34px">
        <el-button-group style="float: right">
          <el-button size="small" @click="handleUploadShow">文件导入</el-button>
          <el-button size="small">数据库导入</el-button>
        </el-button-group>
      </div>
      <el-card style="margin-top: 10px">
        <div class="flex bgc">
          <div>
            数据集名称:
            <el-input style="width: 150px;margin-right: 20px" v-model="dataSet"></el-input>
            类型:
            <el-select v-model="dataType" style="margin-right: 20px">
              <el-option
                v-for="item in dataTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button type="primary">查 询</el-button>
            <el-button type="warning">重 置</el-button>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="数据解析" name="first" @click="dataResolveFun"></el-tab-pane>
            <el-tab-pane label="数据过滤" name="second" @click="dataFilterFun"></el-tab-pane>
            <el-tab-pane label="数据切分" name="third" @click="dataCutFun"></el-tab-pane>
          </el-tabs>
          <!--        <el-link type="primary" style="margin-right: 30px" @click="dataResolveFun">数据解析</el-link>-->
          <!--        <el-link type="primary" style="margin-right: 30px" @click="dataFilterFun">数据过滤</el-link>-->
          <!--        <el-link type="primary" style="margin-right: 20px" @click="dataCutFun">数据切分</el-link>-->
        </div>
        <jtable  :tableData="tableData"
                 :columnData="columnData"
                 :searchShow="true"
                 :downloadShow="true"
                 :deleteShow="true"
                 :selection="true"
                 @on-detail="handleSearchDetail">
        </jtable>
      </el-card>




      <div style="margin-top: 20px">
        <!--      数据解析-->
        <el-card v-if="dataResolveShow">
          <div style="margin-top: 10px">
            <el-button @click="jibenFun">基本统计</el-button>
            <el-button @click="huizhiFun">绘制趋势图</el-button>
            <el-button @click="juzhengFun">相关性矩阵</el-button>
          </div>
          <div style="margin-top: 20px">
            <!--          基本统计-->
            <jtable  :tableData="tableData"
                     :columnData="columnData"
                     :index="true"
                     v-if="jibenShow">
            </jtable>

            <!--          趋势图-->
            <div v-if="huizhiShow">
              <div>
                统计维度:
                <el-select v-model="dataType"  style="margin-right: 20px">
                  <el-option
                    v-for="item in dataTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="timeValue"
                  style="width: 400px"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>

              <div style="margin-top: 20px">
                X项:
                <el-select v-model="Xselect"  style="margin-right: 20px" multiple collapse-tags>
                  <el-option
                    v-for="item in dataTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" style="margin-right: 100px">绘 图</el-button>
                Y项:
                <el-select v-model="dataType" style="margin-right: 20px">
                  <el-option
                    v-for="item in dataTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" >绘图</el-button>
              </div>
              <div style="margin-top: 30px" v-loading="loading">
                <div id="KIMG" style="width: 100%;height: 500px"></div>
              </div>
            </div>

            <!--          相关性矩阵-->
            <div v-if="juzhengShow">
              <div>
                数据维度:
                <el-select v-model="dataType"  style="margin-right: 20px">
                  <el-option
                    v-for="item in dataTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="timeValue"
                  style="width: 400px"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>

              <div style="margin-top: 20px">
                数据项:
                <el-select v-model="dataType"  style="margin-right: 20px">
                  <el-option
                    v-for="item in dataTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" >绘 图</el-button>
              </div>
              <div style="margin-top: 30px">
                <div id="JUXING" style="width: 100%;height: 500px"></div>
              </div>
            </div>

          </div>

        </el-card>

        <!--      数据过滤-->
        <div v-if="dataFilterShow">
          <div style="height: 32px;">
            <el-button-group style="float: right">
              <el-button @click="guiyi">归一化</el-button>
              <el-button @click="biaozhun">标准化</el-button>
              <el-button @click="bianhua">数据变化</el-button>
            </el-button-group>
          </div>

<!--            <el-link type="primary" style="margin-right: 30px" @click="guiyi">归一化</el-link>-->
<!--            <el-link type="primary" style="margin-right: 30px" @click="biaozhun">标准化</el-link>-->
<!--            <el-link type="primary" style="margin-right: 20px" @click="bianhua">数据变化</el-link>-->
          <div style="margin-top: 10px">

            <el-card>
            <el-form ref="guiyiForm" :model="form" label-width="80px" v-if="guiyiShow">
              <el-form-item label="数据项">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="temp">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
                <el-input v-model="form.name" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item label="to">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
                <el-input v-model="form.name" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确 定</el-button>
                <el-button type="primary">保 存</el-button>
                <el-button >取 消</el-button>
              </el-form-item>
            </el-form>

            <el-form ref="guiyiForm" :model="form" label-width="80px" v-if="biaozhunShow">
              <el-form-item label="数据项">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确 定</el-button>
                <el-button type="primary">保 存</el-button>
                <el-button >取 消</el-button>
              </el-form-item>
            </el-form>

            <el-form ref="guiyiForm" :model="form" label-width="80px" v-if="bianhuaShow">
              <el-form-item label="数据项">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="temp">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item label="to">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确 定</el-button>
                <el-button type="primary">保 存</el-button>
                <el-button >取 消</el-button>
              </el-form-item>
              <el-form-item label="to">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item label="to">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
            </el-card>
          </div>
        </div>

        <el-card v-if="dataCutShow">
          <div style="margin-top: 10px">
            <el-form ref="guiyiForm" :model="form" label-width="80px">
              <el-form-item label="数据项">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间段">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item label="数据集">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item label="训练数据集名称">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item label="to">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="训练数据集名称">
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
                <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
              </el-form-item>
              <el-form-item label="to">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">确 定</el-button>
                <el-button >取 消</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-card>
      </div>

<!--数据切分-->
      <el-dialog
        :visible.sync="qiefenShow"
        fullscreen>

        <div>
          <el-form :model="form">
            <el-form-item label="训练数据集">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
            </el-form-item>
            <el-form-item label="训练数据集">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-input v-model="form.name" style="width: 200px;margin-right: 20px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">确 定</el-button>
              <el-button >取 消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

<!--      查看详情-->
      <el-dialog
        :visible.sync="searchShow"
        fullscreen>

        <div>
          <el-form :model="form">
            <el-form-item label="数据集名称" label-width="120px">
              <el-input  style="width: 500px;margin-right: 20px" v-model="searchDataSet"></el-input>
            </el-form-item>
            <el-form-item label="说明" label-width="120px">
              <el-input
                style="width: 500px"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 10px">
          <jtable  :tableData="tableData"
                   :columnData="columnData"
                   :selection="true">
          </jtable>
        </div>
      </el-dialog>


<!--      文件导入-->
      <el-dialog
        :visible.sync="fileImport"
        fullscreen>

        <div>
          <el-form :model="form">
            <el-form-item label="文件路径" label-width="120px">
              <el-input  style="width: 500px;margin-right: 20px" v-model="searchDataSet"></el-input>
            </el-form-item>
            <el-form-item label="数据集名称" label-width="120px">
              <el-input  style="width: 500px;margin-right: 20px" v-model="searchDataSet"></el-input>
            </el-form-item>
            <el-form-item label="说明" label-width="120px">
              <el-input
                style="width: 500px"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-form>
          <div style="margin-left: 120px">
            <el-button type="primary" @click="fileImport = false">确 定</el-button>
            <el-button @click="fileImport = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>

<!--      数据库导入-->
      <el-dialog
        :visible.sync="sqlImport"
        fullscreen>

        <div>
          <el-form :model="form">
            <el-form-item label="选择数据源" label-width="120px">
              <el-select v-model="dataType"  style="margin-right: 20px;width: 500px">
                <el-option
                  v-for="item in dataTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" label-width="120px">
              <el-input
                style="width: 500px"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
            <el-form-item label="数据集名称" label-width="120px">
              <el-input  style="width: 500px;margin-right: 20px" v-model="searchDataSet"></el-input>
            </el-form-item>
            <el-form-item label="" label-width="120px">
              <el-input
                style="width: 500px"
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-form-item>
          </el-form>
          <div style="margin-left: 120px">
            <el-button type="primary" @click="sqlImport = false">提 交</el-button>
            <el-button @click="sqlImport = false">退 出</el-button>
          </div>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="uploadShow" fullscreen>
        <el-form :model="form">
          <el-form-item label="文件路径" label-width="120px">
            <el-input  style="width: 500px;margin-right: 20px" v-model="searchDataSet"></el-input>
            <el-button type="primary" >浏览</el-button>
          </el-form-item>
          <el-form-item label="数据集名称" label-width="120px">
            <el-input  style="width: 500px;margin-right: 20px" v-model="searchDataSet"></el-input>
          </el-form-item>
          <el-form-item label="说明" label-width="120px">
            <el-input
              style="width: 500px"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    import jtable from '_c/Jtable'
    import datajson from './data'

    export default {
        data(){
            return {
                activeName:'first',
                uploadShow:false,
                qiefenShow:false,
                biaozhunShow:false,
                bianhuaShow:false,
                guiyiShow:false,
                guiyiForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                loading:false,
                Xselect:'',
                timeValue:'',
                juzhengShow:false,
                huizhiShow:false,
                jibenShow:false,
                dataResolveShow:false,
                dataFilterShow:true,
                dataCutShow:false,
                sqlImport:false,
                fileImport:false,
                form:{},
                searchShow:false,
                textarea:'',
                dataSet: '',
                searchDataSet:'',
                dataType: '',
                dataTypeOptions:[],
                columnData: { name: '数据集名称', explain: '说明', type: '类型', item: '记录条数',inputer:'操作人', creat: '创建时间'},
                tableData: [{
                    name: '数据集名称',
                    explain: '说明',
                    type: '类型',
                    item: '记录条数',
                    inputer:'操作人',
                    creat: '创建时间'
                }],
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleUploadShow(){
              this.uploadShow = true
            },
            handleSearchDetail(data){
              this.searchShow = data
            },
            guiyi(){
                this.guiyiShow = true
                this.biaozhunShow = false
                this.bianhuaShow = false
            },
            biaozhun(){
                this.guiyiShow = false
                this.biaozhunShow = true
                this.bianhuaShow = false
            },
            bianhua(){
                this.guiyiShow = false
                this.biaozhunShow = false
                this.bianhuaShow = true
            },
            dataResolveFun(){
                this.dataResolveShow = true
                this.dataFilterShow = false
                this.dataCutShow = false
            },
            dataFilterFun(){
                this.dataResolveShow = false
                this.dataFilterShow = true
                this.dataCutShow = false
            },
            dataCutFun(){
                this.dataResolveShow = false
                this.dataFilterShow = false
                this.dataCutShow = true
            },
            drawKIMG(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('KIMG'))
                // 绘制图表
                let getSign = (data, dataIndex, openVal, closeVal, closeDimIdx) => {
                    let sign;
                    if (openVal > closeVal) {
                        sign = -1;
                    }
                    else if (openVal < closeVal) {
                        sign = 1;
                    }
                    else {
                        sign = dataIndex > 0
                            // If close === open, compare with close of last record
                            ? (data[dataIndex - 1][closeDimIdx] <= closeVal ? 1 : -1)
                            // No record of previous, set to be positive
                            : 1;
                    }

                    return sign;
                }
                let generateOHLC = (count) => {
                    let data = [];

                    let xValue = +new Date(2011, 0, 1);
                    let minute = 60 * 1000;
                    let baseValue = Math.random() * 12000;
                    let boxVals = new Array(4);
                    let dayRange = 12;

                    for (let i = 0; i < count; i++) {
                        baseValue = baseValue + Math.random() * 20 - 10;

                        for (let j = 0; j < 4; j++) {
                            boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
                        }
                        boxVals.sort();

                        let idxRandom = Math.random();
                        let openIdx = Math.round(Math.random() * 3);
                        let closeIdx = Math.round(Math.random() * 2);
                        if (closeIdx === openIdx) {
                            closeIdx++;
                        }
                        let volumn = boxVals[3] * (1000 + Math.random() * 500);

                        // ['open', 'close', 'lowest', 'highest', 'volumn']
                        // [1, 4, 3, 2]
                        data[i] = [
                            this.$echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', xValue += minute),
                            +boxVals[openIdx].toFixed(2), // open
                            +boxVals[3].toFixed(2), // highest
                            +boxVals[0].toFixed(2), // lowest
                            +boxVals[closeIdx].toFixed(2),  // close
                            volumn.toFixed(0),
                            getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
                        ];
                    }

                    return data;

                }
                let upColor = '#ec0000';
                let upBorderColor = '#8A0000';
                let downColor = '#00da3c';
                let downBorderColor = '#008F28';

                let dataCount = 2e3;
                let data = generateOHLC(dataCount);

                let option = {
                    dataset: {
                        source: data
                    },
                    title: {
                        text: 'Data Amount: ' + this.$echarts.format.addCommas(dataCount)
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: false
                            },
                        }
                    },
                    grid: [
                        {
                            left: '10%',
                            right: '10%',
                            bottom: 200
                        },
                        {
                            left: '10%',
                            right: '10%',
                            height: 80,
                            bottom: 80
                        }
                    ],
                    xAxis: [
                        {
                            type: 'category',
                            scale: true,
                            boundaryGap : false,
                            // inverse: true,
                            axisLine: {onZero: false},
                            splitLine: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        },
                        {
                            type: 'category',
                            gridIndex: 1,
                            scale: true,
                            boundaryGap : false,
                            axisLine: {onZero: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            axisLabel: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        }
                    ],
                    yAxis: [
                        {
                            scale: true,
                            splitArea: {
                                show: true
                            }
                        },
                        {
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLabel: {show: false},
                            axisLine: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false}
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0, 1],
                            start: 10,
                            end: 100
                        },
                        {
                            show: true,
                            xAxisIndex: [0, 1],
                            type: 'slider',
                            bottom: 10,
                            start: 10,
                            end: 100,
                            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                            handleSize: '105%'
                        }
                    ],
                    visualMap: {
                        show: false,
                        seriesIndex: 1,
                        dimension: 6,
                        pieces: [{
                            value: 1,
                            color: upColor
                        }, {
                            value: -1,
                            color: downColor
                        }]
                    },
                    series: [
                        {
                            type: 'candlestick',
                            itemStyle: {
                                color: upColor,
                                color0: downColor,
                                borderColor: upBorderColor,
                                borderColor0: downBorderColor
                            },
                            encode: {
                                x: 0,
                                y: [1, 4, 3, 2]
                            }
                        },
                        {
                            name: 'Volumn',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            itemStyle: {
                                color: '#7fbe9e'
                            },
                            large: true,
                            encode: {
                                x: 0,
                                y: 5
                            }
                        }
                    ]
                };

                myChart.setOption(option);
                this.loading = false
            },
            drawJUXING(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('JUXING'))
                // 绘制图表
                myChart.showLoading();
                let diskData = datajson
                let dataconfig = (diskData) => {
                  myChart.hideLoading();
                  function colorMappingChange(value) {
                      var levelOption = getLevelOption(value);
                      chart.setOption({
                          series: [{
                              levels: levelOption
                          }]
                      });
                  }

                  var formatUtil = this.$echarts.format;

                  function getLevelOption() {
                      return [
                          {
                              itemStyle: {
                                  normal: {
                                      borderWidth: 0,
                                      gapWidth: 5
                                  }
                              }
                          },
                          {
                              itemStyle: {
                                  normal: {
                                      gapWidth: 1
                                  }
                              }
                          },
                          {
                              colorSaturation: [0.35, 0.5],
                              itemStyle: {
                                  normal: {
                                      gapWidth: 1,
                                      borderColorSaturation: 0.6
                                  }
                              }
                          }
                      ];
                  }
                  let option = null
                  myChart.setOption(option = {

                      title: {
                          text: 'Disk Usage',
                          left: 'center'
                      },

                      tooltip: {
                          formatter: function (info) {
                              var value = info.value;
                              var treePathInfo = info.treePathInfo;
                              var treePath = [];

                              for (var i = 1; i < treePathInfo.length; i++) {
                                  treePath.push(treePathInfo[i].name);
                              }

                              return [
                                  '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
                                  'Disk Usage: ' + formatUtil.addCommas(value) + ' KB',
                              ].join('');
                          }
                      },

                      series: [
                          {
                              name:'Disk Usage',
                              type:'treemap',
                              visibleMin: 300,
                              label: {
                                  show: true,
                                  formatter: '{b}'
                              },
                              itemStyle: {
                                  normal: {
                                      borderColor: '#fff'
                                  }
                              },
                              levels: getLevelOption(),
                              data: diskData
                          }
                      ]
                  });
                }
                dataconfig(diskData)
                // myChart.setOption(option);
            },
            jibenFun(){
                this.jibenShow = true
                this.huizhiShow = false
                this.juzhengShow = false
            },
            huizhiFun(){
                this.jibenShow = false
                this.huizhiShow = true
                this.juzhengShow = false
                this.loading= true
                // this.$nextTick(() => {
                //     this.drawKIMG()
                // })
                setTimeout(() =>{
                    this.drawKIMG()
                },500)
            },
            juzhengFun(){
                this.jibenShow = false
                this.huizhiShow = false
                this.juzhengShow = true
                setTimeout(() =>{
                    this.drawJUXING()
                },500)
            }
        },
        components: {
            jtable
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
