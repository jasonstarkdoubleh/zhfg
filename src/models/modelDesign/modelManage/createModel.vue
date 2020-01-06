<template>
  <a-spin :spinning="spinning" tip="训练中请等候..." size="large">
    <WorkMain :headerItems="['模型设计','模型管理','创建模型']" :outerFlag="false">
      <div class="allLayout_con">
        <div class="allLayout_conCj">
          <span>创建模型</span>
        </div>
        <a-row class="allCj_con">
          <a-col :span="24" class="allCj_conNam"><span>&emsp;模型名称: </span>
            <a-input style="width: 300px;" @change="newValue_first" placeholder="请输入内容" v-model="modelName"></a-input>
          </a-col>
          <a-col :span="24" class="allCj_conNam"><span>&emsp;&emsp;&emsp;描述: </span>
            <a-textarea @change="newValue_first" v-model="textareaCon"
                        style="width: 400px;vertical-align:top;resize: none;height: 10%;" autosize/>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam">
            <span>&emsp;自驱组织: </span>
            <a-tree-select style="width: 300px;" @change="newValue_first"
                           :dropdownStyle="{ maxHeight: '200px',overflow: 'auto'}" :treeData="treeData"
                           v-model="origin_id"></a-tree-select>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam">
            <span>&emsp;预测周期: </span>
            <a-select v-model="foreCastId" @change="newValue_first" class="inputWidth">
              <a-select-option :key="item.foreCastId" v-for="item in foreCast_type"
                               :value="item.foreCastId">{{ item.foreCastName }}
              </a-select-option>
            </a-select>
            <span class="left20">&emsp;预测类型: </span>
            <a-select v-model="val_code" @change="newValue_first" class="inputWidth">
              <a-select-option :key="item.val_code" v-for="item in yclx"
                               :value="item.val_code">{{ item.val_name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam">
            <span>训练数据集: </span>
            <a-select v-model="dataset_name" @change="trainDataSetChange" style="width: 400px;">
              <a-select-option :key="infoItem.dataset_id" v-for="infoItem in dataSetInfo"
                               :value="infoItem.dataset_id">{{ infoItem.dataset_name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam">
            <span>测试数据集: </span>
            <a-select v-model="dataset_name1" @change="testDataSetChangge" style="width: 400px;">
              <a-select-option :key="infoItem.dataset_id" v-for="infoItem in dataSetInfo"
                               :value="infoItem.dataset_id">{{ infoItem.dataset_name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam">
            <span>&emsp;时间索引: </span>
            <a-select v-model="yinVariable2" @change="variableSelectChange1" class="inputWidth">
              <a-select-option :key="index" v-for="(value,index) in VariableSelectItem"
                               :value="value">{{ value }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam"><span>&emsp;&emsp;因变量: </span>
            <a-select v-model="yinVariable" @change="variableSelectChange" class="inputWidth">
              <a-select-option :disabled="item.disabled" :key="index" v-for="(item,index) in VariableSelectItem2"
                               :value="item.value">{{ item.value }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="24" style="margin-left: 10%;">
          <span v-if="datasetModel=='GRU'||datasetModel=='LSTM'||datasetModel=='BP'">
            <span class="left10" style="width: 50px;display: inline-block;"><i
              style="color: red;font-style: normal;font-size: 12px;">(归一化)</i>最小值: </span>
            <a-input style="width: 150px;" @change="newValue" v-model="y_minimum" placeholder="请输入内容"></a-input>
            <span class="left10" style="width: 50px;display: inline-block;"><i
              style="color: red;font-style: normal;font-size: 12px;">(归一化)</i>最大值: </span>
            <a-input style="width: 150px;" @change="newValue" v-model="y_maximum" placeholder="请输入内容"></a-input>
          </span>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col class="allCj_conNam">
            <span>&emsp;&emsp;自变量: </span>
            <a-select mode="multiple" v-model="yinVariable1" :maxTagCount="1" :allowClear="isClear" class="inputWidth"
                      placeholder="请选择" @select="equipmentNameSelect" @deselect="unequipmentNameSlect">
              <a-select-option :disabled="item.disabled" :key="index" v-for="(item,index) in VariableSelectItem1"
                               :value="item.value">{{ item.value }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="24">
          <span v-if="datasetModel=='GRU'||datasetModel=='LSTM'||datasetModel=='BP'">
              <p v-for="(items,index) in template1"><span
                style="display: inline-block;width: 10%;text-align: right;">{{items.valie_name}}</span>
                <span class="left10" style="width: 50px;display: inline-block;"><i
                  style="color: red;font-style: normal;font-size: 12px;">(归一化)</i>最小值: </span>
                <a-input style="width: 150px;" @change="newValue" v-model="items.value_minName"
                         placeholder="请输入内容"></a-input>
                <span class="left10" style="width: 50px;display: inline-block;"><i
                  style="color: red;font-style: normal;font-size: 12px;">(归一化)</i>最大值: </span>
                <a-input style="width: 150px;" @change="newValue" v-model="items.value_maxName"
                         placeholder="请输入内容"></a-input>
              </p>
          </span>
          </a-col>
        </a-row>
        <a-row class="allCj_con">
          <a-col :span="10" class="allCj_conNam">
            <span>&emsp;算法类型: </span>
            <a-select @change="datasetChange" v-model="datasetModel" style="min-width: 150px;" placeholder="请选择">
              <a-select-option :key="typeItem.name" v-for="typeItem in datasetType"
                               :value="typeItem.name">{{ typeItem.value }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col v-if="datasetModel!=''" :span="24" style="margin-top: 10px;font-size: 16px;font-weight: bold;">参数配置：
          </a-col>
          <a-col :span="24" class="allCj_conNamCs">
            <p v-for="(items,index) in dataset_change" :key="index"><span
              style="text-align: right;display: inline-block;width: 44%;">{{items.name}}:
              <template v-if="items.type=='int'">
                <a-input class="inputWidth1" @change="newValue" v-model="items.default"></a-input>
              </template>
              <template v-if="items.type=='float'">
                <a-input class="inputWidth1" @change="newValue" v-model="items.default"></a-input>
              </template>
              <template v-if="items.type=='str'">
                <a-input class="inputWidth1" @change="newValue" v-model="items.default"></a-input>
              </template>
              <template v-if="items.type=='list'">
                <a-select class="inputWidth" @change="newValue" placeholder="请选择" v-model="items.default">
                  <a-select-option :key="key" v-for="(itemList ,key) in items.vals"
                                   :value="itemList">{{ itemList }}
                  </a-select-option>
                </a-select>
              </template></span><span
              style="text-align: left;display: inline-block;width: 55%;margin-left: 10px;">({{items.description}})</span>
            </p>
          </a-col>
        </a-row>
        <a-row style="margin-top: 20px;">
          <a-button @click="training" :size="size" icon="check-circle" type="primary">训练</a-button>
          <a-button @click="saveing" style="margin:0 20px;" :size="size" icon="diff" type="primary">保存</a-button>
          <a-button @click="$router.go(-1)" icon="left" :size="size">返回</a-button>
        </a-row>
        <div v-show="foreCastFlag == 1">
          <div class="allLayout_conCj" style="margin-top: 20px;">
            <span>预测</span>
          </div>
          <el-row style="margin-top: 20px;">
            <!--表格区-->
            <a-col :span="7" class="left10">
              <span style="margin: 0 0 16px 0;line-height: 42px; display: inline-block;">训练集偏差值：</span>
              <a-table bordered style="width: 100%;"
                       :dataSource="tableData_train" :pagination="false">
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
          <div style="border:1px #e7ebee dashed;margin-top:20px;"></div>
          <el-row style="margin-top: 20px;">
            <!--表格区-->
            <a-col :span="7" class="left10">
              <span style="margin: 0 0 16px 0;line-height: 42px; display: inline-block;">测试集偏差值：</span>
              <a-table bordered style="width: 100%;"
                       :dataSource="tableData_test" :pagination="false">
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
              <div id="testAtlas" style="width: 750px;height: 328px;" class="inlineBlock left10"></div>
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
        tableArr: '',
        tableObj: '',
        tableList: '',
        tableData_train: [],
        tableData_test: [],
        size: 'default',
        length: 0,
        dataset_change: [],//参数配置
        dataset_changeList: [],//参数配置的下拉框
        origin_id: '',//自驱组织id
        treeData: [],//自驱组织树
        foreCast_type: [],//预测周期下拉
        dataset_type: [],//算法
        datasetType: [],
        foreCastId: '',//所选择的预测周期
        dataSetInfo: [],//数据集下拉
        trainDataSetId: '',//训练数据集ID
        testDataSetId: '',//测试训练集ID
        VariableSelectItem: [],//自变量，因变量下拉数据
        VariableSelectItem1: [],
        VariableSelectItem2: [],
        yinVariable: '',
        datasetModel: '',
        yinVariable1: [],
        template1: [],
        yinVariable2: '',
        isClear: false,
        foreCastFlag: 0,
        yclx: [],//预测类型
        val_code: '',//所选择的预测类型
        value: '',
        modelName: '',
        textareaCon: '',
        dataset_name: '',
        dataset_name1: '',
        y_maximum: '',
        y_minimum: '',
        itemList: '',
        indexValue: [],
        index_values: [],
        userName: '',
        setDataZi: [],
        spinning: false,
        response: ''
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
      newValue(val) {
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = []
          this.tableData_test = []
          this.index_values = []
          this.indexValue = []
        }
      },
      newValue_first(val) {
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = []
          this.tableData_test = []
          this.index_values = []
          this.indexValue = []
        }
      },
      yclxliebiao() {
        const $this = this
        let params = {}
        this.BaseRequest({
          url: '/calculation/selectglobalcodeyclx',
          method: 'get',
          params: params
        }).then(response => {
          this.yclx = response.dataList
        })
      },
      getForeCastType() {
        this.BaseRequest({
          url: 'modelManage/getForeCastList',
          method: 'post',
        }).then(response => {
          this.foreCast_type = response;
          this.foreCast_type.splice(0, 1);
        })
      },
      getArithmetic() {
        this.Request({
          url: 'model/get_algorithm_list',
          method: 'post',
        }).then(response => {
          console.log(response)
          this.dataset_type = response.algorithm_list;
          console.log(response)
          for (var i in this.dataset_type) {
            var template = {}
            template.name = i
            template.value = this.dataset_type[i]
            this.datasetType.push(template)
          }
        })
      },
      datasetChange(val) {
        this.index_values = []
        this.indexValue = []
        // this.y_minimum=''
        // this.y_maximum=''
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = []
          this.tableData_test = []
        }
        this.Request({
          url: 'model/get_parameter_list',
          method: 'post',
          data: {"algorithm": val}
        }).then(response => {
          this.dataset_change = response.parameter_list
        })
      },
      getDataSetInfo() {
        this.BaseRequest({
          url: 'modelManage/getDataSetData',
          method: 'get',
        }).then(response => {
          this.dataSetInfo = response;
        })
      },
      getVariableSelected(dataSetId) {//调用python接口获得自变量和因变量下拉
        this.Request({
          url: "dataset/get_columns",
          method: 'post',
          data: {"dataset_id": dataSetId}
        }).then(response => {
          this.VariableSelectItem = response.columns//时间索引
          response.columns.forEach(item => {//自变量
            const data = {
              value: item,
            }
            this.VariableSelectItem1.push(data)
          })
          response.columns.forEach(item => {//因变量
            const data = {
              value: item
            }
            this.VariableSelectItem2.push(data)
          })

        });
      },
      variableSelectChange(value) {
        if (this.yinVariable1) {
          this.yinVariable1.map((item, index) => {
            if (value == item) {
              this.yinVariable1.splice(index, 1)
            }
          })
        }
        if (value) {
          this.template1 = []
          this.yinVariable1 = []
          this.VariableSelectItem1.map(item => {
            if (value == item.value) {
              item.disabled = true
            } else if (this.yinVariable2 == item.value) {
              item.disabled = true
            } else {
              item.disabled = false
            }
          })
        }
      },
      removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
      },
      equipmentNameSelect(value) {
        const data = {
          valie_name: value,
          value_maxName: null,
          value_minName: null
        }
        this.template1.push(data)
      },
      unequipmentNameSlect(val) {
        let target = this.template1.find((item) => item.valie_name == val);
        this.removeByValue(this.template1, target);
      },
      trainDataSetChange(val) {
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = []
          this.tableData_test = []
        }
        this.trainDataSetId = val;
        this.getVariableSelected(val);
        this.yinVariable = ''
        this.yinVariable2 = ''
        this.yinVariable1 = []
        this.VariableSelectItem2 = []
        this.VariableSelectItem = []
        this.VariableSelectItem1 = []
        this.template1 = []
        this.y_minimum = ''
        this.y_maximum = ''
        this.index_values = []
        this.indexValue = []
      },
      variableSelectChange1(value) {
        if (value) {
          this.foreCastFlag = 0;
          this.tableData_train = []
          this.tableData_test = []
          this.VariableSelectItem2.map(item => {
            if (value == item.value) {
              item.disabled = true
            } else {
              item.disabled = false
            }
          })
        }
        this.yinVariable = ''
        this.yinVariable1 = []
        this.template1 = []
        this.y_minimum = ''
        this.y_maximum = ''
        this.index_values = []
        this.indexValue = []
      },
      testDataSetChangge(val) {
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = []
          this.tableData_test = []
        }
        this.testDataSetId = val;
      },
      getBack() {
        this.foreCastFlag = 0;
      },
      saveing() {
        if (this.foreCastFlag == 0) {
          this.Message.warning('请先训练!');
        } else {
          var modelId = this.response.result.model_id
          this.Request({
            url: "model/model_save",
            method: 'post',
            data: {"model_id": modelId},
          }).then(response => {
            if (response.msg == "Success") {
              this.Message.success('保存成功!');
              this.$router.go(-1);
            } else {
              this.Message.error('保存失败!');
            }
          });
        }

      },
      training() {
        this.BaseRequest({
          url: 'sys/user/getUserInfo',
          method: 'get',
        }).then(response => {
          this.userName = response.user_name
        })
        if (this.modelName == '' || this.origin_id == '' || this.foreCastId == '' || this.val_code == '' || this.datasetModel == '' || this.dataset_name == '' || this.dataset_name1 == '' || this.yinVariable == '' || this.yinVariable1 == []) {
          this.$message.warning('请输入内容');
        } else {
          for (var i = 0; i < this.template1.length; i++) {
            this.indexValue.push(parseInt(this.template1[i].value_minName), parseInt(this.template1[i].value_maxName))
          }
          for (var j = 0; j < this.indexValue.length; j += 2) {
            this.index_values.push(this.indexValue.slice(j, j + 2))
          }
          this.spinning = true
          var yinVariable1 = JSON.stringify(this.yinVariable1)
          var dataMap = {
            props: {},
            Set: function (key, value) {
              this.props[key] = value
            },
            Get: function (key) {
              return this.props[key]
            },
            Contains: function (key) {
              return this.props[key] == null ? false : true
            },
            Remove: function (key) {
              delete this.props[key]
            }
          }
          for (var i in this.dataset_change) {
            if (this.dataset_change[i].type == 'list') {
              dataMap.Set(this.dataset_change[i].name, this.dataset_change[i].default);
            } else if (this.dataset_change[i].type == 'float') {
              dataMap.Set(this.dataset_change[i].name, parseFloat(this.dataset_change[i].default));
            } else {
              dataMap.Set(this.dataset_change[i].name, parseInt(this.dataset_change[i].default));
            }
          }
          console.log(this.index_values)
          var setDatas_para = [{
            "normalization": [
              [parseInt(this.y_minimum), parseInt(this.y_maximum)],
              this.index_values
            ]
          }]
          this.tableObj = dataMap.props
          this.tableObj = JSON.stringify(this.tableObj);
          this.tableObj = this.tableObj.substring(1, this.tableObj.length - 1)
          this.tableArr = JSON.stringify(setDatas_para);
          this.tableArr = this.tableArr.substring(1, this.tableArr.length - 1)
          this.tableArr = this.tableArr.substring(1, this.tableArr.length - 1)
          console.log(this.tableObj)
          console.log(this.tableArr)
          if (this.y_minimum != '') {
            this.tableList = "{" + this.tableObj + ',' + this.tableArr + "}"
          } else if (this.tableObj == '') {
            this.tableList = "{" + this.tableArr + "}"
          } else if (this.tableObj == '' && this.y_minimum == '') {
            this.tableList = "{" + "}"
          } else {
            this.tableList = "{" + this.tableObj + "}"
          }

          var setDatas = {
            "model_name": this.modelName,//模型名称
            "description": this.textareaCon,//描述
            "org_id": this.origin_id,//组织id
            "operator": this.userName,//操作者
            "predict_time_type": this.foreCastId,//预测周期id
            "predict_type": this.val_code,//预测类型id
            "algorithm_name": this.datasetModel,//配置类型
            "train_dataset_id": this.dataset_name,//训练数据集
            "test_dataset_id": this.dataset_name1,//测试数据集
            "dependent_var": this.yinVariable,//因变量
            "independent_var_list": yinVariable1,//自变量
            "date_index": this.yinVariable2,//时间索引
            "parameters": this.tableList
          }
          console.log(setDatas)
          this.Request({
            url: "model/model_train",
            method: 'post',
            data: setDatas
          }).then(response => {
            console.log(response)
            if (response.code == '-1') {
              this.spinning = false
              this.foreCastFlag = 0
              this.Message.error('训练失败!');
            }else if(response.resultData==''){
              this.spinning=false
              this.foreCastFlag=0
              this.Message.error('训练失败!');
            }else{
              this.Message.success('训练成功!');
              this.spinning = false
              this.response = response
              this.foreCastFlag = 1
              var chart1_train1 = response.result.train_charts[0]
              var chart1_train2 = response.result.train_charts[1]
              var chart2_test1 = response.result.test_charts[0]
              var chart2_test2 = response.result.test_charts[1]
              var tableData_train1 = response.result.train_coefficients
              var tableData_test1 = response.result.test_coefficients
              this.tableData_train = []
              for (var key in tableData_train1) {
                var data = {}
                data.value = tableData_train1[key].toFixed(2);
                data.name = key;
                this.tableData_train.push(data)
                if (key == 'R2') {
                  data.value = tableData_train1[key].toFixed(4)
                } else if (key == 'MAPE') {
                  data.value = tableData_train1[key].toFixed(4)
                } else {
                  data.value = tableData_train1[key].toFixed(2);
                }
              }
              this.tableData_test = []
              for (var i in tableData_test1) {
                var data = {}
                data.value = tableData_test1[i].toFixed(2);
                data.name = i;
                this.tableData_test.push(data)
                if (i == 'R2') {
                  data.value = tableData_test1[i].toFixed(4)
                } else if (i == 'MAPE') {
                  data.value = tableData_test1[i].toFixed(4)
                } else {
                  data.value = tableData_test1[i].toFixed(2);
                }
              }
              var chart1Train_data = []
              var chart1Train_val = []
              for (var i in chart1_train1) {
                chart1Train_val.push(chart1_train1[i].toFixed(2))
                chart1Train_data.push(i)
              }
              var chart1Train_val1 = []
              for (var i in chart1_train2) {
                chart1Train_val1.push(chart1_train2[i].toFixed(2))
              }
              this.chart1(chart1Train_data, chart1Train_val, chart1Train_val1)
              var chart1Test_data = []
              var chart1Test_val = []
              for (var i in chart2_test1) {
                chart1Test_val.push(chart2_test1[i].toFixed(2))
                chart1Test_data.push(i)
              }
              var chart1Test_val1 = []
              for (var i in chart2_test2) {
                chart1Test_val1.push(chart2_test2[i].toFixed(2))
              }
              this.chart2(chart1Test_val, chart1Test_data, chart1Test_val1)
            }
          });
        }
      },
      chart1(chart1Train_data, chart1Train_val, chart1Train_val1) {
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
              return value.min;
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
      },
      chart2(chart1Test_val, chart1Test_data, chart1Test_val1) {
        var chartsBar_left = echarts.init(document.getElementById('testAtlas'));
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
            data: chart1Test_data
          }],
          yAxis: [{
            type: 'value',
            min: function (value) {
              return value.min;
            },
            max: function (value) {
              return value.max;
            }
          }],
          series: [{
            name: '预测量',
            type: 'line',
            data: chart1Test_val,
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }, {
            name: '实际量',
            type: 'line',
            data: chart1Test_val1,
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
      this.chart1();
      this.chart2();
      this.yclxliebiao();//预测类型
      this.getForeCastType();//预测周期
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .allLayout_con {
    .clear {
      clear: both;
    }
    padding: 10px;
    text-align: left;
    /*background: #f2f5f7;*/
    .allLayout_conCj {
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      padding-left: 10px;
      border-bottom: 1px #f0f0f1 dashed;
    }
    .allCj_con {
      .allCj_conNam {
        margin: 15px 0 0 0;
      }
      .allCj_conNamCs {
        text-align: right;
        .inputWidth1 {
          width: 300px;
        }
        .inputWidth {
          width: 300px;
        }
      }
      .inputWidth {
        width: 150px;
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
    margin: 20px 0 10px
  }

  .dynamicDiv {
    .inputWidth1 {
      width: 29%;
    }
    margin-top: 10px;
    /*text-align: right;*/
  }
</style>
<style lang="scss">
  .ant-spin-nested-loading > div > .ant-spin {
    max-height: 100% !important;
  }
</style>
