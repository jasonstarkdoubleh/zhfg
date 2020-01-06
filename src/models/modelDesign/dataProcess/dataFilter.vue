<template>
  <div>
    <!--<div class="titleArea floatLeft">
      <span style="line-height: 45px;font-weight: bold;font-size: 14px">处理方式:</span>
    </div>-->
    <div>
      <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="归一化" key="1">
          <div style="text-align: left">
            <span class="left40">数据项：</span>
            <a-select :value="guiyiEcho" mode="multiple" :maxTagCount="0" @select="guiYiSelected" @deselect="unGuiYiSelected"
                      style="width:160px;" placeholder="请选择">
              <a-select-option v-for="(item,index) in selectDataItem"
                               :value="item" :key="index">{{ item }}
              </a-select-option>
            </a-select>
            <a-button @click="saveDataFilter" type="primary" class="left10">保存</a-button>
          </div>
          <div class="guiYiWrapper">
            <div v-for="(item,index) in guiYiDynamicParam" class="clearBoths" :key="index" style="margin-top: 15px">
              <div style="margin-bottom:10px;">
                <span>字段名称：</span>
                <span>{{item.name}}</span>
              </div>
              <span>最小取值：</span>
              <a-input style="width: 130px;" v-model="item.min" placeholder="min" auto-complete="off"></a-input>
              <span>最大取值：</span>
              <a-input style="width: 130px" v-model="item.max" placeholder="max" auto-complete="off"></a-input>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane tab="标准化" key="2">
          <div style="text-align: left" class="left10">
            <span class="left40">数据项:</span>
            <a-select :value="standartParam" mode="multiple" :maxTagCount="0" @change="standardChange" style="width:160px;margin-left: 10px"
                      placeholder="请选择">
              <a-select-option :key="key" v-for="(value,key) in selectDataItem"
                               :value="value">{{ value }}
              </a-select-option>
            </a-select>
            <a-button @click="saveDataFilter" type="primary" class="left10">保存</a-button>
          </div>
        </a-tab-pane>

        <a-tab-pane tab="数据变换" key="3">
          <div style="text-align: left" class="left10">
            <span class="left40">数据项：</span>
            <a-select :value="tranforEcho" mode="multiple" :maxTagCount="0" @select="transforSelected" @deselect="unTransforSelected"
                      style="width:160px;margin-left: 10px"
                      placeholder="请选择">
              <a-select-option :key="key" v-for="(value,key) in selectDataItem"
                               :value="value">{{ value }}
              </a-select-option>
            </a-select>
            <a-button @click="saveDataFilter" type="primary" class="left10">保存</a-button>
          </div>
          <div class="transforWrapper">
            <div v-for="(transforItem,index) in transforDynamicParam" :key="index" class="clearBoths"
                 style="margin-top: 15px">
              <div class="floatLeft " style="text-align:right; width:100px;">
                <span style="line-height: 32px;">{{transforItem.name}}:</span>
              </div>
              <a-select v-model="transforItem.val" class="left20" style="float: left;width:130px;">
                <a-select-option :key="index" v-for="(value,index) in dataTransParam"
                                 :value="value">{{ value }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal title="参数保存" v-model="visible" :maskClosable="false">
      <a-form class="modal-form" label-width="20%">
        <a-form-item label="数据集名称">
          <a-input v-model="dataset_name" auto-complete="off"></a-input>
        </a-form-item>
        <a-form-item label="说明">
          <a-textarea v-model="description" auto-complete="off"></a-textarea>
        </a-form-item>
      </a-form>
      <div slot="footer" class="dialog-footer">
        <a-button type="primary" @click="saverModelParam">确 定</a-button>
        <a-button @click="closeModal">取 消</a-button>
      </div>
    </a-modal>
  </div>

  <!--<div style="height: 50px"></div>-->
</template>

<script>
  import {filter,get_columns} from '@/api/manager'
  import WorkMain from '@/models/public/WorkMain'
  import {required} from 'vuelidate/lib/validators'
  import "@/styles/general.scss"
  import AInput from "ant-design-vue/es/input/Input";
  import AButton from "ant-design-vue/es/button/button";
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import AModal from "ant-design-vue/es/modal/Modal";

  export default {
    name: 'dataFilter',
    data() {
      return {
        dataset_id: '',
        dataset_name: '',//弹框数据集名称
        description: '',//弹框数据集说明
        visible: false,
        selectDataItem: [],
        guiYiDynamicParam: [],//要传的归一参数
        standartParam: [],//要传的标准参数
        dataTransParam: ["sin", "cos", "tan", "log2", "log10", "exp", "sqrt", "square"],
        transforDynamicParam: [],//要传的数据变换参数
        guiyiEcho: [],
        tranforEcho: [],
      }
    },
    validations: {
      dataset_name: {
        required
      },
      description: {
        required
      },
    },
    computed: {},
    props: ['targetParam'],
    components: {
      AModal,
      ATextarea,
      AButton,
      AInput,
      WorkMain
    },
    watch: {
      targetParam (val) {
        this.guiYiDynamicParam = [];
        this.guiyiEcho = [];
        this.standartParam = [];
        this.transforDynamicParam = [];
        this.tranforEcho = [];
        this.dataset_id = val.dataSetId;
        let data = {dataset_id:val.dataSetId}
        get_columns(data).then(response => {
          this.selectDataItem = response.data;
        })
      }
    },
    methods: {
      removeByValue(arr, val) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === val) {
            arr.splice(i, 1);
            break;
          }
        }
      },
      unGuiYiSelected(value) {
        let target = this.guiYiDynamicParam.find((item) => item.name === value);
        let echoTarget = this.guiyiEcho.find((item) => item === value);
        this.removeByValue(this.guiYiDynamicParam, target);
        this.removeByValue(this.guiyiEcho,echoTarget);
      },
      guiYiSelected(value) {
        let obj = {};
        obj.name = value;
        this.guiYiDynamicParam.push(obj);
        this.guiyiEcho.push(value);//回显（归一）
      },
      standardChange(value) {
        this.standartParam = value;
      },
      transforSelected(val) {
        let obj = {};
        obj.name = val;
        this.transforDynamicParam.push(obj);
        this.tranforEcho.push(val);
      },
      unTransforSelected(val) {
        let target = this.transforDynamicParam.find((item) => item.name == val);
        let echoTarget = this.tranforEcho.find((item) => item == val);
        this.removeByValue(this.transforDynamicParam, target);
        this.removeByValue(this.tranforEcho, echoTarget);
      },
      saveDataFilter() {
        let flag = true;
        if (this.dataset_id === '') {
          this.Notify.error({
            message: '请选择数据集',
            style: 'font-size:15px;color:red;font-weight: bold',
          })
          return
        }
        if (this.guiYiDynamicParam.length) {
          const that = this;
          this.guiYiDynamicParam.forEach(function (item) {
            if (Object.keys(item).length === 2 || Object.keys(item).length === 1) {
              that.Notify.error({
                message: '最小值、最大值不允许为空',
                style: 'font-size:15px;color:red;font-weight: bold',
              })
              flag = false;
            } else {
              if (isNaN(item.min) || isNaN(item.max)) {
                that.Notify.error({
                  message: '以下参数格式不正确',
                  style: 'font-size:15px;color:red;font-weight: bold',
                  description: '最小值、最大值'
                })
                flag = false;
              }
            }
          })
        }
        if (this.transforDynamicParam.length) {
          const that = this;
          this.transforDynamicParam.forEach(function (item) {
            if (Object.keys(item).length === 1) {
              that.Notify.error({
                message: '数据变换所选各项为必选项目',
                style: 'font-size:15px;color:red;font-weight: bold',
              })
              flag = false;
            }
          })
        }
        if (flag) {
          this.dataset_name = '';
          this.description = '';
          this.visible = true;
        }
      },
      closeModal() {
        this.visible = false;
      },
      saverModelParam() {
        if (this.checkInputNull()) {
          return
        }
        console.log(this.dataset_id)
        let data = {
          dataset_id: this.dataset_id,
          dataset_name: this.dataset_name,
          description: this.description,
          filter: {
            normalization: this.guiYiDynamicParam,
            standardization: this.standartParam,
            datatransfor: this.transforDynamicParam
          }
        }
        filter(data).then(response => {
          this.visible = false;
          this.$message({
            message:'保存成功',
            type:'success'
          })
          this.guiYiDynamicParam = []
          this.standartParam = []
          this.transforDynamicParam = []
          this.$emit('refreshTable');//刷新列表
        });
      },
      checkInputNull() {
        const checkResult = this.$v.$invalid
        if (checkResult) {
          this.Notify.error({
            message: '以下参数不允许为空',
            style: 'font-size:15px;color:red;font-weight: bold',
            description: '数据集名称、说明'
          })
        }
        return checkResult
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .titleArea {
    width: 80px;
  }

  .guiYiWrapper {
    width: 550px;
    margin-left: 30px;
  }

  .buttomButton {
    margin-top: 30px;
    margin-left: 130px;
  }

  .transforWrapper {
    width: 550px;
    // border: 1px solid red;
  }
</style>
