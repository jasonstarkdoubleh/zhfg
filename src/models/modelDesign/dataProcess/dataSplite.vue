<template>
  <div class="wrapper">
    <div class="top10 left20">
      <div class="inlineBlock">
        <div class="inlineBlock" style="text-indent: 2em">
          <span>分割方式：</span>
        </div>
        <a-select :value="split_type" @change="changeVal" style="width:150px;">
          <a-select-option :key="item.cutId" v-for="item in cutData"
                           :value="item.cutId">{{ item.cutValue }}
          </a-select-option>
        </a-select>
      </div>
      <!--按比例-->
      <div v-if="selectFlag=='percent'" class="inlineBlock left30" key="1">
        <div class="inlineBlock" style="text-indent: 2em">
          <span>比例：</span>
        </div>
        <a-input v-model="split_value" @blur="divideValue" style="width: 150px"></a-input>
      </div>
      <!--按记录条数-->
      <div v-if="selectFlag=='index'" class="inlineBlock left30" key="2">
        <span>记录条数：</span>
        <a-input v-model="split_value" style="width: 150px"></a-input>
      </div>
      <!--按时间-->
      <div v-if="selectFlag=='date'" class="inlineBlock left30" key="3">
        <div class="inlineBlock" style="text-indent: 1em">
          <span>数据项：</span>
        </div>
        <a-date-picker @change="dateChange" style="width: 150px;"/>
      </div>
      <a-button @click="saveSplite" type="primary" class="left20 inlineBlock">保存</a-button>
      <div v-if="selectFlag=='date'" class="top10" style="margin-left: 28px">
      </div>
      <!--内容填写-->
      <div class="top20">
        <div style="margin-left: 8px">
          <span>数据集名称1：</span>
          <a-input v-model="dataset_name1" style="width: 405px" placeholder="只支持英文命名"></a-input>
          <a-icon style="margin-left: 10px" type="edit"/>
        </div>
        <div class="top20" style="margin-left: 50px">
          <span style="vertical-align:top">说明1：</span>
          <a-textarea v-model="description1" style="width: 405px"></a-textarea>
        </div>
        <div class="top20" style="margin-left: 8px">
          <span>数据集名称2：</span>
          <a-input v-model="dataset_name2" style="width: 405px" placeholder="只支持英文命名"></a-input>
          <a-icon style="margin-left: 10px" type="edit"/>
        </div>
        <div class="top20" style="margin-left: 50px">
          <span style="vertical-align:top">说明2：</span>
          <a-textarea v-model="description2" style="width: 405px"></a-textarea>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {split} from '@/api/manager'
  import WorkMain from '@/models/public/WorkMain'
  import {required} from 'vuelidate/lib/validators'
  import "@/styles/general.scss"
  import AInput from "ant-design-vue/es/input/Input";
  import AButton from "ant-design-vue/es/button/button";

  export default {
    name: 'dataSplite',
    data() {
      return {
        selectFlag: 'percent',
        cutData: [{
          "cutId": 'percent',
          "cutValue": "按比例",
        }, {
          "cutId": 'index',
          "cutValue": "按记录条数",
        }, {
          "cutId": 'date',
          "cutValue": "按时间",
        }],
        row_num: '',
        split_type: 'percent',//切分类型
        split_value: '',//切分值
        dataset_name1: '',//数据集1名称
        dataset_name2: '',//数据集2名称
        description1: '',//描述1
        description2: '',//描述2
        optData: [],
      }
    },
    props: ['selectParam'],
    watch: {
      selectParam(val) {
        this.row_num = val.shape;
        this.dataset_name1 = val.dataSetName + '_01';
        this.dataset_name2 = val.dataSetName + '_02';
      }
    },
    validations: {
      dataset_name1: {
        required
      },
      dataset_name2: {
        required
      },
      split_value: {
        required
      },
    },
    components: {
      AButton,
      AInput,
      WorkMain
    },
    methods: {
      changeVal(val) {
        this.split_value = '';
        this.selectFlag = val;
        this.split_type = val;
      },
      dateChange(date, dateString) {
        this.split_value = dateString;
      },
      divideValue(e) {
        let $this = this;
        let targetValue = e.target.value;
        if (!(targetValue >= 0 && targetValue <= 1)) {
          $this.$warning({
            title: '提示',
            content: '请输入0-1之间的小数',
            okText: '确认',
            onOk() {
              $this.split_value = '0.1';
            }
          });
        }
      },
      saveSplite() {
        let submitFlag = true;
        this.sameDatasetName = false;
        if (JSON.stringify(this.selectParam) === '{}') {
          this.$message({
            message:'请选择要切分的数据',
            type:'warning'
          })
          submitFlag = false;
          return
        }
        if (this.checkInputNull()) {
          return
        }
        if (this.split_type === 'index') {
          if (!(/(^[1-9]\d*$)/.test(this.split_value)) || this.split_value > this.row_num || this.split_value < 0) {
            this.$message({
              message:'请输入大于0小于' + this.row_num + '的正整数',
              type:'warning'
            })
            submitFlag = false;
            return
          }
        }
        if (this.dataset_name1 === this.dataset_name2) {
          this.$message({
            message:'数据集名称不能相同',
            type:'warning'
          })
          submitFlag = false;
          return
        }
        if (submitFlag) {//向后端请求接口，发送input框中的所有数据
          let data = {
            "dataset_id": this.selectParam.dataSetId,
            "split_type": this.split_type,
            "split_value": this.split_value,
            "dataset_name1": this.dataset_name1,
            "dataset_name2": this.dataset_name2,
            "description1": this.description1,
            "description2": this.description2,
          }
          split(data).then(response => {
            if (response.code === 0) {
              this.$message({
                message:'提交成功',
                type:'success'
              })
              this.$emit('refreshData');//刷新列表
            } else {
              this.$warning({
                title: '提交失败'
              });
            }
          })
        }
      },
      checkInputNull() {
        const checkResult = this.$v.$invalid
        if (checkResult) {
          this.$message({
            message:'数据集名称、切分值',
            type:'warning'
          })
        }
        return checkResult
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wrapper {
    width: 100%;
  }

</style>
