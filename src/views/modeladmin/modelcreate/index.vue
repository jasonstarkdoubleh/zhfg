<template>
  <div style="margin-top: -10px">

    <div style="height: 34px">
      <el-button-group style="float: right">
        <el-button size="small" @click="handleCreateModel">创建模型</el-button>
        <el-button size="small" @click="handleContrast">模型对比</el-button>
      </el-button-group>
    </div>

    <jtable  :tableData="tableData"
             :columnData="columnData"
             :searchShow="true"
             style="margin-top: 10px">

<!--  模型创建-->
      <div>

        <el-card>
          <div class="flex bgc">
            <div>
              <span>商品名称:</span>
              <el-select v-model="goodsName" placeholder="请选择" size="small">
                <el-option
                  v-for="item in goodsNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="flex bgc">
            <div>
              <span>模型名称:</span>
              <el-input style="width: 300px;margin-right: 20px" v-model="modelName" size="small"></el-input>
              <span>算法:</span>
              <el-select v-model="goodsName" placeholder="请选择" size="small" style="margin-right: 20px">
                <el-option
                  v-for="item in goodsNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>预测类型:</span>
              <el-select v-model="goodsName" placeholder="请选择" size="small" style="margin-right: 30px">
                <el-option
                  v-for="item in goodsNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-button type="primary" style="margin-right: 10px">查 询</el-button>
              <el-button>重 置</el-button>
            </div>
          </div>
        </el-card>


      </div>

    </jtable>

    <el-dialog title="模型创建" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="模型名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="数据集" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="训练数据集" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="测试数据集" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="因变量" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自变量" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px">
        算法选型
      </div>
      <hr>
      <div style="margin-top: 20px">
        算法选型:
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </div>
      <div style="margin-top: 20px">
        参数配置:
        <div style="margin-top: 5px">
          timesteps:<el-input v-model="form.name" autocomplete="off"></el-input>
        </div>
        <div style="margin-top: 5px">
          n_neur:<el-input v-model="form.name" autocomplete="off"></el-input>
        </div>
        <div style="margin-top: 5px">
          batch_size:<el-input v-model="form.name" autocomplete="off"></el-input>
        </div>
        <div style="margin-top: 5px">
          epochs:<el-input v-model="form.name" autocomplete="off"></el-input>
        </div>
        <div style="margin-top: 5px">
          train_ratio:<el-input v-model="form.name" autocomplete="off"></el-input>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-button type="primary" @click=handleTrain>训 练</el-button>
        <el-button @click="dialogFormVisible = false">保 存</el-button>
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
      <div v-if="yuceShow" style="margin-top: 30px">
        <el-card class="box-card">
          <div slot="header">
            <span>预测</span>
          </div>
          <div style="display: flex;justify-content: space-between">
            <div style="width: 48%">
              <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="误差平方">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="绝对误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="均方误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="均方根误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="平均绝对误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="方差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标准差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="平均系数">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-form>
            </div>

            <div style="width: 48%">
              <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="误差平方">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="绝对误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="均方误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="均方根误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="平均绝对误差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="方差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标准差">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="平均系数">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div style="display: flex;justify-content: space-between">
            <div id="xunlianOne" style="height: 400px;width: 48%"></div>
            <div id="xunlianTwo" style="height: 400px;width: 48%"></div>
          </div>
        </el-card>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="contrastShow" fullscreen>
      <div style="padding: 10px">
        <el-form ref="form" :model="contrastForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="contrastForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-radio-group v-model="contrastForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模型名称">
            <el-checkbox-group v-model="contrastForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="contrastForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="数据集">
            <el-select v-model="contrastForm.region">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">模型对比</el-button>
            <el-button>返回</el-button>
          </el-form-item>
        </el-form>

        <div style="margin-top: 20px" v-if="yuceContrastShow">
          <div style="width: 100%;height: 500px" id="YUCEJIEGUO"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    export default {
        data(){
            return {
                yuceContrastShow:false,
                contrastForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                contrastShow:false,
                modelName:'',
                goodsName:'',
                goodsNameOptions:[],
                predictionTime: '',                           //预测时间段
                predictionName:'',                          //预测名称
                yuceShow:false,
                dialogFormVisible: false,
                columnData: { name: '数据集名称', explain: '说明', type: '类型', item: '记录条数',inputer:'操作人', creat: '创建时间'},
                tableData: [{
                    name: '数据集名称',
                    explain: '说明',
                    type: '类型',
                    item: '记录条数',
                    inputer:'操作人',
                    creat: '创建时间'
                }],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        components:{
            jtable
        },
        methods:{
            onSubmit() {
                this.yuceContrastShow = true
                this.$nextTick(() => {
                    this.drawYUCE()
                })
            },
            drawYUCE(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('YUCEJIEGUO'))
                // 绘制图表
                let option = {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        show:true,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            handleContrast(){
                this.contrastShow = true
            },
            handleTrain(){
                this.yuceShow = true
                this.$nextTick(() => {
                    this.drawXunlianOne();
                    this.drawXunlianTwo();
                })
            },
            handleCreateModel(){
                this.dialogFormVisible = true
            },
            drawXunlianOne(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('xunlianOne'))
                // 绘制图表
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        show:true,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            drawXunlianTwo(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('xunlianTwo'))
                // 绘制图表
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        show:true,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
