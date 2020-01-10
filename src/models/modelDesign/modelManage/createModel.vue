<template>
  <a-spin :spinning="spinning" tip="训练中请等候..." size="large">
    <div class="allLayout_con">
      <div class="allLayout_conCj">
        <span>创建模型</span>
      </div>
      <a-row class="allCj_con">
        <a-col :span="24" class="allCj_conNam">
          <span>&emsp;模型名称:</span>
          <a-input
            style="width: 300px;"
            placeholder="请输入内容"
            v-model="modelName"
          ></a-input>
        </a-col>
        <a-col :span="24" class="allCj_conNam">
          <span>&emsp;&emsp;&emsp;描述:</span>
          <a-textarea
            v-model="textareaCon"
            style="width: 400px;vertical-align:top;resize: none;height: 10%;"
            autosize
          />
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col class="allCj_conNam">
          <span>&emsp;预测商品:</span>
          <a-select v-model="origin_id" class="inputWidth">
            <a-select-option
              :key="item.v"
              v-for="item in treeData"
              :value="item.v"
            >{{ item.l }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col class="allCj_conNam">
          <span>&emsp;预测周期:</span>
          <a-select v-model="foreCastId" class="inputWidth">
            <a-select-option
              :key="item.val_code"
              v-for="item in foreCast_type"
              :value="item.val_code"
            >{{ item.val_name }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col class="allCj_conNam">
          <span>训练数据集:</span>
          <a-select v-model="dataset_name" style="width: 400px;">
            <a-select-option
              :key="infoItem.dataset_id"
              v-for="infoItem in dataSetInfo"
              :value="infoItem.dataset_id"
            >{{ infoItem.dataset_name }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col class="allCj_conNam">
          <span>测试数据集:</span>
          <a-select v-model="dataset_name_test" style="width: 400px;">
            <a-select-option
              :key="infoItem.dataset_id"
              v-for="infoItem in dataSetInfo"
              :value="infoItem.dataset_id"
            >{{ infoItem.dataset_name }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col class="allCj_conNam">
          <span>&emsp;&emsp;因变量:</span>
          <a-select v-model="yinVariable" @change="variableSelectChange" class="inputWidth">
            <a-select-option
              :key="index"
              v-for="(item,index) in VariableSelectItem1"
              :value="item.value"
            >{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col class="allCj_conNam">
          <span>&emsp;&emsp;自变量:</span>
          <a-select
            mode="multiple"
            v-model="yinVariable1"
            :maxTagCount="1"
            :allowClear="isClear"
            class="inputWidth"
            placeholder="请选择"
          >
            <a-select-option
              :key="index"
              v-for="(item,index) in VariableSelectItem2"
              :value="item.value"
            >{{ item.label }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="allCj_con">
        <a-col :span="10" class="allCj_conNam">
          <span>&emsp;算法名称:</span>
          <a-select
            @change="datasetChange"
            v-model="datasetModel"
            style="min-width: 150px;"
            placeholder="请选择"
          >
            <a-select-option
              :key="typeItem.name"
              v-for="typeItem in datasetType"
              :value="typeItem.name"
            >{{ typeItem.value }}</a-select-option>
          </a-select>
        </a-col>

        <a-col
          v-if="datasetModel"
          :span="24"
          style="margin-top: 10px;font-size: 16px;font-weight: bold;"
        >
          参数配置：
        </a-col>

        <a-col :span="24" class="allCj_conNamCs">
          <p v-for="(items,index) in dataset_change" :key="index">
            <span style="margin-left: 20px">
              {{items.name}}:
              <template v-if="items.type !=='list'">
                <a-input class="inputWidth1" v-model="items.default"></a-input>
              </template>

              <template v-if="items.type ==='list'">
                <a-select
                  class="inputWidth"
                  placeholder="请选择"
                  v-model="items.default">

                  <a-select-option
                    :key="index"
                    v-for="(item ,index) in items.vals"
                    :value="item">
                    {{ item }}
                  </a-select-option>

                </a-select>
              </template>
            </span>
            <span style="margin-left: 10px;">
              ({{items.description}})
            </span>
          </p>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px;">
        <a-button @click="training" :size="size" icon="check-circle" type="primary">训练</a-button>
        <a-button @click="saveing" style="margin:0 20px;" :size="size" icon="diff" type="primary">保存</a-button>
        <a-button @click="$router.go(-1)" icon="left" :size="size">返回</a-button>
      </a-row>
      <div v-show="foreCastFlag === 1">
        <div class="allLayout_conCj" style="margin-top: 20px;">
          <span>预测</span>
        </div>
        <el-row style="margin-top: 20px;">
          <!--表格区-->
          <a-col :span="7" class="left10">
            <span style="margin: 0 0 16px 0;line-height: 42px; display: inline-block;">训练集偏差值：</span>
            <a-table
              bordered
              style="width: 100%;"
              :dataSource="tableData_train"
              :pagination="false"
            >
              <a-table-column data-index="name" align="left" title="名称"></a-table-column>
              <a-table-column data-index="value" align="left" title="值"></a-table-column>
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
            <a-table bordered style="width: 100%;" :dataSource="tableData_test" :pagination="false">
              <a-table-column data-index="name" align="left" title="名称"></a-table-column>
              <a-table-column data-index="value" align="left" title="值"></a-table-column>
            </a-table>
          </a-col>
          <a-col :span="12">
            <div id="testAtlas" style="width: 750px;height: 328px;" class="inlineBlock left10"></div>
          </a-col>
        </el-row>
      </div>
    </div>
  </a-spin>
</template>

<script>
  import { model_train,get_algorithm_list,get_parameter_list,get_columns,model_save } from "@/api/manager";
  import { mapActions } from 'vuex'
  import { required } from "vuelidate/lib/validators";
  import "@/styles/general.scss";
  import AInput from "ant-design-vue/es/input/Input";
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import AButton from "ant-design-vue/es/button/button";
  import echarts from "echarts";

  export default {
    name: "createModel",
    data() {
      return {
        tableArr: "",
        tableData_train: [],
        tableData_test: [],
        size: "default",
        length: 0,
        dataset_change: [], //参数配置
        origin_id: "", //预测商品id
        treeData: [
          { v: "1", l: "生猪" },
          { v: "2", l: "原油" },
          { v: "3", l: "大豆" },
          { v: "4", l: "玉米" },
          { v: "5", l: "天然气" }
        ], //预测商品树
        foreCast_type: [
          {
            val_code: "2",
            val_name: "日预测"
          },
          {
            val_code: "3",
            val_name: "周预测"
          },
          {
            val_code: "4",
            val_name: "月预测"
          },
          {
            val_code: "5",
            val_name: "年预测"
          }
        ], //预测周期下拉
        datasetType: [],
        foreCastId: "", //所选择的预测周期
        dataSetInfo: [], //数据集下拉
        selcetData:[],
        trainDataSetId: "", //训练数据集ID
        testDataSetId: "", //测试训练集ID
        VariableSelectItem: [], //自变量，因变量下拉数据
        VariableSelectItem1: [],
        VariableSelectItem2: [],
        yinVariable: "",
        datasetModel: "",
        yinVariable1: [],
        template1: [],
        isClear: false,
        foreCastFlag: 0,
        value: "",
        modelName: "",
        textareaCon: "",
        dataset_name: "",
        dataset_name_test: "",
        y_maximum: "",
        y_minimum: "",
        itemList: "",
        indexValue: [],
        index_values: [],
        userName: "",
        setDataZi: [],
        spinning: false,
        response: "",
      };
    },
    validations: {},
    computed: {},
    components: {
      AButton,
      ATextarea,
      AInput
    },
    watch:{
      dataset_name(val) {

        if(val){
          let data = {dataset_id:val}
          get_columns(data).then(res=>{
            this.VariableSelectItem1 = []
            this.VariableSelectItem2 = []
            for(let i in res.data){
              this.VariableSelectItem1[i] = {}
              this.VariableSelectItem1[i].label = res.data[i]
              this.VariableSelectItem1[i].value = res.data[i]
            }
            this.VariableSelectItem2 = [].concat(this.VariableSelectItem1)
          })

        }
      },
    },
    methods: {
      ...mapActions([
        'listAll'
      ]),
      newValue(val) {
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = [];
          this.tableData_test = [];
        }
      },
      getArithmetic() {
        get_algorithm_list().then(response => {
          let num = 0
          for (let key in response.data) {
            this.datasetType[num] = {};
            this.datasetType[num].name = key;
            this.datasetType[num].value =  response.data[key];
            num++
          }

        });
      },
      datasetChange(val) {
        if (val) {
          this.foreCastFlag = 0;
          this.tableData_train = [];
          this.tableData_test = [];
        }
        let data = {'algorithm':this.datasetModel}
        get_parameter_list(data).then(response => {
          this.dataset_change = response.data;
        });
      },
      variableSelectChange() {
        this.VariableSelectItem2 = [].concat(this.VariableSelectItem1)
        this.VariableSelectItem2.forEach((item, index) => {
          if (this.yinVariable === item.value) {
            this.VariableSelectItem2.splice(index, 1);
          }
        });
      },
      removeByValue(arr, val) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === val) {
            arr.splice(i, 1);
            break;
          }
        }
      },
      getBack() {
        this.foreCastFlag = 0;
      },
      saveing() {
        if (this.foreCastFlag === 0) {
          this.Message.warning("请先训练!");
        } else {
          let data ={model_id:this.response.result.model_id}
          model_save(data).then(response => {
            if (response.msg === "success") {
              this.$message({
                message:'保存成功',
                type:'success'
              })
              this.$router.go(-1);
            } else {
              this.$message({
                message:'保存失败',
                type:'error'
              })
            }
          });
        }
      },
      training() {
        this.userName = "admin";
        if (this.modelName === "" || this.origin_id === "" || this.foreCastId === "" || this.datasetModel === "" || this.dataset_name === "" || this.dataset_name_test === "" || this.yinVariable === "" || this.yinVariable1.length === 0) {
          this.$message.warning("请填写所有表单内容");
        } else {
          this.spinning = true;
          let tableList = {}
          for(let i in this.dataset_change){
            if(this.dataset_change[i].type === 'int') {
              tableList[this.dataset_change[i].name] = parseInt(this.dataset_change[i].default)
            }else if(this.dataset_change[i].type === 'float'){
              tableList[this.dataset_change[i].name] = parseFloat(this.dataset_change[i].default)
            } else {
              tableList[this.dataset_change[i].name] = this.dataset_change[i].default
            }
          }
          let setDatas = {
            model_name: this.modelName, //模型名称
            description: this.textareaCon, //描述
            org_id: this.origin_id, //预测商品id
            date_index:"date",
            operator: this.userName, //操作者
            predict_time_type: this.foreCastId, //预测周期id
            algorithm_name: this.datasetModel, //算法名称
            train_dataset_id: this.dataset_name, //训练数据集
            test_dataset_id: this.dataset_name_test, //测试数据集
            dependent_var: this.yinVariable, //因变量
            independent_var_list: this.yinVariable1, //自变量
            parameters: tableList //算法参数
          };
          model_train(setDatas).then(response => {
            this.spinning = false;
            this.$message({
              message:'训练成功',
              type:'success'
            })
            response.result = response.data
            this.response = response;
            this.foreCastFlag = 1;
            let chart1_train1 = response.result.train_charts[0];
            let chart1_train2 = response.result.train_charts[1];
            let chart2_test1 = response.result.test_charts[0];
            let chart2_test2 = response.result.test_charts[1];
            let tableData_train1 = response.result.train_coefficients;
            let tableData_test1 = response.result.test_coefficients;
            this.tableData_train = [];
            for (let key in tableData_train1) {
              let data = {};
              data.value = tableData_train1[key].toFixed(2);
              data.name = key;
              this.tableData_train.push(data);
              if (key === "R2") {
                data.value = tableData_train1[key].toFixed(4);
              } else if (key === "MAPE") {
                data.value = tableData_train1[key].toFixed(4);
              } else {
                data.value = tableData_train1[key].toFixed(2);
              }
            }
            this.tableData_test = [];
            for (let i in tableData_test1) {
              let data = {};
              data.value = tableData_test1[i].toFixed(2);
              data.name = i;
              this.tableData_test.push(data);
              if (i === "R2") {
                data.value = tableData_test1[i].toFixed(4);
              } else if (i === "MAPE") {
                data.value = tableData_test1[i].toFixed(4);
              } else {
                data.value = tableData_test1[i].toFixed(2);
              }
            }
            let chart1Train_data = [];
            let chart1Train_val = [];
            for (let i in chart1_train1) {
              chart1Train_val.push(chart1_train1[i].toFixed(2));
              chart1Train_data.push(i);
            }
            let chart1Train_val1 = [];
            for (let i in chart1_train2) {
              chart1Train_val1.push(chart1_train2[i].toFixed(2));
            }
            this.chart1(chart1Train_data, chart1Train_val, chart1Train_val1);
            let chart1Test_data = [];
            let chart1Test_val = [];
            for (let i in chart2_test1) {
              chart1Test_val.push(chart2_test1[i].toFixed(2));
              chart1Test_data.push(i);
            }
            let chart1Test_val1 = [];
            for (let i in chart2_test2) {
              chart1Test_val1.push(chart2_test2[i].toFixed(2));
            }
            this.chart2(chart1Test_val, chart1Test_data, chart1Test_val1);
          })
        }
      },
      chart1(chart1Train_data, chart1Train_val, chart1Train_val1) {
        let chartsBar_left = echarts.init(document.getElementById("trainAtlas"));
        let option = {
          color: ["#e062ae", "#62c6e9"],
          title: {
            text: "单位：万方",
            textStyle: {
              //设置主标题风格
              color: "#4f98d3", //设置主标题字体颜色
              fontSize: "16"
            },
            left: "3%",
            top: "10px"
          },
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              if (params.length == 1) {
                let values = params[0].value;
                if (!params[0].value) {
                  values = "";
                }
                return (
                  "日期：" +
                  params[0].name +
                  "<br/>" +
                  params[0].marker +
                  params[0].seriesName +
                  ":" +
                  values
                );
              } else {
                let res = [];
                let dotHtml =
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ed9e7d"></span>';
                let offset =
                  (
                    ((params[0].value - params[1].value) / params[1].value) *
                    100
                  ).toFixed(2) + "%";
                if (!params[0].value) {
                  res[0] = params[0].seriesName + ":" + "";
                  offset = "";
                } else {
                  res[0] = params[0].seriesName + ":" + params[0].value;
                }
                if (!params[1].value) {
                  res[1] = params[1].seriesName + ":" + "";
                  offset = "";
                } else {
                  res[1] = params[1].seriesName + ":" + params[1].value;
                }
                return (
                  "日期：" +
                  params[0].name +
                  "<br/>" +
                  params[0].marker +
                  res[0] +
                  "<br/>" +
                  dotHtml +
                  "偏差率" +
                  ":" +
                  offset +
                  "<br/>" +
                  params[1].marker +
                  res[1]
                );
              }
            }
          },
          legend: {
            right: "10%",
            top: "10px",
            data: ["预测量", "实际量"]
          },
          dataZoom: [
            {
              type: "inside",
              throttle: 50
            }
          ],
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: chart1Train_data
            }
          ],
          yAxis: [
            {
              type: "value",
              min: function(value) {
                return value.min;
              },
              max: function(value) {
                return value.max;
              }
            }
          ],
          series: [
            {
              name: "预测量",
              type: "line",
              data: chart1Train_val,
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            },
            {
              name: "实际量",
              type: "line",
              data: chart1Train_val1,
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        };
        chartsBar_left.setOption(option);
      },
      chart2(chart1Test_val, chart1Test_data, chart1Test_val1) {
        let chartsBar_left = echarts.init(document.getElementById("testAtlas"));
        let option = {
          color: ["#e062ae", "#62c6e9"],
          title: {
            text: "单位：万方",
            textStyle: {
              //设置主标题风格
              color: "#4f98d3", //设置主标题字体颜色
              fontSize: "16"
            },
            left: "3%",
            top: "10px"
          },
          tooltip: {
            trigger: "axis",
            formatter: function(params) {
              if (params.length == 1) {
                let values = params[0].value;
                if (!params[0].value) {
                  values = "";
                }
                return (
                  "日期：" +
                  params[0].name +
                  "<br/>" +
                  params[0].marker +
                  params[0].seriesName +
                  ":" +
                  values
                );
              } else {
                let res = [];
                let dotHtml =
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#ed9e7d"></span>';
                let offset =
                  (
                    ((params[0].value - params[1].value) / params[1].value) *
                    100
                  ).toFixed(2) + "%";
                if (!params[0].value) {
                  res[0] = params[0].seriesName + ":" + "";
                  offset = "";
                } else {
                  res[0] = params[0].seriesName + ":" + params[0].value;
                }
                if (!params[1].value) {
                  res[1] = params[1].seriesName + ":" + "";
                  offset = "";
                } else {
                  res[1] = params[1].seriesName + ":" + params[1].value;
                }
                return (
                  "日期：" +
                  params[0].name +
                  "<br/>" +
                  params[0].marker +
                  res[0] +
                  "<br/>" +
                  dotHtml +
                  "偏差率" +
                  ":" +
                  offset +
                  "<br/>" +
                  params[1].marker +
                  res[1]
                );
              }
            }
          },
          legend: {
            right: "10%",
            top: "10px",
            data: ["预测量", "实际量"]
          },
          dataZoom: [
            {
              type: "inside",
              throttle: 50
            }
          ],
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: chart1Test_data
            }
          ],
          yAxis: [
            {
              type: "value",
              min: function(value) {
                return value.min;
              },
              max: function(value) {
                return value.max;
              }
            }
          ],
          series: [
            {
              name: "预测量",
              type: "line",
              data: chart1Test_val,
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            },
            {
              name: "实际量",
              type: "line",
              data: chart1Test_val1,
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            }
          ]
        };
        chartsBar_left.setOption(option);
      }
    },
    mounted() {
      this.listAll().then(res => {
        this.dataSetInfo = []
        for(let i in res.list) {
          this.dataSetInfo[i] = {}
          this.dataSetInfo[i].dataset_name = res.list[i].dataSetName
          this.dataSetInfo[i].dataset_id = res.list[i].dataSetId
        }
      })
      this.chart1();
      this.chart2();
      this.getArithmetic();
    }
  };
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
    margin: 20px 0 10px;
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
