<template>
  <a-spin :spinning="spinning" tip="预测中请等候..." size="large">
  <WorkMain :headerItems="['模型设计','模型管理','预测模型']" :outerFlag="false">
    <div class="allLayoutCon">
      <div class="allLayout_conCj">
        <span>预测模型</span>
      </div>
      <a-row class="allCj_con">
        <a-col :span="24" class="allCj_conNam">
          <span class="left20">模型名称：</span>
          <a-input style="width: 300px;" disabled v-model="model_name"></a-input>
          </a-col>
        <a-col :span="24" class="allCj_conNam">
          <span class="left20">&emsp;&emsp;描述：</span>
          <a-textarea style="width: 400px;vertical-align:top;resize: none;height: 10%;" autosize disabled v-model="description" /></a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col :span="24" >
          <span class="left20">预测周期：</span>
          <a-select class="allCj_conNam" style="width: 150px;"  v-model="predictTimeType" disabled>
            <a-select-option :key="item.foreCastId" v-for="item in foreCast_type"
                             :value="item.foreCastId">{{ item.foreCastName }}
            </a-select-option>
          </a-select>
          <span class="left20">预测类型：</span>
          <a-select class="allCj_conNam" style="width: 150px;"  v-model="predictTimeType" disabled>
            <a-select-option :key="item.foreCastId" v-for="item in foreCast_type"
                             :value="item.foreCastId">{{ item.foreCastName }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="24" class="allCj_conNam">
          <span class="left30">数据集：</span>
          <a-select style="width: 300px;" v-model="dataset_name"  @change="testDataSetChangge" >
            <a-select-option  :key="infoItem.dataset_id" v-for="infoItem in dataSetInfo"
                            :value="infoItem.dataset_id">{{ infoItem.dataset_name }}
            </a-select-option>
        </a-select>
      </a-col>
      </a-row>
      <a-row style="margin-top: 20px;">
        <a-button @click="forecast" :size="size"  icon="check-circle" type="primary">预测</a-button>
        <a-button @click="$router.go(-1)" class="left20" icon="left" :size="size">返回</a-button>
      </a-row>
      <div v-show="foreCastFlag == 1">
        <el-row style="margin-top: 20px;">
        <!--表格区-->
          <a-col :span="7" class="left10">
            <span style="margin: 0 0 16px 0;line-height: 42px; display: inline-block;">评估系数</span>
              <a-table bordered style="width: 100%;" :dataSource="tableData_train" :pagination="false">
                <a-table-column
                  dataIndex="name"
                  align="left"
                  title="名称">
                </a-table-column>
                <a-table-column
                  dataIndex="value"
                  align="left"
                  title="值">
                </a-table-column>
              </a-table>
            </a-col>
            <a-col :span="12">
              <div id="trainAtlas" style="width: 750px;height: 328px;" class="inlineBlock left10"></div>
            </a-col>
          </el-row>
        </div>
      </div>
  </WorkMain>
  </a-spin>
</template>

<script>
  import WorkMain from '@/models/public/WorkMain'
  import {required} from 'vuelidate/lib/validators'
  import "@/styles/general.scss"
  import AInput from "ant-design-vue/es/input/Input";
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import AButton from "ant-design-vue/es/button/button";
  import echarts from 'echarts';
  export default {
    name: 'createModel',
    data() {
      return {
        size:'default',
        dataset_name:'',
        tableData_train:[],
        dataset_change:[],//参数配置
        dataset_changeList:[],//参数配置的下拉框
        origin_id: '',//自驱组织id
        treeData: [],//自驱组织树
        foreCast_type: [],//类型下拉
        datasetType:[],
        foreCastId: '',//所选择的预测类型
        dataSetInfo: [],//数据集下拉
        yinVariable: '',
        datasetModel:'',
        yinVariable1:[],
        isClear:false,
        foreCastFlag: 0,
        value:'',
        aaa:false,
        model_id:'',
        model_name:'',
        disabled:'',
        description:'',
        predictTimeType:'',
        spinning:false,
      }
    },
    validations: {},
    computed: {},
    components: {
      AButton,
      ATextarea,
      AInput,
      WorkMain
    },
    methods: {
      getForeCastType() {
        this.BaseRequest({
          url: 'modelManage/getForeCastList',
          method: 'post',
        }).then(response => {
          this.foreCast_type = response;
          this.foreCast_type.splice(0,1);
        })
      },
      getArithmetic() {
        this.Request({
          url: 'model/get_algorithm_list',
          method: 'post',
        }).then(response => {
          this.dataset_type = response.algorithm_list;
          for(var i in this.dataset_type){
            this.datasetType.push(this.dataset_type[i])
          }
        })
      },
      datasetChange(val){
        this.Request({
          url: 'model/get_parameter_list',
          method: 'post',
          data:{"algorithm":val}
        }).then(response => {
          this.dataset_change=response.parameter_list
          for(var i=0;i<this.dataset_change.length;i++){
            if(this.dataset_change[i].type=='list'){
              this.dataset_changeList=this.dataset_change[i].vals
            }

          }
        })
      },
      getDataSetInfo(){
        this.BaseRequest({
          url: 'modelManage/getDataSetData',
          method: 'get',
        }).then(response => {
          this.dataSetInfo = response;
        })
      },
      getVariableSelected(dataSetId){//调用python接口获得自变量和因变量下拉
        this.Request({
          url: "dataset/get_columns",
          method: 'post',
          data: {"dataset_id": dataSetId}
        }).then(response => {
          this.VariableSelectItem = response.columns;
          response.columns.forEach(item=>{
            const data={
              value:item
            }
            this.VariableSelectItem1.push(data)
          })
        });
      },
      variableSelectChange(value){
        if(this.yinVariable1){
          this.yinVariable1.map((item,index)=>{
            if(value==item){
              this.yinVariable1.splice(index,1)
            }
          })
        }
        if(value){
          this.VariableSelectItem1.map(item=>{
            if(value==item.value){
              item.disabled=true
            }else{
              item.disabled=false
            }
          })
        }
      },
      trainDataSetChange(val){
        this.trainDataSetId = val;
        this.getVariableSelected(val);
        this.yinVariable=''
        this.yinVariable1=[]
        this.VariableSelectItem=[]
        this.VariableSelectItem1=[]
      },
      testDataSetChangge(val){
        if(val){
          this.foreCastFlag=0;
          this.tableData_train=[]
        }
      },
      getBack(){
        this.foreCastFlag = 0;
      },
      forecast(){
        this.spinning=true
        if(this.dataset_name==''){
          this.$message.warning('请选择数据集');
        }else{
          this.Request({
          url: "model/model_predict",
          method: 'post',
          data:{'model_id':this.model_id,'dataset_id':this.dataset_name}
        }).then(response => {
          if(response.code == 0){
          this.Message.success('预测成功!');
            this.spinning=false
            this.foreCastFlag = 1;
            var chart1_train1=response.result.test_charts[0]
            var chart1_train2=response.result.test_charts[1]
            var tableData_train1=response.result.test_coefficients
            this.tableData_train=[]
            for (var key in tableData_train1) {
              var data={}
              if(key=='R2'){
                data.value = tableData_train1[key].toFixed(4)
              }else if(key=='MAPE'){
                data.value = tableData_train1[key].toFixed(4)
              }else{
                data.value = tableData_train1[key].toFixed(2);
              }
              data.name =key;
              this.tableData_train.push(data)
            }
            var chart1Train_data=[]
            var chart1Train_val=[]
            for(var i in chart1_train1){
              chart1Train_val.push(chart1_train1[i].toFixed(2))
              chart1Train_data.push(i)
            }
            var chart1Train_val1=[]
            for(var i in chart1_train2){
              chart1Train_val1.push(chart1_train2[i].toFixed(2))
            }
            this.chart1(chart1Train_data,chart1Train_val,chart1Train_val1)
            }else{
//              this.Message.error('预测失败!');
            this.spinning=false
            this.$warning({
              title: response.msg,
              content: response.log,
            });
            }

        })
      }
    },
    chart1(chart1Train_data,chart1Train_val,chart1Train_val1){
        var chartsBar_left = echarts.init(document.getElementById('trainAtlas'));
        var option = {
            color: ['#e062ae', '#62c6e9'],
            title: {
              text: '单位：万方',
              textStyle: { //设置主标题风格
                color: '#4f98d3',//设置主标题字体颜色
                fontSize: '16',
              },
              left: '3%',
              top: '10px'
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                if (params.length == 1) {
                  let values = params[0].value;
                  if (!params[0].value) {
                    values = '';
                  }
                  return '日期：' + params[0].name + '<br/>' + params[0].marker + params[0].seriesName + ':' + values;
                } else {
                  let res = [];
                  var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ed9e7d"></span>'
                  let offset = (((params[0].value - params[1].value) / params[1].value) * 100).toFixed(2) + '%';
                  if (!params[0].value) {
                    res[0] = params[0].seriesName + ':' + '';
                    offset = '';
                  } else {
                    res[0] = params[0].seriesName + ':' + params[0].value
                  }
                  if (!params[1].value) {
                    res[1] = params[1].seriesName + ':' + '';
                    offset = '';
                  } else {
                    res[1] = params[1].seriesName + ':' + params[1].value
                  }
                  return '日期：' + params[0].name + '<br/>' + params[0].marker + res[0] + '<br/>' + dotHtml + '偏差率' + ':' + offset + '<br/>' + params[1].marker + res[1];
                }
              }
            },
            legend: {
              right: '10%',
              top: '10px',
              data: ['预测量', '实际量']
            },
            dataZoom: [{
              type: 'inside',
              throttle: 50,
            }],
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: chart1Train_data
            }],
            yAxis: [{
              type: 'value',
              min: function (value) {
                return value.min - 5;
              },
              max: function (value) {
                return value.max;
              }
            }],
            series: [{
              name: '预测量',
              type: 'line',
              data: chart1Train_val,
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }, {
              name: '实际量',
              type: 'line',
              data: chart1Train_val1,
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }]
        };
      chartsBar_left.setOption(option)
      }
    },
    mounted() {
      this.chart1()
      var targetParam = this.$route.query.targerParam;
      this.model_id = targetParam[0].model_id;
      this.model_name = targetParam[0].model_name;
      this.description = targetParam[0].description;
      this.predictTimeType = targetParam[0].predictTimeType;
      if(this.model_id==''){
        this.$router.go(-1);
      }
      this.getForeCastType();//预测类型
      this.getDataSetInfo();//数据集信息
      this.getArithmetic();//算法
      const $this = this
      this.BaseRequest({
        url: "GasForeCast/getOriginDatas",
        method: 'get',
      }).then(response => {
        $this.treeData = response.orgTree;
        $this.origin_id = response.orgId;
      });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
.ant-table-thead > tr > th{
    padding: 10px!important;
    background: #f6f5f5;
    font-weight: bolder;
    font-size: 12px;
}
 .ant-table-tbody > tr > td{
    padding: 10px!important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .allLayoutCon{
    padding: 10px;
    text-align: left;
    /*background: #f2f5f7;*/
    .allLayout_conCj{
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      padding-left: 10px;
      border-bottom: 1px #f0f0f1 dashed;
    }
    .allCj_con{
      .allCj_conNam{
        margin: 15px 0 0 0;
      }
      .allCj_conNamCs{
        text-align:right;
        width: 37.6%;
        .inputWidth1{
          width: 66%;
        }
        .inputWidth{
          width: 66%;
        }
      }
      .inputWidth{
        width:64%;
      }
    }
  }

  .topButtonGroup {
    padding: 15px 0 0;
  }
  .indent1 {
    text-indent: 1em;
  }

  .indent2 {
    text-indent: 2em;
  }

  .indent3 {
    text-indent: 3em;
  }

  .indent4 {
    text-indent: 4em;
  }

  .dividerStyle {
    margin: 20px 0 10px;
  }

  .dynamicDiv {
    .inputWidth1{
      width: 29%;
    }
    margin-top: 10px;
  }
  .tableBox{
     margin-top:30px;
     margin-bottom:25px;
  }
</style>
